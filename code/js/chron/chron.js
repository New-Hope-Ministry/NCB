var newday = false;
let domReadyPromise = (async () => {
    return new Promise(async resolve => {
        document.addEventListener("DOMContentLoaded", async () => {
               // DOMContentLoaded event fires before page is displayed

               fetchPrefix = '../';
               let rec = await getDefaults();
               if (rec) { rec = false; rec = await getVersion(); };
               resolve();
        });
    });
})();

async function changeChronChapter(e = null) {

     stopBubbles(e);
     let id = e.target.id;
     let bid = Number(activeBookID.slice("id-book".length));
     let cn = Number(id.slice("id-chapter".length));
     let i = chronPlan.findIndex(rec => rec.bid === bid && rec.cn === cn);
     let dayid = chronPlan[i].dy;
     //activeChapterID = id;
     chronNextLast(bid, cn, dayid, true);
     return true;
};

function chronDay() {

     let bid = Number(activeBookID.slice("id-book".length));
     let cn = Number(activeChapterID.slice("id-chapter".length));
     let i = chronPlan.findIndex(rec => rec.bid === bid && rec.cn === cn);
     let day = chronPlan[i].dy;
     return day;
};

async function changeDay(e = null) {

     stopBubbles(e);
     closeBoxes();
     let id = e.target.id;
     let dayid = Number(id.slice("id-day".length));
     let i = chronPlan.findIndex(rec => rec.dy === dayid);
     chronNextLast(chronPlan[i].bid, chronPlan[i].cn, dayid, true);
};

async function chronLastChapter(e = null) {

     stopBubbles(e);
     if (!boxesLoaded) { await loadBoxes(); };
     let bid = Number(activeBookID.slice("id-book".length));
     let cn = Number(activeChapterID.slice("id-chapter".length)) - 1;

     let loadChpts = false;
     if (cn < 1) {
          bid--;
          if (bid < 1) { bid = 1; };
          let books = getBooksVolume(bid);
          let i = books.findIndex(rec => rec.id === bid);
          cn = books[i].c;
          loadChpts = true;
     };
     let i = chronPlan.findIndex(rec => rec.bid === bid && rec.cn === cn);
     let dayid = chronPlan[i].dy;
     chronNextLast(bid, cn, dayid, true);
};

async function chronNextChapter(e = null) {

     stopBubbles(e);
     if (!boxesLoaded) { await loadBoxes(); };
     let bid = Number(activeBookID.slice("id-book".length));
     let cn = Number(activeChapterID.slice("id-chapter".length)) + 1;
     let books = getBooksVolume(bid);
     let i = books.findIndex(rec => rec.id === bid);
     chs = books[i].c;

     let loadChpts = false;
     if (cn > chs) {
          bid++;
          cn = 1;
          if (bid > 66) { bid = 66; };
          loadChpts = true;
     };
     let idx = chronPlan.findIndex(rec => rec.bid === bid && rec.cn === cn);
     let dayid = chronPlan[idx].dy;
     chronNextLast(bid, cn, dayid, true);
};

async function chronNextLast(bid, cn, dayid, loadChpts) {

     activeBookID = `id-book${bid}`;
     activeChapterID = `id-chapter${cn}`;
     let activeDayID = `id-day${dayid}`;
     closeBoxes();
     if (loadChpts) { await loadChronChapters(changeChronChapter); };
     getChapter();
     selected(activeBookID, 'id-books');
     selected(activeChapterID, 'id-chapters');
     selected(activeDayID, 'id-days');
     setQuerystring('bid', bid);
     setQuerystring('cn', cn);
     // getMenus is in shared.js, but it calls setMenu in chron.js
     getMenus();
     localStorage.setItem("activeChronChapterID", activeChapterID);
     document.getElementById('id-pageContainer').scrollTo({ top: 0, behavior: "smooth" });
};

async function getDefaults() {

     const params = new URLSearchParams(window.location.search);
//localStorage.clear();
     let verid = params.get('verid');
     if (verid) { activeVersionID = `id-version${verid}`; };
     if (!activeVersionID) { activeVersionID = localStorage.getItem("activeChronVersionID"); };
     if (!activeVersionID) { activeVersionID = defaultVersionID };

     let bid = params.get('bid');
     if (bid) { activeBookID = `id-book${bid}`; };
     if (!activeBookID) { activeBookID = localStorage.getItem("activeChronBookID"); };
     if (!activeBookID) { activeBookID = defaultBookID; };

     let cn = params.get('cn');
     if (cn) { activeChapterID = `id-chapter${cn}`; };
     if (!activeChapterID) { activeChapterID = localStorage.getItem("activeChronChapterID"); };
     if (!activeChapterID) { activeChapterID = defaultChapterID; };

     await getDesignDefaults();

     return true;
};

async function loadBoxes() {

     await loadVersions(changeVersion);
     await loadDays(changeDay);
     await loadChronChapters(changeChronChapter);
     await startUp();
     boxesLoaded = true;
     return true;
};

async function loadDays(func) {

     let daysBox = document.getElementById('id-daysBox');
     let div = document.createElement('div');
     let div1;
     let x = 0;

     removeElements('id-daysBox');

     let dayBox = 366;
     for (let i = 1; i < dayBox; i++) {

          div = document.createElement('div');
          div.classList.add('cs-dayLine');
          while (x < 7 && i < dayBox) {
               div1 = document.createElement('div');
               div1.addEventListener("click", func);
               div1.id = `id-day${i}`;
               div1.classList.add('cs-day');
               div1.textContent = i;
               div1.setAttribute("translate", "no");
               div.appendChild(div1);
               i++
               x++;
          };
          i = i - 1;
          x = 0;
          daysBox.appendChild(div);
     };

     div = document.createElement('div');
     div.classList.add('cs-lastLine');
     div.textContent = '...';
     daysBox.appendChild(div);

     return true;
};

async function loadChronChapters(func) {
     // loadChronChapters() loads the plan chapters for the chose day

     let day = await chronDay();;
     let chaptersBox = document.getElementById('id-chaptersBox');
     let i = chronPlan.findIndex(rec => rec.dy === day);

     removeElements('id-chaptersBox');

     while (i < chronPlan.length && chronPlan[i].dy === day) {
          div = document.createElement('div');
          div.id = `id-chapter${chronPlan[i].cn}`;
          div.classList.add('cs-chronChapter');
          div.textContent = `${chronPlan[i].t}: ${chronPlan[i].cn}`;
          div.addEventListener("click", func);
          div.setAttribute("translate", "no");
          chaptersBox.appendChild(div);
          i++;
     };

     div = document.createElement('div');
     div.classList.add('cs-lastLine');
     div.textContent = '...';
     div.setAttribute("translate", "no");
     chaptersBox.appendChild(div);
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
               id = 'id-days';
               document.getElementById(id).style.display = 'block';
               let activeDayID = `id-day${chronDay()}`;
               document.getElementById(activeDayID).scrollIntoView({ block: 'center' });
               break;
          case "id-MenuBtn3":
               id = 'id-chapters';
               document.getElementById(id).style.display = 'block';
               document.getElementById(activeChapterID).scrollIntoView({ block: 'center' });
               break;
          default:
               break;
     };
     if (boxesAreOpen) { closeBoxes(); } else { boxesAreOpen = true; };
};

function selected(id, container, reset = null) {

     let unselected = null;

     switch (container) {

          case "id-chapters":
               unselected = pastSelectedChapterID;
               pastSelectedChapterID = id;
               break;
          case "id-days":
               unselected = pastSelectedDayID;
               pastSelectedDayID = id;
               break;
          case "id-versions":
               unselected = pastSelectedVersionID;
               pastSelectedVersionID = id;
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
               let day = chronDay();
               val = `Day: ${day}`
               break;
          case "id-MenuBtn3":
               let chpt = activeChapterID.slice("id-chapter".length);
               let id = Number(activeBookID.slice("id-book".length));
               let title = getBookTitle(id);
               val = `${title}: ${chpt}`;
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
          let activeDayID = `id-day${chronDay()}`;
          selected(activeDayID, 'id-days');
     };
     if (activeChapterID) {
          id = Number(activeChapterID.slice("id-chapter".length));
          setQuerystring('cn', id);
          selected(activeChapterID, 'id-chapters');
     };
     return true;
};

async function restart(e = null) {

     if (e) { stopBubbles(e); };
     closeBoxes();

     activeBookID = defaultBookID;
     activeChapterID = defaultChapterID;
     activeVersionID = defaultVersionID;

     localStorage.removeItem('activeChronBookID');
     localStorage.removeItem('activeChronChapterID');
     localStorage.removeItem("activeChronVersionID");



     selected(defaultChapterID, 'id-chapters');
     selected(defaultDayID, 'id-days');
     selected(defaultVersionID, 'id-versions');

     //let bid = Number(defaultBookID.slice("id-book".length));
     //let cn = Number(defaultChapterID.slice("id-chapter".length));
     //setQuerystring('bid', bid);
     //setQuerystring('cn', cn);

     pastSelectedChapterID = null;
     pastSelectedDayID = null;
     pastSelectedVersionnID = null;

     await changeVersion();
     await loadChronChapters(changeChronChapter);

     document.getElementById('id-pageContainer').scrollTo({ top: 0, behavior: "smooth" });
     startUp();
     // getMenus is in shared.js, but it calls setMenu in chron.js
     getMenus();
     removeAllQueries();
     return true;
};