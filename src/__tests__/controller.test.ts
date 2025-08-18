import { Request, Response } from "express";
import { recognizeAudio, keywordSearch } from "../controllers/controllers";

describe("recognizeAudio", () => {
  it("should return 400 if no file is uploaded", async () => {
    const req = { file: undefined } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;
    const next = jest.fn();
    await recognizeAudio(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "file is required" });
  });
});

describe("Keyword search", () => {
  it("正常系：キーワード検索機能", async () => {
    const input_transcript =
      "音声 認識 の 現状 に ついて 教えて いただけ ない でしょう か はい 最近 では 音声 認識 でも ディープ ラーニング が よく つく 使われて ます ねえ それ は どう いった もの なの でしょう か 簡単 に 言えば 脳 の 仕組み を モデル に した 技術 です それ は 難しそう ですね 一部 では 人間 の 能力 を 超える まで に なって います";
    const keywords = ["脳"];
    const expected = [
      {
        keyword: "脳",
        start: 118,
        end: 119,
        aroundText: {
          before: "た もの なの でしょう か 簡単 に 言えば ",
          match: "脳",
          after: " の 仕組み を モデル に した 技術 です ",
        },
      },
    ];

    const req = {
      body: {
        text: input_transcript,
        keywords: keywords,
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;
    const next = jest.fn();
    keywordSearch(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ highlights: expected });
  });

  it("textが空だと400を返す", () => {
    const req = {
      body: {
        text: "",
        keywords: ["hoge"],
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;
    const next = jest.fn();
    keywordSearch(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "text is required" });
  });

  it("keywordsが空だと400を返す", () => {
    const req = {
      body: {
        text: "hoge",
        keywords: [],
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;
    const next = jest.fn();
    keywordSearch(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "keywords is required" });
  });
});
