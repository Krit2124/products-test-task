import { Link } from "react-router-dom";

// Заглушка для главной страницы
const MainPage = () => {
  return (
    <div className="container container_centered">
      <h1>Тестовое задание</h1>

      <Link to="/products">
        Перейти на страницу товаров
      </Link>
    </div>
  );
};

export default MainPage;