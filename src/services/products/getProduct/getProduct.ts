
import { ProductsResponse } from "./productResponse";
import axios from "axios";

export const getAllProducts = async () => {
  const limit: number = 0;
  const { data } = await axios.get<ProductsResponse>(
    "https://dummyjson.com/products",
    {
      params: {
        limit: limit,
      },
    }
  );

  return { data, limit };
};