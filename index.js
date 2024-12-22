function openWindow(id="") {
    document.getElementById(id).style.display = "block";
    dragElement(id);
}

function closeWindow(id="") {
    document.getElementById(id).style.display = "none";
    dragElement(id);
}

function dragElement(id) {
    var elm = document.getElementById(id);
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    if (elm.querySelector(".window-header")) {
        elm.querySelector(".window-header").onmousedown = dragMouseDown;
    } else {
        elm.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elm.style.top = (elm.offsetTop - pos2) + "px";
        elm.style.left = (elm.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Ermöglicht das Vergrößern des Fensters
makeResizable(document.getElementById("myWindow"));

function makeResizable(elm) {
    const resizer = document.getElementById('resizer');
    resizer.addEventListener('mousedown', startResize);

    function startResize(e) {
        e.preventDefault();
        document.documentElement.addEventListener('mousemove', resizing);
        document.documentElement.addEventListener('mouseup', stopResize);
    }

    function resizing(e) {
        e.preventDefault();
        elm.style.width = (e.clientX - elm.offsetLeft) + 'px';
        elm.style.height = (e.clientY - elm.offsetTop) + 'px';

        const minWidth = parseInt(window.getComputedStyle(elm).minWidth);
        const minHeight = parseInt(window.getComputedStyle(elm).minHeight);

        if (elm.offsetWidth < minWidth) elm.style.width = minWidth + 'px';
        if (elm.offsetHeight < minHeight) elm.style.height = minHeight + 'px';

        const maxWidth = window.innerWidth - elm.offsetLeft;
        const maxHeight = window.innerHeight - elm.offsetTop;

        if (elm.offsetWidth > maxWidth) elm.style.width = maxWidth + 'px';
        if (elm.offsetHeight > maxHeight) elm.style.height = maxHeight + 'px';
    }

    function stopResize() {
        document.documentElement.removeEventListener('mousemove', resizing);
        document.documentElement.removeEventListener('mouseup', stopResize);
    }
}

// create a function to update the date and time
function updateDateTime() {
    // create a new `Date` object
    const now = new Date();

    // get the current hours and minutes
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    // create a string with hours and minutes
    const currentTime = `${hours}:${minutes}`;

    // update the `textContent` property of the `span` element with the `id` of `datetime`
    document.querySelector('#datetime').textContent = currentTime;
}

// call the `updateDateTime` function every second
setInterval(updateDateTime, 1000);

function toggleFileDropdown() {
    document.getElementById("fileDropdown").classList.toggle("show");
    closeOthers("fileDropdown");
}

function toggleEditDropdown() {
    document.getElementById("editDropdown").classList.toggle("show");
    closeOthers("editDropdown");
}

function toggleViewDropdown() {
    document.getElementById("viewDropdown").classList.toggle("show");
    closeOthers("viewDropdown");
}

function closeOthers(exceptId) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.id !== exceptId && openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
        }
    }
}

// Dropdowns schließen, wenn außerhalb geklickt wird
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

window.addEventListener('load', function() {
    const bootScreen = document.getElementById('bootScreen');
    const bootAudio = document.getElementById('bootAudio');
    
    // Starte die Audio-Wiedergabe
    bootAudio.play();
    
    setTimeout(() => {
        // Stoppe die Audio-Wiedergabe
        // Verberge den Bootscreen
        bootScreen.style.display = 'none';
    }, 2200);
});

