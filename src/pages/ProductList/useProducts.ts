import { useQuery } from "@tanstack/react-query";
import { IProduct } from "../../types/Product";

type IApiResponse = IProduct[]

const fetchProducts = async(): Promise<IApiResponse> => {
    const response = await fetch('https://api.escuelajs.co/api/v1/products');
    const data = await response.json()
    return data;
}

export const useProducts = () => {
  return useQuery<IApiResponse, Error>({ queryKey: ['products'], queryFn: fetchProducts });
};