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
//const idx = 5; // TWF = 8
const idx = versions.findIndex(rec => rec.ar === 'TWF');
const abr= versions[idx].ar;

const versePath = `data\\${abr}\\${abr}Verses.json`;
const verseData = fs.readFileSync(versePath, 'utf8');


function minifyJson() {
     const jsonData = JSON.parse(verseData);
     var minFilePath = `data\\${abr}\\${abr}Verses.min.json`;
     fs.writeFileSync( minFilePath, JSON.stringify(jsonData));
};

minifyJson();

function test() {

     const path = './data/test.json';
     let aVerse;
     let i = 0
     while (i<12000) { aVerse += '/'; i++; };
     fs.writeFileSync(path, aVerse, 'utf8');
     console.log('finished')
};

//test();