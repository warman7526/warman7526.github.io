inputBox = document.getElementById("word")
validpattern = /\b[A-Z]+\b/gm
shifts = [-4,14,-9,3,11]
alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
makeInputUpper = function(i){i.value = i.value.toUpperCase()}
function shifted(v){
    var res = "";
    for(var i = 0;i<5;i++){
        var index = (alphabet.indexOf(v[i]) + shifts[i]) % 26
        if(index < 0) index = index+26
        console.log(index)
        
        res += alphabet[index]
    }
    return res
}