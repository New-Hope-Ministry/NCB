window.addEventListener("load", async () => {

     let rec = false;
     rec = await getDefaults();
     if (rec) { rec = false; rec = await loadBoxes(); allLoaded = true; };
     if (rec) { rec = false; rec = await getVersion(); };

     if (rec && allLoaded) {
          locateBox('id-header', 'id-mainPage', -10);
          setTimeout(() => {
               document.getElementById("id-loader").style.display = 'none';
               document.getElementById('id-readRandom').style.display = 'block';
               bookWidth();
          }, 130);
          if (setTheme === '1') {
               darkTheme();
               toggleTheme();
               rotateTheme = false;
          };
          if (savedLocal) {
               if (navigator.onLine) {
                    if ('requestIdleCallback' in window) {
                         requestIdleCallback(triggerCacheCheck);
                    } else {
                         setTimeout(() => {
                              triggerCacheCheck();
                         }, 3000);
                    };
               };
          } else {
               document.getElementById("id-end").style.display = 'block';
          };
          rec = false;
          rec = await startUp();
          if (rec) { document.getElementById('id-noDisplay').style.visibility = 'visible'; };
     };
     window.addEventListener("resize", adjustPosition);
     if ('speechSynthesis' in window) {
          if (speechSynthesis.onvoiceschanged !== undefined) {
               speechSynthesis.onvoiceschanged = listVoices;
          } else {
               listVoices();
          };
     };
});

function adjustPosition() {
     locateBox('id-header', 'id-versions');
     locateBox('id-header', 'id-books');
     locateBox('id-header', 'id-chapters');
     locateBox('id-header', 'id-versions');
};

async function bookWidth() {
     let element = document.getElementById("id-books");
     element.style.display = "block";
     let width = element.offsetWidth;
     element.style.display = "none";
     width = (width + 31) + "px";
     document.documentElement.style.setProperty('--bookWidth', width);
     element.classList.remove("cs-booksW");
     element.classList.add("cs-booksW1");
     document.getElementById("id-versions").style.width = width;
};

function closeBoxes() {
     document.getElementById('id-versions').style.display = 'none';
     document.getElementById('id-books').style.display = 'none';
     document.getElementById('id-chapters').style.display = 'none';
     document.getElementById('id-verses').style.display = 'none';
     document.getElementById('id-randomChapter').style.backgroundColor = 'ba0e0e';
     document.getElementById('id-openLngs').textContent = '♥';
     document.getElementById('id-languages').style.display = 'none';
     boxesAreOpen = false;
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

async function getChapter() {

     let activeBook = Number(activeBookID.slice("id-book".length));
     let activeChapter = Number(activeChapterID.slice("id-chapter".length));
     let i = verses.findIndex(rec => rec.bid === activeBook && rec.cn === activeChapter);

     removeElements('id-page');
     let h2 = document.createElement('h2');
     let page = document.getElementById('id-page');
     document.getElementById('id-MenuBtn2').textContent = document.getElementById(activeBookID).textContent;
     h2.textContent = `${document.getElementById(activeBookID).textContent} ${activeChapter}`;
     document.getElementById('id-bottomTitleLine').textContent = h2.textContent;
     if (isTWF) {
          let sp2 = document.createElement('span');
          sp2.classList.add('cs-edited');
          sp2.textContent = ` TWF - Last Edited: ${dateEdited}`;
          h2.appendChild(sp2);
     };
     page.appendChild(h2);

     let p;
     let pn;
     let sp;
     let spa;
     let vt;
     let vNum;

     verseCount = 0;
     while (i < verses.length && verses[i].cn === activeChapter && verses[i].bid === activeBook) {
          p = document.createElement('p');
          p.id = `id-p${verses[i].vid}`;
          pn = verses[i].pn;
          if (pn > 0 && paragraphLayoutDefault) {
               while (verses[i].pn === pn) {
                    sp = document.createElement('span');
                    sp.id = `id-versNumber${verses[i].vn}`;
                    if (verses[i].vn === 1) {
                         vNum = `${verses[i].vn} `;
                    } else { vNum = ` ${verses[i].vn} `; };
                    let aVerse = verses[i].vt;

                    if (verses[i].jq === 1) {
                         sp.innerHTML = JesusQuote(aVerse, vNum);
                    } else {
                         spa = document.createElement('span');
                         spa.classList.add("cs-verseNumber");
                         spa.textContent = vNum;
                         vt = document.createTextNode(aVerse);
                         sp.appendChild(spa);
                         sp.appendChild(vt);
                    };
                    p.appendChild(sp);
                    i++;
                    verseCount++;
               };
          } else {
               sp = document.createElement('span');
               sp.id = `id-versNumber${verses[i].vn}`;
               vNum = `${verses[i].vn} `;
               let aVerse = verses[i].vt;
               if (verses[i].jq === 1) {
                    sp.innerHTML = JesusQuote(aVerse, vNum);
               } else {
                    spa = document.createElement('span');
                    spa.classList.add("cs-verseNumber");
                    spa.textContent = vNum;
                    vt = document.createTextNode(aVerse);
                    sp.appendChild(spa);
                    sp.appendChild(vt);
               };
               p.classList.add("cs-singleVerse");
               p.appendChild(sp);
               i++;
               verseCount++;
          };
          page.appendChild(p);
     };
     loadVerses();

     if (activeBook === 1 && activeChapter === 1) { document.getElementById('id-bottomLastLine').style.visibility = 'hidden'; } else { document.getElementById('id-bottomLastLine').style.visibility = 'visible'; };

     if (activeBook === 66 && activeChapter === 22) { document.getElementById('id-bottomNextLine').style.visibility = 'hidden'; } else { document.getElementById('id-bottomNextLine').style.visibility = 'visible'; };

     setFontSize();
     document.getElementById('id-MenuBtn3').textContent = `${document.getElementById(activeChapterID).textContent}:`;
};

async function getDefaults() {

     //  The default activeVersionID is 'id-version21', which is the Twenty-First Century Version.
     //  The default activeBookID is 'id-book1', which is Genesis.
     //  The default activeChapterID is 'id-chapter1', which is the first chapter from the book of the activeBookID.
     //  The default setTheme is '0', which is the light theme.
     //  The default activeFontSize is 1.06

     //testRemover();
     const params = new URLSearchParams(window.location.search);

     let ltr = localStorage.getItem('redLetter');
     if (ltr) { redLetterDefault = Number(ltr); setRedLetter = Number(ltr); };

     let vh = params.get('vh');
     if (vh) { selectedVerseID = `id-verse${vh}`; };

     let verid = params.get('verid');
     if (verid) { activeVersionID = `id-version${verid}`; };
     if (!activeVersionID) { activeVersionID = localStorage.getItem("activeVersionID"); };
     if (!activeVersionID) { activeVersionID = defaultVersionID };

     let id = Number(activeVersionID.slice("id-version".length));
     let i = versions.findIndex(rec => rec.id === id);
     activeLanguageID = versions[i].lid;

     let bid = params.get('bid');
     if (bid) { activeBookID = `id-book${bid}`; };
     if (!activeBookID) { activeBookID = localStorage.getItem("activeBookID"); };
     if (!activeBookID) { activeBookID = defaultBookID; };

     let cn = params.get('cn');
     if (cn) { activeChapterID = `id-chapter${cn}`; };
     if (!activeChapterID) { activeChapterID = localStorage.getItem("activeChapterID"); };
     if (!activeChapterID) { activeChapterID = defaultChapterID; };

     setTheme = localStorage.getItem("setTheme");
     activeFontSize = localStorage.getItem("activeFontSize");
     if (!activeFontSize) { activeFontSize = 1.06; } else { activeFontSize = Number(activeFontSize); };
     activeFontSizeCount = localStorage.getItem("activeFontSizeCount");
     if (!activeFontSizeCount) { activeFontSizeCount = 0; } else { activeFontSizeCount = Number(activeFontSizeCount); };

     let svd = localStorage.getItem('savedLocal');
     if (svd) { savedLocal = svd; };

     return true;
};

async function getVersion(e = null) {

     let id = null;
     let res = null;
     if (e) { id = e.target.id; };
     if (!id || id === 'id-resetDefaults') { id = activeVersionID };
     closeBoxes();
     document.getElementById("id-loader").style.display = 'block';
     let aVersion = document.getElementById(id);
     let idx = Number(aVersion.dataset.index);
     let url = `data/${versions[idx].ar}/${versions[idx].ar}Verses.json`;
     if (versions[idx].ar === 'TWF') { isTWF = true } else { isTWF = false };
     try {
          res = await fetch(url);
          if (!res.ok) { throw new Error(res.status); };
          verses = await res.json();
          let holdSelectedVerseID = selectedVerseID;
          await getChapter();
          selectedVerseID = holdSelectedVerseID;
          activeVersionID = aVersion.id;
          document.getElementById('id-MenuBtn1').textContent = versions[idx].ar;
          document.getElementById('id-headline').textContent = versions[idx].t;
          activeVersionAbreviation = versions[idx].ar;
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

     if (selectedVerseID) {
          if (isNumeric(selectedVerseID)) { selectedVerseID = `id-verse${selectedVerseID}`; };
          verseHighlight(selectedVerseID);
     };

     if (versions[idx].rdl) {
          document.getElementById('id-redLetter').style.display = 'block';
          if (redLetterDefault === 0) {
               document.getElementById('id-redLetter').textContent = 'Red Letter';
          } else if (redLetterDefault === 1) {
               document.getElementById('id-redLetter').textContent = 'Blue Letter';
          } else if (redLetterDefault === 2) {
               document.getElementById('id-redLetter').textContent = 'Black Letter';
          };
     } else {
          document.getElementById('id-redLetter').style.display = 'none';
     };
     if (verses[0].pn) {
          document.getElementById('id-paragraphLayout').style.display = 'block';
     } else { document.getElementById('id-paragraphLayout').style.display = 'none'; };
     if (res) { document.getElementById("id-loader").style.display = 'none'; };
     boxesAreOpen = false;
     return true;
};

function isNumeric(value) { return !isNaN(value) && !isNaN(parseFloat(value)); };

function JesusQuote(aVerse, vNum) {

     if (redLetterDefault === 0) {
          aVerse = aVerse.replace('`', '');
          aVerse = aVerse.replace('´', '');
     } else if (redLetterDefault === 1) {
          aVerse = aVerse.replace('`', '<span class="cs-emphasis">');
          aVerse = aVerse.replace('´', '</span>');
     } else if (redLetterDefault === 2) {
          aVerse = aVerse.replace('`', '<span class="cs-emphasisBlue">');
          aVerse = aVerse.replace('´', '</span>');
     };
     return `<span class="cs-verseNumber">${vNum}</span>${aVerse}`;
};

async function listVoices() {

     let avoice;
     const voices = speechSynthesis.getVoices();
     voices.forEach((voice, index) => {
          avoice = {
               idx: index,
               name: voice.name,
               lang: voice.lang,
               default: voice.default
          };
          index++;
          localVoices.push(avoice);
     });
     let i = languages.findIndex(rec => rec.lid === activeLanguageID);
     let ndx = localVoices.findIndex(rec => rec.lang === languages[i].lngc);
     if (ndx > -1) {
          document.getElementById('id-listen').style.display = 'flex';
          document.getElementById('id-brListen').style.display = 'block';
     } else {
          document.getElementById('id-listen').style.display = 'none';
          document.getElementById('id-brListen').style.display = 'none';
     };
};

async function loadBoxes() {

     loadLanguages();
     loadVersions();
     loadBooks();
     loadChapters();
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

function removeElements(id) {

     let target = document.getElementById(id);
     while (target.firstChild) {
          target.removeChild(target.firstChild);
     };
};

function selected(id, container, reset = null) {

     let unselected = null;

     switch (container) {
          case "id-versions":
               unselected = pastSelectedVersionID;
               pastSelectedVersionID = id;
               break;
          case "id-books":
               unselected = pastSelectedBookID;
               pastSelectedBookID = id;
               break;
          case "id-chapters":
               unselected = pastSelectedChapterID;
               pastSelectedChapterID = id;
               break;
          case "id-languages":
               unselected = pastSelectedLanguageID;
               pastSelectedLanguageID = id;
               break;
          case "id-verses":
               unselected = pastSelectedVerseID;
               pastSelectedVerseID = id;
               if (id === 'id-verse0') { id = null; };
               break;
     };
     let div = document.getElementById(unselected);
     if (unselected) { if (div) { div.classList.remove('cs-bvSelected'); }; };
     let div1 = document.getElementById(id);
     if (id && !reset) { if (div1) { div1.classList.add('cs-bvSelected'); }; };
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

async function startUp() {

     let id = null;

     if (activeVersionID) {
          id = Number(activeVersionID.slice("id-version".length));
          setQuerystring('verid', id);
          selected(activeVersionID, 'id-versions');
     };
     if (activeBookID) {
          id = Number(activeBookID.slice("id-book".length));
          setQuerystring('bid', id);
          selected(activeBookID, 'id-books');
     };
     if (activeChapterID) {
          id = Number(activeChapterID.slice("id-chapter".length));
          setQuerystring('cn', id);
          selected(activeChapterID, 'id-chapters');
     };
     return true;
};

function toggleTheme() {
     let theme = document.getElementById("id-theme");
     theme.classList.toggle("cs-darkTheme");
     theme.textContent = theme.classList.contains("cs-darkTheme") ? "🌙" : "☀️";
};

async function triggerCacheCheck() {
     const LAST_CHECK_KEY = 'lastCacheCheck';
     const today = new Date();
     const dayOfWeek = today.getDay();
     if (dayOfWeek === 0) { console.log(`Caches not checked it's Sunday`); return; };
     const now = Date.now();
     const sevenDays = 7 * 24 * 60 * 60 * 1000;

     const lastCheck = parseInt(localStorage.getItem(LAST_CHECK_KEY), 10);
     if (!lastCheck || now - lastCheck >= sevenDays) {
          try {
               const registration = await navigator.serviceWorker.ready;
               const activeWorker = registration.active || navigator.serviceWorker.controller;

               if (activeWorker) {
                    activeWorker.postMessage({ action: 'checkCaches' });
                    localStorage.setItem(LAST_CHECK_KEY, now.toString());
                    console.log('checkCaches triggered and timestamp updated.');
               } else {
                    console.warn('No active service worker found.');
               }
          } catch (err) {
               console.error('Failed to trigger checkVerses:', err);
          }
     } else {
          console.log('checkVerses skipped — last run was less than 7 days ago.');
     };
};

function verseHighlight(id) {

     let vh = document.getElementById(id).textContent;
     document.getElementById('id-MenuBtn4').textContent = vh;
     selectedVerseNumberID = `id-versNumber${vh}`;
     const spa = document.getElementById(selectedVerseNumberID);
     const selection = window.getSelection();
     const range = document.createRange();
     range.selectNodeContents(spa);
     selection.removeAllRanges();
     selection.addRange(range);
     spa.scrollIntoView({ block: 'center' });
     closeBoxes();
     //boxOpen = 0;
};

// Load Tables functions

     async function loadBooks() {

          let i = 0;
          let ii = 0;

          removeElements('id-books');

          let menuBooks = document.getElementById('id-books');
          let div = document.createElement('div');
          div.id = 'id-bookHeader';
          div.classList.add('cs-bookHeader');

          let spa = document.createElement('span');
          spa.textContent = 'Books';
          div.appendChild(spa);

          let div1 = document.createElement("div");
          div1.id = 'id-closeBook';
          div1.classList.add("cs-closeBook");
          div1.addEventListener("click", (e) => {
               sortBooks(e);
               e.preventDefault();
               e.stopPropagation();
               e.stopImmediatePropagation();
          });
          if (bookSort) {
               div1.title = 'Sort Biblically';
          } else { div1.title = 'Sort Alphabetically'; };

          spa = document.createElement('span');
          spa.id = 'id-heart';
          spa.classList.add('cs-heart');
          spa.textContent = '♥';

          div1.appendChild(spa);
          div.appendChild(div1);
          menuBooks.appendChild(div);

          while (i < 39) {
               div = document.createElement('div');
               div.classList.add('cs-bookLine');
               div1 = document.createElement('div');
               div1.addEventListener("click", (e) => {
                    changeBook(e);
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
               });
               div1.id = `id-book${oldBooks[i].id}`;
               div1.classList.add('cs-book');
               div1.classList.add('cs-bookRight');
               div1.dataset.bid = oldBooks[i].id;
               div1.dataset.chapters = oldBooks[i].c;
               div1.textContent = oldBooks[i].t;
               if (activeBookID === div1.id) { chapterCount = Number(div1.dataset.chapters); };
               div1.setAttribute("translate", "no");
               div.appendChild(div1);

               if (ii < 27) {
                    div1 = document.createElement('div');
                    div1.addEventListener("click", (e) => {
                         changeBook(e);
                         e.preventDefault();
                         e.stopPropagation();
                         e.stopImmediatePropagation();
                    });
                    div1.id = `id-book${newBooks[ii].id}`;
                    div1.classList.add('cs-book');
                    div1.dataset.bid = newBooks[ii].id;
                    div1.dataset.chapters = newBooks[ii].c;
                    div1.textContent = newBooks[ii].t;
               } else {
                    div1 = document.createElement('div');
                    div1.classList.add('cs-endBook');
               };
               if (activeBookID === div1.id) { chapterCount = Number(div1.dataset.chapters); };
               div.setAttribute("translate", "no");
               div.appendChild(div1);
               menuBooks.appendChild(div);
               i++;
               ii++;
          };
          div = document.createElement('div');
          div.id = 'id-lastBookLine';
          div.classList.add('cs-lastLine');
          div.insertAdjacentHTML('beforeend', `...`);
          menuBooks.appendChild(div);
          return true;
     };

     async function loadChapters() {

          let menuChapters = document.getElementById('id-chapters');
          let div = document.createElement('div');
          let div1;
          let x = 0;

          removeElements('id-chapters');
          div.classList.add('cs-chapterHeader');
          div.textContent = 'Chapters';
          menuChapters.appendChild(div);

          let activeBook = Number(activeBookID.slice("id-book".length));
          //let activeChapter = Number(activeChapterID.slice("id-chapter".length));

          if (activeBook < 40) {
               let i = oldBooks.findIndex(rec => rec.id === activeBook);
               chapterCount = Number(oldBooks[i].c);
          } else {
               let i = newBooks.findIndex(rec => rec.id === activeBook);
               chapterCount = Number(newBooks[i].c);
          };
          chapterCount++;

          for (let i = 1; i < chapterCount; i++) {

               div = document.createElement('div');
               div.classList.add('cs-chapterLine');
               while (x < 5 && i < chapterCount) {
                    div1 = document.createElement('div');
                    div1.addEventListener("click", (e) => {
                         changeChapter(e);
                         e.preventDefault();
                         e.stopPropagation();
                         e.stopImmediatePropagation();
                    });
                    div1.id = `id-chapter${i}`;
                    div1.classList.add('cs-chapter');
                    div1.textContent = i;
                    div1.setAttribute("translate", "no");
                    div.appendChild(div1);
                    i++;
                    x++;
               };
               i = i - 1;
               x = 0;
               div.setAttribute("translate", "no");
               menuChapters.appendChild(div);
          };
          div = document.createElement('div');
          div.id = 'id-lastChapterLine';
          div.classList.add('cs-lastLine');
          div.textContent = '...';
          menuChapters.appendChild(div);
          return true;
     };

     async function loadLanguages() {

          let i = 0;
          let menuLanguages = document.getElementById("id-languages");
          let ii = languages.findIndex(rec => rec.lid === activeLanguageID);

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
          div1.textContent = `Language: ${languages[ii].lng}`;
          div.appendChild(div1);
          menuLanguages.appendChild(div);
          for (const lang of languages) {

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

     async function loadVerses() {

          let menuVerses = document.getElementById('id-verses');
          let div = document.createElement('div');
          let div1;
          let x = 0;
          let y = 1;

          removeElements('id-verses');
          div.classList.add('cs-verseHeader');
          div.textContent = 'Verses';
          menuVerses.setAttribute("translate", "no");
          menuVerses.appendChild(div);
          verseCount++;

          for (let i = 1; i < verseCount; i++) {

               div = document.createElement('div');
               div.id = `id-verseLine${y}`;
               y++;
               div.classList.add('cs-verseLine');
               while (x < 5 && i < verseCount) {
                    div1 = document.createElement('div');
                    div1.addEventListener("click", (e) => {
                         findVerse(e);
                         e.preventDefault();
                         e.stopPropagation();
                         e.stopImmediatePropagation();
                    });
                    div1.id = `id-verse${i}`;
                    div1.classList.add('cs-verse');
                    div1.textContent = i;
                    div1.setAttribute("translate", "no");
                    div.appendChild(div1);
                    i++;
                    x++;
               };
               i = i - 1;
               x = 0;
               menuVerses.appendChild(div);
          };
          div.id = 'id-lastVerseLine';
          div = document.createElement('div');
          div.classList.add('cs-lastLine');
          div.textContent = '...';
          menuVerses.appendChild(div);
          return true;
     };

     async function loadVersions() {

          let menuVersions = document.getElementById("id-versions");
          let menuVersion = document.getElementById("id-MenuBtn1");
          let pageHeadline = document.getElementById("id-headline");
          let i = versions.findIndex(rec => rec.lid === activeLanguageID);
          let ii = languages.findIndex(rec => rec.lid === activeLanguageID);

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
               openBoxes(e);
               e.preventDefault();
               e.stopPropagation();
               e.stopImmediatePropagation();
          });
          div.appendChild(div1);

          div1 = document.createElement("div");
          div1.id = 'id-versionHeaderlanguage';
          div1.classList.add("cs-versionHeaderLanguage");
          div1.textContent = `Language: ${languages[ii].lng}`;
          div.appendChild(div1);
          menuVersions.appendChild(div);

          while (i < versions.length && versions[i].lid === Number(activeLanguageID)) {

               div = document.createElement("div");
               div.addEventListener("click", (e) => {
                    changeVersion(e);
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
               });
               div.id = `id-version${versions[i].id}`;
               if (activeVersionID === div.id) {
                    menuVersion.textContent = versions[i].ar;
                    pageHeadline.textContent = versions[i].t;
               };
               div.dataset.index = i;
               div.textContent = `${versions[i].t} - ${versions[i].ar}`;
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

// End Load Tables functions