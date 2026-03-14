let domReadyPromise = (async () => {
    return new Promise(async resolve => {
          document.addEventListener("DOMContentLoaded", async () =>  {
               // DOMContentLoaded event fires before page is displayed
               let rec = false;
               rec = await getDesignDefaults();
               resolve();
          });
    });
})();


window.addEventListener("load", async () => {
     // load event fires after page is displayed

     await domReadyPromise;
     if (setTheme === '1') { darkTheme(); toggleTheme(); rotateTheme = false; };

     let lastEdit = document.getElementById('id-lastEdited');
     let cpyRight = document.getElementById('id-copyrighted');
     let topLastEdit = document.getElementById('id-topLastEdited');
     let installed = document.getElementById('id-installed');

     if (lastEdit) { lastEdit.textContent = `Last Date Edited: ${dateEdited}`; };
     if (cpyRight) { cpyRight.textContent = copyrighted; };
     if (topLastEdit) { topLastEdit.textContent = `Last Date Edited: ${dateEdited}`; };
     if (installed) { if (inst) { installed.textContent = 'The Ark Bible is Installed!'; } else { installed.textContent = 'The Ark Bible is Not Installed!'; }; };
});