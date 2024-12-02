import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section>
      <div className="container container_centered">
        <h1>Произошла неожиданная ошибка</h1>
        <Link to="#" onClick={() => window.history.back()}>
          Вернуться назад
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;