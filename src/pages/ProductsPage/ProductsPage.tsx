import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import { fetchProducts } from '@/shared/store/reducers/productsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ProductCard } from '@/entities/ProductCard';

import styles from './index.module.scss'

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading } = useAppSelector(state => state.productsReducer);

  useEffect(() => {
    dispatch(fetchProducts(1));
  }, []);

  if (isLoading) {
    return (
      <div className='container container_centered'>
        <FontAwesomeIcon icon={faSpinner} spin size='3x' />
      </div>
    )
  }

  return (
    <div className='container'>
      <h1>Products</h1>
      {products.map((product) => (
        <ProductCard key={product.id} id={product.id} title={product.title} thumbnailUrl={product.thumbnailUrl} isLiked={product.isLiked || false} />
      ))}
    </div>
  );
};

export default ProductsPage;