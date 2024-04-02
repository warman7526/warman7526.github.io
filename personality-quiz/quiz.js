const params = new URLSearchParams(window.location.search);
const dataset = datasets[parseInt(params.get("dataset"))]
$title(dataset.document.title)
$("#title").innerHTML = dataset.document.title
$("#subtitle").innerHTML = dataset.document.description
var q = -1
var a = Array(dataset.results.length).fill(0)
function displayQ(question) {
    var toadd = `<div class='question'><h2>${question.question}</h2>`
    var answers = question.answers.length;
    var i = 0;
    question.answers.forEach((answer) => {
        toadd += `<div class='answer' style='backdrop-filter:contrast(60%) brightness(40%);float:left;width:calc(100vw / ${answers} - 22px);height: calc(60vw / ${answers} - 10px);font-size:calc(10vw / ${answers} - 10px);background-image:linear-gradient(to top, rgba(0,0,0,0.5),rgba(0,0,0,0.25),rgba(255,255,255,0.75),rgba(255,255,255,0.75)),url("${answer.image}");background-size:cover;background-position:center;overflow: hidden;margin:8px 8px 8px 8px' onclick="gatherAnswer(${i})">${answer.name}</div>`;
        i++
    })
    $("#question-area").classList.add("hidden")
    setTimeout(() => {
        $("#question-area").innerHTML = toadd + "</div>"
    }, 500);
    setTimeout(() => { $("#question-area").classList.remove("hidden") }, 1000);
}

function nextQ() {
    q++
    $title(dataset.document.title + " - Question " + (q + 1))
    displayQ(dataset.questions[q])
}
nextQ()

function gatherAnswer(an) {
    var ques = dataset.questions
    console.log(ques)
    var toadd = ques[q].answers[an].results
    for (var i = 0; i < toadd.length; i++) {
        a[i] += toadd[i]
    }
    console.log(a)
    if (q == dataset.questions.length - 1) return getResult();
    nextQ()
}

function getResult() {
    var best = dataset.results[a.indexOf(Math.max(...a))]
    console.log(best)

    $("#question-area").classList.add("hidden")
    setTimeout(() => {
        $("#question-area").innerHTML = `<div style="width:calc(100vw - 22px);height: 30vw;font-size:6vw;background-image:linear-gradient(to top, rgba(0,0,0,0.5),rgba(0,0,0,0.25),rgba(255,255,255,0.75),rgba(255,255,255,0.75)),url('${best.image}');margin:8px 8px 8px 8px;background-size:cover;background-position:center;overflow: hidden;">${best.name}</div><h3>${best.description}</h3>`
    }, 500);
    setTimeout(() => { $("#question-area").classList.remove("hidden"); $title(dataset.document.title + " - Result: " + best.name) }, 1000);
}
