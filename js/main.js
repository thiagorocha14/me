(function () {
    keepTheme();
    if (document.getElementById("switch_input")) {
        document
            .getElementById("switch_input")
            .addEventListener("change", function () {
                if (this.checked) {
                    setTheme("dark");
                } else {
                    setTheme("light");
                }
            });
    }

    if (document.getElementsByClassName("lang-menu").length > 0) {
        keepLang();
        document.getElementById("pt-br").addEventListener("click", function () {
            translateToPtBr();
            if (typeof loadJson() === "function") {
                loadJson().then((dates) => {
                    createCubes();
                    fillCubes(dates);
                });
            }
        });

        document.getElementById("en").addEventListener("click", function () {
            translateToEn();
            if (typeof loadJson() === "function") {
                loadJson().then((dates) => {
                    createCubes();
                    fillCubes(dates);
                });
            }
        });
    }
})();

function setTheme(theme) {
    if (theme === "dark") {
        document.getElementById("switch_input").checked = true;
        localStorage.setItem("theme", theme);
    } else {
        document.getElementById("switch_input").checked = false;
        localStorage.setItem("theme", theme);
    }
}

function keepTheme() {
    const theme = localStorage.getItem("theme");
    if (theme) {
        setTheme(theme);
        return;
    }

    const darkModeMediaQuery = window.matchMedia(
        "(prefers-color-scheme: dark)"
    );
    if (darkModeMediaQuery.matches) {
        setTheme("dark");
        return;
    }

    setTheme("light");
}

function keepLang() {
    const lang = localStorage.getItem("lang");
    if (lang) {
        if (lang === "pt-br") {
            translateToPtBr();
        } else {
            translateToEn();
        }
        return;
    }

    translateToEn();
}

function translateToPtBr() {
    localStorage.setItem("lang", "pt-br");

    document.getElementById("english").classList.add("d-none");
    document.getElementById("portuguese").classList.remove("d-none");

    const selectedLang = document.getElementsByClassName("selected-lang")[0];
    selectedLang.classList.add("pt-br");
    selectedLang.classList.remove("en");

    const selectedLangText = selectedLang.getElementsByTagName("a")[0];
    selectedLangText.innerHTML = "Português";

    document.getElementById("pt-br").innerHTML = "Português";
    document.getElementById("en").innerHTML = "Inglês";
}

function translateToEn() {
    localStorage.setItem("lang", "en");

    document.getElementById("portuguese").classList.add("d-none");
    document.getElementById("english").classList.remove("d-none");

    const selectedLang = document.getElementsByClassName("selected-lang")[0];
    selectedLang.classList.add("en");
    selectedLang.classList.remove("pt-br");

    const selectedLangText = selectedLang.getElementsByTagName("a")[0];
    selectedLangText.innerHTML = "English";

    document.getElementById("pt-br").innerHTML = "Portuguese";
    document.getElementById("en").innerHTML = "English";
}
