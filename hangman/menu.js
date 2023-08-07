alphabet = "0123456789(){}[]\`abcdefghijklmnopqrstuvwxyz_!$^*@~:;\\|=\"/?<>,."

function randint(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function choice(a) {
    return a[randint(0, a.length)]
}

function sendToGame(word) {
    var obsid = "";
    for (var i = 0; i < word.length; i++) {
        var obs = "";
        for (var o = 0; o < randint(6, 10); o++) {
            obs += choice(alphabet)
        }
        console.log(obsid)
        obsid += obs + word[i]
    }
    console.log(obsid)
    window.location.href = "./ready.html?wordid=" + obsid;
}

var q = (e) => document.querySelector(e);

