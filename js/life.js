(function () {
    loadJson().then((dates)=> {
        createCubes();
        fillCubes(dates);
    });
})();

async function loadJson(){
    const json = await fetch("../special_dates.json").then((response) => response.json());
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

function getNumberWeekStart(){
    const date = new Date(2001, 10 - 1, 3);
    const begin = new Date(2000, 1, 1);

    return diffWeeksBetweenDates(date, begin);
}

function diffWeeksBetweenDates(date, begin) {
    let diff = (date.getTime() - begin.getTime()) / 1000;
    diff /= (60 * 60 * 24 * 7);

    return Math.abs(Math.round(diff));
}

function createCubes(){
    const article = document.getElementById("cubes");
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

function fillCubes(dates){
    const cubes = document.getElementsByClassName("cube");
    const weeksLived = getNumberWeekStart() + getNumbersOfWeeksSinceBorn();
    const begin = new Date(2000, 1, 1);
    
    for (let i = getNumberWeekStart(); i < weeksLived; i++) {
        cubes[i].className = "cube lived";

        dates.forEach(json => {
            let dateArray = json.date.split("-");
            let date = new Date(dateArray[0], Number(dateArray[1]) - 1, dateArray[2]);
            if (i == diffWeeksBetweenDates(date, begin)) {
                let div = document.createElement("div");
                div.className = "special";
                cubes[i].appendChild(div);
                
                let span = document.createElement("span");
                span.className = "special-description";
                span.innerHTML = `${json.description}<br>${date.toDateString()}`;
                cubes[i].appendChild(span);
                return;
            }
        });
    }
}