import axios from "axios";
import { DeleteProductResponse } from "./deleteProductResponse";

export const deleteProduct = async (id: number) => {
  const { data } = await axios.delete<DeleteProductResponse>(
    `https://dummyjson.com/products/${id}`,
    
  );

  return { data, id };
};
