// prevent dark mode clicker on reload
var darkMode = false;

function load() {
    if (Cookies.get("cookieStatus") != 2) return;
    try {
        let cookie = Cookies.get("config");
        if (!cookie.trim()) return;
        config = JSON.parse(cookie);

        darkMode = config.darkMode;
    }
    catch (Error) {
        return;
    }
}

load();

if (darkMode) {
    document.body.classList.add("dark-mode");
}