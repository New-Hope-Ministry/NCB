function closeBoxes() {

    // List of IDs to hide
     const boxIds = [ 'id-books', 'id-chapters','id-chrons', 'id-days', 'id-verses','id-versions', 'id-versions1' ];

    boxIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) { element.style.display = 'none'; };
    });
    boxesAreOpen = false;
};

async function loadBooks(chgBook, box = 'id-booksBox') {

     let i = 0;
     let ii = 0;
     let menuBooks = document.getElementById(box);
     if (!menuBooks) { return true; };

     removeElements(box);

     while (i < 39) {
          div = document.createElement('div');
          div.classList.add('cs-bookLine');
          div1 = document.createElement('div');
          div1.addEventListener("click", chgBook);
          div1.id = `id-book${oldBooks[i].id}`;
          div1.classList.add('cs-book');
          div1.classList.add('cs-bookRight');
          div1.dataset.bid = oldBooks[i].id;
          //div1.dataset.chapters = oldBooks[i].c;
          div1.textContent = oldBooks[i].t;
          div1.setAttribute("translate", "no");
          div.appendChild(div1);

          if (ii < 27) {
               div1 = document.createElement('div');
               div1.addEventListener("click", chgBook);
               div1.id = `id-book${newBooks[ii].id}`;
               div1.classList.add('cs-book');
               div1.dataset.bid = newBooks[ii].id;
               //div1.dataset.chapters = newBooks[ii].c;
               div1.textContent = newBooks[ii].t;
          } else {
               div1 = document.createElement('div');
               div1.classList.add('cs-endBook');
          };
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

async function loadChapters(chgChapter, box = 'id-chaptersBox') {

     let menuChapters = document.getElementById(box);
     if (!menuChapters) { return true; };
     let div;
     let div1;
     let x = 0;
     let activeBook = Number(activeBookID.slice("id-book".length));
     let books = getBooksVolume(activeBook);
     let i = books.findIndex(rec => rec.id === activeBook);
     let chapterCount = Number(books[i].c) + 1;

     removeElements(box);

     for (let i = 1; i < chapterCount; i++) {

          div = document.createElement('div');
          div.classList.add('cs-chapterLine');
          while (x < 5 && i < chapterCount) {
               div1 = document.createElement('div');
               div1.addEventListener("click", chgChapter);
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

async function loadVerses(func, verseCount, box = 'id-versesBox') {

     let menuVerses = document.getElementById(box);
     if (!menuVerses) { return true; };
     let div = document.createElement('div');
     let div1;
     let x = 0;
     let y = 1;

     removeElements(box);
     verseCount++;

     for (let i = 1; i < verseCount; i++) {

          div = document.createElement('div');
          div.id = `id-verseLine${y}`;
          y++;
          div.classList.add('cs-verseLine');
          while (x < 5 && i < verseCount) {
               div1 = document.createElement('div');
               div1.addEventListener("click", func);
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

async function loadVersions(chgVersion, box = 'id-versionsBox', urlPrefix = '') {

     let i = 0;
     let menuVersions = document.getElementById(box);
     if (!menuVersions) { return true; };

     removeElements(box);
     while (i < versions.length) {

          div = document.createElement("div");
          div.addEventListener("click", chgVersion);
          div.id = `id-version${urlPrefix}${versions[i].id}`;
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

function sortBooks() {

     if (bookSort) {
          oldBooks.sort((a, b) => a.id - b.id);
          newBooks.sort((a, b) => a.id - b.id);
          loadBooks(changeBook);
          document.getElementById('id-sortBook').title = 'Sort Alphabetically';
          document.getElementById('id-sortBook').alt = 'Sort Alphabetically';
          document.getElementById('id-heart').classList.remove("cs-rotate180");
          bookSort = false;
     } else {
          oldBooks.sort((a, b) => a.t.localeCompare(b.t));
          newBooks.sort((a, b) => a.t.localeCompare(b.t));
          loadBooks(changeBook);
          document.getElementById('id-sortBook').title = 'Sort Biblically';
          document.getElementById('id-sortBook').alt = 'Sort Biblically';
          document.getElementById('id-heart').classList.add('cs-rotate180');
          bookSort = true;
     };
};