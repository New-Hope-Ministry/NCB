document.addEventListener("DOMContentLoaded", async () =>  {
     // DOMContentLoaded event fires before page is displayed
     let rec = false;
     rec = await getDesignDefaults();
});

window.addEventListener("load", async () => {
     // load event fires after page is displayed

     if (setTheme === '1') { darkTheme(); toggleTheme(); rotateTheme = false; };
     document.getElementById('id-lastEdited').textContent = `Last Date Edited: ${dateEdited}`;
     document.getElementById('id-copyrighted').textContent = copyrighted;
     if (inst) { document.getElementById('id-installed').textContent = 'The Ark Bible is Installed!'; } else { document.getElementById('id-installed').textContent = 'The Ark Bible is Not Installed!'; };
});