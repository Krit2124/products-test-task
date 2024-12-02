import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../types/products";
import api from "../../api/apiInstance";

interface ProductsState {
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

export const fetchProducts = createAsyncThunk(
  "products/fetchByPage",
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

export const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchProducts.fulfilled.type,
        (state, action: PayloadAction<IProduct[]>) => {
          state.isLoading = false;
          state.error = "";
          state.products = action.payload;
        }
      )
      .addCase(fetchProducts.rejected.type, (state, action: any) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {} = ProductsSlice.actions;

export default ProductsSlice.reducer;
