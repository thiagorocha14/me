(function () {
    loadJson("portuguese").then((dates) => {
        createCubes("portuguese");
        fillCubes(dates, "portuguese");
    });
    loadJson("english").then((dates) => {
        createCubes("english");
        fillCubes(dates, "english");
    });
})();

async function loadJson(lang) {
    const json_file = "../json/special_dates_" + lang + ".json";

    const json = await fetch(json_file).then((response) => response.json());
    const dates = json.dates;

    return dates;
}

function getNumbersOfWeeksSinceBorn() {
    const date = new Date();
    const begin = new Date(2001, 10 - 1, 3);

    return diffWeeksBetweenDates(date, begin);
}

function getNumbersOfWeeksAll() {
    const date = new Date(2070, 12 - 1, 31);
    const begin = new Date(2000, 1, 1);

    return diffWeeksBetweenDates(date, begin);
}

function getNumberWeekStart() {
    const date = new Date(2001, 10 - 1, 3);
    const begin = new Date(2000, 1, 1);

    return diffWeeksBetweenDates(date, begin);
}

function diffWeeksBetweenDates(date, begin) {
    let diff = (date.getTime() - begin.getTime()) / 1000;
    diff /= 60 * 60 * 24 * 7;

    return Math.abs(Math.round(diff));
}

function createCubes(lang) {
    const article = document.getElementById("cubes-" + lang);
    let initialyear = 2000;
    for (let i = 0; i < getNumbersOfWeeksAll(); i++) {
        if (i % 52 == 0) {
            let span = document.createElement("span");
            span.className = "year";
            span.innerHTML = initialyear++;

            article.appendChild(span);
        }
        let div = document.createElement("div");
        div.className = "cube";

        article.appendChild(div);
    }
}

function fillCubes(dates, lang) {
    const cubes = document.getElementsByClassName("cube");
    const weeksLived = getNumberWeekStart() + getNumbersOfWeeksSinceBorn();
    const begin = new Date(2000, 1, 1);
    let eventCount = 0;

    for (let i = getNumberWeekStart(); i < weeksLived; i++) {
        cubes[i].className = "cube";

        dates.forEach((json) => {
            let dateArray = json.date.split("-");
            let date = new Date(
                dateArray[0],
                Number(dateArray[1]) - 1,
                dateArray[2]
            );
            if (i == diffWeeksBetweenDates(date, begin)) {
                eventCount++;
                const date_string =
                    lang === "portuguese"
                        ? date.toLocaleDateString("pt-br")
                        : date.toDateString();

                let div = document.createElement("div");
                div.className = "triangle";
                cubes[i].appendChild(div);

                let child = document.createElement("div");
                child.className = "special";

                let img = document.createElement("img");
                img.className = "special-img";
                img.src = "../assets/imgs/" + json.date + ".jpg";
                child.appendChild(img);

                let span = document.createElement("span");
                span.className = "special-description";
                span.innerHTML = `${json.description}<br>${date_string}`;
                child.appendChild(span);

                cubes[i].appendChild(child);
                return;
            }
        });

        if (eventCount > 0) {
            cubes[i].classList.add("lived");
        }

        if (eventCount > 2) {
            cubes[i].classList.add("lived-2");
        }

        if (eventCount > 4) {
            cubes[i].classList.add("lived-3");
        }
    }
}
