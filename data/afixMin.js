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
        "ar": "DBY",
        "id": 5,
        "rdl": 0,
        "t": "Darby English Bible"
    },
    {
        "ar": "DRB",
        "id": 6,
        "rdl": 0,
        "t": "Douay-Rheims Bible"
    },
    {
        "ar": "ERV",
        "id": 7,
        "rdl": 0,
        "t": "English Revised Version"
    },
    {
        "ar": "KJV",
        "id": 8,
        "rdl": 0,
        "t": "King James Version"
    },
    {
        "ar": "NWB",
        "id": 9,
        "rdl": 0,
        "t": "Noah Webster's Bible"
    },
    {
        "ar": "SLT",
        "id": 10,
        "rdl": 0,
        "t": "Smith's Literal Translation"
    },
    {
        "ar": "TWF",
        "id": 11,
        "rdl": 1,
        "t": "Twenty-First Century Version"
    },
    {
        "ar": "YLT",
        "id": 12,
        "rdl": 0,
        "t": "Young's Literal Translation"
    }
];
//const idx =11; // TWF = 11
const idx = versions.findIndex(rec => rec.ar === 'TWF');
//const idx = 11;
const abr= versions[idx].ar;
const fileName = `data\\${abr}\\${abr}Verses.json`;
const data = fs.readFileSync(fileName, 'utf8');
const jsonData = JSON.parse(data);

for (const item of jsonData) {
    item.vt = item.vt.replace(":a", ': a');
    item.vt = item.vt.replace(":b", ': b');
    item.vt = item.vt.replace(":c", ': c');
    item.vt = item.vt.replace(":d", ': d');
    item.vt = item.vt.replace(":e", ': e');
    item.vt = item.vt.replace(":f", ': f');
    item.vt = item.vt.replace(":g", ': g');
    item.vt = item.vt.replace(":h", ': h');
    item.vt = item.vt.replace(":i", ': i');
    item.vt = item.vt.replace(":j", ': j');
    item.vt = item.vt.replace(":k", ': k');
    item.vt = item.vt.replace(":l", ': l');
    item.vt = item.vt.replace(":m", ': m');
    item.vt = item.vt.replace(":n", ': n');
    item.vt = item.vt.replace(":o", ': o');
    item.vt = item.vt.replace(":p", ': p');
    item.vt = item.vt.replace(":q", ': q');
    item.vt = item.vt.replace(":r", ': r');
    item.vt = item.vt.replace(":s", ': s');
    item.vt = item.vt.replace(":t", ': t');
    item.vt = item.vt.replace(":u", ': u');
    item.vt = item.vt.replace(":v", ': v');
    item.vt = item.vt.replace(":w", ': w');
    item.vt = item.vt.replace(":x", ': x');
    item.vt = item.vt.replace(":y", ': y');
    item.vt = item.vt.replace(":z", ': z');
    item.vt = item.vt.replace(":A", ': A');
    item.vt = item.vt.replace(":B", ': B');
    item.vt = item.vt.replace(":C", ': C');
    item.vt = item.vt.replace(":D", ': D');
    item.vt = item.vt.replace(":E", ': E');
    item.vt = item.vt.replace(":F", ': F');
    item.vt = item.vt.replace(":G", ': G');
    item.vt = item.vt.replace(":H", ': H');
    item.vt = item.vt.replace(":I", ': I');
    item.vt = item.vt.replace(":J", ': J');
    item.vt = item.vt.replace(":K", ': K');
    item.vt = item.vt.replace(":L", ': L');
    item.vt = item.vt.replace(":M", ': M');
    item.vt = item.vt.replace(":N", ': N');
    item.vt = item.vt.replace(":O", ': O');
    item.vt = item.vt.replace(":P", ': P');
    item.vt = item.vt.replace(":Q", ': Q');
    item.vt = item.vt.replace(":R", ': R');
    item.vt = item.vt.replace(":S", ': S');
    item.vt = item.vt.replace(":T", ': T');
    item.vt = item.vt.replace(":U", ': U');
    item.vt = item.vt.replace(":V", ': V');
    item.vt = item.vt.replace(":W", ': W');
    item.vt = item.vt.replace(":X", ': X');
    item.vt = item.vt.replace(":Y", ': Y');
    item.vt = item.vt.replace(":Z", ': Z');

    item.vt = item.vt.replace(",\"a", ",\" a");
    item.vt = item.vt.replace(",\"b", ",\" b");
    item.vt = item.vt.replace(",\"c", ",\" c");
    item.vt = item.vt.replace(",\"d", ",\" d");
    item.vt = item.vt.replace(",\"e", ",\" e");
    item.vt = item.vt.replace(",\"f", ",\" f");
    item.vt = item.vt.replace(",\"g", ",\" g");
    item.vt = item.vt.replace(",\"h", ",\" h");
    item.vt = item.vt.replace(",\"i", ",\" i");
    item.vt = item.vt.replace(",\"j", ",\" j");
    item.vt = item.vt.replace(",\"k", ",\" k");
    item.vt = item.vt.replace(",\"l", ",\" l");
    item.vt = item.vt.replace(",\"m", ",\" m");
    item.vt = item.vt.replace(",\"n", ",\" n");
    item.vt = item.vt.replace(",\"o", ",\" o");
    item.vt = item.vt.replace(",\"p", ",\" p");
    item.vt = item.vt.replace(",\"q", ",\" q");
    item.vt = item.vt.replace(",\"r", ",\" r");
    item.vt = item.vt.replace(",\"s", ",\" s");
    item.vt = item.vt.replace(",\"t", ",\" t");
    item.vt = item.vt.replace(",\"u", ",\" u");
    item.vt = item.vt.replace(",\"v", ",\" v");
    item.vt = item.vt.replace(",\"w", ",\" w");
    item.vt = item.vt.replace(",\"x", ",\" x");
    item.vt = item.vt.replace(",\"y", ",\" y");
    item.vt = item.vt.replace(",\"z", ",\" z");
    item.vt = item.vt.replace(",\"A", ",\" A");
    item.vt = item.vt.replace(",\"B", ",\" B");
    item.vt = item.vt.replace(",\"C", ",\" C");
    item.vt = item.vt.replace(",\"D", ",\" D");
    item.vt = item.vt.replace(",\"E", ",\" E");
    item.vt = item.vt.replace(",\"F", ",\" F");
    item.vt = item.vt.replace(",\"G", ",\" G");
    item.vt = item.vt.replace(",\"H", ",\" H");
    item.vt = item.vt.replace(",\"I", ",\" I");
    item.vt = item.vt.replace(",\"J", ",\" J");
    item.vt = item.vt.replace(",\"K", ",\" K");
    item.vt = item.vt.replace(",\"L", ",\" L");
    item.vt = item.vt.replace(",\"M", ",\" M");
    item.vt = item.vt.replace(",\"N", ",\" N");
    item.vt = item.vt.replace(",\"O", ",\" O");
    item.vt = item.vt.replace(",\"P", ",\" P");
    item.vt = item.vt.replace(",\"Q", ",\" Q");
    item.vt = item.vt.replace(",\"R", ",\" R");
    item.vt = item.vt.replace(",\"S", ",\" S");
    item.vt = item.vt.replace(",\"T", ",\" T");
    item.vt = item.vt.replace(",\"U", ",\" U");
    item.vt = item.vt.replace(",\"V", ",\" V");
    item.vt = item.vt.replace(",\"W", ",\" W");
    item.vt = item.vt.replace(",\"X", ",\" X");
    item.vt = item.vt.replace(",\"Y", ",\" Y");
    item.vt = item.vt.replace(",\"Z", ",\" Z");

    item.vt = item.vt.replace(".\"a", ".\" a");
    item.vt = item.vt.replace(".\"b", ".\" b");
    item.vt = item.vt.replace(".\"c", ".\" c");
    item.vt = item.vt.replace(".\"d", ".\" d");
    item.vt = item.vt.replace(".\"e", ".\" e");
    item.vt = item.vt.replace(".\"f", ".\" f");
    item.vt = item.vt.replace(".\"g", ".\" g");
    item.vt = item.vt.replace(".\"h", ".\" h");
    item.vt = item.vt.replace(".\"i", ".\" i");
    item.vt = item.vt.replace(".\"j", ".\" j");
    item.vt = item.vt.replace(".\"k", ".\" k");
    item.vt = item.vt.replace(".\"l", ".\" l");
    item.vt = item.vt.replace(".\"m", ".\" m");
    item.vt = item.vt.replace(".\"n", ".\" n");
    item.vt = item.vt.replace(".\"o", ".\" o");
    item.vt = item.vt.replace(".\"p", ".\" p");
    item.vt = item.vt.replace(".\"q", ".\" q");
    item.vt = item.vt.replace(".\"r", ".\" r");
    item.vt = item.vt.replace(".\"s", ".\" s");
    item.vt = item.vt.replace(".\"t", ".\" t");
    item.vt = item.vt.replace(".\"u", ".\" u");
    item.vt = item.vt.replace(".\"v", ".\" v");
    item.vt = item.vt.replace(".\"w", ".\" w");
    item.vt = item.vt.replace(".\"x", ".\" x");
    item.vt = item.vt.replace(".\"y", ".\" y");
    item.vt = item.vt.replace(".\"z", ".\" z");
    item.vt = item.vt.replace(".\"A", ".\" A");
    item.vt = item.vt.replace(".\"B", ".\" B");
    item.vt = item.vt.replace(".\"C", ".\" C");
    item.vt = item.vt.replace(".\"D", ".\" D");
    item.vt = item.vt.replace(".\"E", ".\" E");
    item.vt = item.vt.replace(".\"F", ".\" F");
    item.vt = item.vt.replace(".\"G", ".\" G");
    item.vt = item.vt.replace(".\"H", ".\" H");
    item.vt = item.vt.replace(".\"I", ".\" I");
    item.vt = item.vt.replace(".\"J", ".\" J");
    item.vt = item.vt.replace(".\"K", ".\" K");
    item.vt = item.vt.replace(".\"L", ".\" L");
    item.vt = item.vt.replace(".\"M", ".\" M");
    item.vt = item.vt.replace(".\"N", ".\" N");
    item.vt = item.vt.replace(".\"O", ".\" O");
    item.vt = item.vt.replace(".\"P", ".\" P");
    item.vt = item.vt.replace(".\"Q", ".\" Q");
    item.vt = item.vt.replace(".\"R", ".\" R");
    item.vt = item.vt.replace(".\"S", ".\" S");
    item.vt = item.vt.replace(".\"T", ".\" T");
    item.vt = item.vt.replace(".\"U", ".\" U");
    item.vt = item.vt.replace(".\"V", ".\" V");
    item.vt = item.vt.replace(".\"W", ".\" W");
    item.vt = item.vt.replace(".\"X", ".\" X");
    item.vt = item.vt.replace(".\"Y", ".\" Y");
    item.vt = item.vt.replace(".\"Z", ".\" Z");

    item.vt = item.vt.replace("?\"a", "?\" a");
    item.vt = item.vt.replace("?\"b", "?\" b");
    item.vt = item.vt.replace("?\"c", "?\" c");
    item.vt = item.vt.replace("?\"d", "?\" d");
    item.vt = item.vt.replace("?\"e", "?\" e");
    item.vt = item.vt.replace("?\"f", "?\" f");
    item.vt = item.vt.replace("?\"g", "?\" g");
    item.vt = item.vt.replace("?\"h", "?\" h");
    item.vt = item.vt.replace("?\"i", "?\" i");
    item.vt = item.vt.replace("?\"j", "?\" j");
    item.vt = item.vt.replace("?\"k", "?\" k");
    item.vt = item.vt.replace("?\"l", "?\" l");
    item.vt = item.vt.replace("?\"m", "?\" m");
    item.vt = item.vt.replace("?\"n", "?\" n");
    item.vt = item.vt.replace("?\"o", "?\" o");
    item.vt = item.vt.replace("?\"p", "?\" p");
    item.vt = item.vt.replace("?\"q", "?\" q");
    item.vt = item.vt.replace("?\"r", "?\" r");
    item.vt = item.vt.replace("?\"s", "?\" s");
    item.vt = item.vt.replace("?\"t", "?\" t");
    item.vt = item.vt.replace("?\"u", "?\" u");
    item.vt = item.vt.replace("?\"v", "?\" v");
    item.vt = item.vt.replace("?\"w", "?\" w");
    item.vt = item.vt.replace("?\"x", "?\" x");
    item.vt = item.vt.replace("?\"y", "?\" y");
    item.vt = item.vt.replace("?\"z", "?\" z");
    item.vt = item.vt.replace("?\"A", "?\" A");
    item.vt = item.vt.replace("?\"B", "?\" B");
    item.vt = item.vt.replace("?\"C", "?\" C");
    item.vt = item.vt.replace("?\"D", "?\" D");
    item.vt = item.vt.replace("?\"E", "?\" E");
    item.vt = item.vt.replace("?\"F", "?\" F");
    item.vt = item.vt.replace("?\"G", "?\" G");
    item.vt = item.vt.replace("?\"H", "?\" H");
    item.vt = item.vt.replace("?\"I", "?\" I");
    item.vt = item.vt.replace("?\"J", "?\" J");
    item.vt = item.vt.replace("?\"K", "?\" K");
    item.vt = item.vt.replace("?\"L", "?\" L");
    item.vt = item.vt.replace("?\"M", "?\" M");
    item.vt = item.vt.replace("?\"N", "?\" N");
    item.vt = item.vt.replace("?\"O", "?\" O");
    item.vt = item.vt.replace("?\"P", "?\" P");
    item.vt = item.vt.replace("?\"Q", "?\" Q");
    item.vt = item.vt.replace("?\"R", "?\" R");
    item.vt = item.vt.replace("?\"S", "?\" S");
    item.vt = item.vt.replace("?\"T", "?\" T");
    item.vt = item.vt.replace("?\"U", "?\" U");
    item.vt = item.vt.replace("?\"V", "?\" V");
    item.vt = item.vt.replace("?\"W", "?\" W");
    item.vt = item.vt.replace("?\"X", "?\" X");
    item.vt = item.vt.replace("?\"Y", "?\" Y");
    item.vt = item.vt.replace("?\"Z", "?\" Z");

    item.vt = item.vt.replace("!\"a", "!\" a");
    item.vt = item.vt.replace("!\"b", "!\" b");
    item.vt = item.vt.replace("!\"c", "!\" c");
    item.vt = item.vt.replace("!\"d", "!\" d");
    item.vt = item.vt.replace("!\"e", "!\" e");
    item.vt = item.vt.replace("!\"f", "!\" f");
    item.vt = item.vt.replace("!\"g", "!\" g");
    item.vt = item.vt.replace("!\"h", "!\" h");
    item.vt = item.vt.replace("!\"i", "!\" i");
    item.vt = item.vt.replace("!\"j", "!\" j");
    item.vt = item.vt.replace("!\"k", "!\" k");
    item.vt = item.vt.replace("!\"l", "!\" l");
    item.vt = item.vt.replace("!\"m", "!\" m");
    item.vt = item.vt.replace("!\"n", "!\" n");
    item.vt = item.vt.replace("!\"o", "!\" o");
    item.vt = item.vt.replace("!\"p", "!\" p");
    item.vt = item.vt.replace("!\"q", "!\" q");
    item.vt = item.vt.replace("!\"r", "!\" r");
    item.vt = item.vt.replace("!\"s", "!\" s");
    item.vt = item.vt.replace("!\"t", "!\" t");
    item.vt = item.vt.replace("!\"u", "!\" u");
    item.vt = item.vt.replace("!\"v", "!\" v");
    item.vt = item.vt.replace("!\"w", "!\" w");
    item.vt = item.vt.replace("!\"x", "!\" x");
    item.vt = item.vt.replace("!\"y", "!\" y");
    item.vt = item.vt.replace("!\"z", "!\" z");
    item.vt = item.vt.replace("!\"A", "!\" A");
    item.vt = item.vt.replace("!\"B", "!\" B");
    item.vt = item.vt.replace("!\"C", "!\" C");
    item.vt = item.vt.replace("!\"D", "!\" D");
    item.vt = item.vt.replace("!\"E", "!\" E");
    item.vt = item.vt.replace("!\"F", "!\" F");
    item.vt = item.vt.replace("!\"G", "!\" G");
    item.vt = item.vt.replace("!\"H", "!\" H");
    item.vt = item.vt.replace("!\"I", "!\" I");
    item.vt = item.vt.replace("!\"J", "!\" J");
    item.vt = item.vt.replace("!\"K", "!\" K");
    item.vt = item.vt.replace("!\"L", "!\" L");
    item.vt = item.vt.replace("!\"M", "!\" M");
    item.vt = item.vt.replace("!\"N", "!\" N");
    item.vt = item.vt.replace("!\"O", "!\" O");
    item.vt = item.vt.replace("!\"P", "!\" P");
    item.vt = item.vt.replace("!\"Q", "!\" Q");
    item.vt = item.vt.replace("!\"R", "!\" R");
    item.vt = item.vt.replace("!\"S", "!\" S");
    item.vt = item.vt.replace("!\"T", "!\" T");
    item.vt = item.vt.replace("!\"U", "!\" U");
    item.vt = item.vt.replace("!\"V", "!\" V");
    item.vt = item.vt.replace("!\"W", "!\" W");
    item.vt = item.vt.replace("!\"X", "!\" X");
    item.vt = item.vt.replace("!\"Y", "!\" Y");
    item.vt = item.vt.replace("!\"Z", "!\" Z");



    item.vt = item.vt.replace(",´\"a", ",´\" a");
    item.vt = item.vt.replace(",´\"b", ",´\" b");
    item.vt = item.vt.replace(",´\"c", ",´\" c");
    item.vt = item.vt.replace(",´\"d", ",´\" d");
    item.vt = item.vt.replace(",´\"e", ",´\" e");
    item.vt = item.vt.replace(",´\"f", ",´\" f");
    item.vt = item.vt.replace(",´\"g", ",´\" g");
    item.vt = item.vt.replace(",´\"h", ",´\" h");
    item.vt = item.vt.replace(",´\"i", ",´\" i");
    item.vt = item.vt.replace(",´\"j", ",´\" j");
    item.vt = item.vt.replace(",´\"k", ",´\" k");
    item.vt = item.vt.replace(",´\"l", ",´\" l");
    item.vt = item.vt.replace(",´\"m", ",´\" m");
    item.vt = item.vt.replace(",´\"n", ",´\" n");
    item.vt = item.vt.replace(",´\"o", ",´\" o");
    item.vt = item.vt.replace(",´\"p", ",´\" p");
    item.vt = item.vt.replace(",´\"q", ",´\" q");
    item.vt = item.vt.replace(",´\"r", ",´\" r");
    item.vt = item.vt.replace(",´\"s", ",´\" s");
    item.vt = item.vt.replace(",´\"t", ",´\" t");
    item.vt = item.vt.replace(",´\"u", ",´\" u");
    item.vt = item.vt.replace(",´\"v", ",´\" v");
    item.vt = item.vt.replace(",´\"w", ",´\" w");
    item.vt = item.vt.replace(",´\"x", ",´\" x");
    item.vt = item.vt.replace(",´\"y", ",´\" y");
    item.vt = item.vt.replace(",´\"z", ",´\" z");


    item.vt = item.vt.replace("´\"a", "´\" a");
    item.vt = item.vt.replace("´\"b", "´\" b");
    item.vt = item.vt.replace("´\"c", "´\" c");
    item.vt = item.vt.replace("´\"d", "´\" d");
    item.vt = item.vt.replace("´\"e", "´\" e");
    item.vt = item.vt.replace("´\"f", "´\" f");
    item.vt = item.vt.replace("´\"g", "´\" g");
    item.vt = item.vt.replace("´\"h", "´\" h");
    item.vt = item.vt.replace("´\"i", "´\" i");
    item.vt = item.vt.replace("´\"j", "´\" j");
    item.vt = item.vt.replace("´\"k", "´\" k");
    item.vt = item.vt.replace("´\"l", "´\" l");
    item.vt = item.vt.replace("´\"m", "´\" m");
    item.vt = item.vt.replace("´\"n", "´\" n");
    item.vt = item.vt.replace("´\"o", "´\" o");
    item.vt = item.vt.replace("´\"p", "´\" p");
    item.vt = item.vt.replace("´\"q", "´\" q");
    item.vt = item.vt.replace("´\"r", "´\" r");
    item.vt = item.vt.replace("´\"s", "´\" s");
    item.vt = item.vt.replace("´\"t", "´\" t");
    item.vt = item.vt.replace("´\"u", "´\" u");
    item.vt = item.vt.replace("´\"v", "´\" v");
    item.vt = item.vt.replace("´\"w", "´\" w");
    item.vt = item.vt.replace("´\"x", "´\" x");
    item.vt = item.vt.replace("´\"y", "´\" y");
    item.vt = item.vt.replace("´\"z", "´\" z");

    item.vt = item.vt.replace("´\"A", "´\" A");
    item.vt = item.vt.replace("´\"B", "´\" B");
    item.vt = item.vt.replace("´\"C", "´\" C");
    item.vt = item.vt.replace("´\"D", "´\" D");
    item.vt = item.vt.replace("´\"E", "´\" E");
    item.vt = item.vt.replace("´\"F", "´\" F");
    item.vt = item.vt.replace("´\"G", "´\" G");
    item.vt = item.vt.replace("´\"H", "´\" H");
    item.vt = item.vt.replace("´\"I", "´\" I");
    item.vt = item.vt.replace("´\"J", "´\" J");
    item.vt = item.vt.replace("´\"K", "´\" K");
    item.vt = item.vt.replace("´\"L", "´\" L");
    item.vt = item.vt.replace("´\"M", "´\" M");
    item.vt = item.vt.replace("´\"N", "´\" N");
    item.vt = item.vt.replace("´\"O", "´\" O");
    item.vt = item.vt.replace("´\"P", "´\" P");
    item.vt = item.vt.replace("´\"Q", "´\" Q");
    item.vt = item.vt.replace("´\"R", "´\" R");
    item.vt = item.vt.replace("´\"S", "´\" S");
    item.vt = item.vt.replace("´\"T", "´\" T");
    item.vt = item.vt.replace("´\"U", "´\" U");
    item.vt = item.vt.replace("´\"V", "´\" V");
    item.vt = item.vt.replace("´\"W", "´\" W");
    item.vt = item.vt.replace("´\"X", "´\" X");
    item.vt = item.vt.replace("´\"Y", "´\" Y");
    item.vt = item.vt.replace("´\"Z", "´\" Z");

    item.vt = item.vt.replace(":'", ": '");
    item.vt = item.vt.replace(':"', ': "');
    item.vt = item.vt.replace(":‘", ": ‘");
    item.vt = item.vt.replace(":“", ": “");
    item.vt = item.vt.replace("\"\"", "\" \"");

};

try {
    fs.writeFileSync(fileName, JSON.stringify(jsonData));
    console.log(`${abr}: Data written to file!`)
} catch (error) {
    console.log(`Write failed: ${fileName}`, error);
};