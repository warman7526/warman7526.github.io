var urlParams = new URLSearchParams(window.location.search);

var correct = (parseInt(urlParams.get('res1'), 10).toString(2).padStart(30, '0') + parseInt(urlParams.get('res2'), 10).toString(2).padStart(30, '0')) //generate binary string
    .split("").map(function (char) { return char === '1'; });  //generate bool array
var anions = ["Nitrate", "Chloride", "Sulphate", "Carbonate", "Hyroxide"];
var cations = ["Ammonium", "Potassium", "Sodium", "Barium", "Calcium", "Magnesium", "Aluminium", "Zinc", "Iron", "Lead", "Copper", "Silver"]; function findAll(arr, val) {
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
function isSoluble(mol) {
    return (mol.anion == "Nitrate" || ["Sodium", "Potassium", "Ammonium"].includes(mol.cation) || (mol.anion == "Chloride" && !["Silver", "Lead"].includes(mol.cation)) || (mol.anion == "Sulphate" && !["Lead", "Barium", "Calcium"].includes(mol.cation)))
}

incorrects = findAll(correct, false)
reciept = incorrects.map(function (i) {
    return `${getCompoundId(i).compound} is ${isSoluble(getCompoundId(i)) ? "" : "in"}soluble`
}).join("<hr><hr>")

document.querySelector("#question>h1").innerHTML = "YOUR SCORE: " + (Math.round(((findAll(correct, true).length / 60)) * 1000) / 10) + "%!"
document.querySelector("#buttons>p").innerHTML = "<hr>" + reciept + "<hr>"
if (reciept !== "") document.querySelector("#buttons>h3").innerHTML = "Corrections:"
document.querySelector("#buttons>p").style = "overflow-y:scroll"