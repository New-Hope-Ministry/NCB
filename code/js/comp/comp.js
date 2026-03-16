// Page Variables
     var verses1 = [];
// End of Page Variables

let domReadyPromise = (async () => {
    return new Promise(async resolve => {
          document.addEventListener("DOMContentLoaded", async () => {
               // DOMContentLoaded event fires before page is displayed

               fetchPrefix = '../';
               let rec = await getDefaults();
               if (!boxesLoaded && rec) { rec = false; rec = await loadBoxes(); };
               if (rec) { rec = false; rec = await getVersion(); };
               if (rec) { rec = false; rec = await getCompVersion(); };
               if (rec) { rec = false; rec = await getMenus(); };
               resolve();
          });
    });
})();

// Page Functions
     async function getDefaults() {

          const params = new URLSearchParams(window.location.search);
          let bid = params.get('bid');
          if (bid) { activeBookID = `id-book${bid}`; };
          if (!activeBookID) { activeBookID = localStorage.getItem("activeBookID"); };
          if (!activeBookID) { activeBookID = defaultBookID; };

          let cn = params.get('cn');
          if (cn) { activeChapterID = `id-chapter${cn}`; };
          if (!activeChapterID) { activeChapterID = localStorage.getItem("activeChapterID"); };
          if (!activeChapterID) { activeChapterID = defaultChapterID; };

          let verid = params.get('verid');
          if (verid) { activeVersionID = `id-version${verid}`; };
          if (!activeVersionID) { activeVersionID = localStorage.getItem("activeVersionID"); };
          if (!activeVersionID) { activeVersionID = defaultVersionID };

          let verid1 = params.get('verid1');
          if (verid1) { activeCompVrsnID = `id-versionA${verid1}`; };
          if (!activeCompVrsnID) { activeCompVrsnID = localStorage.getItem("activeCompVrsnID"); };
          if (!activeCompVrsnID) { activeCompVrsnID = defaultCompVrsnID };

          await getDesignDefaults();
          return true;
     };

     async function loadBoxes() {
          loadVersions(changeVersion);
          loadVersions(changeCompVersion, 'id-versions1Box', 'A');
          loadBooks(changeCompBook);
          loadChapters(changeCompChapter);
          startUp();
          boxesLoaded = true;
          return true;
     };

     async function openBoxes(e = null) {

          stopBubbles(e);
          let ID = e.target.id;
          let id = null;

          if (!boxesLoaded) { await loadBoxes(); };
          let check = await checkID(ID);
          if (check) { return; };

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
                    id = 'id-versions1';
                    document.getElementById(id).style.display = 'block';
                    document.getElementById(activeVersionID).scrollIntoView({ block: 'center' });
                    break;
               default:
                    break;
          };
          if (boxesAreOpen) { closeBoxes(); } else { boxesAreOpen = true; };
     };

     function selected(id, container, reset = null) {

          let unselected = null;

          switch (container) {
               case "id-books":
                    unselected = pastSelectedBookID;
                    pastSelectedBookID = id;
                    break;
               case "id-chapters":
                    unselected = pastSelectedChapterID;
                    pastSelectedChapterID = id;
                    break;
               case "id-versions":
                    unselected = pastSelectedVersionID;
                    pastSelectedVersionID = id;
                    break;
               case "id-versions1":
                    unselected = pastSelectedCompVrsnID;
                    pastSelectedCompVrsnID = id;
                    break;
               default:
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
                    let vrsn1 = Number(activeVersionID.slice('id-version'.length));
                    val = getVersionsABR(vrsn1);
                    break;
               case "id-MenuBtn2":
                    let bid = Number(activeBookID.slice("id-book".length));
                    val = getBookTitle(bid);
                    break;
               case "id-MenuBtn3":
                    val = `${Number(activeChapterID.slice("id-chapter".length))}:`;
                    break;
               case "id-MenuBtn4":
                    let vrsn2 = Number(activeCompVrsnID.slice('id-versionA'.length));
                    val = getVersionsABR(vrsn2);
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
          if (activeCompVrsnID) {
               id = Number(activeCompVrsnID.slice("id-versionA".length));
               setQuerystring('verid1', id);
               selected(activeCompVrsnID, 'id-versions1');
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
// End of Page Functions

// Page Navigation Functions
     function changeCompBook(e = null) {

          stopBubbles(e);
          if (e) { activeBookID = e.target.id; };
          let activeBook = Number(activeBookID.slice("id-book".length));
          activeChapterID = 'id-chapter1';

          getChapter();
          getChapter(1, 'A', verses1);
          loadChapters(changeCompChapter);
          closeBoxes();
          selected(activeBookID, 'id-books');
          selected(activeChapterID, 'id-chapters');
          setQuerystring('bid', activeBook);
          setQuerystring('cn', 1);
          removeQueryParam('vh');

          document.getElementById('id-mainPage').scrollTo({ top: 0, behavior: "instant" });
          document.getElementById('id-mainPage1').scrollTo({ top: 0, behavior: "instant" });
          boxOpen = 0;

          getMenus();
     };

     function changeCompChapter(e = null) {

          stopBubbles(e);
          if (e) { activeChapterID = e.target.id; };
          let activeChapter = Number(activeChapterID.slice("id-chapter".length));

          getChapter();
          getChapter(1, 'A', verses1);

          closeBoxes();
          selected(activeChapterID, 'id-chapters');
          setQuerystring('cn', activeChapter);
          document.getElementById('id-mainPage').scrollTo({ top: 0, behavior: "instant" });
          document.getElementById('id-mainPage1').scrollTo({ top: 0, behavior: "instant" });
          boxOpen = 0;

          getMenus();
     };

     async function changeCompVersion(e = null) {

          stopBubbles(e);
          closeBoxes();

          let verid1 = await getCompVersion(e);
          selected(activeCompVrsnID, 'id-versions1');
          setQuerystring('verid1', verid1);
          getMenus();
          return true;
     };

     async function compLastChapter(e = null) {

          stopBubbles(e);
          await lastChapter(e);
          await getChapter(1, 'A', verses1);
          document.getElementById('id-mainPage').scrollTo({ top: 0, behavior: "instant" });
          document.getElementById('id-mainPage1').scrollTo({ top: 0, behavior: "instant" });
     };


     async function compNextChapter(e = null) {

          stopBubbles(e);
          await nextChapter(e);
          await getChapter(1, 'A', verses1);
          document.getElementById('id-mainPage').scrollTo({ top: 0, behavior: "instant" });
          document.getElementById('id-mainPage1').scrollTo({ top: 0, behavior: "instant" });
     };

     async function getCompVersion(e = null) {

          let id = null;

          if (e) { id = e.target.id; activeCompVrsnID = id; };
          if (!id || id === 'id-resetDefaults') { id = activeCompVrsnID; };

          let verid1 = Number(id.slice("id-versionA".length));
          let idx = versions.findIndex(rec => rec.id === verid1);
          verses1 = await fetchVerses(idx);
          await getChapter(1, 'A', verses1);
          document.getElementById('id-headline1').textContent = versions[idx].t;
          boxesAreOpen = false;
          return verid1;
     };
// End of Page Navigation Functions