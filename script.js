const API_URL = "http://localhost:3000/generate-quiz";

async function generateQuiz() {
    const topic = document.getElementById("topic").value.trim();
    if (!topic) {
        alert("Please enter a topic!");
        return;
    }

    document.getElementById("quiz").innerHTML = "<p>⏳ Generating questions... Please wait.</p>";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topic })
        });

        if (!response.ok) {
            throw new Error("Failed to fetch quiz");
        }

        const data = await response.json();
        displayQuiz(data.questions);
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("quiz").innerHTML = "<p>❌ Error generating quiz. Try again!</p>";
    }
}
