import { findKeywordMatches } from "../helper/textMatch";


describe("textMatch", () => {
  it("正常系", () => {
    const input_text =
      "音声 認識 の 現状 に ついて 教えて いただけ ない でしょう か はい 最近 では 音声 認識 でも ディープ ラーニング が よく つく 使われて ます ねえ それ は どう いった もの なの でしょう か 簡単 に 言えば 脳 の 仕組み を モデル に した 技術 です それ は 難しそう ですね 一部 では 人間 の 能力 を 超える まで に なって います";
    const keywords = ["脳"];
    const expected = [
      {
        keyword: "脳",
        start: 118,
        end: 119,
        aroundText: {
          before: " 言えば ",
          match: "脳",
          after: " の 仕組",
        },
      },
    ];
    const kwHits = findKeywordMatches(input_text, keywords, 5);
    expect(kwHits).toEqual(expected);
  });
})
