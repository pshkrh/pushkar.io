document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("copyright-year").innerHTML = new Date().getFullYear();

    const body = document.body;
    const themeColorMeta = document.getElementById("theme-color-meta");
    const lightModeIcon = document.getElementById("light-mode-icon");
    const darkModeIcon = document.getElementById("dark-mode-icon");

    function toggleDarkMode() {
        body.classList.toggle('dark-mode');
        localStorage.setItem('dark-mode', body.classList.contains('dark-mode'));
        updateIcons();
    }

    function updateIcons() {
        if (body.classList.contains('dark-mode')) {
            console.log("Setting theme color to dark.");
            lightModeIcon.style.display = 'inline-block';
            darkModeIcon.style.display = 'none';
            themeColorMeta.setAttribute('content', '#181818');
        } else {
            console.log("Setting theme color to light.");
            lightModeIcon.style.display = 'none';
            darkModeIcon.style.display = 'inline-block';
            themeColorMeta.setAttribute('content', '#ffffff');
        }
    }

    if (localStorage.getItem('dark-mode') !== 'false') {
        body.classList.add('dark-mode');
        themeColorMeta.setAttribute('content', '#181818');
    } else {
        body.classList.remove('dark-mode');
        themeColorMeta.setAttribute('content', '#ffffff');
    }
    updateIcons();
});