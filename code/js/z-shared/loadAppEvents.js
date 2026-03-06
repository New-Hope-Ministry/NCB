window.addEventListener("load", async () => {
     // load event fires after page is displayed

     await domReadyPromise;
     if (setTheme === '1') { darkTheme(); toggleTheme(); rotateTheme = false; };
     document.getElementById("id-loader").style.display = 'none';
     document.getElementById('id-noDisplay').classList.remove('cs-hidden');
     document.getElementById('id-noDisplay').style.visibility = 'visible';
     document.getElementById('id-lastEdited').textContent = `Last Date Edited: ${dateEdited}`;
     document.getElementById('id-copyrighted').textContent = copyrighted;
     if (inst) { document.getElementById('id-installed').textContent = 'The Ark Bible is Installed!'; } else { document.getElementById('id-installed').textContent = 'The Ark Bible is Not Installed!'; };
});