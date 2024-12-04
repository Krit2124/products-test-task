import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../types/products";
import api from "../../api/apiInstance";
import { RootState } from "..";
import toast from "react-hot-toast";

interface ProductsState {
  // Товары для вывода на экран
  products: IProduct[];
  chosenProduct: IProduct | null;
  isLoading: boolean;
  error: string;
}

const initialState: ProductsState = {
  products: [],
  chosenProduct: null,
  isLoading: false,
  error: "",
};

// Получение всех товаров в выбранном альбоме
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (page: number, thunkAPI) => {
    try {
      const result = await api.get(`albums/${page}/photos`);
      const products = result.data.map((product: IProduct) => ({
        albumId: product.albumId,
        id: product.id,
        title: product.title,
        url: product.url,
        thumbnailUrl: product.thumbnailUrl,
        isLiked: false,
      }));

      return products;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch products");
    }
  }
);

// Получение одного товара по id
export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (productId: number, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;

      // Попытка найти товар в уже загруженных продуктах
      const existingProduct = state.productsReducer.products.find(
        (product: IProduct) => product.id === productId
      );

      if (existingProduct) {
        return existingProduct;
      }

      // Если не найден, делаем запрос на сервер
      const result = await api.get(`photos/${productId}`);
      const product = result.data;

      return {
        albumId: product.albumId,
        id: product.id,
        title: product.title,
        url: product.url,
        thumbnailUrl: product.thumbnailUrl,
        isLiked: false,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch product");
    }
  }
);

export const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Добавление или удаление товара из избранного
    likeProduct: (state, action: PayloadAction<number>) => {
      // Если пользователь на странице с одним товаром, то изменяем и его состояние
      if (state.chosenProduct) {
        state.chosenProduct.isLiked = !state.chosenProduct.isLiked;
      }

      const product = state.products.find(
        (product) => product.id === action.payload
      );
      if (product) {
        product.isLiked = !product.isLiked;
      }

      // Место для PATCH запроса
    },
    // Удаление товара
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );

      // Место для DELETE запроса
    },
    // Обнуление выбранного товара
    setEmptyChosenProduct: (state) => {
      state.chosenProduct = null;
    },
    // Сохранение нового товара
    saveProduct: (state, action: PayloadAction<Omit<IProduct, "id">>) => {
      // Имитация сохранения
      state.products.push(action.payload);
      toast.success("Product has been successfully saved")

      // Место для POST запроса
    },
    // Редактирование товара
    editProduct: (state, action: PayloadAction<IProduct>) => {
      // Имитация редактирования
      const product = state.products.find((product) => product.id === action.payload.id);
      if (product) {
        product.title = action.payload.title;
        product.url = action.payload.url;
        product.thumbnailUrl = action.payload.thumbnailUrl;
      }
      toast.success("Product has been successfully edited")

      // Место для PUT запроса
    },
  },
  extraReducers: (builder) => {
    // getProducts()
    builder
      .addCase(getProducts.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getProducts.fulfilled.type,
        (state, action: PayloadAction<IProduct[]>) => {
          state.isLoading = false;
          state.error = "";
          state.products = action.payload;
        }
      )
      .addCase(getProducts.rejected.type, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // getProduct()
    builder
      .addCase(getProduct.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getProduct.fulfilled.type,
        (state, action: PayloadAction<IProduct>) => {
          state.isLoading = false;
          state.error = "";
          state.chosenProduct = action.payload;
        }
      )
      .addCase(getProduct.rejected.type, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { likeProduct, deleteProduct, setEmptyChosenProduct, saveProduct, editProduct } =
  ProductsSlice.actions;

export default ProductsSlice.reducer;
