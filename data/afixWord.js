const fs = require('fs');
const versions = [
     {
          "ar": "AKJ",
          "id": 1,
          "rdl": 0,
          "t": "American King James Version"
     },
     {
          "ar": "ASV",
          "id": 2,
          "rdl": 0,
          "t": "American Standard Version"
     },
     {
          "ar": "AKV",
          "id": 3,
          "rdl": 0,
          "t": "Authorized King James Version"
     },
     {
          "ar": "BSB",
          "id": 4,
          "rdl": 0,
          "t": "Berean Standard Bible"
     },
     {
          "ar": "DRB",
          "id": 5,
          "rdl": 0,
          "t": "Douay-Rheims Bible"
     },
     {
          "ar": "ERV",
          "id": 6,
          "rdl": 0,
          "t": "English Revised Version"
     },
     {
          "ar": "KJV",
          "id": 7,
          "rdl": 0,
          "t": "King James Version"
     },
     {
          "ar": "SLT",
          "id": 8,
          "rdl": 0,
          "t": "Smith's Literal Translation"
     },
     {
          "ar": "TWF",
          "id": 9,
          "rdl": 1,
          "t": "Twenty-First Century Version"
     }
];
const idx = versions.findIndex(rec => rec.ar === 'TWF');
const abr = versions[idx].ar;

const referencePath = './data/ZMETA/VRef.json';
const versePath = `data\\${abr}\\${abr}Verses.json`;
const wordPath = './data/ZMETA/DWord.json';

let verseData = fs.readFileSync(versePath, 'utf8');
let wordFile = fs.readFileSync(wordPath, 'utf8');
let referenceFile = fs.readFileSync(referencePath, 'utf8');

//deleteAllBrackets();  1
//setReference();  2
//setDictionary();  3
//minifyJson();  4
run(4);

function setDictionary() {

     const letter = 'd';
     const regex = new RegExp(`\\[${letter}\\d+\\]`, 'g');
     verseData = verseData.replace(regex, '');
     const jsonData = JSON.parse(wordFile);
     for (const item of jsonData) {
          const targetWord = item.Word;
          // Matches the base word only if it is NOT followed by an apostrophe and a suffix
          const regex = new RegExp(`(?<![\\w-])BaseWord(?!'[a-zA-ZÀ-ÿ])(?![\\w-])`.replace('BaseWord', targetWord), 'gi');
          verseData = verseData.replace(regex, (match) => `${match}[${letter}${item.WordID}]`);
     };

     const records = JSON.parse(verseData);
     // Map to track seen asterisk words for each unique combination of bid, cn, and vn
     const groupAsteriskWords = new Map();

     records.forEach(record => {
          // Create a composite key for the matching criteria
          const groupKey = `${record.bid}-${record.cn}`;

          // Initialize a tracking Set for this group if it doesn't exist
          if (!groupAsteriskWords.has(groupKey)) {
               groupAsteriskWords.set(groupKey, new Set());
          };

          const seenWords = groupAsteriskWords.get(groupKey);

          const regex = new RegExp(`\\b([a-zA-ZÀ-ÿ]+)\\[([${letter}\\d]*${letter}[${letter}\\d]*)\\]([^\\w\\s]*)`, 'g');

          record.vt = record.vt.replace(regex, (match, word, bracketContent, punctuation) => {
               const lowerWord = word.toLowerCase();
               if (seenWords.has(lowerWord)) {
                    return word + punctuation;
               } else {
                    seenWords.add(lowerWord);
                    return match;
               };
          });
     });
     fs.writeFileSync(versePath, JSON.stringify(records, null, 2), 'utf8');
     console.log('Dictionary complete!');
};

function setReference() {

     const letter = 'r';
     const regex = new RegExp(`\\[${letter}\\d+\\]`, 'g');
     verseData = verseData.replace(regex, '');

     const jsonData = JSON.parse(referenceFile);
     const records = JSON.parse(verseData);
     for (const item of jsonData) {

          let i = records.findIndex(rec => rec.vid === item.vid);
          const record = records[i].vt;

          /*if (abr === 'TWF') {
               const targetWord = item.pwd;
               //Matches the base word only if it is NOT followed by an apostrophe and a suffix
               const regex = new RegExp(`(?<![\\w-])BaseWord(?!'[a-zA-ZÀ-ÿ])(?![\\w-])`.replace('BaseWord', targetWord), 'gi');
               records[i].vt = record.replace(regex, (match) => `${match}[${letter}${item.rid}]`);
          } else { records[i].vt = `${record}[${letter}${item.rid}]`; };*/

          records[i].vt = `${record}[${letter}${item.rid}]`;

     };
     fs.writeFileSync(versePath, JSON.stringify(records, null, 2), 'utf8');
     console.log('Reference complete!');
};

function deleteAllBrackets() {

     //This deletes any letter prefix
     const regex = /\[[a-zA-ZÀ-ÿ]+\d+\]/g;
     verseData = verseData.replace(regex, '');
     fs.writeFileSync(versePath, verseData, 'utf8');
     console.log('Brackets Deleted!');
};

function minifyJson() {

     let jsonData = JSON.parse(verseData);
     var minFilePath = `data\\${abr}\\${abr}Verses.min.json`;
     fs.writeFileSync(minFilePath, JSON.stringify(jsonData));

     const definitionPath = './data/ZMETA/Def.json';
     const definitionMinPath = './data/ZMETA/Def.min.json';
     let definitionData = fs.readFileSync(definitionPath, 'utf8');
     jsonData = JSON.parse(definitionData);
     fs.writeFileSync(definitionMinPath, JSON.stringify(jsonData));

     const referencePath = './data/ZMETA/Ref.json';
     const referenceMinPath = './data/ZMETA/Ref.min.json';
     let referenceData = fs.readFileSync(referencePath, 'utf8');
     jsonData = JSON.parse(referenceData);
     fs.writeFileSync(referenceMinPath, JSON.stringify(jsonData));

     console.log('Files Minified!');
};

function run(func) {

     switch(func) {
          case 1:
               deleteAllBrackets();
               break;
          case 2:
               setReference();
               break;
          case 3:
               setDictionary();
               break;
          case 4:
               minifyJson();
               break;
     };
}

console.log('Finished and complete!');