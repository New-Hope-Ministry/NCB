window.addEventListener("load", async () => {
     // load event fires after page is displayed

     await domReadyPromise;
     if (setTheme === '1') { darkTheme(); toggleTheme(); rotateTheme = false; };

     let loader = document.getElementById("id-loader");
     let noDisplay = document.getElementById('id-noDisplay');
     let lastEdit = document.getElementById('id-lastEdited');
     let cpyRight = document.getElementById('id-copyrighted');
     let topLastEdit = document.getElementById('id-topLastEdited');
     let installed = document.getElementById('id-installed');

     if (loader) { loader.style.display = 'none'; };
     if (noDisplay) { noDisplay.classList.remove('cs-hidden'); noDisplay.style.visibility = 'visible'; };

     if (lastEdit) { lastEdit.textContent = `Date Last Edited: ${dateEdited}`; };
     if (cpyRight) { cpyRight.textContent = copyrighted; };
     if (topLastEdit) { topLastEdit.textContent = `Date Last Edited: ${dateEdited}`; };
     if (installed) { if (inst) { installed.textContent = 'The Ark Bible is Installed!'; } else { installed.textContent = 'The Ark Bible is Not Installed!'; }; };
});