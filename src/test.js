const words = [
  {
    原文: "TPO 1-1 \r\n\r\nGroundwater",
    生词: "meteoric ",
    解释: "疾速的、流星的",
    备注: "meteoric water：雨水",
  },
  {
    原文: null,
    生词: "crevice",
    解释: "裂缝、缺口",
    备注: null,
  },
  {
    原文: "TPO 1-2 \r\n\r\nThe Origins of Theater",
    生词: "anthropologist",
    解释: "人类学家",
    备注: null,
  },
  {
    原文: null,
    生词: "envision",
    解释: "设想、想象",
    备注: null,
  },
  {
    原文: null,
    生词: "efficacious",
    解释: "有效的",
    备注: null,
  },
];

const idealData = [
  {
    chapter: "1-1",
    chpVault: [
      {
        生词: "meteoric ",
        解释: "疾速的、流星的",
        备注: "meteoric water：雨水",
      },
    ],
  },
  {
    chapter: "1-2",
    chpVault: [
      {
        生词: "envision",
        解释: "设想、想象",
        备注: null,
      },
      {
        生词: "efficacious",
        解释: "有效的",
        备注: null,
      },
    ],
  },
];

function createWordVault(csvData) {
  fields = csvData.meta.fields;
  words = csvData.data;

  let chpVault = [];
  let chpTitle;

  for (const word of words) {
    const chp = word.原文;
    const newWord = word.生词;
    const def = word.解释;
    const notes = word.备注;

    // the start of a new chpVault
    if (chp !== null) {
      // as long as there's any word in any vault
      if (wordVault.length || chpVault.length) {
        const { seq, title } = splitter(chpTitle);
        wordVault.push({ chp: { seq, title }, chpVault });
        chpVault = [];
      }
      chpTitle = chp;
    }

    // inside of a chpVault
    chpVault.push({ newWord, def, notes });
  }

  // push the final chpVault
  const { seq, title } = splitter(chpTitle);
  wordVault.push({ chp: { seq, title }, chpVault });

  return wordVault;
}

function splitter(chp) {
  const regexSeq = /(TPO \d+-\d+)/;
  const seq = chp.match(regexSeq)[0];
  const title = chp.split(seq)[1].replace(/[\r\n]/g, "");

  // console.log({ seq: seq.trim(), title: title.trim() });
  return { seq: seq.trim(), title: title.trim() };
}

const { seq, title } = splitter("TPO 32-2 \r\n\r\nSiam, 1851-1910");
console.log(seq, title);
// console.log(createVault(words));
