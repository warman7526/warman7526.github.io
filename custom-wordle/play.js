tu = new URL(window.location.href);
ts = new URLSearchParams(tu.search);
var wordid = ts.get("wordid")
var word = parseInt(wordid.replace(/[^0-9]/g, "")).toString(36)
document.querySelector("#sharelink").innerHTML = window.location.href
document.querySelector("#sharelink").href = window.location.href
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
                    }

                }
            }
        }
    }
    return res
}

function makeGuess(guess) {
    var score = getResult(word, guess);
    var cells = updateGrid(guessNum, guess);
    var classKey = ["incorrect", "included", "placed"]
    guessNum++;
    for (var b = 0; b < cells.length; b++) {
        var cell = cells[b]
        cell.classList.add(classKey[score[b]])
    }
    if (!(score.includes(0) || score.includes(1))) {
        window.setTimeout(function () { document.querySelector("#congrats").showModal(); document.querySelector("#guess").innerHTML = `${guessNum} guess${guessNum != 1 ? "es" : ""}` }, 1000)
    }
}

document.addEventListener("keyup", function (e) {
    if (guessNum == 5) {
        return
    }
    let pressedKey = String(e.key)
    console.log(pressedKey)
    if (pressedKey === "Backspace" && entered.length > 0) {
        entered = entered.substring(0, entered.length - 1)
        updateGrid(guessNum, entered)
        return
    }

    else if (pressedKey === "Enter" && entered.length == 5) {
        makeGuess(entered)
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
})
createGrid(word.length, 6)
