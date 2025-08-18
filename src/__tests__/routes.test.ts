import request from "supertest";
import app from "../app";

jest.mock("../services/speechToText", () => ({
  __esModule: true,
  default: {
    recognize: jest.fn(),
    listModels: jest.fn(),
  },
}));

import speechToText from "../services/speechToText";

const stt = jest.mocked(speechToText, { shallow: true });

describe("/listModels", () => {
  it("モデル一覧をnameでソートして返す", async () => {
    stt.listModels.mockResolvedValueOnce({
      result: {
        models: [
          { name: "zeta", language: "en" },
          { name: "alpha", language: "ja" },
        ],
      },
    });

    const res = await request(app).get("/api/v1/models").expect(200);
    expect(res.body).toEqual([
      { name: "alpha", language: "ja" },
      { name: "zeta", language: "en" },
    ]);
  });

  it("SpeechToTextが例外を投げると例外を投げる", async () => {
    stt.listModels.mockRejectedValueOnce(new Error("service error"));
    const res = await request(app).get("/api/v1/models").expect(500);
    expect(res.body).toEqual({ message: "service error" });
  });
});

describe("/recognize", () => {
  beforeEach(() => jest.clearAllMocks());
  it("正常系", async () => {
    stt.recognize.mockResolvedValueOnce({
      result: {
        results: [
          { alternatives: [{ transcript: "hello" }] },
          { alternatives: [{ transcript: "world" }] },
        ],
      },
    });

    const res = await request(app)
      .post("/api/v1/recognize")
      .field("model", "model1")
      .attach("file", Buffer.from([0x52, 0x49]), {
        filename: "a.wav",
        contentType: "audio/wav",
      });

    expect(res.status).toBe(200);
    expect(speechToText.recognize).toHaveBeenCalledWith(
      expect.objectContaining({
        contentType: "audio/wav",
        model: "model1",
      })
    );
    expect(typeof res.body.transcript).toBe("string");
  });

  test("file 未指定 → 400", async () => {
    const res = await request(app)
      .post("/api/v1/recognize")
      .field("model", "stt-1");
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "file is required" });
    expect(speechToText.recognize).not.toHaveBeenCalled();
  });

  test("model 未指定 → 400", async () => {
    const res = await request(app)
      .post("/api/v1/recognize")
      .attach("file", Buffer.from([0x00]), {
        filename: "x.wav",
        contentType: "audio/wav",
      });
    expect(res.status).toBe(400);
  });

  test("非 audio → 415", async () => {
    const res = await request(app)
      .post("/api/v1/recognize")
      .field("model", "stt-1")
      .attach("file", Buffer.from("x"), {
        filename: "x.txt",
        contentType: "text/plain",
      });
    expect(res.status).toBe(415);
    expect(res.body).toEqual({ error: "unsupported content-type: text/plain" });
  });

  test("上流エラー → 500", async () => {
    stt.recognize.mockRejectedValueOnce(new Error("upstream"));

    const res = await request(app)
      .post("/api/v1/recognize")
      .field("model", "stt-1")
      .attach("file", Buffer.from([0x00]), {
        filename: "x.wav",
        contentType: "audio/wav",
      });

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: "upstream" });
  });
});
