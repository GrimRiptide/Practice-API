const triviaApi = fetch("https://opentdb.com/api.php?amount=10");
const triviaCode = fetch("https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple&encode=base64");
let data_results = [];

function shuffle(array){
    let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}



triviaCode.then((response) => {
if (!response.ok){
    throw new Error("bad");
}
return response.json();
}).then((data) => {

    data_results = data.results;

    let sheet = document.createElement('form');
    sheet.id= "sheet";
    document.body.appendChild(sheet);
    let ASheet = document.getElementById("sheet");
    let cIDlist = [];
    for(let i = 0; i < data_results.length; i++){


        let tempQ = document.createElement('div');
        tempQ.id= "Q"+ i.toString();
        tempQ.innerText = atob(data_results[i].question);
        ASheet.appendChild(tempQ);

        let tempQuest = document.getElementById('Q'+i.toString());
        tempQuest.classList.add('red');

        cIDlist.push(data_results[i].correct_answer);
        console.log(atob(data_results[i].correct_answer));
        let answerList = [data_results[i].correct_answer, data_results[i].incorrect_answers[0], data_results[i].incorrect_answers[1], data_results[i].incorrect_answers[2]];
        answerList = shuffle(answerList);
        for (let o = 0; o < answerList.length; o++){
            let a1 = document.createElement('input');
            a1.type = 'radio';
            a1.id = answerList[o];
            answerList[o] = atob(answerList[o]);

            a1.name = 'question'+i.toString();
            a1.value = answerList[o];
            let al1 = document.createElement('label');
            al1.for = answerList[o];
            al1.innerText = answerList[o];
            tempQuest.appendChild(a1);
            tempQuest.appendChild(al1);
        }

    }
    let b = document.createElement('button');
    b.type = 'submit';
    b.value = 'send';
    b.innerText = "Submit";
    b.id = 'SheetSubmit';
    ASheet.appendChild(b);
    let score_text = 0;
    let score_results = document.createElement('h2');
    document.getElementById("sheet").addEventListener("submit",(e)=> {
        e.preventDefault();
        let score = 0;
        console.log("hi");
        for (let a = 0; a < cIDlist.length; a++){
            console.log(atob(cIDlist[a]));
            if (document.getElementById(cIDlist[a]).checked){
                console.log('hello');
                score++;
            
            }
            score_text = score;
            score_results.innerText="Questions answered correctly: "+score_text.toString()+" out of 10"; 
        }
    }); 
    ASheet.appendChild(score_results);
});
