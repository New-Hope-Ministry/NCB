// Searcher.js simple full text search engine

     const stemmer = word => word.toLowerCase();

     function setCursorToEnd(contentEditableElement) {
          const range = document.createRange();
          const selection = window.getSelection();
          range.selectNodeContents(contentEditableElement);
          range.collapse(false);
          selection.removeAllRanges();
          selection.addRange(range);
          contentEditableElement.focus();
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

     // Create Inverted Index without, stopwords stopwords can be added if wanted
     function createIndex(data) {
          const invertedIndex = {};
          data.forEach(doc => {
               const docId = doc.vid;
               const text = doc.vt;
               const words = text.split(/\W+/);
               try {
                    words.forEach(word => {
                         const stemmedWord = stemmer(word);
                         if (!invertedIndex[stemmedWord]) {
                              invertedIndex[stemmedWord] = [];
                         };
                         invertedIndex[stemmedWord].push(docId);
                    });
               } catch { console.log(docId); };
          });
          return invertedIndex;
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
               const text = srchVerses.find(doc => doc.vid === docId).vt;
               return text.includes(phrase);
          });

          // Find case-insensitive exact phrase matches
          const caseInsensitiveExactPhraseDocIds = commonDocIdsArray.filter(docId => {
               const text = srchVerses.find(doc => doc.vid === docId).vt.toLowerCase();
               return text.includes(lowerCasePhrase);
          });

          // Find documents containing all words in the phrase
          const partialPhraseDocIds = commonDocIdsArray.filter(docId => {
               const text = srchVerses.find(doc => doc.vid === docId).vt.toLowerCase();
               return words.every(word => text.includes(word));
          });

          // Find documents containing all words in the phrase
          const allWordsDocIds = srchVerses.filter(doc => {
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

     function setSearchChapter(idx) {

          let i;
          let books;
          let bid = srchVerses[idx].bid;
          let cn = srchVerses[idx].cn;
          let vn = srchVerses[idx].vn;

          if (bid < 40) {
               i = oldBooks.findIndex(rec => rec.id === bid);
               books = oldBooks;
          } else {
               i = newBooks.findIndex(rec => rec.id === bid);
               books = newBooks;
          };
          return `${books[i].t} ${cn}:${vn}`;
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
               a.addEventListener("click", (e) => {
                    getSearchChapter(e);
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
               });
               idx = result[searchResultIndex] - 1;
               a.id = `id-searchVerse${srchVerses[idx].vid}`;
               a.textContent = setSearchChapter(idx);
               a.dataset.bid = srchVerses[idx].bid;
               a.dataset.cn = srchVerses[idx].cn;
               a.dataset.vn = srchVerses[idx].vn;
               a.classList.add('cs-searchChapter');
               p.appendChild(a);
               br = document.createElement('br');
               p.appendChild(br);
               nt = srchVerses[idx].vt.replace('`', '');
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
                    txt = `There are no results!`;
               } else {
                    txt = `There are no more results!`;
               };
               p = document.createElement('p');
               p.classList.add('cs-noResults');
               p.textContent = txt;
          } else {
               a = document.createElement('a');
               a.id = `id-moreResults${z}`;
               a.addEventListener("click", (e) => {
                    getMoreResults(e);
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
               });

               a.textContent = 'More Results';
               a.classList.add('cs-searchResults');
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
               let id = e.target.id
               document.getElementById(id).remove();
               let nid = id.slice("id-moreResults".length);
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
               let id = e.target.id;
               let bid = document.getElementById(id).dataset.bid;
               let cn = document.getElementById(id).dataset.cn;
               let vh = document.getElementById(id).dataset.vn;
               let verid = Number(activeSrchVersionID.slice("id-version".length));

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

          document.getElementById("id-loader").style.display = 'block';

          setTimeout(function () {
               searchResultIndex = 0;
               if (!searchIndex) { searchIndex = createIndex(srchVerses); };
               searchResults = searchPhrase(searchIndex, searchData);
               removeElements('id-searchResults');
               getSearchVerses(searchResults);
               document.getElementById("id-loader").style.display = 'none';
          }, 30);
     };
// End of Searcher.js simple full text search engine