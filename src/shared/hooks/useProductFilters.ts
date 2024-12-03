import { useState } from "react";
import { getProducts } from "../store/reducers/productsSlice";
import { useAppDispatch } from "./redux";

interface ProductFiltersProps {
  initialPage: number;
}

// Хук для управления фильтрацией товаров
export const useProductFilters = ({ initialPage = 1 }: ProductFiltersProps) => {
  const dispatch = useAppDispatch();
  // Текущая страница с точки зрения API
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Обработчик изменения страницы для пагинации
  const handlePageChange = ({ selected }: { selected: number }) => {
    // В API запросы всегда начинаются с 1, а selected в react-paginate считается с 0, поэтому +1
    const selectedPageFromAPIViewpoint = selected + 1;

    setCurrentPage(selectedPageFromAPIViewpoint);
    // Получение данных для новой страницы
    dispatch(getProducts(selectedPageFromAPIViewpoint));
    // Прокрутка вверх
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Параметры для компонента ReactPaginate
  const paginationProps = {
    pageCount: 100, // Количество страниц (в выбранном API это значение фиксированное)
    pageRangeDisplayed: 3, // Количество видимых страниц рядом с активной
    marginPagesDisplayed: 3, // Количество страниц в начале и конце
    onPageChange: handlePageChange, // Обработчик изменения страницы
    forcePage: currentPage-1, // Принудительная установка активной страницы
  };

  return {
    paginationProps,
    currentPage,
  };
};
