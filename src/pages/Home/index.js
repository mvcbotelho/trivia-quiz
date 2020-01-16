import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import Header from "../../components/Header";
import api from "../../service/api";
import * as S from "./styled";

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api
      .get("api_category.php")
      .then(res => {
        const { trivia_categories } = res.data;
        setCategories(trivia_categories);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <S.HomeWrapper>
      <Header />
      <S.HomeContent>
        <S.Title>Categorias</S.Title>
        <S.CategoryList>
          {categories &&
            categories.map(category => {
              const { id, name } = category;
              return (
                <Link key={id} to={`/quiz/${id}`}>
                  <Card category={name} />
                </Link>
              );
            })}
        </S.CategoryList>
      </S.HomeContent>
    </S.HomeWrapper>
  );
};

export default Home;
