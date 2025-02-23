async function generateQuiz() {
    const topic = document.getElementById("topic").value;
    if (!topic) {
        alert("Please enter a topic!");
        return;
    }

    const response = await fetch("http://localhost:3000/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic })
    });

    const data = await response.json();
    
    displayQuiz(data);
}

function displayQuiz(quizData) {
    const quizDiv = document.getElementById("quiz");
    quizDiv.innerHTML = ""; 

    quizData.questions.forEach((q, index) => {
        const questionHTML = `
            <div class="question">
                <p><strong>${index + 1}. ${q.question}</strong></p>
                ${q.options.map((option, i) => 
                    `<label><input type="radio" name="q${index}" value="${option}"> ${option}</label><br>`).join("")}
            </div>
        `;
        quizDiv.innerHTML += questionHTML;
    });
}

function submitQuiz() {
    let score = 0;
    document.querySelectorAll(".question").forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected && selected.value === quizData.questions[index].answer) {
            score++;
        }
    });
    document.getElementById("score").innerText = `Your Score: ${score} / 10`;
}

function goBack() {
    window.history.back();
}
