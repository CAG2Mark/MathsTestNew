// Maths Test "Other"" Module

// Manages cookies and anything help and privacy-related and whatever

var config = {
    ign: "",
    darkMode: false,
    questionAnswers: {}
}

function doFirstTimeCookie() {
    if (!Cookies.get("cookieStatus")) {
        updatePopupPage(cookiesTuple, true);
    }
}

function loadConfig() {
    if (Cookies.get("cookieStatus") != 2) return;

    try {
        let cookie = Cookies.get("config");
        if (!cookie.trim()) return;
        config = JSON.parse(cookie);

        darkMode = config.darkMode;
        updateDarkMode();
    }
    catch (Error) {
        console.log("Could not load cookies from JSON.");
    }
}

function saveConfig() {
    if (Cookies.get("cookieStatus") == 2) {
        Cookies.set("config", JSON.stringify(config), {expires: 1000});
    } else {
        Cookies.remove("config");
    }
}

loadConfig();
doFirstTimeCookie();

document.getElementById("allow-cookies-btn").addEventListener("click", (e) => {
    updatePopupPage(cookiesTuple, false);
    Cookies.set("cookieStatus", 2, {expires: 1000});
});

document.getElementById("allow-cookies-dark-btn").addEventListener("click", (e) => {
    updatePopupPage(cookiesTuple, false);
    Cookies.set("cookieStatus", 2, {expires: 1000});
    darkMode = true;
    updateDarkMode();
});

document.getElementById("disallow-cookies-btn").addEventListener("click", (e) => {
    updatePopupPage(cookiesTuple, false);
    Cookies.set("cookieStatus", 1, {expires: 1000});
    Cookies.remove("config");
});