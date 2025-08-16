export type KeywordHit = {
  keyword: string;
  start: number;
  end: number;
  aroundText: {
    before: string;
    match: string;
    after: string;
  };
};
