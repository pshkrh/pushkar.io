document.getElementById("copyright-year").innerHTML = new Date().getFullYear();

const body = document.body;
const lightModeIcon = document.getElementById("light-mode-icon");
const darkModeIcon = document.getElementById("dark-mode-icon");

function toggleDarkMode() {
    body.classList.toggle('dark-mode');
    localStorage.setItem('dark-mode', body.classList.contains('dark-mode'));
    updateIcons();
}

function updateIcons() {
    if (body.classList.contains('dark-mode')) {
        lightModeIcon.style.display = 'inline-block';
        darkModeIcon.style.display = 'none';
    } else {
        lightModeIcon.style.display = 'none';
        darkModeIcon.style.display = 'inline-block';
    }
}

if (localStorage.getItem('dark-mode') !== 'false') {
    body.classList.add('dark-mode');
} else {
    body.classList.remove('dark-mode');
}
updateIcons();