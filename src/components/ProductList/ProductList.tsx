import styles from "./styles.module.css";

import { useProducts } from "./useProducts";
import Product from "./Product/Product";
import { Box, Skeleton } from "@mui/material";

export default function ProductList() {
  const { data: products, isLoading } = useProducts();

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
