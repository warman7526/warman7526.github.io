class Game {
    constructor(word) {
        this.images = ["dead", "arms", "legs", "body", "head", "support", "noose", "beam", "upright", "stage", "blank"]
        this.guesses = 11
        this.alive = true
        this.word = word
        this.display = word.replace(/[^ \-']/gm, "_")
        this.inccorects = []
        this.guessLetter = (e) => {
            if (!this.word.includes(e)) { this.wrong(e); return this.display; }
            for (var i = 0; i < this.word.length; i++) {
                if (this.word[i] == e) {
                    this.display = setCharAt(this.display, i, e)
                }
            }; return this.display;
        }
        this.wrong = (e) => {
            if (e != "*") this.inccorects.push(e);
            this.guesses--;
        }
        this.getImage = () => "images/" + this.images[this.guesses] + ".png"
    }
}