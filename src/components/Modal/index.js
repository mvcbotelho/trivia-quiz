import PropTypes from "prop-types";
import React from "react";
import arrow from "../../assets/arrow.png";
import * as S from "./styled";

export default function Feedback({ isCorrect, goForward }) {
  return (
    <S.ModalWrapper data-testid="feedback">
      <S.ModalContainer isCorrect={isCorrect}>
        <S.Icon isCorrect={isCorrect} />
        <S.Result>You {isCorrect ? "hit" : "missed"}!</S.Result>
        <S.Button type="button" onClick={goForward}>
          <span>Next</span>
          <img src={arrow} alt="Next question" />
        </S.Button>
      </S.ModalContainer>
    </S.ModalWrapper>
  );
}

Feedback.propTypes = {
  isCorrect: PropTypes.bool.isRequired,
  goForward: PropTypes.func.isRequired
};
