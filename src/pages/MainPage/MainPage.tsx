import { Link } from "react-router-dom";

// Заглушка для главной страницы
const MainPage = () => {
  return (
    <div className="container container_centered">
      <h1>Тестовое задание для ALFA</h1>

      <Link to="/products" onClick={() => window.history.back()}>
        Перейти на страницу товаров
      </Link>
    </div>
  );
};

export default MainPage;