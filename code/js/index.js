window.addEventListener("load", async () => {

     let rec = false;
     rec = await getDefaults();
     //if (rec) { rec = false; rec = await loadBoxes(); allLoaded = true; };
     if (rec) { rec = false; rec = await getVersion(); };

     if (rec) {
          locateBox('id-header', 'id-mainPage', -10);
          setTimeout(() => {
               document.getElementById("id-loader").style.display = 'none';
               document.getElementById('id-readRandom').style.display = 'block';
               //bookWidth();
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
          //rec = false;
          //rec = await startUp();
          if (rec) { document.getElementById('id-noDisplay').classList.remove('cs-hidden'); document.getElementById('id-noDisplay').style.visibility = 'visible'; };
     };

     if ('speechSynthesis' in window) {
          if (speechSynthesis.onvoiceschanged !== undefined) {
               speechSynthesis.onvoiceschanged = listVoices;
          } else {
               listVoices();
          };
     };
});

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

     let books = [];
     let activeBook = Number(activeBookID.slice("id-book".length));
     let activeChapter = Number(activeChapterID.slice("id-chapter".length));
     if (activeBook < 40) {
          books = oldBooks;
     } else {
          books = newBooks;
     };
     let idx = books.findIndex(rec => rec.id === activeBook);
     let i = verses.findIndex(rec => rec.bid === activeBook && rec.cn === activeChapter);

     removeElements('id-page');
     let h2 = document.createElement('h2');
     let page = document.getElementById('id-page');
     document.getElementById('id-MenuBtn2').textContent = books[idx].t;
     h2.textContent = `${books[idx].t} ${activeChapter}`;
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
     document.getElementById('id-MenuBtn3').textContent = `${activeChapter}:`;
     return true;
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

     paragraphLayoutDefault = localStorage.getItem("paragraphLayout");
     if (!paragraphLayoutDefault) {
          paragraphLayoutDefault = 0;
          document.getElementById('id-paragraphLayout').textContent = 'Paragraph Layout';
     } else {
          paragraphLayoutDefault = Number(paragraphLayoutDefault);
          if (paragraphLayoutDefault) { document.getElementById('id-paragraphLayout').textContent = 'Line Layout'; }
     };

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
     let activeVersion = null;

     if (e) { id = e.target.id; activeVersionID = id; };
     if (!id || id === 'id-resetDefaults') { id = activeVersionID; };
     //closeBoxes();
     //document.getElementById("id-loader").style.display = 'block';
     //let aVersion = document.getElementById(id);
     //let idx = Number(aVersion.dataset.index);

     activeVersion = Number(id.slice("id-version".length));
     let idx = versions.findIndex(rec => rec.id === activeVersion);

     let url = `data/${versions[idx].ar}/${versions[idx].ar}Verses.json`;
     if (versions[idx].ar === 'TWF') { isTWF = true } else { isTWF = false };
     try {
          res = await fetch(url);
          if (!res.ok) { throw new Error(res.status); };
          verses = await res.json();
          let holdSelectedVerseID = selectedVerseID;
          await getChapter();
          selectedVerseID = holdSelectedVerseID;
          //activeVersionID = aVersion.id;
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
          aVerse = aVerse.replaceAll('`', '');
          aVerse = aVerse.replaceAll('´', '');
     } else if (redLetterDefault === 1) {
          aVerse = aVerse.replaceAll('`', '<span class="cs-emphasis">');
          aVerse = aVerse.replaceAll('´', '</span>');
     } else if (redLetterDefault === 2) {
          aVerse = aVerse.replaceAll('`', '<span class="cs-emphasisBlue">');
          aVerse = aVerse.replaceAll('´', '</span>');
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

async function setFontSize() {
     const allP = document.querySelectorAll('p');
     for (const ps of allP) {
          if (ps.id !== 'id-endLine') { ps.style.fontSize = `${activeFontSize}rem`; };
     };
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
};
