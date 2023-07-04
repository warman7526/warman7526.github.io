var valid_words = []
function checkWord(w) {
    if (httpGetDef(w).title != "No Definitions Found") {
        valid_words.push(w)
        console.log(w)
    }
}




console.log({ "words": words.length, valid: valid_words.length })