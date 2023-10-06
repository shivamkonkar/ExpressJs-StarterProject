// Load questions from JSON
console.log("hello")
let questions = [];
fetch('/json/questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        displayQuestion(0);
    });

// Initialize answers array
let answers = [];
let optionsArray = []
let sentence1Array = []
let sentence2Array = []
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const optionsForm = document.getElementById('options-form');
const submitBtn = document.getElementById('submit')

// Display a question
function displayQuestion(index) {
    if (index < questions.length) {
        questionElement.textContent = questions[index].question;
        optionsForm.innerHTML = '';
        sentence1Array = questions[index].Sentence1
        console.log(sentence1Array)
        sentence2Array = questions[index].Sentence2
        console.log(sentence2Array)
        optionsArray = questions[index].options
        console.log(optionsArray)
        questions[index].options.forEach((option, optionIndex) => {
            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.name = 'answer';
            radioInput.value = option;
            radioInput.id = `option${optionIndex}`;
            const label = document.createElement('label');
            const br = document.createElement('br')
            label.id = `option${optionIndex}`;
            label.textContent = option;
            optionsForm.appendChild(radioInput);
            optionsForm.appendChild(label);
            optionsForm.appendChild(br)
            optionsForm.appendChild(submitBtn)
        });
    } else {
        questionContainer.innerHTML = '<p>Thank you for completing the questionnaire!</p>';
    }
}

//Handle form submission
optionsForm.addEventListener('change', () => {
    submitBtn.disabled = false;
});

optionsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    console.log(selectedOption.value)
    var selectedIndex = optionsArray.indexOf(selectedOption.value);
    if (selectedOption) {
        if(selectedIndex == 0){
            answers.push({ question: questionElement.textContent, answer: selectedOption.value, keywords: sentence1Array });
        }
        else{
            answers.push({ question: questionElement.textContent, answer: selectedOption.value, keywords: sentence2Array });
        }
        
        console.log(answers)
        if (answers.length > 0) {
            const jsonString = JSON.stringify(answers, null, 2);
            console.log(jsonString);
        }
        displayQuestion(answers.length);
    }
});


// Save answers to JSON
// window.addEventListener('beforeunload', () => {
//     if (answers.length > 0) {
//         fetch('answers.json', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(answers),
//         });
//     }
// });

