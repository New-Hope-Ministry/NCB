let domReadyPromise = (async () => {
    return new Promise(async resolve => {
        document.addEventListener("DOMContentLoaded", async () => {
          // DOMContentLoaded event fires before page is displayed

            let rec = await getDefaults();
            if (rec) rec = await getVersion();
            if (rec) rec = await getMenus();
            resolve();
        });
    });
})();

window.addEventListener("load", async () => {
     // load event fires after page is displayed

     await domReadyPromise;
     let paraLayout = document.getElementById('id-paragraphLayout');
     let lastEdit = document.getElementById('id-lastEdited');
     let cpyRight = document.getElementById('id-copyrighted');
     let installed = document.getElementById('id-installed');
     let ldr = document.getElementById("id-loaderContainer");
     let noDisplay = document.getElementById('id-noDisplay');
     let end = document.getElementById("id-end");

     if (setTheme === '1') { darkTheme(); toggleTheme(); rotateTheme = false; };
     if (paraLayout) { if (!paragraphLayoutDefault) { paraLayout.textContent = 'Paragraph Layout';
     } else { if (paragraphLayoutDefault) { paraLayout.textContent = 'Line Layout'; } }; };
     if (lastEdit) { lastEdit.textContent = `Last Date Edited: ${dateEdited}`; };
     if (cpyRight) { cpyRight.textContent = copyrighted; };
     if (installed) { if (inst) { installed.textContent = 'The Ark Bible is Installed!'; } else { installed.textContent = 'The Ark Bible is Not Installed!'; }; };

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
     } else { if (end) { end.style.display = 'block'; }; };

     if (ldr) { ldr.style.display = 'none'; };
     if (noDisplay) { noDisplay.style.visibility = 'visible'; };

});

async function loadBoxes() {
     loadVersions(changeVersion);
     loadBooks(changeBook);
     loadChapters(changeChapter);
     startUp();
     boxesLoaded = true;
     return true;
};

async function getDefaults() {

     const params = new URLSearchParams(window.location.search);
     let vh = params.get('vh');
     if (vh) { selectedVerseID = `id-verse${vh}`; };

     let verid = params.get('verid');
     if (verid) { activeVersionID = `id-version${verid}`; };
     if (!activeVersionID) { activeVersionID = localStorage.getItem("activeVersionID"); };
     if (!activeVersionID) { activeVersionID = defaultVersionID };

     let bid = params.get('bid');
     if (bid) { activeBookID = `id-book${bid}`; };
     if (!activeBookID) { activeBookID = localStorage.getItem("activeBookID"); };
     if (!activeBookID) { activeBookID = defaultBookID; };

     let cn = params.get('cn');
     if (cn) { activeChapterID = `id-chapter${cn}`; };
     if (!activeChapterID) { activeChapterID = localStorage.getItem("activeChapterID"); };
     if (!activeChapterID) { activeChapterID = defaultChapterID; };

     await getDesignDefaults();
     return true;
};

async function openBoxes(e = null) {

     stopBubbles(e);
     let ID = e.target.id;
     let id = null;

     if (!boxesLoaded) { await loadBoxes(); };
     let check = await checkID(ID);
     if (check) { return; };

     const params = new URLSearchParams(window.location.search);
     let vh = params.get('vh');
     if (vh) { selectedVerseID = `id-verse${vh}`; };

     switch (ID) {
          case "id-MenuBtn1":
               id = 'id-versions';
               document.getElementById(id).style.display = 'block';
               document.getElementById(activeVersionID).scrollIntoView({ block: 'center' });
               break;
          case "id-MenuBtn2":
               id = 'id-books';
               document.getElementById(id).style.display = 'block';
               document.getElementById(activeBookID).scrollIntoView({ block: 'center' });
               break;
          case "id-MenuBtn3":
               id = 'id-chapters';
               document.getElementById(id).style.display = 'block';
               document.getElementById(activeChapterID).scrollIntoView({ block: 'center' });
               break;
          case "id-MenuBtn4":
               id = 'id-verses';
               document.getElementById(id).style.display = 'block';
               if (vh) { selectedVerseID = `id-verse${vh}`; };
               if (selectedVerseID) {
                    selected(selectedVerseID, 'id-verses');
                    document.getElementById(selectedVerseID).scrollIntoView({ block: 'center' });
               } else {
                    document.getElementById('id-verseLine1').scrollIntoView({ block: 'center' });
               };
               break;
          default:
               break;
     };
     if (boxesAreOpen) { closeBoxes(); } else { boxesAreOpen = true; };
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

function setMenu(ID) {

     let val;
     switch (ID) {
          case "id-MenuBtn1":
               let verid = Number(activeVersionID.slice('id-version'.length));
               val = getVersionsABR(verid);
               break;
          case "id-MenuBtn2":
               let bid = Number(activeBookID.slice("id-book".length));
               val = getBookTitle(bid);
               break;
          case "id-MenuBtn3":
               val = `${Number(activeChapterID.slice("id-chapter".length))}:`;
               break;
          case "id-MenuBtn4":
               if (selectedVerseID) {
                    val = `${Number(selectedVerseID.slice("id-verse".length))}`;
               } else { val = '1'; }
               break;
          default:
               break;
     };
     return val;
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
          console.log('checkVerses skipped - last run was less than 7 days ago.');
     };
};

// Page  functions
     function readChron() {

          let ahref = `apps/chron.html`;
          if (isLive) { ahref = ahref.replace(".html", ""); };
          window.location.href = ahref;
     };

     function readRandomChapter(e = null) {

          stopBubbles(e);
          let min = 30640;
          let i = Math.floor(Math.random() * (0 - min + 1)) + min;
          let bid = verses[i].bid;
          let cn = verses[i].cn;

          activeBookID = `id-book${bid}`;
          activeChapterID = `id-chapter${cn}`;
          getChapter();
          closeBoxes();
          document.getElementById('top').scrollIntoView({ block: 'start' });
     };

     function openListen() {
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
// End of Page  functions

// Settings functions
     function changeFontSize(direction) {

          if (direction === '+') {
               if (activeFontSizeCount > 8) { return; };
               activeFontSize = activeFontSize * 1.15;
               activeFontSizeCount++;
          } else if (direction === '-') {
               if (activeFontSizeCount < 1) { return; };
               activeFontSize = activeFontSize / 1.15;
               activeFontSizeCount--;
          } else if (direction === 'd') {
               activeFontSize = defaultFontSize;
               activeFontSizeCount = 0;
          };
          setFontSize();

          localStorage.setItem("activeFontSizeCount", activeFontSizeCount);
          localStorage.setItem("activeFontSize", activeFontSize);
     };

     function changeTheme() {

          toggleTheme();
          if (rotateTheme) {
               darkTheme();
               rotateTheme = false;
               setTheme = '1';
               localStorage.setItem("setTheme", '1');
          } else {
               lightTheme();
               rotateTheme = true;
               setTheme = '0';
               localStorage.setItem("setTheme", '0');
          };

     };

     async function deleteData() {

          localStorage.removeItem('installed');
          localStorage.removeItem('savedLocal');
          document.getElementById('top').scrollIntoView({ block: 'start' });
          await unregisterServiceWorkers();
     };

     function resetDefaults() {

          let confirmed = confirm('You are about to reset all saved settings and file storage settings. Changes will take effect immediately. Click OK to continue or Cancel to abort!');
          if (!confirmed) { return; };

          let theme = document.getElementById("id-themeBtn");

          rotateTheme = false;
          changeTheme();
          theme.textContent = "☀️";
          if (theme.classList.contains('cs-darkTheme')) { theme.classList.remove('cs-darkTheme'); };
          rotateTheme = true;
          changeFontSize('d');
          localStorage.clear();

          paragraphLayoutDefault = 0;
          redLetterDefault = 0;
          selectedVerseID = null;

          activeVersionID = defaultVersionID;
          activeBookID = defaultBookID;
          activeChapterID = defaultChapterID;
          let activeVersion = Number(defaultVersionID.slice("id-version".length));

          loadVersions(changeVersion);
          getVersion();
          deleteData();

          selected(activeVersionID, 'id-versions');
          selected(activeBookID, 'id-books');
          selected(activeChapterID, 'id-chapters');

          setQuerystring('bid', 1);
          setQuerystring('cn', 1);
          setQuerystring('verid', activeVersion);

          document.getElementById('id-MenuBtn4').textContent = '1:';
          document.getElementById('id-paragraphLayout').textContent = 'Paragraph Layout';
          document.getElementById('id-redLetter').textContent = 'Red Letter';
          document.getElementById(defaultVersionID).classList.add('cs-bvSelected');

          pastSelectedVersionID = defaultVersionID;
          pastSelectedBookID = defaultBookID;
          pastSelectedChapterID = defaultChapterID;
          pastSelectedVerseID = selectedVerseID;

          document.getElementById('id-pageContainer').scrollTo({ top: 0, behavior: "smooth" });
          // getMenus is in shared.js, but it calls setMenu in index.js
          getMenus();
     };
// End of Settings functions

// Client Side serviceworker code.
     async function closeSave() {
          const keys = await caches.keys();
          await Promise.all(keys.map(key => caches.delete(key)));
          document.getElementById('id-end').style.display = 'none';
          localStorage.setItem("savedLocal", true);
     };

     async function saveLocal() {
          if (navigator.onLine) {
               if ('serviceWorker' in navigator) {
                    (async () => {
                         try {
                              const registration = await navigator.serviceWorker.register('sw.js');
                              console.log('Service Worker registered with scope:', registration.scope);
                              localStorage.setItem("installed", true);
                         } catch (error) {
                              console.log('Service Worker registration failed:', error);
                         };
                    })();
               };
               localStorage.setItem("savedLocal", true);
               document.getElementById('id-end').style.display = 'none';
          } else {
               alert('You must have an active internet connection to install The Ark Bible files locally.')
          };
     };

     async function unregisterServiceWorkers() {

          if ('serviceWorker' in navigator) {
               try {
                    //const keys = await caches.keys();
                    //await Promise.all(keys.map(key => caches.delete(key)));
                    const registrations = await navigator.serviceWorker.getRegistrations();
                    if (registrations.length > 0) {
                         await Promise.all(
                              registrations.map(async (registration) => {
                                   const unregistered = await registration.unregister();
                                   console.log('Service worker unregistered:', unregistered);
                              })
                         );
                    };
               } catch (error) {
                    console.error('Error during unregistering:', error);
               };
          };
     };
// End of client Side serviceworker code.