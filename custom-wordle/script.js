inputBox = document.getElementById("word")
validpattern = /\b[A-Z]+\b/gm
shifts = [-4, 14, -9, 3, 11]
alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-!$^*@'~:;\\|+=\"/?<>,."
makeInputUpper = function (i) { i.value = i.value.toUpperCase() }
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
    console.log(id)
    var obsid = "";
    for (var i = 0; i < id.length; i++) {
        var obs = "";
        for (var o = 0; o < randint(5, 8); o++) {
            obs += alphabet[randint(0, alphabet.length)]
            console.log(obs)
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
