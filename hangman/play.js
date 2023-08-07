var word = new URLSearchParams(new URL(window.location.href).search).get("wordid").replace(/[^A-Z- ']/g, "")
function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substr(0, index) + chr + str.substr(index + 1);
}
var q = (e) => document.querySelector(e);

function copylink() {
    copy(window.location.href)
    if (!q("dialog#copylink")) document.body.innerHTML += '<dialog id="copylink">Copied To Clipboard<br><button onclick="this.parentElement.close()">OK</button></dialog>'
    q("dialog#copylink")
        .showModal();
} function copy(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        // IE: prevent textarea being shown while dialog is visible
        return window.clipboardData.setData("Text", text);

    } else if (document.queryCommandSupported &&
        document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        // Prevent scrolling to bottom of page in MS Edge
        textarea.style.position = "fixed";
        document.body.appendChild(textarea);
        textarea.select();
        try {
            // Security exception may be thrown by some browsers
            return document.execCommand("copy");
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}

var game = new Game(word)

var makeGuess = (e) => {

    q("#phrase").innerHTML = "";
    game.guessLetter(e).split("").forEach((l) => q("#phrase").innerHTML += (l == " " ? "<hr/>" : `<div class="bubble">${l}</div>`))
    q("#info").innerHTML = "";
    game.inccorects.forEach((l) => q("#info").innerHTML += `<div class="bubble">${l}</div>`)
    q("#image>img").src = game.getImage();
    q(`[letter="${e}"]`).classList.add("guessed")

}

var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
letters.forEach((e) => {
    q("#keyboard").children[Math.floor(letters.indexOf(e) / 7)].innerHTML += `<button onclick="makeGuess('${e}')" letter="${e}">${e}</button>`
})
q("#keyboard").children[3].innerHTML += `<button style="width:16vh; font-size:75%;" onclick="copylink()">SHARE GAME LINK</button>`

makeGuess("*")