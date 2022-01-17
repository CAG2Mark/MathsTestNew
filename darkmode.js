// prevent dark mode clicker on reload
var darkMode = false;

function load() {
    try {
        let val = localStorage.getItem("config");
        if (!val.trim()) return;
        config = JSON.parse(val);

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