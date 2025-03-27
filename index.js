const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const quizData = [
  { question: "Who painted the Mona Lisa?", options: ["Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci", "Claude Monet"], answer: "Leonardo da Vinci" },
  { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
  { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
  { question: "What is the largest ocean on Earth?", options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"], answer: "Pacific Ocean" },
  { question: "Who wrote 'Hamlet'?", options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"], answer: "William Shakespeare" },
  { question: "Which gas do plants use for photosynthesis?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: "Carbon Dioxide" },
  { question: "What is the chemical symbol for gold?", options: ["Ag", "Au", "Pb", "Fe"], answer: "Au" },
  { question: "Who discovered gravity?", options: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Nikola Tesla"], answer: "Isaac Newton" },
  { question: "Which continent is the largest by area?", options: ["Africa", "Asia", "North America", "Antarctica"], answer: "Asia" },
  { question: "What is the hardest natural substance on Earth?", options: ["Gold", "Iron", "Diamond", "Quartz"], answer: "Diamond" }
];

app.get("/", (req, res) => {
  res.send("Quiz API is running. Use /quiz to get a random question.");
});

app.get("/quiz", (req, res) => {
  const randomIndex = Math.floor(Math.random() * quizData.length);
  const question = quizData[randomIndex];
  res.json({ question: question.question, options: question.options });
});

app.post("/quiz", (req, res) => {
  const { question, answer } = req.body;
  const foundQuestion = quizData.find(q => q.question === question);
  
  if (!foundQuestion) {
    return res.status(400).json({ message: "Invalid question." });
  }

  if (answer === foundQuestion.answer) {
    res.json({ correct: true, message: "✅ Correct Answer!" });
  } else {
    res.json({ correct: false, message: `❌ Wrong Answer. The correct answer is: ${foundQuestion.answer}` });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
