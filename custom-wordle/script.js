inputBox = document.getElementById("word")
validpattern = /\b[A-Z]+\b/gm
shifts = [-4, 14, -9, 3, 11]
alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-!$^*@'~:;\\|"
makeInputUpper = function (i) { i.value = i.value.toUpperCase() }
function randint(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function sendToGame() {
    var word = inputBox.value;
    var id = parseInt(word, 36).toString()
    var obsid = "";
    for (var i = 0; i < id.length; i++) {
        var obs = "";
        for (var o = 0; o < randint(5, 20); o++) {
            obs += alphabet[randint(0, alphabet.length)]
            console.log(obs)
        }
        console.log(obsid)
        obsid += obs + id[i]
    }
    console.log(obsid)
    window.location.href = "./play.html?wordid=" + obsid;
}