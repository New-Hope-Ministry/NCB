const defaultSrchFontSize = 1.06;
const defaultSrchLanguageID = 34; // English
const defaultSrchVersionID = 25;
const defaultSrchVersion = `id-version${defaultSrchVersionID}`;
const defaultSrchBookID = `id-book1`;
const defaultSrchChapterID = `id-chapter1`;

var activeSrchFontSize = defaultSrchFontSize;
var activeSrchLanguageID = null;
var activeSrchVersion = null;
var activeSrchVersionID = null;
var activeSrchVersionText = null;
var pastSrchSelectedVersionID = null;
var pastSrchSelectedLanguageID = null;

var srchBoxesAreOpen = false;
var searchIndex = null;
var setSrchTheme = '0';

var srchVerses = [];
var srchVersions = [
    {
        "ar": "ALB",
        "id": 1,
        "lid": 1,
        "rdl": 0,
        "t": "Albanian Bible - Shqip Bibla"
    },
    {
        "ar": "CZK",
        "id": 7,
        "lid": 18,
        "rdl": 0,
        "t": "Czech Bible of Kralice - Czech Bible Kralická"
    },
    {
        "ar": "DSV",
        "id": 8,
        "lid": 22,
        "rdl": 0,
        "t": "Dutch Staten Bible Translation - Dutch Staten Vertaling Statenbijbel"
    },
    {
        "ar": "AKJ",
        "id": 9,
        "lid": 34,
        "rdl": 0,
        "t": "American King James Version"
    },
    {
        "ar": "ASV",
        "id": 10,
        "lid": 34,
        "rdl": 0,
        "t": "American Standard Version"
    },
    {
        "ar": "AKV",
        "id": 12,
        "lid": 34,
        "rdl": 0,
        "t": "Authorized King James Version"
    },
    {
        "ar": "BSB",
        "id": 13,
        "lid": 34,
        "rdl": 0,
        "t": "Berean Standard Bible"
    },
    {
        "ar": "DBY",
        "id": 15,
        "lid": 34,
        "rdl": 0,
        "t": "Darby English Bible"
    },
    {
        "ar": "DRB",
        "id": 16,
        "lid": 34,
        "rdl": 0,
        "t": "Douay-Rheims Bible"
    },
    {
        "ar": "ERV",
        "id": 17,
        "lid": 34,
        "rdl": 0,
        "t": "English Revised Version"
    },
    {
        "ar": "KJV",
        "id": 19,
        "lid": 34,
        "rdl": 0,
        "t": "King James Version"
    },
    {
        "ar": "NWB",
        "id": 22,
        "lid": 34,
        "rdl": 0,
        "t": "Noah Webster's Bible"
    },
    {
        "ar": "SLT",
        "id": 23,
        "lid": 34,
        "rdl": 0,
        "t": "Smith's Literal Translation"
    },
    {
        "ar": "TWF",
        "id": 25,
        "lid": 34,
        "rdl": 1,
        "t": "Twenty-First Century Version"
    },
    {
        "ar": "YLT",
        "id": 28,
        "lid": 34,
        "rdl": 0,
        "t": "Young's Literal Translation"
    },
    {
        "ar": "FIN",
        "id": 29,
        "lid": 35,
        "rdl": 0,
        "t": "Old Finnish Bible - 1776 - Vuoden raamattu"
    },
    {
        "ar": "FLS",
        "id": 30,
        "lid": 38,
        "rdl": 0,
        "t": "French Louis Segond Version - 1910 - Version française de Louis Segond"
    },
    {
        "ar": "FMT",
        "id": 31,
        "lid": 38,
        "rdl": 0,
        "t": "French Martin Version - 1744 - Version Martin française"
    },
    {
        "ar": "FOS",
        "id": 32,
        "lid": 38,
        "rdl": 0,
        "t": "French Ostervald Version - 1996 - Version française d'Ostervald"
    },
    {
        "ar": "GEL",
        "id": 34,
        "lid": 42,
        "rdl": 0,
        "t": "German Elberfelder Version - 1871 - Deutsche Elberfelder Version"
    },
    {
        "ar": "GER",
        "id": 35,
        "lid": 42,
        "rdl": 0,
        "t": "German Elberfelder Version - 1905 - Deutsche Elberfelder Version"
    },
    {
        "ar": "GLB",
        "id": 36,
        "lid": 42,
        "rdl": 0,
        "t": "German Luther Bible - 1545 - Deutsche Lutherbibel"
    },
    {
        "ar": "GLU",
        "id": 37,
        "lid": 42,
        "rdl": 0,
        "t": "German Luther Bible - 1912 - Deutsche Lutherbibel"
    },
    {
        "ar": "GSH",
        "id": 38,
        "lid": 42,
        "rdl": 0,
        "t": "German Schlachter Bible - 1951 - Deutsche Schlachter-Bibel"
    },
    {
        "ar": "HKV",
        "id": 40,
        "lid": 49,
        "rdl": 0,
        "t": "Hungarian Karoli Version - Karoli Vizsoly Bible"
    },
    {
        "ar": "ITV",
        "id": 43,
        "lid": 53,
        "rdl": 0,
        "t": "Italian Giovanni Diodati Version - 1649 - Versione Giovanni italiana Diodati"
    },
    {
        "ar": "KBQ",
        "id": 46,
        "lid": 55,
        "rdl": 0,
        "t": "Kamano-Kafe Bible - Kamano-Kafe Baepol"
    },
    {
        "ar": "MAO",
        "id": 48,
        "lid": 62,
        "rdl": 0,
        "t": "Maori Bible Version - Te Paipera Tapu"
    },
    {
        "ar": "BBB",
        "id": 49,
        "lid": 68,
        "rdl": 0,
        "t": "Bishop's Bible"
    },
    {
        "ar": "CBV",
        "id": 50,
        "lid": 68,
        "rdl": 0,
        "t": "Coverdale Bible"
    },
    {
        "ar": "GNV",
        "id": 51,
        "lid": 68,
        "rdl": 0,
        "t": "Geneva Bible"
    },
    {
        "ar": "PBV",
        "id": 53,
        "lid": 72,
        "rdl": 0,
        "t": "Polish Bible of Gdansk - 1881 - Polska Biblia Gdanska"
    },
    {
        "ar": "PBN",
        "id": 54,
        "lid": 72,
        "rdl": 0,
        "t": "Polish New Gdansk Bible - 2012 - Polska Nowa Biblia Gdańska"
    },
    {
        "ar": "PTB",
        "id": 55,
        "lid": 73,
        "rdl": 0,
        "t": "Portuguese Free Bible - Bíblia em Português Grátis"
    },
    {
        "ar": "PTA",
        "id": 57,
        "lid": 73,
        "rdl": 0,
        "t": "Portuguese Translation by João Ferreira de Almeida Revised and Updated - Tradução de João Ferreira de Almeida Revista e Atualizada"
    },
    {
        "ar": "RCV",
        "id": 58,
        "lid": 77,
        "rdl": 0,
        "t": "Romanian Cornilescu Version - Versiunea Cornilescu în limba română"
    },
    {
        "ar": "SRV",
        "id": 61,
        "lid": 84,
        "rdl": 0,
        "t": "Spanish Reina Valera - 1909 - Reina Valera Española"
    },
    {
        "ar": "SRG",
        "id": 62,
        "lid": 84,
        "rdl": 0,
        "t": "Spanish Reina Valera Gómez - 2004 - Reina Valera Gómez Española"
    },
    {
        "ar": "SRZ",
        "id": 63,
        "lid": 84,
        "rdl": 0,
        "t": "Spanish Reina Valera Gómez - 2010 - Reina Valera Gómez Española"
    },
    {
        "ar": "TAB",
        "id": 65,
        "lid": 91,
        "rdl": 0,
        "t": "The Tagalog Bible - 1905 -  Ang Tagalog Biblia"
    },
    {
        "ar": "TVB",
        "id": 66,
        "lid": 95,
        "rdl": 0,
        "t": "Turkish Bible Version - Türkçe İncil Versiyonu"
    },
    {
        "ar": "VCV",
        "id": 67,
        "lid": 99,
        "rdl": 0,
        "t": "Vietnamese Cadman Version - 1934 - Phiên bản Cadman Việt Nam"
    }
];
var srchLanguages = [
    {
        "idx": 0,
        "lid": 1,
        "lng": "Albanian - Shqip",
        "lngc": "sq-AL"
    },
    {
        "idx": 4,
        "lid": 18,
        "lng": "Czech čeština",
        "lngc": "cs-CZ"
    },
    {
        "idx": 5,
        "lid": 22,
        "lng": "Dutch - Nederlands",
        "lngc": "nl-NL"
    },
    {
        "idx": 6,
        "lid": 34,
        "lng": "English",
        "lngc": "en-US"
    },
    {
        "idx": 7,
        "lid": 35,
        "lng": "Finnish - Suomi",
        "lngc": "fi-FI"
    },
    {
        "idx": 8,
        "lid": 38,
        "lng": "French - Français",
        "lngc": "fr-FR"
    },
    {
        "idx": 9,
        "lid": 42,
        "lng": "German - Deutsch",
        "lngc": "de-DE"
    },
    {
        "idx": 11,
        "lid": 49,
        "lng": "Hungarian - magyar",
        "lngc": "hu-HU"
    },
    {
        "idx": 13,
        "lid": 53,
        "lng": "Italian - Italiano",
        "lngc": "it-IT"
    },
    {
        "idx": 15,
        "lid": 55,
        "lng": "Kamano-Kafe",
        "lngc": "kmo"
    },
    {
        "idx": 17,
        "lid": 62,
        "lng": "Maori - Māori",
        "lngc": "mi-NZ"
    },
    {
        "idx": 18,
        "lid": 68,
        "lng": "Olde English",
        "lngc": "en-olde"
    },
    {
        "idx": 20,
        "lid": 72,
        "lng": "Polish - Polski",
        "lngc": "pl-PL"
    },
    {
        "idx": 21,
        "lid": 73,
        "lng": "Portuguese - Português",
        "lngc": "pt-BR"
    },
    {
        "idx": 22,
        "lid": 77,
        "lng": "Romanian - Română",
        "lngc": "ro-RO"
    },
    {
        "idx": 24,
        "lid": 84,
        "lng": "Spanish - Español",
        "lngc": "es-ES"
    },
    {
        "idx": 25,
        "lid": 91,
        "lng": "Tagalog",
        "lngc": "tl-PH"
    },
    {
        "idx": 26,
        "lid": 95,
        "lng": "Turkish - Türkçe",
        "lngc": "tr-TR"
    },
    {
        "idx": 27,
        "lid": 99,
        "lng": "Vietnamese - Tiếng Việt",
        "lngc": "vi-VN"
    }
];

window.addEventListener("load", async () => {

     let rec = false;
     let i = null;
     rec = await getDefaults();
     if (rec) { rec = false; rec = await loadBoxes(); };
     if (activeSrchVersionID) {
          let id = Number(activeSrchVersionID.slice("id-version".length));
          i = srchVersions.findIndex(rec => rec.id === id);
          document.getElementById('id-searchVersion').textContent = `${srchVersions[i].t} - ${srchVersions[i].ar}`;
     }
     if (rec) {
          setTimeout(() => {
               document.getElementById("id-loader").style.display = 'none';
          }, 130);
          if (setTheme === '1') {
               darkTheme();
               toggleTheme();
               rotateTheme = false;
          };
     };
     window.addEventListener("resize", adjustPosition);
     if (rec) { await fetchVerses(i); };
     //localStorage.removeItem('searchData');
});

function adjustPosition() {
     locateBox('id-header1', 'id-versions');
     locateBox('id-header1', 'id-languages');
};
async function changeLanguage(e = null) {

     let id;
     if (e) { id = e.target.id; };
     let idx = Number(document.getElementById(id).dataset.index);
     activeSrchChapterID = defaultSrchChapterID;
     activeSrchLanguageID = srchLanguages[idx].lid;

     loadVersions();
     document.getElementById('id-language').textContent = `Language: ${srchLanguages[idx].lng}`;
     let parentElement = document.getElementById('id-versions');
     let selectedVersion = parentElement.children[1];
     activeSrchVersionID = selectedVersion.id;
     selected(id, 'id-languages');
     selected(activeSrchVersionID, 'id-versions');
     if (document.getElementById('id-searchBox').textContent === '') {
          closeBoxes();
          let idx = Number(activeSrchVersionID.slice("id-version".length));
          let id = srchVersions.findIndex(rec => rec.id === idx);
          document.getElementById('id-MenuBtn1').textContent = srchVersions[id].ar;
          document.getElementById('id-searchVersion').textContent = `${srchVersions[id].t} - ${srchVersions[id].ar}`;
          fetchVerses(id);
     } else {
          selectedVersion.click();
     };
     document.getElementById('top').scrollIntoView({ block: 'start' });
};
async function changeVersion(e = null) {

     let res = false;
     if (e) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
     };

     closeBoxes();
     document.getElementById("id-loader").style.display = 'block';
     try {
          activeSrchVersionID = e.target.id;
          let idx = Number(activeSrchVersionID.slice("id-version".length));
          let id = srchVersions.findIndex(rec => rec.id === idx);

          res = await fetchVerses(id);
          document.getElementById('id-MenuBtn1').textContent = srchVersions[id].ar;
          document.getElementById('id-searchVersion').textContent = `${srchVersions[id].t} - ${srchVersions[id].ar}`;
          selected(activeSrchVersionID, 'id-versions');
          if (document.getElementById('id-searchBox').textContent === '') {
               if (res) { document.getElementById("id-loader").style.display = 'none'; };
               return;
          };
          searcher();
     } catch (error) {
          let err = error.message;
          switch (error.message) {
               case '500':
                    err = 'Network fetch error: 500A!';
                    break;
               case '503':
                    err = 'No internet connection error: 503A!';
                    break;
          };
          document.getElementById("id-loader").style.display = 'none';
          alert(err);
     };
     if (res) { document.getElementById("id-loader").style.display = 'none'; };

     return true;
};
function closeBoxes() {
     document.getElementById('id-versions').style.display = 'none';
     document.getElementById('id-openLngs').textContent = '♥';
     document.getElementById('id-languages').style.display = 'none';
     srchBoxesAreOpen = false;
};
function closeLanguage(e = null) {

     if (e) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
     };
     document.getElementById('id-languages').style.display = 'none';
     document.getElementById('id-versions').style.display = 'block';
};
function darkTheme() {
     document.documentElement.style.setProperty('--bodyBackground', '#3d3636');
     document.documentElement.style.setProperty('--bannerBackground', '#1a0303');
     document.documentElement.style.setProperty('--mainBackground', '#473e3e');
     document.documentElement.style.setProperty('--blackText', '#dcdde4');
     document.documentElement.style.setProperty('--whiteText', '#dcdde4');
     document.documentElement.style.setProperty('--lighterMaroonEmphasis', '#e49f9fff');

     document.documentElement.style.setProperty('--verseNumber', '#709cdf');
     document.documentElement.style.setProperty('--navyEmphasis', '#709cdf');
     document.documentElement.style.setProperty('--searchResults', '#fa4d4d');
     document.documentElement.style.setProperty('--gradientLight', '#5d656e');
     document.documentElement.style.setProperty('--gradientDark', '#010914');
     document.documentElement.style.setProperty('--darkGrayEmphasis', '#969595ff');
     document.documentElement.style.setProperty('--blueVerse', '#709cdf')
     document.getElementById('id-endLine').style.color = '#010914';
};
async function fetchVerses(id) {

     let url = `../data/${srchVersions[id].ar}/${srchVersions[id].ar}Verses.json`;
     try {
          const res = await fetch(url);
          if (!res.ok) { throw new Error(res.status); };
          srchVerses = await res.json();
     } catch {
          console.log('Error fetching srchVerses!');
     };
     return true;
};
async function getDefaults() {

     const params = new URLSearchParams(window.location.search);

     let verid = params.get('verid');
     if (verid) { activeSrchVersionID = `id-version${verid}`; };
     if (!activeSrchVersionID) { activeSrchVersionID = localStorage.getItem("activeSrchVersionID"); };
     if (!activeSrchVersionID) { activeSrchVersionID = `id-version${defaultSrchVersionID}`; };

     let id = Number(activeSrchVersionID.slice("id-version".length));
     let i = srchVersions.findIndex(rec => rec.id === id);
     activeSrchLanguageID = srchVersions[i].lid;

     setSrchTheme = localStorage.getItem("setTheme");
     activeSrchFontSize = localStorage.getItem("activeFontSize");
     if (!activeSrchFontSize) { activeSrchFontSize = 1.06; } else { activeSrchFontSize = Number(activeSrchFontSize); };

     return true;
};
async function loadBoxes() {

     loadLanguages();
     loadVersions();
     return true;
};
function locateBox(topBox, nextBox, mrgn = 0) {
     const firstDiv = document.getElementById(topBox);
     const secondDiv = document.getElementById(nextBox);
     const contentHeight = firstDiv.clientHeight;
     const firstDivBottom = firstDiv.offsetTop + contentHeight - mrgn;
     if (mrgn) {
          secondDiv.style.position = 'relative';
          secondDiv.style.marginTop = `${firstDivBottom}px`;
          secondDiv.style.position = 'static';
     } else {
          secondDiv.style.top = `${firstDivBottom}px`;
     };
};
function openBox(e = null) {

    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    let ID = e.target.id;
    let id = null;

    if (ID === 'id-header1' || ID === 'id-pageContainer' || ID === '' || ID === 'id-headline' || ID === '' || ID.includes("pid")) { closeBoxes(); return; };
     switch (ID) {
          case "id-MenuBtn1":
               id = 'id-versions';
               locateBox('id-header1', id);
               document.getElementById(id).style.display = 'block';
               selected(activeSrchVersionID, id);
               document.getElementById(activeSrchVersionID).scrollIntoView({ block: 'center' });
               break;
          case "id-openLngs":
               id = 'id-languages';
               locateBox('id-header1', id);
               document.getElementById('id-versions').style.display = 'none';
               document.getElementById(id).style.display = 'block';
               selected(`id-lang${activeSrchLanguageID}`, id);
               document.getElementById(`id-lang${activeSrchLanguageID}`).scrollIntoView({ block: 'center' });
               srchBoxesAreOpen = false;
               break;
    };

    if (srchBoxesAreOpen) { closeBoxes(); } else { srchBoxesAreOpen = true; };
};
function removeElements(id) {

     let target = document.getElementById(id);
     while (target.firstChild) {
          target.removeChild(target.firstChild);
     };
};
function selected(id, container) {

     let unselected = null;

     switch (container) {
          case "id-versions":
               unselected = pastSrchSelectedVersionID;
               pastSrchSelectedVersionID = id;
               break;
          case "id-languages":
               unselected = pastSrchSelectedLanguageID;
               pastSrchSelectedLanguageID = id;
               break;
     };
     let div = document.getElementById(unselected);
     if (unselected) { if (div) { div.classList.remove('cs-bvSelected'); }; };
     let div1 = document.getElementById(id);
     if (id) { if (div1) { div1.classList.add('cs-bvSelected'); }; };
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
function toggleTheme() {
     let theme = document.getElementById("id-theme");
     theme.classList.toggle("cs-darkTheme");
     theme.textContent = theme.classList.contains("cs-darkTheme") ? "🌙" : "☀️";
};

// Load Tables

     async function loadLanguages() {

          let i = 0;
          let menuLanguages = document.getElementById("id-languages");
          let ii = srchLanguages.findIndex(rec => rec.lid === activeSrchLanguageID);

          removeElements('id-languages');

          let div = document.createElement("div");
          div.id = 'id-languageHeader';
          div.classList.add('cs-languageHeader');

          let div1 = document.createElement("div");
          div1.classList.add('cs-languageFlag');
          let div2;
          let x = 0;
          while (x < 3) {
               div2 = document.createElement("div");
               div2.textContent = '★';
               div1.appendChild(div2);
               x++;
          };
          div.appendChild(div1);

          let spa = document.createElement("spa");
          spa.id = 'id-changeLanguage';
          spa.classList.add('cs-changeLanguage');
          spa.textContent = 'Change Language';
          div.appendChild(spa);

          div1 = document.createElement("div");
          div1.id = 'id-closeChangeLng';
          div1.classList.add("cs-openLngs");
          div1.textContent = '✕';
          div1.addEventListener("click", (e) => {
               closeLanguage(e);
               e.preventDefault();
               e.stopPropagation();
               e.stopImmediatePropagation();
          });
          div.appendChild(div1);

          div1 = document.createElement("div");
          div1.id = 'id-language';
          div1.classList.add("cs-versionHeaderLanguage");
          div1.classList.add('cs-changeLanguage');
          div1.textContent = `Language: ${srchLanguages[ii].lng}`;
          div.appendChild(div1);
          menuLanguages.appendChild(div);
          for (const lang of srchLanguages) {

               div = document.createElement("div");
               div.addEventListener("click", (e) => {
                    changeLanguage(e);
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
               });
               div.id = `id-lang${lang.lid}`;
               div.dataset.index = i;
               div.textContent = lang.lng;
               div.classList.add("cs-language");
               div.setAttribute("translate", "no");
               menuLanguages.appendChild(div);
               i++;
          };
          div = document.createElement("div");
          div.classList.add("cs-lastLine");
          div.textContent = '...';
          div.setAttribute("translate", "no");
          menuLanguages.appendChild(div);
          return true;
     };

     async function loadVersions() {

          let menuVersions = document.getElementById("id-versions");
          let menuVersion = document.getElementById("id-MenuBtn1");
          let pageHeadline = document.getElementById("id-headline");
          let i = srchVersions.findIndex(rec => rec.lid === activeSrchLanguageID);
          let ii = srchLanguages.findIndex(rec => rec.lid === activeSrchLanguageID);

          removeElements('id-versions');

          let div = document.createElement("div");
          div.id = 'id-versionHeader';
          div.classList.add('cs-versionHeader');
          let spa = document.createElement("spa");
          spa.textContent = 'Versions';
          div.appendChild(spa);

          let div1 = document.createElement("div");
          div1.id = 'id-openLngs';
          div1.classList.add("cs-openLngs");
          div1.textContent = '♥';
          div1.addEventListener("click", (e) => {
               openBox(e);
               e.preventDefault();
               e.stopPropagation();
               e.stopImmediatePropagation();
          });
          div.appendChild(div1);

          div1 = document.createElement("div");
          div1.id = 'id-versionHeaderlanguage';
          div1.classList.add("cs-versionHeaderLanguage");
          div1.textContent = `Language: ${srchLanguages[ii].lng}`;
          div.appendChild(div1);
          menuVersions.appendChild(div);

          while (i < srchVersions.length && srchVersions[i].lid === Number(activeSrchLanguageID)) {

               div = document.createElement("div");
               div.addEventListener("click", (e) => {
                    changeVersion(e);
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
               });
               div.id = `id-version${srchVersions[i].id}`;
               if (activeVersionID === div.id) {
                    menuVersion.textContent = srchVersions[i].ar;
                    pageHeadline.textContent = srchVersions[i].t;
               };
               div.dataset.index = i;
               div.textContent = `${srchVersions[i].t} - ${srchVersions[i].ar}`;
               div.classList.add("cs-version");
               div.setAttribute("translate", "no");
               menuVersions.appendChild(div);
               i++;
          };
          div = document.createElement("div");
          div.classList.add("cs-lastLine");
          div.textContent = '...';
          div.setAttribute("translate", "no");
          menuVersions.appendChild(div);
          return true;
     };
//End Load Tables