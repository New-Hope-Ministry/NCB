// Fix minified text
// :abcdefghijklmnopqrstuvwxyz
// :ABCDEFGHIJKLMNOPQRSTUVWXYZ
// [\u200B\u200C\u200D\u200E\u200F\uFEFF\u2028\u2029]

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
const fileName = `data\\${abr}\\${abr}Verses.json`;
const data = fs.readFileSync(fileName, 'utf8');
const jsonData = JSON.parse(data);
var i =0;

while (i < 3) {
     for (const item of jsonData) {
     item.vt = item.vt.replaceAll(":a", ': a');
     item.vt = item.vt.replaceAll(":b", ': b');
     item.vt = item.vt.replaceAll(":c", ': c');
     item.vt = item.vt.replaceAll(":d", ': d');
     item.vt = item.vt.replaceAll(":e", ': e');
     item.vt = item.vt.replaceAll(":f", ': f');
     item.vt = item.vt.replaceAll(":g", ': g');
     item.vt = item.vt.replaceAll(":h", ': h');
     item.vt = item.vt.replaceAll(":i", ': i');
     item.vt = item.vt.replaceAll(":j", ': j');
     item.vt = item.vt.replaceAll(":k", ': k');
     item.vt = item.vt.replaceAll(":l", ': l');
     item.vt = item.vt.replaceAll(":m", ': m');
     item.vt = item.vt.replaceAll(":n", ': n');
     item.vt = item.vt.replaceAll(":o", ': o');
     item.vt = item.vt.replaceAll(":p", ': p');
     item.vt = item.vt.replaceAll(":q", ': q');
     item.vt = item.vt.replaceAll(":r", ': r');
     item.vt = item.vt.replaceAll(":s", ': s');
     item.vt = item.vt.replaceAll(":t", ': t');
     item.vt = item.vt.replaceAll(":u", ': u');
     item.vt = item.vt.replaceAll(":v", ': v');
     item.vt = item.vt.replaceAll(":w", ': w');
     item.vt = item.vt.replaceAll(":x", ': x');
     item.vt = item.vt.replaceAll(":y", ': y');
     item.vt = item.vt.replaceAll(":z", ': z');
     item.vt = item.vt.replaceAll(":A", ': A');
     item.vt = item.vt.replaceAll(":B", ': B');
     item.vt = item.vt.replaceAll(":C", ': C');
     item.vt = item.vt.replaceAll(":D", ': D');
     item.vt = item.vt.replaceAll(":E", ': E');
     item.vt = item.vt.replaceAll(":F", ': F');
     item.vt = item.vt.replaceAll(":G", ': G');
     item.vt = item.vt.replaceAll(":H", ': H');
     item.vt = item.vt.replaceAll(":I", ': I');
     item.vt = item.vt.replaceAll(":J", ': J');
     item.vt = item.vt.replaceAll(":K", ': K');
     item.vt = item.vt.replaceAll(":L", ': L');
     item.vt = item.vt.replaceAll(":M", ': M');
     item.vt = item.vt.replaceAll(":N", ': N');
     item.vt = item.vt.replaceAll(":O", ': O');
     item.vt = item.vt.replaceAll(":P", ': P');
     item.vt = item.vt.replaceAll(":Q", ': Q');
     item.vt = item.vt.replaceAll(":R", ': R');
     item.vt = item.vt.replaceAll(":S", ': S');
     item.vt = item.vt.replaceAll(":T", ': T');
     item.vt = item.vt.replaceAll(":U", ': U');
     item.vt = item.vt.replaceAll(":V", ': V');
     item.vt = item.vt.replaceAll(":W", ': W');
     item.vt = item.vt.replaceAll(":X", ': X');
     item.vt = item.vt.replaceAll(":Y", ': Y');
     item.vt = item.vt.replaceAll(":Z", ': Z');

     // Semicolon
          item.vt = item.vt.replaceAll(";\"a", ";\" a");
     item.vt = item.vt.replaceAll(";\"b", ";\" b");
     item.vt = item.vt.replaceAll(";\"c", ";\" c");
     item.vt = item.vt.replaceAll(";\"d", ";\" d");
     item.vt = item.vt.replaceAll(";\"e", ";\" e");
     item.vt = item.vt.replaceAll(";\"f", ";\" f");
     item.vt = item.vt.replaceAll(";\"g", ";\" g");
     item.vt = item.vt.replaceAll(";\"h", ";\" h");
     item.vt = item.vt.replaceAll(";\"i", ";\" i");
     item.vt = item.vt.replaceAll(";\"j", ";\" j");
     item.vt = item.vt.replaceAll(";\"k", ";\" k");
     item.vt = item.vt.replaceAll(";\"l", ";\" l");
     item.vt = item.vt.replaceAll(";\"m", ";\" m");
     item.vt = item.vt.replaceAll(";\"n", ";\" n");
     item.vt = item.vt.replaceAll(";\"o", ";\" o");
     item.vt = item.vt.replaceAll(";\"p", ";\" p");
     item.vt = item.vt.replaceAll(";\"q", ";\" q");
     item.vt = item.vt.replaceAll(";\"r", ";\" r");
     item.vt = item.vt.replaceAll(";\"s", ";\" s");
     item.vt = item.vt.replaceAll(";\"t", ";\" t");
     item.vt = item.vt.replaceAll(";\"u", ";\" u");
     item.vt = item.vt.replaceAll(";\"v", ";\" v");
     item.vt = item.vt.replaceAll(";\"w", ";\" w");
     item.vt = item.vt.replaceAll(";\"x", ";\" x");
     item.vt = item.vt.replaceAll(";\"y", ";\" y");
     item.vt = item.vt.replaceAll(";\"z", ";\" z");
     item.vt = item.vt.replaceAll(";\"A", ";\" A");
     item.vt = item.vt.replaceAll(";\"B", ";\" B");
     item.vt = item.vt.replaceAll(";\"C", ";\" C");
     item.vt = item.vt.replaceAll(";\"D", ";\" D");
     item.vt = item.vt.replaceAll(";\"E", ";\" E");
     item.vt = item.vt.replaceAll(";\"F", ";\" F");
     item.vt = item.vt.replaceAll(";\"G", ";\" G");
     item.vt = item.vt.replaceAll(";\"H", ";\" H");
     item.vt = item.vt.replaceAll(";\"I", ";\" I");
     item.vt = item.vt.replaceAll(";\"J", ";\" J");
     item.vt = item.vt.replaceAll(";\"K", ";\" K");
     item.vt = item.vt.replaceAll(";\"L", ";\" L");
     item.vt = item.vt.replaceAll(";\"M", ";\" M");
     item.vt = item.vt.replaceAll(";\"N", ";\" N");
     item.vt = item.vt.replaceAll(";\"O", ";\" O");
     item.vt = item.vt.replaceAll(";\"P", ";\" P");
     item.vt = item.vt.replaceAll(";\"Q", ";\" Q");
     item.vt = item.vt.replaceAll(";\"R", ";\" R");
     item.vt = item.vt.replaceAll(";\"S", ";\" S");
     item.vt = item.vt.replaceAll(";\"T", ";\" T");
     item.vt = item.vt.replaceAll(";\"U", ";\" U");
     item.vt = item.vt.replaceAll(";\"V", ";\" V");
     item.vt = item.vt.replaceAll(";\"W", ";\" W");
     item.vt = item.vt.replaceAll(";\"X", ";\" X");
     item.vt = item.vt.replaceAll(";\"Y", ";\" Y");
     item.vt = item.vt.replaceAll(";\"Z", ";\" Z");
     // End: Semicolon

     item.vt = item.vt.replaceAll(",\"a", ",\" a");
     item.vt = item.vt.replaceAll(",\"b", ",\" b");
     item.vt = item.vt.replaceAll(",\"c", ",\" c");
     item.vt = item.vt.replaceAll(",\"d", ",\" d");
     item.vt = item.vt.replaceAll(",\"e", ",\" e");
     item.vt = item.vt.replaceAll(",\"f", ",\" f");
     item.vt = item.vt.replaceAll(",\"g", ",\" g");
     item.vt = item.vt.replaceAll(",\"h", ",\" h");
     item.vt = item.vt.replaceAll(",\"i", ",\" i");
     item.vt = item.vt.replaceAll(",\"j", ",\" j");
     item.vt = item.vt.replaceAll(",\"k", ",\" k");
     item.vt = item.vt.replaceAll(",\"l", ",\" l");
     item.vt = item.vt.replaceAll(",\"m", ",\" m");
     item.vt = item.vt.replaceAll(",\"n", ",\" n");
     item.vt = item.vt.replaceAll(",\"o", ",\" o");
     item.vt = item.vt.replaceAll(",\"p", ",\" p");
     item.vt = item.vt.replaceAll(",\"q", ",\" q");
     item.vt = item.vt.replaceAll(",\"r", ",\" r");
     item.vt = item.vt.replaceAll(",\"s", ",\" s");
     item.vt = item.vt.replaceAll(",\"t", ",\" t");
     item.vt = item.vt.replaceAll(",\"u", ",\" u");
     item.vt = item.vt.replaceAll(",\"v", ",\" v");
     item.vt = item.vt.replaceAll(",\"w", ",\" w");
     item.vt = item.vt.replaceAll(",\"x", ",\" x");
     item.vt = item.vt.replaceAll(",\"y", ",\" y");
     item.vt = item.vt.replaceAll(",\"z", ",\" z");
     item.vt = item.vt.replaceAll(",\"A", ",\" A");
     item.vt = item.vt.replaceAll(",\"B", ",\" B");
     item.vt = item.vt.replaceAll(",\"C", ",\" C");
     item.vt = item.vt.replaceAll(",\"D", ",\" D");
     item.vt = item.vt.replaceAll(",\"E", ",\" E");
     item.vt = item.vt.replaceAll(",\"F", ",\" F");
     item.vt = item.vt.replaceAll(",\"G", ",\" G");
     item.vt = item.vt.replaceAll(",\"H", ",\" H");
     item.vt = item.vt.replaceAll(",\"I", ",\" I");
     item.vt = item.vt.replaceAll(",\"J", ",\" J");
     item.vt = item.vt.replaceAll(",\"K", ",\" K");
     item.vt = item.vt.replaceAll(",\"L", ",\" L");
     item.vt = item.vt.replaceAll(",\"M", ",\" M");
     item.vt = item.vt.replaceAll(",\"N", ",\" N");
     item.vt = item.vt.replaceAll(",\"O", ",\" O");
     item.vt = item.vt.replaceAll(",\"P", ",\" P");
     item.vt = item.vt.replaceAll(",\"Q", ",\" Q");
     item.vt = item.vt.replaceAll(",\"R", ",\" R");
     item.vt = item.vt.replaceAll(",\"S", ",\" S");
     item.vt = item.vt.replaceAll(",\"T", ",\" T");
     item.vt = item.vt.replaceAll(",\"U", ",\" U");
     item.vt = item.vt.replaceAll(",\"V", ",\" V");
     item.vt = item.vt.replaceAll(",\"W", ",\" W");
     item.vt = item.vt.replaceAll(",\"X", ",\" X");
     item.vt = item.vt.replaceAll(",\"Y", ",\" Y");
     item.vt = item.vt.replaceAll(",\"Z", ",\" Z");

     item.vt = item.vt.replaceAll(".\"a", ".\" a");
     item.vt = item.vt.replaceAll(".\"b", ".\" b");
     item.vt = item.vt.replaceAll(".\"c", ".\" c");
     item.vt = item.vt.replaceAll(".\"d", ".\" d");
     item.vt = item.vt.replaceAll(".\"e", ".\" e");
     item.vt = item.vt.replaceAll(".\"f", ".\" f");
     item.vt = item.vt.replaceAll(".\"g", ".\" g");
     item.vt = item.vt.replaceAll(".\"h", ".\" h");
     item.vt = item.vt.replaceAll(".\"i", ".\" i");
     item.vt = item.vt.replaceAll(".\"j", ".\" j");
     item.vt = item.vt.replaceAll(".\"k", ".\" k");
     item.vt = item.vt.replaceAll(".\"l", ".\" l");
     item.vt = item.vt.replaceAll(".\"m", ".\" m");
     item.vt = item.vt.replaceAll(".\"n", ".\" n");
     item.vt = item.vt.replaceAll(".\"o", ".\" o");
     item.vt = item.vt.replaceAll(".\"p", ".\" p");
     item.vt = item.vt.replaceAll(".\"q", ".\" q");
     item.vt = item.vt.replaceAll(".\"r", ".\" r");
     item.vt = item.vt.replaceAll(".\"s", ".\" s");
     item.vt = item.vt.replaceAll(".\"t", ".\" t");
     item.vt = item.vt.replaceAll(".\"u", ".\" u");
     item.vt = item.vt.replaceAll(".\"v", ".\" v");
     item.vt = item.vt.replaceAll(".\"w", ".\" w");
     item.vt = item.vt.replaceAll(".\"x", ".\" x");
     item.vt = item.vt.replaceAll(".\"y", ".\" y");
     item.vt = item.vt.replaceAll(".\"z", ".\" z");
     item.vt = item.vt.replaceAll(".\"A", ".\" A");
     item.vt = item.vt.replaceAll(".\"B", ".\" B");
     item.vt = item.vt.replaceAll(".\"C", ".\" C");
     item.vt = item.vt.replaceAll(".\"D", ".\" D");
     item.vt = item.vt.replaceAll(".\"E", ".\" E");
     item.vt = item.vt.replaceAll(".\"F", ".\" F");
     item.vt = item.vt.replaceAll(".\"G", ".\" G");
     item.vt = item.vt.replaceAll(".\"H", ".\" H");
     item.vt = item.vt.replaceAll(".\"I", ".\" I");
     item.vt = item.vt.replaceAll(".\"J", ".\" J");
     item.vt = item.vt.replaceAll(".\"K", ".\" K");
     item.vt = item.vt.replaceAll(".\"L", ".\" L");
     item.vt = item.vt.replaceAll(".\"M", ".\" M");
     item.vt = item.vt.replaceAll(".\"N", ".\" N");
     item.vt = item.vt.replaceAll(".\"O", ".\" O");
     item.vt = item.vt.replaceAll(".\"P", ".\" P");
     item.vt = item.vt.replaceAll(".\"Q", ".\" Q");
     item.vt = item.vt.replaceAll(".\"R", ".\" R");
     item.vt = item.vt.replaceAll(".\"S", ".\" S");
     item.vt = item.vt.replaceAll(".\"T", ".\" T");
     item.vt = item.vt.replaceAll(".\"U", ".\" U");
     item.vt = item.vt.replaceAll(".\"V", ".\" V");
     item.vt = item.vt.replaceAll(".\"W", ".\" W");
     item.vt = item.vt.replaceAll(".\"X", ".\" X");
     item.vt = item.vt.replaceAll(".\"Y", ".\" Y");
     item.vt = item.vt.replaceAll(".\"Z", ".\" Z");

     item.vt = item.vt.replaceAll("?\"a", "?\" a");
     item.vt = item.vt.replaceAll("?\"b", "?\" b");
     item.vt = item.vt.replaceAll("?\"c", "?\" c");
     item.vt = item.vt.replaceAll("?\"d", "?\" d");
     item.vt = item.vt.replaceAll("?\"e", "?\" e");
     item.vt = item.vt.replaceAll("?\"f", "?\" f");
     item.vt = item.vt.replaceAll("?\"g", "?\" g");
     item.vt = item.vt.replaceAll("?\"h", "?\" h");
     item.vt = item.vt.replaceAll("?\"i", "?\" i");
     item.vt = item.vt.replaceAll("?\"j", "?\" j");
     item.vt = item.vt.replaceAll("?\"k", "?\" k");
     item.vt = item.vt.replaceAll("?\"l", "?\" l");
     item.vt = item.vt.replaceAll("?\"m", "?\" m");
     item.vt = item.vt.replaceAll("?\"n", "?\" n");
     item.vt = item.vt.replaceAll("?\"o", "?\" o");
     item.vt = item.vt.replaceAll("?\"p", "?\" p");
     item.vt = item.vt.replaceAll("?\"q", "?\" q");
     item.vt = item.vt.replaceAll("?\"r", "?\" r");
     item.vt = item.vt.replaceAll("?\"s", "?\" s");
     item.vt = item.vt.replaceAll("?\"t", "?\" t");
     item.vt = item.vt.replaceAll("?\"u", "?\" u");
     item.vt = item.vt.replaceAll("?\"v", "?\" v");
     item.vt = item.vt.replaceAll("?\"w", "?\" w");
     item.vt = item.vt.replaceAll("?\"x", "?\" x");
     item.vt = item.vt.replaceAll("?\"y", "?\" y");
     item.vt = item.vt.replaceAll("?\"z", "?\" z");
     item.vt = item.vt.replaceAll("?\"A", "?\" A");
     item.vt = item.vt.replaceAll("?\"B", "?\" B");
     item.vt = item.vt.replaceAll("?\"C", "?\" C");
     item.vt = item.vt.replaceAll("?\"D", "?\" D");
     item.vt = item.vt.replaceAll("?\"E", "?\" E");
     item.vt = item.vt.replaceAll("?\"F", "?\" F");
     item.vt = item.vt.replaceAll("?\"G", "?\" G");
     item.vt = item.vt.replaceAll("?\"H", "?\" H");
     item.vt = item.vt.replaceAll("?\"I", "?\" I");
     item.vt = item.vt.replaceAll("?\"J", "?\" J");
     item.vt = item.vt.replaceAll("?\"K", "?\" K");
     item.vt = item.vt.replaceAll("?\"L", "?\" L");
     item.vt = item.vt.replaceAll("?\"M", "?\" M");
     item.vt = item.vt.replaceAll("?\"N", "?\" N");
     item.vt = item.vt.replaceAll("?\"O", "?\" O");
     item.vt = item.vt.replaceAll("?\"P", "?\" P");
     item.vt = item.vt.replaceAll("?\"Q", "?\" Q");
     item.vt = item.vt.replaceAll("?\"R", "?\" R");
     item.vt = item.vt.replaceAll("?\"S", "?\" S");
     item.vt = item.vt.replaceAll("?\"T", "?\" T");
     item.vt = item.vt.replaceAll("?\"U", "?\" U");
     item.vt = item.vt.replaceAll("?\"V", "?\" V");
     item.vt = item.vt.replaceAll("?\"W", "?\" W");
     item.vt = item.vt.replaceAll("?\"X", "?\" X");
     item.vt = item.vt.replaceAll("?\"Y", "?\" Y");
     item.vt = item.vt.replaceAll("?\"Z", "?\" Z");

     item.vt = item.vt.replaceAll("!\"a", "!\" a");
     item.vt = item.vt.replaceAll("!\"b", "!\" b");
     item.vt = item.vt.replaceAll("!\"c", "!\" c");
     item.vt = item.vt.replaceAll("!\"d", "!\" d");
     item.vt = item.vt.replaceAll("!\"e", "!\" e");
     item.vt = item.vt.replaceAll("!\"f", "!\" f");
     item.vt = item.vt.replaceAll("!\"g", "!\" g");
     item.vt = item.vt.replaceAll("!\"h", "!\" h");
     item.vt = item.vt.replaceAll("!\"i", "!\" i");
     item.vt = item.vt.replaceAll("!\"j", "!\" j");
     item.vt = item.vt.replaceAll("!\"k", "!\" k");
     item.vt = item.vt.replaceAll("!\"l", "!\" l");
     item.vt = item.vt.replaceAll("!\"m", "!\" m");
     item.vt = item.vt.replaceAll("!\"n", "!\" n");
     item.vt = item.vt.replaceAll("!\"o", "!\" o");
     item.vt = item.vt.replaceAll("!\"p", "!\" p");
     item.vt = item.vt.replaceAll("!\"q", "!\" q");
     item.vt = item.vt.replaceAll("!\"r", "!\" r");
     item.vt = item.vt.replaceAll("!\"s", "!\" s");
     item.vt = item.vt.replaceAll("!\"t", "!\" t");
     item.vt = item.vt.replaceAll("!\"u", "!\" u");
     item.vt = item.vt.replaceAll("!\"v", "!\" v");
     item.vt = item.vt.replaceAll("!\"w", "!\" w");
     item.vt = item.vt.replaceAll("!\"x", "!\" x");
     item.vt = item.vt.replaceAll("!\"y", "!\" y");
     item.vt = item.vt.replaceAll("!\"z", "!\" z");
     item.vt = item.vt.replaceAll("!\"A", "!\" A");
     item.vt = item.vt.replaceAll("!\"B", "!\" B");
     item.vt = item.vt.replaceAll("!\"C", "!\" C");
     item.vt = item.vt.replaceAll("!\"D", "!\" D");
     item.vt = item.vt.replaceAll("!\"E", "!\" E");
     item.vt = item.vt.replaceAll("!\"F", "!\" F");
     item.vt = item.vt.replaceAll("!\"G", "!\" G");
     item.vt = item.vt.replaceAll("!\"H", "!\" H");
     item.vt = item.vt.replaceAll("!\"I", "!\" I");
     item.vt = item.vt.replaceAll("!\"J", "!\" J");
     item.vt = item.vt.replaceAll("!\"K", "!\" K");
     item.vt = item.vt.replaceAll("!\"L", "!\" L");
     item.vt = item.vt.replaceAll("!\"M", "!\" M");
     item.vt = item.vt.replaceAll("!\"N", "!\" N");
     item.vt = item.vt.replaceAll("!\"O", "!\" O");
     item.vt = item.vt.replaceAll("!\"P", "!\" P");
     item.vt = item.vt.replaceAll("!\"Q", "!\" Q");
     item.vt = item.vt.replaceAll("!\"R", "!\" R");
     item.vt = item.vt.replaceAll("!\"S", "!\" S");
     item.vt = item.vt.replaceAll("!\"T", "!\" T");
     item.vt = item.vt.replaceAll("!\"U", "!\" U");
     item.vt = item.vt.replaceAll("!\"V", "!\" V");
     item.vt = item.vt.replaceAll("!\"W", "!\" W");
     item.vt = item.vt.replaceAll("!\"X", "!\" X");
     item.vt = item.vt.replaceAll("!\"Y", "!\" Y");
     item.vt = item.vt.replaceAll("!\"Z", "!\" Z");



     item.vt = item.vt.replaceAll(",´\"a", ",´\" a");
     item.vt = item.vt.replaceAll(",´\"b", ",´\" b");
     item.vt = item.vt.replaceAll(",´\"c", ",´\" c");
     item.vt = item.vt.replaceAll(",´\"d", ",´\" d");
     item.vt = item.vt.replaceAll(",´\"e", ",´\" e");
     item.vt = item.vt.replaceAll(",´\"f", ",´\" f");
     item.vt = item.vt.replaceAll(",´\"g", ",´\" g");
     item.vt = item.vt.replaceAll(",´\"h", ",´\" h");
     item.vt = item.vt.replaceAll(",´\"i", ",´\" i");
     item.vt = item.vt.replaceAll(",´\"j", ",´\" j");
     item.vt = item.vt.replaceAll(",´\"k", ",´\" k");
     item.vt = item.vt.replaceAll(",´\"l", ",´\" l");
     item.vt = item.vt.replaceAll(",´\"m", ",´\" m");
     item.vt = item.vt.replaceAll(",´\"n", ",´\" n");
     item.vt = item.vt.replaceAll(",´\"o", ",´\" o");
     item.vt = item.vt.replaceAll(",´\"p", ",´\" p");
     item.vt = item.vt.replaceAll(",´\"q", ",´\" q");
     item.vt = item.vt.replaceAll(",´\"r", ",´\" r");
     item.vt = item.vt.replaceAll(",´\"s", ",´\" s");
     item.vt = item.vt.replaceAll(",´\"t", ",´\" t");
     item.vt = item.vt.replaceAll(",´\"u", ",´\" u");
     item.vt = item.vt.replaceAll(",´\"v", ",´\" v");
     item.vt = item.vt.replaceAll(",´\"w", ",´\" w");
     item.vt = item.vt.replaceAll(",´\"x", ",´\" x");
     item.vt = item.vt.replaceAll(",´\"y", ",´\" y");
     item.vt = item.vt.replaceAll(",´\"z", ",´\" z");


     item.vt = item.vt.replaceAll("´\"a", "´\" a");
     item.vt = item.vt.replaceAll("´\"b", "´\" b");
     item.vt = item.vt.replaceAll("´\"c", "´\" c");
     item.vt = item.vt.replaceAll("´\"d", "´\" d");
     item.vt = item.vt.replaceAll("´\"e", "´\" e");
     item.vt = item.vt.replaceAll("´\"f", "´\" f");
     item.vt = item.vt.replaceAll("´\"g", "´\" g");
     item.vt = item.vt.replaceAll("´\"h", "´\" h");
     item.vt = item.vt.replaceAll("´\"i", "´\" i");
     item.vt = item.vt.replaceAll("´\"j", "´\" j");
     item.vt = item.vt.replaceAll("´\"k", "´\" k");
     item.vt = item.vt.replaceAll("´\"l", "´\" l");
     item.vt = item.vt.replaceAll("´\"m", "´\" m");
     item.vt = item.vt.replaceAll("´\"n", "´\" n");
     item.vt = item.vt.replaceAll("´\"o", "´\" o");
     item.vt = item.vt.replaceAll("´\"p", "´\" p");
     item.vt = item.vt.replaceAll("´\"q", "´\" q");
     item.vt = item.vt.replaceAll("´\"r", "´\" r");
     item.vt = item.vt.replaceAll("´\"s", "´\" s");
     item.vt = item.vt.replaceAll("´\"t", "´\" t");
     item.vt = item.vt.replaceAll("´\"u", "´\" u");
     item.vt = item.vt.replaceAll("´\"v", "´\" v");
     item.vt = item.vt.replaceAll("´\"w", "´\" w");
     item.vt = item.vt.replaceAll("´\"x", "´\" x");
     item.vt = item.vt.replaceAll("´\"y", "´\" y");
     item.vt = item.vt.replaceAll("´\"z", "´\" z");

     item.vt = item.vt.replaceAll("´\"A", "´\" A");
     item.vt = item.vt.replaceAll("´\"B", "´\" B");
     item.vt = item.vt.replaceAll("´\"C", "´\" C");
     item.vt = item.vt.replaceAll("´\"D", "´\" D");
     item.vt = item.vt.replaceAll("´\"E", "´\" E");
     item.vt = item.vt.replaceAll("´\"F", "´\" F");
     item.vt = item.vt.replaceAll("´\"G", "´\" G");
     item.vt = item.vt.replaceAll("´\"H", "´\" H");
     item.vt = item.vt.replaceAll("´\"I", "´\" I");
     item.vt = item.vt.replaceAll("´\"J", "´\" J");
     item.vt = item.vt.replaceAll("´\"K", "´\" K");
     item.vt = item.vt.replaceAll("´\"L", "´\" L");
     item.vt = item.vt.replaceAll("´\"M", "´\" M");
     item.vt = item.vt.replaceAll("´\"N", "´\" N");
     item.vt = item.vt.replaceAll("´\"O", "´\" O");
     item.vt = item.vt.replaceAll("´\"P", "´\" P");
     item.vt = item.vt.replaceAll("´\"Q", "´\" Q");
     item.vt = item.vt.replaceAll("´\"R", "´\" R");
     item.vt = item.vt.replaceAll("´\"S", "´\" S");
     item.vt = item.vt.replaceAll("´\"T", "´\" T");
     item.vt = item.vt.replaceAll("´\"U", "´\" U");
     item.vt = item.vt.replaceAll("´\"V", "´\" V");
     item.vt = item.vt.replaceAll("´\"W", "´\" W");
     item.vt = item.vt.replaceAll("´\"X", "´\" X");
     item.vt = item.vt.replaceAll("´\"Y", "´\" Y");
     item.vt = item.vt.replaceAll("´\"Z", "´\" Z");

     item.vt = item.vt.replaceAll(":'", ": '");
     item.vt = item.vt.replaceAll(':"', ': "');
     item.vt = item.vt.replaceAll("\"\"", "\" \"");

     };
     try {
          fs.writeFileSync(fileName, JSON.stringify(jsonData));
          console.log(`${abr}: Data written to file!`);
     } catch (error) {
     console.log(`Write failed: ${fileName}`, error);
     };
     i++;
};
console.log(`Last ${abr}: Data written to file!`);