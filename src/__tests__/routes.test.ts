import request from 'supertest';
import app from '../app';

jest.mock('../services/speechToText', () => ({
  __esModule: true,
  default: {
    recognize: jest.fn(),
    listModels: jest.fn(),
  },
}));
import speechToText from '../services/speechToText';
const asMock = <T extends (...a: any)=>any>(fn:any) => fn as jest.Mock<ReturnType<T>, Parameters<T>>;

describe('Routes', () => {
  it('モデル一覧をnameでソートして返す', async () => {
    asMock<typeof speechToText.listModels>(speechToText.listModels).mockResolvedValueOnce({
      result: {
        models: [
          { name: 'zeta', language: 'en' },
          { name: 'alpha', language: 'ja' },
        ],
      }
    });

    const res = await request(app).get('/api/v1/models').expect(200);
    expect(res.body).toEqual([
      { name: 'alpha', language: 'ja' },
      { name: 'zeta', language: 'en' },
    ]);
  });

  it('SpeechToTextが例外を投げると例外を投げる', async () => {
    asMock<typeof speechToText.listModels>(speechToText.listModels).mockRejectedValueOnce(new Error('service error'));
    const res = await request(app).get('/api/v1/models').expect(500);
    expect(res.body).toEqual({ message: 'service error' });
  })
})
