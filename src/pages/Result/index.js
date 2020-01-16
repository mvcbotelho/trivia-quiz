import React, { useState } from "react";
import { Link } from "react-router-dom";
import mascot from "../../assets/mascot.png";
import Header from "../../components/Header";
import * as S from "./styled";

export default function Result({ match }) {
  const { id } = match.params;
  const [correctScore, setCorrectScore] = useState(0);
  const [wrongScore, setWrongScore] = useState(0);
  const [scores, setScores] = useState({});

  return (
    <S.ResultWrapper>
      <Header />
      <S.ResultContent>
        <S.ResultHeaderWrapper>
          <S.Mascot src={mascot} />
          <S.Congratulations>
            <large>Congratulations!</large>
            <span>You have finished the test</span>
          </S.Congratulations>
        </S.ResultHeaderWrapper>
        <S.PerformanceBar>See your performance on questions</S.PerformanceBar>
        <S.ResultBodyWrapper>
          <S.QuestionsSummary>
            <S.CorrectSummary>
              <large>{correctScore}</large>
              <small>Hits</small>
            </S.CorrectSummary>
            <S.WrongSummary>
              <large>{wrongScore}</large>
              <small>Missed</small>
            </S.WrongSummary>
          </S.QuestionsSummary>
          <S.QuestionsWrapper>
            <S.QuestionDetail>
              <S.DifficultyDetails>Easy</S.DifficultyDetails>
              <span>Hits: {scores && scores.easy && scores.easy.correct}</span>
              <span>Missed: {scores && scores.easy && scores.easy.wrong}</span>
            </S.QuestionDetail>
            <S.QuestionDetail>
              <S.DifficultyDetails>Medium</S.DifficultyDetails>
              <span>
                Hits: {scores && scores.medium && scores.medium.correct}
              </span>
              <span>
                Missed: {scores && scores.medium && scores.medium.wrong}
              </span>
            </S.QuestionDetail>
            <S.QuestionDetail>
              <S.DifficultyDetails>Hard</S.DifficultyDetails>
              <span>Hits: {scores && scores.hard && scores.hard.correct}</span>
              <span>Missed: {scores && scores.hard && scores.hard.wrong}</span>
            </S.QuestionDetail>
          </S.QuestionsWrapper>
          <Link to="/">
            <button type="button">Start new game</button>
          </Link>
        </S.ResultBodyWrapper>
      </S.ResultContent>
    </S.ResultWrapper>
  );
}
