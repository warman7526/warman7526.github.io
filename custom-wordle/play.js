tu = new URL(window.location.href);
ts = new URLSearchParams(tu.search);
var wordid = ts.get("wordid")
var wordidnum = parseInt(wordid.split(/£/)[1].replace(/[^0-9]/g, ""))
var wordidmult = parseInt(wordid.split(/£/)[0])
var wordid = Math.round(wordidnum / wordidmult)
var word = wordid.toString(36)

var scoreText = "";
document.querySelector("#sharelink").innerHTML = window.location.href
document.querySelector("#sharelink").href = window.location.href
document.querySelector("#sharelinkend").innerHTML = window.location.href
document.querySelector("#sharelinkend").href = window.location.href
document.querySelector("#sharelinkendbad").innerHTML = window.location.href
document.querySelector("#sharelinkendbad").href = window.location.href
var guessNum = 0;
var entered = "";

function createGrid(width, height) {
    var grid = document.querySelector(".grid")
    var toadd = "";
    for (var row = 0; row < height; row++) {
        toadd += `<div class='row' row=${row}>`
        for (var col = 0; col < width; col++) {
            toadd += `<div class="cell" col=${col}></div>`
        }
        toadd += `</div>`
    }
    grid.innerHTML += toadd
}
function updateGrid(row, word) {
    for (var i = 0; i < word.length; i++) {

    }
    var cells = []
    for (var i = 0; i < 5; i++) {
        var cell = document.querySelector(`.grid>.row[row='${row}']>.cell[col='${i}']`)
        cell.innerHTML = word.length <= i ? "&nbsp;" : word[i].toUpperCase()
        cell.classList.add("selected")
        cells.push(cell)
    }
    return cells
}

function getResult(target, guess) {
    guess = guess.toUpperCase()
    target = target.toUpperCase()
    var res = [0, 0, 0, 0, 0]
    var counted = []
    var contained = []
    for (var i = 0; i < target.length; i++) {
        contained[target[i]] = contained[target[i]] ? contained[target[i]] + 1 : 1;
        if (target[i] == guess[i]) {
            counted[target[i]] = counted[target[i]] ? counted[target[i]] + 1 : 1;
            res[i] = 2;
            document.querySelector(`.key[onclick="pressKey('${guess[i].toUpperCase()}')"]`).classList.add("placed")
        }
    }
    console.log(`contained`, contained, `\ncounted=`, counted)
    for (var i = 0; i < target.length; i++) {
        counted[guess[i]] = counted[guess[i]] ? counted[guess[i]] : 0
        console.log(`i=${i}\ntarget.includes(guess[i])=${target.includes(guess[i])}\ncounted[guess[i]] < contained[guess[i]]=${counted[guess[i]]} < ${contained[guess[i]]}=${counted[guess[i]] < contained[guess[i]]}`)
        if (target.includes(guess[i]) && counted[guess[i]] < contained[guess[i]]) {
            console.log(guess[i])
            counted[guess[i]] = counted[guess[i]] ? counted[guess[i]] + 1 : 1;
            console.log(counted[target[i]])
            var my = false;
            for (var c = 0; c < res.length; c++) {
                if (!my) {
                    console.log(res[c], guess[c], guess[i])
                    if (res[c] == 0 && guess[c] == guess[i]) {
                        console.log(c)
                        res[c] = 1;
                        console.log("CHOSEN", res[c], guess[c], guess[i])
                        my = true;
                        document.querySelector(`.key[onclick="pressKey('${guess[c].toUpperCase()}')"]`).classList.add("included")
                    }

                }
            }
        } else {
            document.querySelector(`.key[onclick="pressKey('${guess[i].toUpperCase()}')"]`).classList.add("incorrect")
        }
    }
    return res
}

function makeGuess(guess) {
    if (!words.includes(guess) && guess != word) { document.querySelector("dialog#invalid").showModal(); window.setTimeout(function () { document.querySelector('dialog#invalid').close() }, 1000); return; }


    var score = getResult(word, guess);
    scoreText += score.join(" ").replace(/2/g, "🟩").replace(/1/g, "🟨").replace(/0/g, "⬛️") + "<br/>"
    document.querySelector("#score").innerHTML = scoreText
    document.querySelector("#scorebad").href = scoreText
    var cells = updateGrid(guessNum, guess);
    var classKey = ["incorrect", "included", "placed"]
    guessNum++;
    for (var b = 0; b < cells.length; b++) {
        var cell = cells[b]
        cell.classList.add(classKey[score[b]])
    }
    if (!(score.includes(0) || score.includes(1))) {
        window.setTimeout(function () { document.querySelector("#congrats").showModal(); document.querySelector("#guess").innerHTML = `${guessNum} guess${guessNum != 1 ? "es" : ""}` }, 1000)

    } else if (guessNum == 6) {
        window.setTimeout(function () { document.querySelector("#uhoh").showModal(); document.querySelector("#word").innerHTML = `${word}` }, 1000)
    }

}

document.addEventListener("keyup", (e) => pressKey(e.key))
function pressKey(pressedKey) {
    if (guessNum == 6) {
        return
    }
    console.log(pressedKey)
    if (pressedKey === "Backspace" && entered.length > 0) {
        entered = entered.substring(0, entered.length - 1)
        updateGrid(guessNum, entered)
        return
    }

    else if (pressedKey === "Enter") {
        if (entered.length == 5) {
            makeGuess(entered)
        } else {
            if (!words.includes(guess)) { document.querySelector("dialog#short").showModal(); window.setTimeout(function () { document.querySelector('dialog#short').close() }, 1000); }
        }
        entered = ""
        updateGrid(guessNum, entered)
    }

    let found = pressedKey.match(/[a-z]/gi)
    if (!found || found.length > 1 || entered.length == 5) {
        return
    } else {
        entered += pressedKey
    }
    updateGrid(guessNum, entered)
}

function randint(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function choice(a) {
    return a[randint(0, a.length)]
}

createGrid(word.length, 6)

