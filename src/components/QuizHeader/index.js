import React from "react";
import { Link } from "react-router-dom";
import close from "../../assets/close.png";
import * as S from "./styled";

export default function QuizHeader({ category }) {
  return (
    <S.QuizHeaderWraper>
      <span>{category}</span>
      <Link to="/">
        <img src={close} alt="Fechar" />
        <span>Fechar</span>
      </Link>
    </S.QuizHeaderWraper>
  );
}
