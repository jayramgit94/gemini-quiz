document.addEventListener("DOMContentLoaded", () => {
    loadSolutions();
});

// Multiple questions per difficulty level
const questions = {
    easy: [
        "What are some ways to save electricity at home?",
        "How can we reduce food waste in our daily lives?",
        "What are some simple steps to stay healthy?",
        "Why is recycling important and how can we do it effectively?"
    ],
    medium: [
        "How can we reduce plastic waste in daily life?",
        "What are effective ways to improve time management skills?",
        "How can we promote eco-friendly transportation in cities?",
        "What strategies can help students develop better study habits?"
    ],
    hard: [
        "Propose an innovative solution to solve urban traffic congestion.",
        "What are some creative ways to improve waste management in rural areas?",
        "How can technology be used to enhance mental health support?",
        "Suggest an effective way to make online education more interactive."
    ]
};

// Get elements
const difficultyButtons = document.querySelectorAll(".difficulty-btn");
const questionText = document.getElementById("question-text");
const solutionForm = document.getElementById("solutionForm");
const solutionsList = document.getElementById("solutionsList");
const nextBtn = document.getElementById("next-btn");

// Set selected difficulty
let selectedDifficulty = "";
let selectedQuestion = "";

// Handle difficulty selection
difficultyButtons.forEach(button => {
    button.addEventListener("click", () => {
        selectedDifficulty = button.getAttribute("data-level");
        selectedQuestion = getRandomQuestion(selectedDifficulty);
        questionText.textContent = selectedQuestion;
        nextBtn.style.display = "block"; // Show Next button when difficulty is selected
    });
});

// Function to get a random question from the selected difficulty
function getRandomQuestion(difficulty) {
    const questionList = questions[difficulty];
    return questionList[Math.floor(Math.random() * questionList.length)];
}

// Load stored solutions
function loadSolutions() {
    const savedSolutions = JSON.parse(localStorage.getItem("solutions")) || [];
    solutionsList.innerHTML = "";
    savedSolutions.forEach((solution, index) => addSolutionToList(solution, index));
}

// Add solution to the list
function addSolutionToList(solution, index) {
    const card = document.createElement("div");
    card.classList.add("solution-card");
    card.innerHTML = `
        <p><strong>${solution.difficulty.toUpperCase()} - Question:</strong> ${solution.question}</p>
        <p><strong>Solution:</strong> ${solution.solution}</p>
    `;
    solutionsList.appendChild(card);
}

// Handle form submission
solutionForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!selectedDifficulty) {
        alert("Please select a difficulty level first.");
        return;
    }

    const newSolution = {
        difficulty: selectedDifficulty,
        question: selectedQuestion,
        solution: document.getElementById("solution").value.trim()
    };

    let solutions = JSON.parse(localStorage.getItem("solutions")) || [];
    solutions.push(newSolution);
    localStorage.setItem("solutions", JSON.stringify(solutions));

    solutionForm.reset();
    loadSolutions();
});

// Handle Next Question Button
nextBtn.addEventListener("click", () => {
    if (!selectedDifficulty) {
        alert("Please select a difficulty level first.");
        return;
    }
    selectedQuestion = getRandomQuestion(selectedDifficulty);
    questionText.textContent = selectedQuestion;
});
