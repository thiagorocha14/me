(function () {
    this.setupConfigsClick();
})();

function setupConfigsClick() {
    const configsH3 = document.getElementsByClassName("name-config");
    Array.from(configsH3).forEach((config) => {
        config.addEventListener("click", function () {
            const text = this.nextElementSibling;
            if (text.style.display === "block") {
                text.style.display = "none";
            } else {
                text.style.display = "block";
            }
        });
    });
}
