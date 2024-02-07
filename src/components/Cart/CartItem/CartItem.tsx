import styles from './styles.module.css'

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { ICartItem } from "../../../types/Cart";
import { IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ClearIcon from "@mui/icons-material/Clear";
import { useCartContext } from "../../../context/CartContext";

export default function CartItem({ item }: { item: ICartItem }) {
  const { increaseItemCount, decreaseItemCount, removeFromCart } =
    useCartContext();
  const { id, name, price, image, count } = item;

  const handleIncreaseCount = () => {
    increaseItemCount(id);
  };

  const handleDecreaseCount = () => {
    decreaseItemCount(id);
  };

  const handleRemoveItem = () => {
    removeFromCart(id);
  };

  return (
    <Card
      variant="outlined"
      className={styles.container}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <IconButton onClick={handleRemoveItem}>
          <ClearIcon />
        </IconButton>

        <Box borderRadius={50}>
          <img
            src={image}
            alt={name}
            className={styles.img}
          />
        </Box>

        <Stack>
          <Stack padding={1.5}>
            <Box padding={1}>
              <Typography variant="body2" pb={1}>
                {name}
              </Typography>
              <Typography variant="h5">{price * count} $</Typography>
            </Box>

            <Stack direction="row" gap={1.5} alignItems="center">
              <IconButton onClick={handleDecreaseCount} size="large">
                <RemoveIcon />
              </IconButton>
              <Typography>{count}</Typography>
              <IconButton onClick={handleIncreaseCount} size="large">
                <AddIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
