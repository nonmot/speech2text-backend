import { Request, Response, NextFunction } from "express";
import speechToText from "../services/speechToText";

export const recognizeAudio = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const recognizeParams = {
      audio: file.buffer,
      contentType: file.mimetype,
      model: 'ja-JP_BroadbandModel'
    }

    console.log("sending")
    const rawResults = await speechToText.recognize(recognizeParams)

    const results = rawResults.result.results?.map(({ alternatives }: any) => ({
      transcript: alternatives[0].transcript,
    }));
    
    console.log(results);

    res.status(200).json({ results });
  } catch (error) {
    next(error);
  }
}

export const listModels = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const list = await speechToText.listModels()
    const models = list.result.models.map((model: { name: string, language: string }) => ({ name: model.name, language: model.language }));
    res.status(200).json(models);
  } catch (error) {
    console.error(error);
    next(error)
  }
}
