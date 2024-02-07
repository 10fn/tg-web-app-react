import styles from "./styles.module.css";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { IProduct } from "../../../types/Product";
import { Button } from "@mui/material";
import { useCart } from "../../../hooks/useCart";

export default function RecipeReviewCard({ product }: { product: IProduct }) {
  const { id, title, description, images, price } = product;

  const { cart, addToCart, removeFromCart } = useCart();
  
  const truncatedTitle = title.length > 22 ? `${title.slice(0, 22)}...` : title;

  const isInCart = cart.some((item) => item.id === id);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(id);
  };

  return (
    <Card className={styles.container}>
      <CardHeader title={truncatedTitle} />
      <CardMedia component="img" height="194" src={images[0]} alt={title} />
      <CardContent>
        <Typography variant="h5" color="text.secondary">
          {price} $
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>

      <CardActions sx={{ marginTop: "auto" }}>
        {isInCart ? (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleRemoveFromCart}
          >
            В корзине
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<AddShoppingCartIcon />}
            onClick={handleAddToCart}
          >
            Добавить в корзину
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
