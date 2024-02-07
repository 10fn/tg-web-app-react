import styles from "./styles.module.css";
import { Box, Paper, Typography } from "@mui/material";
import { useCartContext } from "../../context/CartContext";
import CartItem from "./CartItem/CartItem";
import { useEffect } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import { useNavigate } from "react-router-dom";
import WestIcon from "@mui/icons-material/West";

export default function Cart() {
  const { cart, price, itemsCount } = useCartContext();
  const { tg } = useTelegram();
  const navigate = useNavigate();

  useEffect(() => {
    tg.MainButton.onClick(() => navigate("/form"));
  }, []);

  useEffect(() => {
    tg.MainButton.text = `К оформлению 📝(${price}$)`;
  }, [price]);

  useEffect(() => {
    if (itemsCount > 0) {
      tg.MainButton.show();
    } else {
      tg.MainButton.hide();
    }
  }, [itemsCount]);

  const handleReturn = () => {
    navigate("/");
  };

  return (
    <Box className={styles.container}>
      <Paper className={styles.return} onClick={handleReturn}>
        <WestIcon fontSize="large" />
        <Typography variant="h5">Каталог</Typography>
      </Paper>

      {itemsCount > 0 ? (
        <>
          <Typography variant="h5">Редактирование заказа</Typography>
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </>
      ) : (
        <Box className={styles.cartEmpty}>
          <Typography variant="h4">Корзина пуста!🛒</Typography>
          <Typography>
            Вернитесь в каталог и добавьте товаров в корзину
          </Typography>
        </Box>
      )}
    </Box>
  );
}
