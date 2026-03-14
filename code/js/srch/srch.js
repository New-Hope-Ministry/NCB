let domReadyPromise = (async () => {
     return new Promise(async resolve => {
          document.addEventListener("DOMContentLoaded", async () => {
               // DOMContentLoaded event fires before page is displayed

               fetchPrefix = '../';
               let i = null;
               let rec = await getDefaults();
               if (activeVersionID) {
                    let id = Number(activeVersionID.slice("id-version".length));
                    i = versions.findIndex(rec => rec.id === id);
                    document.getElementById('id-searchVersion').textContent = `${versions[i].t} - ${versions[i].ar}`;
               };
               if (rec) { verses = await fetchVerses(i); };
               if (rec) { await getMenus(); };
               resolve();
          });
     });
})();

// Page Functions
     async function getDefaults() {

          const params = new URLSearchParams(window.location.search);

          let verid = params.get('verid');
          if (verid) { activeVersionID = `id-version${verid}`; };
          if (!activeVersionID) { activeVersionID = localStorage.getItem("activeVersionID"); };
          if (!activeVersionID) { activeVersionID = defaultVersionID };

          await getDesignDefaults();
          return true;
     };

     async function loadBoxes() {
          loadVersions(changeSearchVersion);
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
          return true;
     };
// End of Page Functions

// Simple full text search engine
     var searchIndex = null;
     const stemmer = word => word.toLowerCase();

     async function changeSearchVersion(e = null) {

          document.getElementById("id-loader").style.display = 'block';
          stopBubbles(e);
          closeBoxes();
          activeVersionID = e.target.id;
          let idx = Number(activeVersionID.slice("id-version".length));
          let id = versions.findIndex(rec => rec.id === idx);

          verses = await fetchVerses(id);
          document.getElementById('id-searchVersion').textContent = `${versions[id].t} - ${versions[id].ar}`;
          selected(activeVersionID, 'id-versions');
          // getMenus is in shared.js, but it calls setMenu in srch.js
          getMenus();
          if (document.getElementById('id-searchBox').textContent === '') {
               if (verses) { document.getElementById("id-loader").style.display = 'none'; };
               return;
          };
          searcher();
          if (verses) { document.getElementById("id-loader").style.display = 'none'; };
          return true;
     };

     function createIndex(data) {
          // Create Inverted Index without stopwords, stopwords can be added if wanted
          const invertedIndex = {};
          for (const doc of data) {
               const docId = doc.vid;
               const text = doc.vt;
               const words = text.split(/\W+/);
               try {
                    for (const word of words) {
                         const stemmedWord = stemmer(word);
                         if (!invertedIndex[stemmedWord]) {
                              invertedIndex[stemmedWord] = [];
                         };
                         invertedIndex[stemmedWord].push(docId);
                    };
               } catch { console.log(docId); };
          };

          return invertedIndex;
     };

     function searchFocus() {
          let srchBox = document.getElementById('id-searchBox');
          const e = new KeyboardEvent('keypress', { key: ' ' });
          srchBox.dispatchEvent(e);
          setCursorToEnd(srchBox);
     };

     function searchKeyDown() {
          if (this.event.key === 'Enter') {
               this.event.preventDefault();
               searcher();
          };
     };

     function searchPhrase(invertedIndex, phrase) {

          const lowerCasePhrase = phrase.toLowerCase();
          const words = lowerCasePhrase.split(/\W+/);
          const stemmedWords = words.map(word => stemmer(word));
          const docIdSets = stemmedWords.map(word => new Set(invertedIndex[word] || []));
          const commonDocIds = docIdSets.reduce((acc, set) => {
               return new Set([...acc].filter(docId => set.has(docId)));
          });
          const commonDocIdsArray = Array.from(commonDocIds);

          // Find case-sensitive exact phrase matches
          const caseSensitiveExactPhraseDocIds = commonDocIdsArray.filter(docId => {
               const text = verses.find(doc => doc.vid === docId).vt;
               return text.includes(phrase);
          });

          // Find case-insensitive exact phrase matches
          const caseInsensitiveExactPhraseDocIds = commonDocIdsArray.filter(docId => {
               const text = verses.find(doc => doc.vid === docId).vt.toLowerCase();
               return text.includes(lowerCasePhrase);
          });

          // Find documents containing all words in the phrase
          const partialPhraseDocIds = commonDocIdsArray.filter(docId => {
               const text = verses.find(doc => doc.vid === docId).vt.toLowerCase();
               return words.every(word => text.includes(word));
          });

          // Find documents containing all words in the phrase
          const allWordsDocIds = verses.filter(doc => {
               const text = doc.vt.toLowerCase();
               return words.every(word => text.includes(word));
          }).map(doc => doc.vid);

          // Combine results, ensuring no duplicates
          const combinedDocIds = [
               ...new Set([
                    ...caseSensitiveExactPhraseDocIds,
                    ...caseInsensitiveExactPhraseDocIds,
                    ...partialPhraseDocIds,
                    ...allWordsDocIds
               ])
          ];
          return combinedDocIds;
     };

     function setCursorToEnd(contentEditableElement) {
          const range = document.createRange();
          const selection = window.getSelection();
          range.selectNodeContents(contentEditableElement);
          range.collapse(false);
          selection.removeAllRanges();
          selection.addRange(range);
          contentEditableElement.focus();
     };

     function setSearchChapter(idx) {

          let bid = verses[idx].bid;
          let cn = verses[idx].cn;
          let vn = verses[idx].vn;

          return `${getBookTitle(bid)} ${cn}:${vn}`;
     };

     function getSearchVerses(result = searchResults) {

          let a;
          let p;
          let hr;
          let vt;
          let br;
          let nt;
          let idx = 0;
          let i = searchResultIndex + 30;

          let aSearch = document.getElementById('id-searchResults');
          if (result.length - searchResultIndex < 30) { i = result.length; };

          document.getElementById('id-resultCount').textContent = `There are ${result.length} search results.`;

          while (searchResultIndex < i && i <= result.length) {
               p = document.createElement('p');
               p.classList.add('cs-searchVerse');
               a = document.createElement('a');
               a.addEventListener("click", getSearchChapter);
               idx = result[searchResultIndex] - 1;
               a.id = `id-searchVerse${verses[idx].vid}`;
               a.textContent = setSearchChapter(idx);
               a.dataset.bid = verses[idx].bid;
               a.dataset.cn = verses[idx].cn;
               a.dataset.vn = verses[idx].vn;
               a.classList.add('cs-searchChapter');
               a.setAttribute("translate", "no");
               p.appendChild(a);
               br = document.createElement('br');
               p.appendChild(br);
               nt = verses[idx].vt.replace('`', '');
               nt = nt.replace('´', '');
               vt = document.createTextNode(nt);
               p.appendChild(vt);
               aSearch.appendChild(p);
               searchResultIndex++;
          };
          hr = document.createElement('hr');
          aSearch.appendChild(hr);
          br = document.createElement('br');
          br.id = 'id-br1';
          aSearch.appendChild(br);

          let z = result.length - searchResultIndex;
          if (z === 0) {
               let txt;
               if (result.length === 0) {
                    txt = `There are no matching results!`;
               } else {
                    txt = `There are no more results!`;
               };
               p = document.createElement('p');
               p.classList.add('cs-noResults');
               p.textContent = txt;
          } else {
               a = document.createElement('a');
               a.id = `id-moreSearchResults${z}`;
               a.classList.add('cs-moreSearchResults');
               a.addEventListener("click", getMoreResults);
               a.textContent = 'More Results';
               a.setAttribute("translate", "no");
               aSearch.appendChild(a);
               br = document.createElement('br');
               aSearch.appendChild(br);
               br = document.createElement('br');
               aSearch.appendChild(br);
               p = document.createElement('p');
               p.id = `id-moreResultsText${z}`;
               p.textContent = `There are ${z} more results.`;
          };
          aSearch.appendChild(p);
          br = document.createElement('br');
          br.id = 'id-br2';
          aSearch.appendChild(br);
          br = document.createElement('br');
          br.id = 'id-br3';
          aSearch.appendChild(br);
     };

     function getMoreResults(e = null) {

          if (e) {
               e.preventDefault();
               e.stopPropagation();
               e.stopImmediatePropagation();
               let id = e.target.id
               document.getElementById(id).remove();
               let nid = id.slice("id-moreSearchResults".length);
               id = `id-moreResultsText${nid}`;
               document.getElementById(id).remove();
               document.getElementById('id-br1').remove();
               document.getElementById('id-br2').remove();
               document.getElementById('id-br3').remove();
          }
          document.getElementById("id-loader").style.display = 'block';
          setTimeout(function () {
               getSearchVerses();
               document.getElementById("id-loader").style.display = 'none';
          }, 30);

     };

     async function getSearchChapter(e = null) {

          if (e) {
               e.preventDefault();
               e.stopPropagation();
               e.stopImmediatePropagation();
               let id = e.target.id;
               let bid = document.getElementById(id).dataset.bid;
               let cn = document.getElementById(id).dataset.cn;
               let vh = document.getElementById(id).dataset.vn;
               let verid = Number(activeVersionID.slice("id-version".length));

               const readParams = new URLSearchParams();
               if (verid !== null && verid !== 'null') readParams.set('verid', verid);
               if (bid !== null && bid !== 'null') readParams.set('bid', bid);
               if (cn !== null && cn !== 'null') readParams.set('cn', cn);
               if (vh !== null && vh !== 'null') readParams.set('vh', vh);
               const readhref = `../?${readParams.toString()}`;
               bClick(readhref);
          };
          return true;
     };

     async function searcher() {

          let searchData = document.getElementById('id-searchBox').textContent;
          if (searchData === '') { return; };

          //document.getElementById("id-loader").style.display = 'block';

          setTimeout(function () {
               searchResultIndex = 0;
               if (!searchIndex) { if(verses) { searchIndex = createIndex(verses); }; };
               searchResults = searchPhrase(searchIndex, searchData);
               removeElements('id-searchResults');
               getSearchVerses(searchResults);
               document.getElementById("id-loader").style.display = 'none';
          }, 30);
     };
// End of Simple full text search engine