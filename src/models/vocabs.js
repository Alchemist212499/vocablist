let vocabVault = [];
let vocabs = [];
let curChpIndex = 0;
let curVocabIndex = 0;

export default {
  goToChapter(chpIndex) {
    curChpIndex = chpIndex;
    curVocabIndex = 0;

    let curChp = vocabVault[curChpIndex].chp;
    let curVocab = vocabVault[curChpIndex].chpVault[curVocabIndex];

    return { curChp, curChpIndex, curVocab };
  },

  getAllChapters() {
    const chapters = [];
    if (vocabVault.length) {
      vocabVault.forEach((chapter) => {
        chapters.push(chapter.chp);
      });
    }
    return chapters;
  },

  getPrevVocab() {
    // exec only when the csv file is loaded
    if (vocabVault.length) {
      // when reached the start of chpVault
      if (curVocabIndex === 0) {
        curChpIndex--;
        curVocabIndex = vocabVault[curChpIndex].chpVault.length - 1;
      } else {
        curVocabIndex--;
      }
    }

    let curChp = vocabVault.length ? vocabVault[curChpIndex].chp : "untitled";
    let curVocab = vocabVault.length
      ? vocabVault[curChpIndex].chpVault[curVocabIndex]
      : "untitled";

    console.log(`curChp[${curChpIndex}]`, vocabVault[curChpIndex].chp);
    console.log(
      `curVocab[${curChpIndex}][${curVocabIndex}]`,
      vocabVault[curChpIndex].chpVault[curVocabIndex]
    );

    return { curChp, curChpIndex, curVocab };
  },

  getNextVocab() {
    // exec only when the csv file is loaded
    if (vocabVault.length) {
      // when reached the end of chpVault
      if (curVocabIndex === vocabVault[curChpIndex].chpVault.length - 1) {
        curChpIndex++;
        curVocabIndex = 0;
      } else {
        curVocabIndex++;
      }
    }

    let curChp = vocabVault.length ? vocabVault[curChpIndex].chp : "untitled";
    let curVocab = vocabVault.length
      ? vocabVault[curChpIndex].chpVault[curVocabIndex]
      : "untitled";

    console.log(`curChp[${curChpIndex}]`, vocabVault[curChpIndex].chp);
    console.log(
      `curVocab[${curChpIndex}][${curVocabIndex}]`,
      vocabVault[curChpIndex].chpVault[curVocabIndex]
    );

    return { curChp, curChpIndex, curVocab };
  },

  createVocabVault(data) {
    curChpIndex = 0;
    curVocabIndex = 0;

    vocabs = data;

    let chpVault = [];
    let chpTitle;

    for (const vocab of vocabs) {
      const chp = vocab?.原文 ?? null;
      const newWord = vocab.生词;
      const def = vocab.解释;
      const notes = vocab?.备注 ?? null;

      // the start of a new chpVault
      if (chp !== null) {
        // as long as there's any vocab in any vault
        if (vocabVault.length || chpVault.length) {
          const { seq, title } = splitter(chpTitle);
          vocabVault.push({ chp: { seq, title }, chpVault });
          chpVault = [];
        }
        chpTitle = chp;
      }

      // inside of a chpVault
      chpVault.push({ newWord, def, notes });
    }

    // push the final chpVault
    const { seq, title } = splitter(chpTitle);
    vocabVault.push({ chp: { seq, title }, chpVault });

    console.log("vocab vault length:", vocabVault.length);

    return vocabVault;
  },
};

function splitter(chp) {
  const regexSeq = /(TPO \d+-\d+)/;
  const seq = chp.match(regexSeq)[0];
  const title = chp.split(seq)[1].replace(/[\r\n]/g, "");

  return { seq: seq.trim(), title: title.trim() };
}
