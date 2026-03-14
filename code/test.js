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

//🧩 Putting It All Together
//MutationObserver detects translation activity.
//Speech pauses automatically during translation.
//Speech resumes only when translation stops.
//If the user did NOT translate the page, speech starts immediately.





     function startChapter1() {

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

          let activeVersion = Number(activeVersionID.slice("id-version".length));
          let i = versions.findIndex(rec => rec.id === activeVersion);
          speechSynthesis.cancel();
          setTimeout(() => {

               utter = new SpeechSynthesisUtterance();
               utter.text = textSpeech.replace(`${versions[i].t}: `, "");
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