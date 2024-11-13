import React from "react";
import Confetti from "react-confetti"

export default function Question() {
    const [data, setData] = React.useState([]);
    const [questionIndex, setQuestionIndex] = React.useState(0);
    const [questionData, setQuestionData] = React.useState(null);
    const [answers, setAnswers] = React.useState([]);
    const [correctAnswer, setCorrectAnswer] = React.useState("");
    const [score, setScore] = React.useState(0);
    const [loading, setLoading] = React.useState(true);
    const [selectedAnswer, setSelectedAnswer] = React.useState(null);
    const [finishedQuizz, setFinishedQuizz] = React.useState(false)
    const [time, setTime] = React.useState([0,0])

    React.useEffect(() => {
        fetchData();
    }, []);

    function fetchData() {
        setLoading(true);
        fetch("https://opentdb.com/api.php?amount=10&category=27")
            .then((res) => res.json())
            .then((data) => {
                setData(data.results || []);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }

    React.useEffect(() => {
        if (finishedQuizz) return; 

        const intervalId = window.setInterval(() => {
            setTime(prevTime => {
                const timeTmp = [];
                if (prevTime[1] + 1 === 60) {
                    timeTmp[0] = prevTime[0] + 1;
                    timeTmp[1] = 0;
                } else {
                    timeTmp[1] = prevTime[1] + 1;
                    timeTmp[0] = prevTime[0];
                }
                return timeTmp;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [finishedQuizz]);

    function decodeHtml(html) {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }


    React.useEffect(() => {
        if (data.length > 0 && questionIndex < data.length) {
            const currentQuestion = data[questionIndex];

            setQuestionData({
                ...currentQuestion,
                question: decodeHtml(currentQuestion.question),
                correct_answer: decodeHtml(currentQuestion.correct_answer),
                incorrect_answers: currentQuestion.incorrect_answers.map(decodeHtml),
            });

            const allAnswers = [
                currentQuestion.correct_answer,
                ...currentQuestion.incorrect_answers,
            ].map(decodeHtml);

            setAnswers(shuffleArray(allAnswers));
            setCorrectAnswer(decodeHtml(currentQuestion.correct_answer));
            setSelectedAnswer(null);
        }
    }, [data, questionIndex]);


    function handleClick() {
        if (finishedQuizz) {
            resetQuizz()
            return
        }

        if ((questionIndex + 1) === 10) {
            setFinishedQuizz(true)
            return
        }

        if (!selectedAnswer) {
            return
        }

        if (selectedAnswer === correctAnswer) {
            setScore(prevScore => prevScore + 1);
        }
        setQuestionIndex(prevQuestionIndex => prevQuestionIndex + 1);
    }

    React.useEffect(() => {
        if (time[0] === 1) {
            setFinishedQuizz(true);
        }
    },[time])

    function resetQuizz() {
        setQuestionIndex(0);
        setScore(0);
        setFinishedQuizz(false);
        setSelectedAnswer(null);
        setTime([0,0])
        fetchData(); 
    }

    function shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    function handleRadio(answer) {
        setSelectedAnswer(answer);
    }

    return (
        <div className="question--container">
            <h1>{finishedQuizz ? "Finished" : `Question ${questionIndex + 1}`}</h1>
            {
                finishedQuizz ? (
                    <div>
                        <Confetti
                            width={window.innerWidth}
                            height={window.innerHeight}
                        />
                        <p>Your final score is: {score}/10</p>
                        <p>Your final time is: {time[0]}:{time[1]}</p>
                    </div>
                ) : (
                    loading ? (
                        <p>Loading...</p>
                    ) : questionData ? (
                        <>
                            <p className="question">{questionData.question}</p>
                            <div className="answers">
                                {answers.map((answer, index) => (
                                    <div key={index} className="answer-option">
                                        <input
                                            type="radio"
                                            name="answer"
                                            value={answer}
                                            checked={selectedAnswer === answer}
                                            onChange={() => handleRadio(answer)}
                                        />
                                        <label>{answer}</label>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <p>No question available</p>
                    )
                )
            }
            <button className="question--button" onClick={handleClick}>
                {finishedQuizz ? "Restart Quiz" : "Next Question"}
            </button>
            {!finishedQuizz ?
                <div className="question--info">
                    <span><strong>Current Time: </strong>{time[0]}:{time[1]}</span>
                    <p><strong>Score: </strong>{score}/10</p>
                </div>
                :
                <></>
            }
        </div>
    );
}
