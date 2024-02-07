import styles from "./styles.module.css";

import { useProducts } from "./useProducts";
import Product from "./Product/Product";
import { Box, Skeleton } from "@mui/material";
import { useEffect } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

export default function ProductList() {
  const { data: products, isLoading } = useProducts();
  const { itemsCount } = useCart();
  const navigate = useNavigate();

  const { tg } = useTelegram();

  useEffect(() => {
    tg.MainButton.onClick(() => navigate("/cart"));
    tg.MainButton.text = "В корзину 🛒";
  }, []);

  useEffect(() => {
    if (itemsCount > 0) {
      tg.MainButton.show();
    } else {
      tg.MainButton.hide();
    }
  }, [itemsCount]);

  if (isLoading)
    return (
      <Box className={styles.container}>
        {[...Array(20)].map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            width={"345px"}
            height={"535px"}
          />
        ))}
      </Box>
    );

  if (products)
    return (
      <Box className={styles.container}>
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </Box>
    );
}
