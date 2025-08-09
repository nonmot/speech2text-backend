import { Request, Response, NextFunction } from "express";
import speechToText from "../services/speechToText";

export const recognizeAudio = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'file is required' });
    }

    const model = req.body?.model as string;
    if (!model) {
      return res.status(400).json({ error: 'model is required' });
    }

    if (!file.mimetype.startsWith("audio/")) {
      return res.status(415).json({ error: `unsupported content-type: ${file.mimetype}` });
    }

    const recognizeParams = {
      audio: file.buffer,
      contentType: file.mimetype,
      model: model
    }

    console.log("sending")
    const rawResults = await speechToText.recognize(recognizeParams)

    const results = rawResults.result.results?.map(({ alternatives }: any) => ({
      transcript: alternatives[0].transcript,
    }));

    res.status(200).json({ results });
  } catch (error) {
    next(error);
  }
}

export const listModels = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const list = await speechToText.listModels()
    const models = list.result.models.map((model: { name: string, language: string }) => ({ name: model.name, language: model.language }));

    // 安定表示のためソート
    models.sort((a, b) => a.name.localeCompare(b.name));

    res.status(200).json(models);
  } catch (error) {
    next(error)
  }
}
