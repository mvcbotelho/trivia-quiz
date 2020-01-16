import React from "react";
import * as S from "./styled";

export default function Question({ isSelected, question }) {
  return (
    <S.QuestionWrapper isSelected={isSelected}>
      <p dangerouslySetInnerHTML={{ __html: question }} />
    </S.QuestionWrapper>
  );
}

Question.defaultProps = {
  isSelected: false
};
