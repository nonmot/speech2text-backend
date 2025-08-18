import { Request, Response, NextFunction } from "express";
import speechToText from "../services/speechToText";

import { findKeywordMatches } from "../helper/textMatch";
import type { KeywordHit } from "../types";

interface Alternative {
  transcript?: string;
}

interface Segment {
  alternatives: Alternative[];
}

export const recognizeAudio = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "file is required" });
    }

    const model = req.body?.model as string;
    if (!model) {
      return res.status(400).json({ error: "model is required" });
    }

    if (!file.mimetype.startsWith("audio/")) {
      return res
        .status(415)
        .json({ error: `unsupported content-type: ${file.mimetype}` });
    }

    const recognizeParams = {
      audio: file.buffer,
      contentType: file.mimetype,
      model: model,
    };

    const rawResults = await speechToText.recognize(recognizeParams);

    const segments = rawResults?.result?.results ?? [];
    const transcript = segments
      .map((r: Segment) => r?.alternatives[0]?.transcript ?? "")
      .join("")
      .trim();

    const payload = { transcript };
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};

export const keywordSearch = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const text = req.body.text;
    if (!text) {
      return res.status(400).json({ error: "text is required" });
    }
    const kwRaw = req.body.keywords;
    const keywords: string[] = Array.isArray(kwRaw)
      ? kwRaw
      : kwRaw
      ? [kwRaw]
      : [];
    if (!keywords || keywords.length === 0) {
      return res.status(400).json({ error: "keywords is required" });
    }

    const highlights: KeywordHit[] = findKeywordMatches(text, keywords);
    const payload = { highlights };
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};

export const listModels = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const list = await speechToText.listModels();
    const models = list.result.models.map(
      (model: { name: string; language: string }) => ({
        name: model.name,
        language: model.language,
      })
    );

    // 安定表示のためソート
    models.sort((a, b) => a.name.localeCompare(b.name));

    res.status(200).json(models);
  } catch (error) {
    next(error);
  }
};
