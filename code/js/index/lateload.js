function changeBook(e = null) {

     if (e) { activeBookID = e.target.id; };
     let activeBook = Number(activeBookID.slice("id-book".length));
     activeChapterID = 'id-chapter1';
     chapterCount = Number(document.getElementById(activeBookID).dataset.chapters);
     document.getElementById('id-MenuBtn3').textContent = '1:';
     document.getElementById('id-MenuBtn4').textContent = '1:';
     getChapter();
     loadChapters();
     closeBoxes();
     selected(activeBookID, 'id-books');
     selected(activeChapterID, 'id-chapters');
     setQuerystring('bid', activeBook);
     setQuerystring('cn', 1);
     removeQueryParam('vh');
     unHighlight();
     document.getElementById('top').scrollIntoView({ block: 'start' });
     boxOpen = 0;
};

function changeChapter(e = null) {

     if (e) { activeChapterID = e.target.id; };
     let activeChapter = Number(activeChapterID.slice("id-chapter".length));
     chapterCount = Number(document.getElementById(activeBookID).dataset.chapters);
     getChapter();
     loadChapters();
     closeBoxes();
     selected(activeChapterID, 'id-chapters');
     setQuerystring('cn', activeChapter);
     document.getElementById('id-MenuBtn4').textContent = '1';
     unHighlight();
     document.getElementById('top').scrollIntoView({ block: 'start' });
     boxOpen = 0;
};

async function changeLanguage(e = null) {

     let id;
     if (e) { id = e.target.id; };
     let idx = Number(document.getElementById(id).dataset.index);
     activeBookID = defaultBookID;
     activeChapterID = defaultChapterID;
     activeLanguageID = languages[idx].lid;
     let i = localVoices.findIndex(rec => rec.lang === languages[idx].lngc);
     if (i > -1) {
          document.getElementById('id-listen').style.display = 'flex';
          document.getElementById('id-brListen').style.display = 'block';
     } else {
          document.getElementById('id-listen').style.display = 'none';
          document.getElementById('id-brListen').style.display = 'none';
     };
     loadVersions();
     document.getElementById('id-language').textContent = `Language: ${languages[idx].lng}`;
     closeLanguage();
     let parentElement = document.getElementById('id-versions');
     let selectedVersion = parentElement.children[1];
     activeVersionID = selectedVersion.id;
     selectedVersion.click();

     setQuerystring('bid', 1);
     setQuerystring('cn', 1);
     setQuerystring('verid', activeVersionID);
     localStorage.setItem('activeBookID', activeBookID);
     localStorage.setItem('activeChapterID', activeChapterID);
     localStorage.setItem('activeVersionID', activeVersionID);

     selected(id, 'id-languages');
     selected(activeVersionID, 'id-versions');
     selected(activeBookID, 'id-books');
     selected(activeChapterID, 'id-chapters');
     unHighlight();

     document.getElementById('top').scrollIntoView({ block: 'start' });
};

async function changeVersion(e = null) {

     closeBoxes();
     let div = document.createElement("div");
     div.id = 'id-versionLoader';
     div.classList.add('cs-loader');
     div.textContent ='✝';
     document.body.appendChild(div);

     let rec = false;
     rec = await getVersion(e);

     if (rec) { locateBox('id-header', 'id-mainPage', -10); };
     let activeVersion = Number(activeVersionID.slice("id-version".length));
     selected(activeVersionID, 'id-versions');
     setQuerystring('cn', 1);
     setQuerystring('verid', activeVersion);
     if (rec) { div.remove(); }
     return true;
};

function findVerse(e = null) {

     closeBoxes();
     let id;
     if (e) { id = e.target.id; };
     let save = Number(id.slice("id-verse".length));
     verseHighlight(id);
     setQuerystring('vh', save);
     selected(id, 'id-verses');
};

function lastChapter() {

     let i = 0;
     let books = [];
     let bid = Number(document.getElementById(activeBookID).dataset.bid);

     if (bid < 40) {
          i = oldBooks.findIndex(rec => rec.id === bid);
          books = oldBooks;
     } else {
          i = newBooks.findIndex(rec => rec.id === bid);
          books = newBooks;
     };

     let chapter = Number(document.getElementById(activeChapterID).textContent) - 1;
     if (chapter < 1) { bid--; chapter = books[i - 1].c; chapterCount = books[i - 1].c; };
     activeBookID = `id-book${bid}`;
     activeChapterID = `id-chapter${chapter}`;
     loadChapters();
     getChapter();
     removeQueryParam('vh');
     document.getElementById('id-MenuBtn4').textContent = '1:';
     unHighlight();
     document.getElementById('top').scrollIntoView({ block: 'start' });
};

function nextChapter() {

     let i = 0;
     let books = [];
     let bid = Number(document.getElementById(activeBookID).dataset.bid);
     if (bid < 40) {
          i = oldBooks.findIndex(rec => rec.id === bid);
          books = oldBooks;
     } else {
          i = newBooks.findIndex(rec => rec.id === bid);
          books = newBooks;
     };
     let chapters = books[i].c;
     let chapter = Number(document.getElementById(activeChapterID).textContent) + 1;
     if (chapter > chapters) { bid++; chapter = 1; };
     activeBookID = `id-book${bid}`;
     activeChapterID = `id-chapter${chapter}`;
     if (bid < 40) {
          i = oldBooks.findIndex(rec => rec.id === bid);
          books = oldBooks;
     } else {
          i = newBooks.findIndex(rec => rec.id === bid);
          books = newBooks;
     };
     chapterCount = books[i].c;
     getChapter();
     loadChapters();
     removeQueryParam('vh');
     document.getElementById('id-MenuBtn4').textContent = '1:';
     unHighlight();
     document.getElementById('top').scrollIntoView({ block: 'start' });
};

function synthVoice() {
     const params = new URLSearchParams(window.location.search);
     const verid = params.get('verid');
     const bid = params.get('bid');
     const cn = params.get('cn');

     const readParams = new URLSearchParams();

     if (verid !== null && verid !== 'null') readParams.set('verid', verid);
     if (bid !== null && bid !== 'null') readParams.set('bid', bid);
     if (cn !== null && cn !== 'null') readParams.set('cn', cn);

     let ahref = `apps/synth.html?${readParams.toString()}`;
     if (isLive) { ahref = ahref.replace(".html", ""); };
     window.location.href = ahref;
};

function readChronological() {

     const params = new URLSearchParams(window.location.search);
     const verid = params.get('verid');

     let ahref = `apps/chron.html?verid=${verid}`;
     if (isLive) { ahref = ahref.replace(".html", ""); };
     window.location.href = ahref;
};

function readRandomChapter() {

     let min = 30640;
     let i = Math.floor(Math.random() * (0 - min + 1)) + min;
     let bid = verses[i].bid;
     let cn = verses[i].cn;

     activeBookID = `id-book${bid}`;
     activeChapterID = `id-chapter${cn}`;
     getChapter();
     document.getElementById('top').scrollIntoView({ block: 'start' });
     closeBoxes();
};



// LateLoad boxes

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
          div1.title = 'Close Change Language';
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
          div1.title = 'Change Language';
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

     async function loadBoxes() {
          loadLanguages();
          loadVersions();
          loadBooks();
          loadChapters();
          bookWidth();
          startUp();
          return true;
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
// End LateLoad Boxes