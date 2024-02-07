import styles from "./styles.module.css";

import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Paper, Typography } from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface FormData {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
}

const DeliveryForm = ({ tg }: { tg: WebApp }) => {
  const { control, formState } = useForm<FormData>();
  const { isValid } = formState;
  //const { cart } = useCartContext();
  const navigate = useNavigate();

  const sendData = () => {
    const data = {
      test: "send data",
      // cart,
      // deliveryInfo: {
      //   ...getValues()
      // }
    };

    tg.sendData(JSON.stringify(data));
    tg.close();
  };

  useEffect(() => {
    tg.MainButton.text = "Отправить 📨";
    tg.MainButton.onClick(() => sendData());
  }, []);

  useEffect(() => {
    if (isValid) {
      tg.MainButton.show();
    } else {
      tg.MainButton.hide();
    }
  }, [isValid, tg.MainButton]);

  const handleReturn = () => {
    navigate("/cart");
  };

  return (
    <form>
      <Paper className={styles.return} onClick={handleReturn}>
        <WestIcon fontSize="large" />
        <Typography variant="h5">Корзина</Typography>
      </Paper>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="fullName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="ФИО"
                variant="outlined"
                fullWidth
                required
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="address"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Адрес"
                variant="outlined"
                fullWidth
                required
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="city"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Город"
                variant="outlined"
                fullWidth
                required
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="postalCode"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Почтовый индекс"
                variant="outlined"
                fullWidth
                required
              />
            )}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default DeliveryForm;
