//I'm using the browser speechsynthesis to read the text on a webpage, but I also need it to read the text from the webpage after it loads new text and the browser translates it to a different language. I need to pause the speechsynthesis until the page reloads and retranslates the text.

let speaking = false;
let observer;
let translationTimeout;

// Start reading text
function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    speaking = true;

    utterance.onend = () => {
        speaking = false;
    };

    speechSynthesis.speak(utterance);
}

// Stop reading when page changes
function pauseSpeech() {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
    }
    speaking = false;
}

// Detect when DOM stops changing (translation finished)
function waitForTranslation(callback) {
    if (observer) observer.disconnect();

    observer = new MutationObserver(() => {
        clearTimeout(translationTimeout);

        // Wait 300ms after last mutation → DOM is stable
        translationTimeout = setTimeout(() => {
            observer.disconnect();
            callback();
        }, 300);
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
    });
}

// Main logic: pause → wait → resume
function monitorPageAndSpeak() {
    pauseSpeech();

    waitForTranslation(() => {
        const text = document.body.innerText;
        speakText(text);
    });
}

// Call this whenever the page loads new content
monitorPageAndSpeak();


//Detect only specific elements
//If you only want to track a certain container:

observer.observe(document.querySelector("#content"), {
    childList: true,
    subtree: true
});

//Avoid reading the entire page
//Extract only the text you want:
const text = document.querySelector("#content").innerText;



//How to Detect Translation
//Browser translation modifies the DOM in a very specific way:
//✔️ Chrome/Edge add attributes like:
//translate="no" on some elements
//<meta name="google" content="notranslate"> may be removed
//A <span class="goog-text-highlight"> wrapper may appear
//The entire DOM is replaced in a burst of mutations
//✔️ The most reliable method:

//Use a MutationObserver to detect when the browser rewrites the DOM.
//🛠️ Recommended Implementation

//1. Start speech only after DOM stabilizes
let isTranslating = false;
let translationTimer = null;
const observer1 = new MutationObserver(() => {
    // When translation is happening, DOM changes rapidly
    isTranslating = true;

    // Reset timer every time a mutation occurs
    clearTimeout(translationTimer);

    // When DOM stops changing for 500ms, translation is done
    translationTimer = setTimeout(() => {
        isTranslating = false;
        resumeSpeechIfNeeded();
    }, 500);
});

observer1.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
});

//2. Integrate with SpeechSynthesis
let utterance = null;
let wasPausedForTranslation = false;

function speak(text) {
    utterance = new SpeechSynthesisUtterance(text);

    // If translation is happening, pause immediately
    if (isTranslating) {
        wasPausedForTranslation = true;
        speechSynthesis.pause();
    }

    speechSynthesis.speak(utterance);
}

function resumeSpeechIfNeeded() {
    if (wasPausedForTranslation && !speechSynthesis.speaking) {
        speechSynthesis.resume();
        wasPausedForTranslation = false;
    }
}

//🎯 Detecting Whether the User Actually Translated the Page
//You can detect translation by checking for browser‑injected elements.

//Chrome/Edge translation adds:
function pageIsTranslated() {
    return !!document.querySelector('.goog-text-highlight, font[style*="background"]');
}

//Use it before speaking:
function speakIfNotTranslated(text) {
    if (!pageIsTranslated()) {
        speak(text);
    } else {
        // Wait for translation to finish
        wasPausedForTranslation = true;
    }
}

// I have a json array with 31102 verses in it structured like wrkVerses, it works perfect until it gets to verse 31102 and this line of code, while (wrkVerses[i].pn === pn) { then it returns this error. shared.js:741 Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'pn'), What's causing the error?
const wrkVerses = [
     {
        "bid": 66,
        "cn": 22,
        "jq": 0,
        "pn": 2,
        "vid": 31100,
        "vn": 19,
        "vt": "And if a man takes away from the words of this book of prophecy, God will remove his part from the Book of Life, and from the holy city, and from the things which are written in this book.'"
    },
    {
        "bid": 66,
        "cn": 22,
        "jq": 1,
        "pn": 3,
        "vid": 31101,
        "vn": 20,
        "vt": "And Jesus the one who testifies these things says, '`I will surely come soon!´' Amen. Even so, come Lord Jesus."
    },
    {
        "bid": 66,
        "cn": 22,
        "jq": 0,
        "pn": 3,
        "vid": 31102,
        "vn": 21,
        "vt": "May the grace of our Lord Jesus Christ be with you all. Amen.\""
    }
]
async function getChapter(A1 = '', AA = '', verses1 = null) {

     let p;
     let pn;
     let sp;
     let spa;
     let sp2;
     let aVerse;
     let verseCount = 0;
     let wrkVerses;

     if (A1 === '') { wrkVerses = verses; } else { wrkVerses = verses1; };
     // verses1 is used by comp.html

     let activeBook = Number(activeBookID.slice("id-book".length));
     let activeChapter = Number(activeChapterID.slice("id-chapter".length));
     let i = wrkVerses.findIndex(rec => rec.bid === activeBook && rec.cn === activeChapter);

     removeElements(`id-page${A1}`);
     let page = document.getElementById(`id-page${A1}`);
     let h2 = document.createElement('h2');
     h2.textContent = `${getBookTitle(activeBook)} ${activeChapter}`;
     document.getElementById(`id-navTitle`).textContent = h2.textContent;

     if (isTWF) { sp2 = document.createElement('span'); sp2.classList.add('cs-edited'); sp2.textContent = ` TWF - Last Edited: ${dateEdited}`; h2.appendChild(sp2); };
     page.appendChild(h2);
     let x = Number(wrkVerses.length);
     while (i < x && wrkVerses[i].cn === activeChapter && wrkVerses[i].bid === activeBook) {
          p = document.createElement('p');
          p.id = `id-p${wrkVerses[i].vid}`;
          pn = wrkVerses[i].pn;

          let newParagraph = false;
          if (pn > 0 && paragraphLayoutDefault) {
               while (i < wrkVerses.length && wrkVerses[i].pn === pn) {
                    console.log(`Verse: ${wrkVerses[i].vn}, idx: ${i}, pn: ${pn}, wvpn: ${wrkVerses[i].pn}`);
                    sp = document.createElement('span');
                    sp.id = `id-vers${AA}${wrkVerses[i].vn}`;
                    spa = document.createElement('span');
                    spa.id = `id-versNum${AA}${wrkVerses[i].vn}`;
                    spa.classList.add("cs-verseNumber");
                    aVerse = wrkVerses[i].vt;
                    if (newParagraph) { let spa1 = document.createElement('span'); spa1.classList.add("cs-versePadding"); p.appendChild(spa1); };
                    newParagraph = true;
                    spa.textContent = `${wrkVerses[i].vn} `;
                    sp.appendChild(spa);

                    spa = document.createElement('span');
                    spa.id = `id-avers${AA}${wrkVerses[i].vn}`;

                    if (wrkVerses[i].jq === 1) { spa.innerHTML = JesusQuote(aVerse);
                    } else { spa.textContent = aVerse; };

                    sp.appendChild(spa);
                    p.appendChild(sp);
                    i++;
                    verseCount++;
               };
          } else {

               sp = document.createElement('span');
               sp.id = `id-vers${AA}${wrkVerses[i].vn}`;

               spa = document.createElement('span');
               spa.id = `id-versNum${AA}${wrkVerses[i].vn}`;
               spa.classList.add("cs-verseNumber");
               spa.textContent = `${wrkVerses[i].vn} `;
               sp.appendChild(spa);

               aVerse = wrkVerses[i].vt;
               spa = document.createElement('span');
               spa.id = `id-avers${AA}${wrkVerses[i].vn}`;

               if (wrkVerses[i].jq === 1) { spa.innerHTML = JesusQuote(aVerse);
               } else { spa.textContent = aVerse; };

               p.classList.add("cs-singleVerse");
               sp.appendChild(spa);
               p.appendChild(sp);
               i++;
               verseCount++;
          };
          page.appendChild(p);
     };

     let aVersesBox = document.getElementById('id-versesBox');
     if (aVersesBox) { loadVerses(findVerse, verseCount); };

     let btmLastLine = document.getElementById(`id-navLastChapter${A1}`);
     if (btmLastLine) { if (activeBook === 1 && activeChapter === 1) { btmLastLine.style.visibility = 'hidden'; } else { btmLastLine.style.visibility = 'visible'; }; };

     let btmNextLine = document.getElementById(`id-navNextChapter${A1}`);
     if (btmNextLine) { if (activeBook === 66 && activeChapter === 22) { btmNextLine.style.visibility = 'hidden'; } else { btmNextLine.style.visibility = 'visible'; }; };

     setFontSize();
     return true;
};
