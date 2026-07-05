/*******************************/
// Golbal Variables
const dateEdited = '6-30-2026';
const copyrighted = '2018-2026';
const goHome = 'https://thearkbible.com';
const isLive = false;

var localVoices = [];
var verses = [];

// Default Value Definitions!
//? The default values are used when resetting the Ark to its initial state
/*The default activeVersionID is 'id-version9', which is the Twenty-First Century Version.
The default activeBookID is 'id-book1', which is Genesis.
The default activeChapterID is 'id-chapter1', which is the first chapter from the book of the activeBookID.
The default setTheme is '0', which is the light theme.
The default activeFontSize is 1.06*/
// End of Default Value Definitions!

// Keep the defaults here!
const defaultBookID = `id-book1`;
const defaultChapterID = `id-chapter1`;
const defaultDayID = `id-day1`;
const defaultFontSize = 1.06;
const defaultVersionID = `id-version9`; // Version Defaults: KJV = 8, TWF = 11
const defaultCompVrsnID = `id-versionA1`; // Compare Version Defaults: AKJ = 1, TWF = 11
// End of Keep the defaults here!

var bookSort = false;
var boxesLoaded = false;
var boxesAreOpen = false;
var fetchPrefix = '';
var inst = null;
var isTWF = true;
var paragraphLayoutDefault = 0;
var redLetterDefault = 0;
var rotateTheme = true;
var savedLocal = false;
var setRedLetter = 0;
var setTheme = '0';

var activeBookID = null;
var activeChapterID = null;
var activeFontSizeCount = 0;
var activeFontSize = defaultFontSize;
var activeVersionID = null;
var activeCompVrsnID = null;

var pastSelectedBookID = null;
var pastSelectedChapterID = null;
var pastSelectedCompVrsnID = null;
var pastSelectedDayID = null;
var pastSelectedVerseID = null;
var pastSelectedVersionID = null;

var selectedVerseID = null;
var selectedVerseNumberID = null;

const oldBooks = [
     {
          "c": 50,
          "id": 1,
          "t": "Genesis"
     },
     {
          "c": 40,
          "id": 2,
          "t": "Exodus"
     },
     {
          "c": 27,
          "id": 3,
          "t": "Leviticus"
     },
     {
          "c": 36,
          "id": 4,
          "t": "Numbers"
     },
     {
          "c": 34,
          "id": 5,
          "t": "Deuteronomy"
     },
     {
          "c": 24,
          "id": 6,
          "t": "Joshua"
     },
     {
          "c": 21,
          "id": 7,
          "t": "Judges"
     },
     {
          "c": 4,
          "id": 8,
          "t": "Ruth"
     },
     {
          "c": 31,
          "id": 9,
          "t": "1 Samuel"
     },
     {
          "c": 24,
          "id": 10,
          "t": "2 Samuel"
     },
     {
          "c": 22,
          "id": 11,
          "t": "1 Kings"
     },
     {
          "c": 25,
          "id": 12,
          "t": "2 Kings"
     },
     {
          "c": 29,
          "id": 13,
          "t": "1 Chronicles"
     },
     {
          "c": 36,
          "id": 14,
          "t": "2 Chronicles"
     },
     {
          "c": 10,
          "id": 15,
          "t": "Ezra"
     },
     {
          "c": 13,
          "id": 16,
          "t": "Nehemiah"
     },
     {
          "c": 10,
          "id": 17,
          "t": "Esther"
     },
     {
          "c": 42,
          "id": 18,
          "t": "Job"
     },
     {
          "c": 150,
          "id": 19,
          "t": "Psalms"
     },
     {
          "c": 31,
          "id": 20,
          "t": "Proverbs"
     },
     {
          "c": 12,
          "id": 21,
          "t": "Ecclesiastes"
     },
     {
          "c": 8,
          "id": 22,
          "t": "Song of Solomon"
     },
     {
          "c": 66,
          "id": 23,
          "t": "Isaiah"
     },
     {
          "c": 52,
          "id": 24,
          "t": "Jeremiah"
     },
     {
          "c": 5,
          "id": 25,
          "t": "Lamentations"
     },
     {
          "c": 48,
          "id": 26,
          "t": "Ezekiel"
     },
     {
          "c": 12,
          "id": 27,
          "t": "Daniel"
     },
     {
          "c": 14,
          "id": 28,
          "t": "Hosea"
     },
     {
          "c": 3,
          "id": 29,
          "t": "Joel"
     },
     {
          "c": 9,
          "id": 30,
          "t": "Amos"
     },
     {
          "c": 1,
          "id": 31,
          "t": "Obadiah"
     },
     {
          "c": 4,
          "id": 32,
          "t": "Jonah"
     },
     {
          "c": 7,
          "id": 33,
          "t": "Micah"
     },
     {
          "c": 3,
          "id": 34,
          "t": "Nahum"
     },
     {
          "c": 3,
          "id": 35,
          "t": "Habakkuk"
     },
     {
          "c": 3,
          "id": 36,
          "t": "Zephaniah"
     },
     {
          "c": 2,
          "id": 37,
          "t": "Haggai"
     },
     {
          "c": 14,
          "id": 38,
          "t": "Zechariah"
     },
     {
          "c": 4,
          "id": 39,
          "t": "Malachi"
     }
];
const newBooks = [
     {
          "c": 28,
          "id": 40,
          "t": "Matthew"
     },
     {
          "c": 16,
          "id": 41,
          "t": "Mark"
     },
     {
          "c": 24,
          "id": 42,
          "t": "Luke"
     },
     {
          "c": 21,
          "id": 43,
          "t": "John"
     },
     {
          "c": 28,
          "id": 44,
          "t": "Acts"
     },
     {
          "c": 16,
          "id": 45,
          "t": "Romans"
     },
     {
          "c": 16,
          "id": 46,
          "t": "1 Corinthians"
     },
     {
          "c": 13,
          "id": 47,
          "t": "2 Corinthians"
     },
     {
          "c": 6,
          "id": 48,
          "t": "Galatians"
     },
     {
          "c": 6,
          "id": 49,
          "t": "Ephesians"
     },
     {
          "c": 4,
          "id": 50,
          "t": "Philippians"
     },
     {
          "c": 4,
          "id": 51,
          "t": "Colossians"
     },
     {
          "c": 5,
          "id": 52,
          "t": "1 Thessalonians"
     },
     {
          "c": 3,
          "id": 53,
          "t": "2 Thessalonians"
     },
     {
          "c": 6,
          "id": 54,
          "t": "1 Timothy"
     },
     {
          "c": 4,
          "id": 55,
          "t": "2 Timothy"
     },
     {
          "c": 3,
          "id": 56,
          "t": "Titus"
     },
     {
          "c": 1,
          "id": 57,
          "t": "Philemon"
     },
     {
          "c": 13,
          "id": 58,
          "t": "Hebrews"
     },
     {
          "c": 5,
          "id": 59,
          "t": "James"
     },
     {
          "c": 5,
          "id": 60,
          "t": "1 Peter"
     },
     {
          "c": 3,
          "id": 61,
          "t": "2 Peter"
     },
     {
          "c": 5,
          "id": 62,
          "t": "1 John"
     },
     {
          "c": 1,
          "id": 63,
          "t": "2 John"
     },
     {
          "c": 1,
          "id": 64,
          "t": "3 John"
     },
     {
          "c": 1,
          "id": 65,
          "t": "Jude"
     },
     {
          "c": 22,
          "id": 66,
          "t": "Revelation"
     }
];
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

// Shared Functions
function aClick(ahref) {
     if (isLive) {
          ahref = ahref.replace(".html", "");
     };
     window.location.href = ahref;
};
function bClick(ahref) { window.location.href = ahref; };
function cClick(ahref) {
     if (isLive) {
          ahref = ahref.replace("index.html", goHome);
     };
     window.location.href = ahref;
};

async function lastChapter(e = null) {

     // Navigates the page to the previous chapter
     stopBubbles(e);
     if (!boxesLoaded) { await loadBoxes(); };
     let bid = Number(activeBookID.slice("id-book".length));
     let cn = Number(activeChapterID.slice("id-chapter".length)) - 1;

     let loadChpts = false;
     if (cn < 1) {
          cn = 1;
          bid--;
          if (bid < 1) { bid = 1; };
          let books = await getBooksVolume(bid);
          let i = books.findIndex(rec => rec.id === bid);
          cn = books[i].c;
          loadChpts = true;
     };
     nextLast(bid, cn, loadChpts);
     return true;
};

async function nextChapter(e = null) {

     // Navigates the page to the next chapter
     stopBubbles(e);
     if (!boxesLoaded) { await loadBoxes(); };
     let bid = Number(activeBookID.slice("id-book".length));
     let cn = Number(activeChapterID.slice("id-chapter".length)) + 1;
     let books = await getBooksVolume(bid);
     let i = books.findIndex(rec => rec.id === bid);
     chs = books[i].c;

     let loadChpts = false;
     if (cn > chs) {
          bid++;
          cn = 1;
          if (bid > 66) { bid = 66; };
          loadChpts = true;
     };
     nextLast(bid, cn, loadChpts);
     return true;
};

async function nextLast(bid, cn, loadChpts) {

     // Called by lastChapter() and nextChapter() to change the chapter
     activeBookID = `id-book${bid}`;
     activeChapterID = `id-chapter${cn}`;
     closeBoxes();
     if (loadChpts) { loadChapters(changeChapter); };
     getChapter();
     unHighlight();
     removeQueryParam('vh');
     selected(activeBookID, 'id-books');
     selected(activeChapterID, 'id-chapters');
     setQuerystring('bid', bid);
     setQuerystring('cn', cn);
     // getMenus is in shared.js, but it calls setMenu in the apps.js
     getMenus();
     document.getElementById('id-pageContainer').scrollTo({ top: 0, behavior: "instant" });
};

function changeBook(e = null) {

     // Change the active Bible book
     stopBubbles(e);
     if (e) { activeBookID = e.target.id; };
     let bid = Number(activeBookID.slice("id-book".length));
     nextLast(bid, 1, true);
};

function changeChapter(e = null) {

     // Change the active Bible chapter
     stopBubbles(e);
     if (e) { activeChapterID = e.target.id; };
     let bid = Number(activeBookID.slice("id-book".length));
     let cn = Number(activeChapterID.slice("id-chapter".length));
     nextLast(bid, cn, false);
};

async function changeVersion(e = null) {

     // Change the active Bible version
     stopBubbles(e);
     closeBoxes();

     let rec = false;
     rec = await getVersion(e);

     let activeVersion = Number(activeVersionID.slice("id-version".length));
     selected(activeVersionID, 'id-versions');
     setQuerystring('verid', activeVersion);
     unHighlight();

     /// getMenus is in shared.js, but it calls setMenu in the apps.js files
     if (rec) { rec = false; await getMenus(); };
     if (rec) { div.remove(); };
     return true;
};

async function checkID(id) {

     // Used by openBoxes() to check if the element id matches a Menu Button.
     const menuIDs = [
          'id-MenuBtn1',
          'id-MenuBtn2',
          'id-MenuBtn3',
          'id-MenuBtn4'
     ];
     if (menuIDs.includes(id)) { return false; } else { closeBoxes(); return true; };

     /*
     // Used by openBoxes() to check for exempt element ids.
     const exactIDs = [
          'id-appLinks',
          'id-appTitle',
          'id-banner',
          'id-glossary',
          'id-glossary1',
          'id-GodLovesYou',
          'id-page',
          'id-pageContainer',
          ''
     ];

     const partialIDs = [
          'id-p',
          'id-pA',
          'line',
          'id-versNumber'
     ];

     if (
          exactIDs.includes(id) ||
          partialIDs.some(part => id.includes(part))
     ) { closeBoxes(); return true; };
     return false;
     */
};

function darkTheme() {
     let theme = document.documentElement;
     theme.style.setProperty('--headerImg', 'url("../../../images/headers/brcrystal.webp")');
     theme.style.setProperty('--aLinkColor', '#9bc1f8');
     theme.style.setProperty('--aLinkDarkColor', '#79affa');
     theme.style.setProperty('--blackText', '#dcdde4');
     theme.style.setProperty('--blueVerse', '#9bc1f8');
     theme.style.setProperty('--bodyBackground', '#3d3636');
     theme.style.setProperty('--cs-edited', '#969595ff');
     theme.style.setProperty('--darkGray', '#242323')
     theme.style.setProperty('--gradientDark', '#1a0303');
     theme.style.setProperty('--gradientLight', '#5d656e');
     theme.style.setProperty('--greenEmphasis', '#34b334');
     theme.style.setProperty('--lighterMaroonEmphasis', '#fa4d4d');
     theme.style.setProperty('--mainBackground', '#473e3e');
     theme.style.setProperty('--navyEmphasis', '#709cdf');
     theme.style.setProperty('--redEmphasis', '#fe1212');
     theme.style.setProperty('--searchResults', '#fa4d4d');
     theme.style.setProperty('--verseNumber', '#20c1c4');
     theme.style.setProperty('--whiteText', '#dcdde4');
};

const delay = (ms) => new Promise(res => setTimeout(res, ms));

async function fetchVerses(idx) {

     // Fetch the Verses.json file from the server, based on which version it is
     let loader = document.getElementById("id-loader");
     loader.style.display = 'block';
     let url = `${fetchPrefix}data/${versions[idx].ar}/${versions[idx].ar}Verses.json`;
     try {
          const res = await fetch(url);
          if (!res.ok) { if (loader) { loader.style.display = 'none'; }; throw new Error(res.status); };
          let versesFetched = await res.json();
          if (versions[idx].ar === 'TWF') { isTWF = true } else { isTWF = false };
          if (loader) { loader.style.display = 'none'; };
          return versesFetched;
     } catch (error) {
          switch (error.message) {
               case '500':
                    err = 'Network fetch error: 500A!';
                    break;
               case '503':
                    err = 'No internet connection error: 503A!';
                    break;
          };
          alert(error.message);
     };
     return false;
};

function findVerse(e = null) {

     // Finds and highlights a verse on the page
     stopBubbles(e);
     closeBoxes();
     let id;
     if (e) { id = e.target.id; };
     let save = Number(id.slice("id-verse".length));
     verseHighlight(id);
     setQuerystring('vh', save);
     selected(id, 'id-verses');
};

function getBookChapterCount() {

     // Get the number of chapters for each book from the books array based on old or new testament
     let books = [];
     let id = Number(activeBookID.slice("id-book".length));
     if (id < 40) {
          books = oldBooks;
     } else { books = newBooks; };
     let idx = books.findIndex(rec => rec.id === id);
     return books[idx].c;
};

function getBookTitle(id) {

     // Get the title of the book from the books array based on old or new testament
     let books = [];
     if (id < 40) {
          books = oldBooks;
     } else { books = newBooks; };
     let idx = books.findIndex(rec => rec.id === id);
     return books[idx].t;
};

function getBooksVolume(id) {

     // Return an array of books based on whether it is old or new testament
     let books = [];
     if (id < 40) {
          books = oldBooks;
     } else { books = newBooks; };
     return books;
};

async function getChapter(A1 = '', AA = '', verses1 = null) {

     // Scoped Helper functions:
          function renderVerseSpan(v, AA) {
               //  Render a single verse span
               const sp = document.createElement('span');
               sp.id = `id-vers${AA}${v.vn}`;

               const num = document.createElement('span');
               num.id = `id-versNum${AA}${v.vn}`;
               num.classList.add("cs-verseNumber");
               num.textContent = `${v.vn} `;
               sp.appendChild(num);

               const text = document.createElement('span');
               text.id = `id-avers${AA}${v.vn}`;
               text.innerHTML = v.jq === 1 ? JesusQuote(v.vt) : v.vt;

               sp.appendChild(text);
               return sp;
          };

          function JesusQuote(aVerse) {
               // Change the color the verses of the quotes of Jesus span
               switch (redLetterDefault) {
                    case 0:
                         //aVerse = aVerse.replaceAll('`', '');
                         //aVerse = aVerse.replaceAll('´', '');
                         aVerse = aVerse.replace(/[`´]/g, '');
                         break;
                    case 1:
                         //aVerse = aVerse.replaceAll('`', '<span class="cs-jqRed">');
                         //aVerse = aVerse.replaceAll('´', '</span>');
                         aVerse = aVerse.replace(/[`´]/g, m => m === '`' ? '<span class="cs-jqRed">' : '</span>' );
                         break;
                    case 2:
                         //aVerse = aVerse.replaceAll('`', '<span class="cs-jqBlue">');
                         //aVerse = aVerse.replaceAll('´', '</span>');
                         aVerse = aVerse.replace(/[`´]/g, m => m === '`' ? '<span class="cs-jqBlue">' : '</span>' );
                         break;
               };
               return aVerse;
          };
     // End of Scoped Helper functions:

     const wrkVerses = A1 === '' ? verses : verses1;
     const activeBook = Number(activeBookID.slice("id-book".length));
     const activeChapter = Number(activeChapterID.slice("id-chapter".length));

     // Find first verse of this chapter
     let i = wrkVerses.findIndex(v => v.bid === activeBook && v.cn === activeChapter);
     if (i === -1) return false;

     // Prepare page
     removeElements(`id-page${A1}`);
     const page = document.getElementById(`id-page${A1}`);
     const h2 = document.createElement('h2');
     h2.textContent = `${getBookTitle(activeBook)} ${activeChapter}`;
     document.getElementById('id-navTitle').textContent = h2.textContent;

     let title = document.getElementById('id-title');
     if (title) {
          title.textContent = `The Ark Bible - ${h2.textContent}`;
          title = document.getElementById('id-ogTitle');
          title.textContent = `The Ark Bible - ${h2.textContent}`;
     };

     if (isTWF) {
          const sp2 = document.createElement('span');
          sp2.classList.add('cs-edited');
          sp2.textContent = ` TWF - Last Edited: ${dateEdited}`;
          h2.appendChild(sp2);
     }

     page.appendChild(h2);

     let verseCount = 0;
     const x = wrkVerses.length;

     // Main loop: iterate through verses in this chapter
     while (i < x && wrkVerses[i].bid === activeBook && wrkVerses[i].cn === activeChapter) {

          const p = document.createElement('p');
          p.id = `id-p${wrkVerses[i].vid}`;
          const pn = wrkVerses[i].pn;
          let newParagraph = false;

          if (pn > 0 && paragraphLayoutDefault) {
               // Paragraph mode
               while (i < x && wrkVerses[i].bid === activeBook && wrkVerses[i].cn === activeChapter
                    && wrkVerses[i].pn === pn) {

                    const v = wrkVerses[i];
                    if (newParagraph) {
                         const pad = document.createElement('span');
                         pad.classList.add("cs-versePadding");
                         p.appendChild(pad);
                    }
                    newParagraph = true;
                    let sp = renderVerseSpan(v, AA);
                    sp.classList.add("cs-verseText");
                    p.appendChild(sp);
                    i++;
                    verseCount++;
               };
          } else {
               // Single-verse mode
               const v = wrkVerses[i];
               p.classList.add("cs-singleVerse");
               p.appendChild(renderVerseSpan(v, AA));
               i++;
               verseCount++;
          };

          page.appendChild(p);
     };

     // Load verse list if needed
     const aVersesBox = document.getElementById('id-versesBox');
     if (aVersesBox) loadVerses(findVerse, verseCount);

     // Navigation visibility
     const btmLastLine = document.getElementById(`id-navLastChapter`);
     if (btmLastLine) { btmLastLine.style.visibility = (activeBook === 1 && activeChapter === 1) ? 'hidden' : 'visible'; };
     const btmNextLine = document.getElementById(`id-navNextChapter`);
     if (btmNextLine) { btmNextLine.style.visibility = (activeBook === 66 && activeChapter === 22) ? 'hidden' : 'visible'; }

     setFontSize();
     return true;
};

async function getDesignDefaults() {

     activeFontSize = localStorage.getItem("activeFontSize");
     if (!activeFontSize) { activeFontSize = 1.06; } else { activeFontSize = Number(activeFontSize); };
     activeFontSizeCount = localStorage.getItem("activeFontSizeCount");
     if (!activeFontSizeCount) { activeFontSizeCount = 0; } else { activeFontSizeCount = Number(activeFontSizeCount); };
     inst = localStorage.getItem('installed');
     let ltr = localStorage.getItem('redLetter');
     if (ltr) { redLetterDefault = Number(ltr); setRedLetter = Number(ltr); };
     paragraphLayoutDefault = localStorage.getItem("paragraphLayout");
     if (!paragraphLayoutDefault) { paragraphLayoutDefault = 0; }
     else { paragraphLayoutDefault = Number(paragraphLayoutDefault); };
     let svd = localStorage.getItem('savedLocal');
     if (svd) { savedLocal = svd; };
     setTheme = localStorage.getItem("setTheme");
     return true;
};

async function getMenus() {

     // getMenus is in shared.js, but it calls setMenu in each app.js files
     const indices = [1, 2, 3, 4];
     for (const i of indices) {

          const mnuBtn = document.getElementById(`id-MenuBtn${i}`);
          if (!mnuBtn) continue;
          const val = setMenu(`id-MenuBtn${i}`);
          mnuBtn.textContent = `${val}`;
     };
     return true;
};

async function getVersion(e = null) {

     let id = null;
     let activeVersion = null;

     if (e) { id = e.target.id; activeVersionID = id; };
     if (!id || id === 'id-resetDefaults') { id = activeVersionID; };

     activeVersion = Number(id.slice('id-version'.length));
     let idx = versions.findIndex(rec => rec.id === activeVersion);
     let hdl = document.getElementById('id-headline');
     if (hdl) { hdl.textContent = `${versions[idx].t}` };
     verses = await fetchVerses(idx);

     let holdSelectedVerseID = selectedVerseID;
     await getChapter();
     selectedVerseID = holdSelectedVerseID;
     if (selectedVerseID) { verseHighlight(selectedVerseID); };

     let redLetter = document.getElementById('id-redLetter');
     if (redLetter) {
          if (versions[idx].rdl) {

               redLetter.style.display = 'block';
               if (redLetterDefault === 0) { redLetter.textContent = 'Red Letter';
               } else if (redLetterDefault === 1) { redLetter.textContent = 'Blue Letter';
               } else if (redLetterDefault === 2) { redLetter.textContent = 'Black Letter'; };

          } else {
               redLetter.style.display = 'none';
          };
     };

     let paragraphLayout = document.getElementById('id-paragraphLayout');
     if (paragraphLayout) {
          if (verses[0].pn > 0) { paragraphLayout.style.display = 'block';
          } else { paragraphLayout.style.display = 'none'; };
     };
     boxesAreOpen = false;
     return true;
};

function getVersionsABR(vrsn) {

     let vdx = versions.findIndex(rec => rec.id === vrsn);
     return versions[vdx].ar;
};

function isNumeric(value) { return !isNaN(value) && !isNaN(parseFloat(value)); };

function lightTheme() {
     let theme = document.documentElement;
     theme.style.setProperty('--headerImg', 'url("../../../images/headers/crystal.webp")');
     theme.style.setProperty('--aLinkColor', '#bed8fe');
     theme.style.setProperty('--aLinkDarkColor', 'navy');
     theme.style.setProperty('--blackText', '#3a3939');
     theme.style.setProperty('--bodyBackground', '#f3f3f3');
     theme.style.setProperty('--cs-edited', '#545353');
     theme.style.setProperty('--darkGray', '#545353');
     theme.style.setProperty('--gradientLight', '#0e4194');
     theme.style.setProperty('--gradientDark', '#102952');
     theme.style.setProperty('--greenEmphasis', '#045004');
     theme.style.setProperty('--lighterMaroonEmphasis', '#ba0e0e');
     theme.style.setProperty('--mainBackground', 'white');
     theme.style.setProperty('--navyEmphasis', 'navy');
     theme.style.setProperty('--redEmphasis', '#7f0000');
     theme.style.setProperty('--searchResults', '#ba0e0e');
     theme.style.setProperty('--verseNumber', '#0909a9');
     theme.style.setProperty('--whiteText', 'white');
};

function paragraphLayout() {

     if (paragraphLayoutDefault) {
          document.getElementById('id-paragraphLayout').textContent = 'Paragraph Layout';
          paragraphLayoutDefault = 0;
          localStorage.removeItem("paragraphLayout");
     } else {
          document.getElementById('id-paragraphLayout').textContent = 'Line Layout';
          paragraphLayoutDefault = 1;
     };
     getChapter();
     localStorage.setItem("paragraphLayout", paragraphLayoutDefault);
};

async function printSection(sectionId) {

     const section = document.getElementById(sectionId);
     if (!section) return;
     let iframe = document.getElementById('print-iframe');
     if (!iframe) {
          iframe = document.createElement('iframe');
          iframe.id = 'print-iframe';
          Object.assign(iframe.style, {
               position: 'absolute',
               width: '0',
               height: '0',
               border: 'none',
               visibility: 'hidden'
          });
          document.body.appendChild(iframe);
     };

     const doc = iframe.contentWindow.document;
     doc.open();
     doc.write('<!DOCTYPE html><html><head></head><body></body></html>');
     doc.close();

     const stylePromises = [];
     const links = document.querySelectorAll('link[rel="stylesheet"], style');

     for (const link of links) {
          const clone = link.cloneNode(true);
          if (clone.tagName === 'LINK') {
               stylePromises.push(new Promise((resolve) => {
                    clone.onload = resolve;
                    clone.onerror = resolve; // Continue even if one style fails
               }));
          }
          doc.head.appendChild(clone);
     };

     const clonedContent = section.cloneNode(true);
     doc.body.appendChild(clonedContent);

     await Promise.all(stylePromises);
     await delay(100);
     iframe.contentWindow.dispatchEvent(new Event('resize'));
     await delay(150);

     iframe.contentWindow.focus();
     iframe.contentWindow.print();
     iframe.contentWindow.onafterprint = () => { iframe.remove(); };
};

function redLetter() {

     setRedLetter++;
     if (setRedLetter > 2) { setRedLetter = 0 };
     redLetterDefault = setRedLetter;

     if (redLetterDefault === 0) {
          document.getElementById('id-redLetter').textContent = 'Red Letter';
     } else if (redLetterDefault === 1) {
          document.getElementById('id-redLetter').textContent = 'Blue Letter';
          redLetterDefault = 1;
     } else if (redLetterDefault === 2) {
          document.getElementById('id-redLetter').textContent = 'Black Letter';
          redLetterDefault = 2;
     };
     getChapter();
     localStorage.setItem("redLetter", redLetterDefault);
};

function removeAllQueries() {
     const cleanUrl = window.location.origin + window.location.pathname;
     window.history.replaceState({}, document.title, cleanUrl);
};

function removeElements(id) {

     let target = document.getElementById(id);
     if (target) {
          while (target.firstChild) {
               target.removeChild(target.firstChild);
          };
     };
};

function removeQueryParam(param) {
     var url = new URL(window.location.href);
     url.searchParams.delete(param);
     window.history.replaceState({}, '', url);
};

async function setFontSize() {
     const allP = document.querySelectorAll('p');
     for (const ps of allP) {
          if (ps.id !== 'id-endLine') { ps.style.fontSize = `${activeFontSize}rem`; };
     };
};

function setQuerystring(key, value) {

     let url = new URL(window.location);
     let params = new URLSearchParams(url.search);

     url.searchParams.set(key, value);
     if (params.has(key)) {
          window.history.replaceState({}, '', url);
     } else {
          window.history.pushState({}, '', url);
     };
};

async function stopBubbles(e = null) {

     if (e) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          return true;
     } else {
          return false;
     };
};

function toggleTheme() {
     let theme = document.getElementById("id-themeBtn");
     if (theme) { theme.classList.toggle("cs-darkTheme"); };
     if (theme) { theme.textContent = theme.classList.contains("cs-darkTheme") ? "🌙" : "☀️"; };
};

function unHighlight(e = null) {

     stopBubbles(e);
     selected('id-verse0', 'id-verses');
     removeQueryParam('vh');

     let title = document.getElementById('id-title');
     if (title) {
          const aString = title.textContent;
          const modifiedString = aString.replace(/:\d+$/, "");
          title.textContent = modifiedString;
          title = document.getElementById('id-ogTitle');
          title.content = modifiedString;
     };

     let btn = document.getElementById('id-MenuBtn4');
     if (btn) { if (btn.dataset.type === 'vh1') { btn.textContent = '1'; }; };
     if (selectedVerseNumberID) { document.getElementById(selectedVerseNumberID).parentElement.classList.remove('cs-highlight'); };
     selectedVerseNumberID = null;
     selectedVerseID = null;
     pastSelectedVerseID = null;
};

function verseHighlight(id) {

     let vh = document.getElementById(id).textContent;
     document.getElementById('id-MenuBtn4').textContent = vh;

     let title = document.getElementById('id-title');
     if (title) {
          const originalString = title.textContent;
          const modifiedString = `${originalString.replace(/:\d+$/, "")}:${vh}`;
          title.textContent = modifiedString;
          title = document.getElementById('id-ogTitle');
          title.content = modifiedString;
     };

     if (selectedVerseNumberID) { document.getElementById(selectedVerseNumberID).parentElement.classList.remove('cs-highlight'); };
     selectedVerseNumberID = `id-versNum${vh}`;
     const spa = document.getElementById(selectedVerseNumberID).parentElement;
     spa.classList.add('cs-highlight');

     const selection = window.getSelection();
     const range = document.createRange();
     range.selectNodeContents(spa);
     selection.removeAllRanges();
     selection.addRange(range);
     spa.scrollIntoView({ block: 'center' });
};