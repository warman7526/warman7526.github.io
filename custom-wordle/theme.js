function getDate() {
    const months = "JanFebMarAprMayJunJulAugSepOctNovDec"
    const d = new Date();
    var day = d.getDate().toString();
    var month = months.substring(d.getMonth() * 3, (d.getMonth() + 1) * 3)
    return (day.length == 1 ? "0" : "") + day + month;
}
function setTheme(d) {
    var specials = {
        "27Jun": "fireworks",
        "24Dec": "xmas",
        "25Dec": "xmas",
        "26Dec": "xmas",
        "01Jan": "fireworks",
        "31Dec": "fireworks",
        "13Dec": "taytay"
    }
    if (!Object.keys(specials).includes(d)) {
        document.querySelector("body").id = "";
        document.querySelector("body").setAttribute("i", randint(1, 8)); document.querySelector("body").innerHTML += "<span class='bgcredits' onclick='window.open(`https://www.youtube.com/@hypermind15`,`_blank`)'>Background © Hypermind 2023</span>"
    } else {
        document.querySelector("body").id = specials[d];

    }
}
setTheme(getDate())