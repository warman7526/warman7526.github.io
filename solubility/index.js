var anions = ["Nitrate", "Chloride", "Sulphate", "Carbonate", "Hyroxide"];
var cations = ["Ammonium", "Potassium", "Sodium", "Barium", "Calcium", "Magnesium", "Aluminium", "Zinc", "Iron", "Lead", "Copper", "Silver"];
var asked = Array(60).fill(false);
var correct = Array(60).fill(false);
var current;
function findAll(arr, val) {
    return arr.map(function (value, index) {
        return value === val ? index : undefined;
    }).filter(function (value) {
        return value !== undefined;
    });
}

function getCompoundId(id) {
    var anion = anions[Math.floor(id / 12)];
    var cation = cations[id % 12];
    return { compound: cation + " " + anion, "anion": anion, "cation": cation }
}

function playRound() {
    var possibles = findAll(asked, false)
    if (possibles.length != 0) {
        current = possibles[Math.floor(Math.random() * possibles.length)];
        asked[current] = true
        console.log(current);
        document.querySelector("#question>h1").innerHTML = getCompoundId(current).compound;
        document.querySelector("#head>h4").innerHTML = Math.round((1 - (possibles.length / 60)) * 100) + "% COMPLETED"
    } else {
        var binaryString = correct.map(function (bool) {
            return bool ? '1' : '0';
        }).join('');
        window.location.href = "./result.html?res1=" + parseInt(binaryString.substring(0, 30), 2) + "&res2=" + parseInt(binaryString.substring(30), 2)
    }
}


function makeGuess(guess) {
    if (isSoluble(getCompoundId(current)) == guess) {
        correct[current] = true
    }
    playRound()
}

function isSoluble(mol) {
    return (mol.anion == "Nitrate" || ["Sodium", "Potassium", "Ammonium"].includes(mol.cation) || (mol.anion == "Chloride" && !["Silver", "Lead"].includes(mol.cation)) || (mol.anion == "Sulphate" && !["Lead", "Barium", "Calcium"].includes(mol.cation)))
}


playRound()