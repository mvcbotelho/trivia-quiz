import React, { useEffect, useState } from "react";
import star from "../../assets/star.png";
import Header from "../../components/Header";
import Modal from "../../components/Modal";
import Question from "../../components/Question";
import QuizHeader from "../../components/QuizHeader";
import api from "../../service/api";
import * as S from "./styled";

const Quiz = ({ match }) => {
  const { id } = match.params;

  const [category, setCategory] = useState("");
  const [questions, setQuestions] = useState("");
  const [countQuestion, setCountQuestion] = useState(1);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [noAnAnswerSelected, setNoAnAnswerSelected] = useState(true);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [correct, setCorrect] = useState(0);
  const [correctRepeat, setCorrectRepeat] = useState(false);
  const [wrong, setWrong] = useState(0);
  const [wrongRepeat, setWrongRepeat] = useState(false);
  const [hasModal, setHasModal] = useState(false);

  const [score, setScore] = useState([]);
  const [easyScore, setEasyScore] = useState({});
  const [mediumScore, setMediumScore] = useState({});
  const [hardScore, setHardScore] = useState({});

  const shuffle = array => {
    array.sort(() => Math.random() - 0.5);
  };

  async function loadQuestions() {
    const response = await api.get(`api.php`, {
      params: {
        amount: 1,
        category: id,
        difficulty: difficulty,
        type: "multiple"
      }
    });
    const { results } = response.data;
    const answer = [results[0].correct_answer, ...results[0].incorrect_answers];

    setCategory(results[0].category);
    setDifficulty(results[0].difficulty);
    setQuestions(results[0].question);
    console.log("correta", results[0].correct_answer);
    setCorrectAnswer(results[0].correct_answer);
    shuffle(answer);
    setAnswers(answer);
  }

  useEffect(() => {
    loadQuestions();
  }, []);

  useEffect(() => {
    if (selectedAnswer) {
      setNoAnAnswerSelected(false);
    }
  }, [selectedAnswer]);

  function difficultyStars() {
    if (difficulty === "easy") {
      return <img src={star} alt="single star" />;
    }
    if (difficulty === "medium") {
      return (
        <>
          <img src={star} alt="double star" />
          <img src={star} alt="double star" />
        </>
      );
    }
    return (
      <>
        <img src={star} alt="triple star" />
        <img src={star} alt="triple star" />
        <img src={star} alt="triple star" />
      </>
    );
  }

  function handleSelectedAnswer(answer) {
    setSelectedAnswer(answer);
  }

  function handleAnswer() {
    if (correctAnswer === selectedAnswer) {
      setCorrect(correct + 1);
      setWrong(wrong);
    } else {
      setCorrect(correct);
      setWrong(wrong + 1);
    }

    if (correct !== 0 && correct % 2 === 0) {
      setCorrectRepeat(true);
    }

    if (wrong !== 0 && wrong % 2 === 0) {
      setWrongRepeat(true);
    }

    if (difficulty !== "hard" && correctRepeat) {
      if (difficulty === "easy") {
        setDifficulty("medium");
      } else if (difficulty === "medium") {
        setDifficulty("hard");
      }
    }

    if (difficulty !== "easy" && wrongRepeat) {
      if (difficulty === "hard") {
        setDifficulty("medium");
      } else if (difficulty === "medium") {
        setDifficulty("easy");
      }
    }
    setHasModal(true);
  }

  function mountScore() {
    if (difficulty === "easy") {
      setEasyScore({
        correct,
        wrong
      });
    }
    if (difficulty === "medium") {
      setMediumScore({
        correct,
        wrong
      });
    }
    if (difficulty === "hard") {
      setHardScore({
        correct,
        wrong
      });
    }
  }

  function nextQuestion() {
    loadQuestions();
    setCountQuestion(countQuestion + 1);
    setHasModal(false);
    setNoAnAnswerSelected(true);
    mountScore();
    console.log("easy", easyScore);
    console.log("medium", mediumScore);
    console.log("hard", hardScore);
  }

  function endGame() {}

  return (
    <S.QuizWrapper>
      {hasModal && (
        <Modal
          goForward={nextQuestion}
          isCorrect={correctAnswer === selectedAnswer}
        />
      )}

      <Header />
      <QuizHeader category={category} />
      <S.QuestionWrapper>
        <S.Info>
          <h6>Questão {countQuestion} </h6>
          <S.Difficulty>
            <S.DifficultyStars>{difficultyStars()}</S.DifficultyStars>
            <span>{difficulty}</span>
          </S.Difficulty>
        </S.Info>
        <S.Question dangerouslySetInnerHTML={{ __html: questions }} />
        {answers.map(answer => (
          <button
            onClick={() => handleSelectedAnswer(answer)}
            className="questionButton"
            type="button"
            key={answer}
          >
            <Question
              key={answer}
              question={answer}
              isSelected={selectedAnswer === answer}
            />
          </button>
        ))}
        <button
          className="answerButton"
          onClick={handleAnswer}
          disabled={noAnAnswerSelected}
          type="button"
        >
          Responder
        </button>
        {console.log(score)}
      </S.QuestionWrapper>
    </S.QuizWrapper>
  );
};

export default Quiz;
