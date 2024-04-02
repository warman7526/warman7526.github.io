var q = (e) => document.querySelector(e);
var url = new URL(window.location.href)
var path = url.pathname.split("/")
path.pop()
var link = url.protocol + "//" + url.hostname + path.join("/") + "/play.html?wordid=" + url.searchParams.get("wordid")


function copyLink() {
    copy(link)
    if (!q("dialog#copylink")) document.body.innerHTML += '<dialog id="copylink">Copied To Clipboard<br><button onclick="this.parentElement.close()">OK</button></dialog>'
    q("dialog#copylink")
        .showModal();
}

function sendToGame() {
    window.location.href = "./play.html?wordid=" + new URL(window.location.href).searchParams.get("wordid")
}


function copy(text) {
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