
const updateInterval = 100;

let boxChecked = false;
let estimatedDuration = 0;
let interval;
let isPaused = false;
let playPause = true;
let progress = 0;
let progressBar;
let synth = null;
let voices;

let domReadyPromise = (async () => {
     return new Promise(async resolve => {
          document.addEventListener("DOMContentLoaded", async () => {
               // DOMContentLoaded event fires before page is displayed

               fetchPrefix = '../';
               let rec = await getDefaults();
               if (rec) { rec = false; rec = await getVersion(); };
               if (rec) { if (setTheme === '1') { darkTheme(); rotateTheme = false; }; startUp(); };
               if ('speechSynthesis' in window) {
                    progressBar = document.getElementById("id-progressBar");
                    synth = window.speechSynthesis;
                    if (speechSynthesis.onvoiceschanged !== undefined) {
                         // Some browsers may load voices asynchronously, so you need to wait for the voiceschanged event to fire.
                         speechSynthesis.onvoiceschanged = listVoices;
                    } else { listVoices(); };
               };
               if (rec) { rec = false; rec = await getMenus(); };
               resolve();
          });
     });
})();

window.onbeforeunload = (event) => {
     if (synth) {
          synth.cancel();
          clearInterval(interval);
     };
};

// Page Functions
     function checkboxChecked(e = null) {

          if (e) {
               //e.preventDefault();
               e.stopPropagation();
               //e.stopImmediatePropagation();
          };
          let id = e.target.id;
          let aBox = document.getElementById(id);

          if (boxChecked) {
               aBox.classList.remove('cs-playCheckBox');
               boxChecked = false;
          } else {
               aBox.classList.add('cs-playCheckBox');
               boxChecked = true;
          };
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

     async function loadBoxes() {
          loadVersions(changeVersion);
          loadBooks(changeBook);
          loadChapters(changeChapter);
          startUp();
          boxesLoaded = true;
          return true;
     };

     async function openBoxes(e = null) {

          await stopBubbles(e);
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
               default:
                    break;
          };
          if (boxesAreOpen) { closeBoxes(); } else { boxesAreOpen = true; };
          stopSpeech();
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
// End of Page Functions

// Speech Functions
     function countWords(str) {
          const matches = str.match(/\b\w+\b/g);
          return matches ? matches.length : 0;
     };

     function estimateDuration(txt, rate = 1) {
          const words = countWords(txt);
          //alert(words);
          if (words > 2400) { rate = rate * .92 };
          if (words > 1000) { rate = rate * .94 };
          if (words > 800) { rate = rate * .96 };
          if (words < 500) { rate = rate * .98 };
          if (words < 400) { rate = rate * .95 };
          if (words < 200) { rate = rate * .90 };
          if (words < 100) { rate = rate * .86 };
          const wpm = 178 * rate; // Adjust based on rate
          return (words / wpm) * 60 * 1000;
     };

     // Wait for the voices to be loaded
     function listVoices() {

          let avoice;
          voices = speechSynthesis.getVoices();
          if (voices) {
               voices.forEach((voice, index) => {
                    if (voice) {
                         avoice = {
                              idx: index,
                              name: voice.name,
                              lang: voice.lang,
                              default: voice.default
                         };
                         localVoices.push(avoice);
                         index++;
                    };
               });
          };
     };

     async function loadSpeechText() {

          let activeBook = Number(activeBookID.slice("id-book".length));
          let activeChapter = Number(activeChapterID.slice("id-chapter".length));
          let i = verses.findIndex(rec => rec.bid === activeBook && rec.cn === activeChapter);
          let book;

          let idx = Number(document.getElementById(activeVersionID).dataset.index);
          let ndx = verses.findIndex(rec => rec.bid === activeBook);
          let bid = Number(verses[ndx].bid) - 1;
          if (bid < 39) { book = oldBooks[bid].t; } else { bid = bid - 39; book = newBooks[bid].t; };

          if (versions[idx].ar === 'DRB') { textSpeech = `Doooey Rheems Bible: ${book}: Chapter ${activeChapter}: `;
           } else { textSpeech = `${versions[idx].t}: ${book}: Chapter ${activeChapter}: `; };

          while (i < verses.length && verses[i].cn === activeChapter && verses[i].bid === activeBook) { textSpeech += `Verse ${verses[i].vn}.... ${verses[i].vt} `; i++; };
          return true;
     };

     async function nextSynthChapter() {

          setTimeout(async () => {

               let activeBook = Number(activeBookID.slice("id-book".length));
               let books = getBooksVolume(activeBook);
               let i = books.findIndex(rec => rec.id === activeBook);
               let chapters = books[i].c;
               let chapter = Number(document.getElementById(activeChapterID).textContent) + 1;

               if (chapter > chapters) { activeBook++; chapter = 1; };
               activeBookID = `id-book${activeBook}`;
               activeChapterID = `id-chapter${chapter}`;
               books = getBooksVolume(activeBook);
               i = books.findIndex(rec => rec.id === activeBook);
               chapterCount = books[i].c;

               await getChapter();
               await loadChapters(changeChapter);
               await loadSpeechText();

               selected(activeBookID, 'id-books');
               selected(activeChapterID, 'id-chapters');

               document.getElementById('id-pageContainer').scrollTo({ top: 0, behavior: "smooth" });
               // getMenus is in shared.js, but it calls setMenu in synth.js
               getMenus();
          }, 300);
          return true;
     };

     function pauseSpeech() {

          if (synth.speaking) {
               synth.pause();
               isPaused = true;
               clearInterval(interval);
               if (playPause) {
                    document.getElementById('id-stopSpeech').style.display = 'none';
                    document.getElementById('id-startSpeech').style.display = 'none';
                    document.getElementById('id-pauseSpeech').style.display = 'block';
                    playPause = false;
               } else {
                    document.getElementById('id-stopSpeech').style.display = 'none';
                    document.getElementById('id-pauseSpeech').style.display = 'none';
                    document.getElementById('id-startSpeech').style.display = 'block';
                    playPause = true;
               };
          };
     };

     function speakOut() {

          if (isPaused) {
               synth.resume();
               updateBar();
               document.getElementById('id-pauseSpeech').style.display = 'block';
               document.getElementById('id-startSpeech').style.display = 'none';
               document.getElementById('id-stopSpeech').style.display = 'block';
               playPause = false;
               isPaused = false;
               return;
          };

          if (synth.speaking) return;

          document.getElementById('id-pauseSpeech').style.display = 'block';
          document.getElementById('id-startSpeech').style.display = 'none';
          document.getElementById('id-stopSpeech').style.display = 'block';
          playPause = false;
          isPaused = false;

          let i = Number(document.getElementById(activeVersionID).dataset.index);
          speechSynthesis.cancel();
          setTimeout(() => {

               utter = new SpeechSynthesisUtterance();
               utter.text = textSpeech;
               utter.lang = 'en-US';
               utter.voice = voices.find(v => v.lang === 'en-US');
               utter.rate = 1;
               progress = 0;
               estimatedDuration = estimateDuration(textSpeech.trim(), utter.rate);
               progressBar.style.width = "0%";

               utter.onstart = () => { updateBar(); };
               utter.onend = () => {
                    progressBar.style.width = "100%";
                    stopSpeech();
                    if (document.getElementById('id-playCheckBox').checked) {
                         nextSynthChapter();
                         setTimeout(() => {
                              startChapter();
                         }, 100);
                    };
               };
               synth.speak(utter);
          }, 300);
     };

     function startChapter() {

          if (isPaused) {
               synth.resume();
               updateBar();
               document.getElementById('id-pauseSpeech').style.display = 'block';
               document.getElementById('id-startSpeech').style.display = 'none';
               document.getElementById('id-stopSpeech').style.display = 'block';
               playPause = false;
               isPaused = false;
               return;
          };

          if (synth.speaking) return;

          document.getElementById('id-pauseSpeech').style.display = 'block';
          document.getElementById('id-startSpeech').style.display = 'none';
          document.getElementById('id-stopSpeech').style.display = 'block';
          playPause = false;
          isPaused = false;

          let aVersion = document.getElementById(activeVersionID);
          let i = Number(aVersion.dataset.index);
          speechSynthesis.cancel();
          setTimeout(() => {

               utter = new SpeechSynthesisUtterance();
               utter.text = textSpeech.replace(`${versions[i].t}: `, "");
               utter.lang = 'en-US';
               utter.voice = voices.find(v => v.lang === 'en-US');
               utter.rate = 1;
               progress = 0;
               estimatedDuration = estimateDuration(textSpeech.trim(), utter.rate);
               progressBar.style.width = "0%";

               utter.onstart = () => { updateBar(); };
               utter.onend = () => {
                    progressBar.style.width = "100%";
                    stopSpeech();
                    if (document.getElementById('id-playCheckBox').checked) {
                         nextSynthChapter();
                         let newText = textSpeech;
                         textSpeech = '';
                         textSpeech = newText.replace("Twenty-First Century Version: ", "");
                         setTimeout(() => {
                              startChapter();
                         }, 100);
                    };
               };
               synth.speak(utter);
          }, 300);
     };

     async function startSpeech() {

          if (!boxesLoaded) { await loadBoxes(); };
          let x = await loadSpeechText();
          speakOut();
     };

     function stopSpeech() {

          if (synth.paused) { synth.resume(); };
          synth.cancel();
          clearInterval(interval);
          document.getElementById('id-pauseSpeech').style.display = 'none';
          document.getElementById('id-stopSpeech').style.display = 'none';
          document.getElementById('id-startSpeech').style.display = 'block';
          utter = null;
          playPause = true;
          isPaused = false;
          progress = 0;
          progressBar.style.width = "0%";
     };

     function updateBar() {
          interval = setInterval(() => {
               progress += updateInterval;
               const percent = Math.min((progress / estimatedDuration) * 100, 100);
               progressBar.style.width = percent + "%";
               if (progress >= estimatedDuration) { clearInterval(interval) };
          }, updateInterval);
     };
// End of Speech Functions