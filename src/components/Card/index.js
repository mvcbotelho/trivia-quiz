import React from "react";
import * as S from "./styled";

export default function CategoryCard({ category }) {
  return (
    <S.CardWrapper>
      <S.Title>{category}</S.Title>
    </S.CardWrapper>
  );
}
