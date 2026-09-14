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

const filePath = `data\\${abr}\\${abr}Verses.json`;
const fileWord = './data/ZMETA/DWord.json';
const fileReference = './data/ZMETA/VRef.json';

let fileContent = fs.readFileSync(filePath, 'utf8');
let wordFile = fs.readFileSync(fileWord, 'utf8');
let referenceFile = fs.readFileSync(fileReference, 'utf8');

function setDictionary() {

     const letter = 'd';
     const regex = new RegExp(`\\[${letter}\\d+\\]`, 'g');
     fileContent = fileContent.replace(regex, '');
     const jsonData = JSON.parse(wordFile);
     for (const item of jsonData) {
          const targetWord = item.Word;
          // Matches the base word only if it is NOT followed by an apostrophe and a suffix
          const regex = new RegExp(`(?<![\\w-])BaseWord(?!'[a-zA-ZÀ-ÿ])(?![\\w-])`.replace('BaseWord', targetWord), 'gi');
          fileContent = fileContent.replace(regex, (match) => `${match}[${letter}${item.WordID}]`);
     };

     const records = JSON.parse(fileContent);
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
     fs.writeFileSync(filePath, JSON.stringify(records, null, 2), 'utf8');
     console.log('Dictionary complete!');
};

function setReference() {

     const letter = 'r';
     const regex = new RegExp(`\\[${letter}\\d+\\]`, 'g');
     fileContent = fileContent.replace(regex, '');

     const jsonData = JSON.parse(referenceFile);
     const records = JSON.parse(fileContent);
     for (const item of jsonData) {

          let i = records.findIndex(rec => rec.vid === item.vid);
          const record = records[i].vt;
          const targetWord = item.pwd;
          // Matches the base word only if it is NOT followed by an apostrophe and a suffix
          const regex = new RegExp(`(?<![\\w-])BaseWord(?!'[a-zA-ZÀ-ÿ])(?![\\w-])`.replace('BaseWord', targetWord), 'gi');
          records[i].vt = record.replace(regex, (match) => `${match}[${letter}${item.rid}]`);
     };
     fs.writeFileSync(filePath, JSON.stringify(records, null, 2), 'utf8');
     console.log('Reference complete!');
};

function deleteAllBrackets() {

     //This deletes any letter prefix
     const regex = /\[[a-zA-ZÀ-ÿ]+\d+\]/g;
     fileContent = fileContent.replace(regex, '');
     fs.writeFileSync(filePath, fileContent, 'utf8');
};

//deleteAllBrackets();
//setDictionary();
setReference();
console.log('Finished and complete!');