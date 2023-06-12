var inputBox = document.querySelector("input")
validpattern = /\b[A-Z]+\b/gm
alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-!$^*@'~:;\\|+=\"/?<>,."
makeInputUpper = function (i) { i.value = i.value.toLowerCase() }
function randint(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function choice(a) {
    return a[randint(0, a.length)]
}
function sendToGame() {
    var word = inputBox.value;
    var mult = randint(1000, 9999)
    var id = (parseInt(word, 36) * mult).toString()
    console.log({ "id": id, "mult": mult, "word": word })
    var obsid = "";
    for (var i = 0; i < id.length; i++) {
        var obs = "";
        for (var o = 0; o < randint(5, 8); o++) {
            obs += alphabet[randint(0, alphabet.length)]
        }
        console.log(obsid)
        obsid += obs + id[i]
    }
    console.log(obsid)
    window.location.href = "./play.html?wordid=" + mult.toString() + "£" + obsid;
}

function setRandWord() {
    inputBox.value = choice(words)
}

function getDate() {
    const months = "JanFebMarAprMayJunJulAugSepOctNovDec"
    const d = new Date();
    var day = d.getDate().toString();
    var month = months.substring(d.getMonth() * 3, (d.getMonth() + 1) * 3)
    return (day.length == 1 ? "0" : "") + day + month;
}