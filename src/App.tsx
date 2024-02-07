import "./App.css";
import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import ProductList from "./components/ProductList/ProductList";
import { useCartContext } from "./context/CartContext";
import { Route, Routes, useNavigate } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import { Button } from "@mui/material";
function App() {
  const { tg } = useTelegram();
  const { itemsCount } = useCartContext();
  const navigate = useNavigate();

  const mode = tg.colorScheme;
  const theme = createTheme({ palette: { mode } });

  useEffect(() => {
    tg.ready();
    tg.MainButton.textColor = "#7FFF00";
    tg.MainButton.setParams({ text: "К оформлению", text_color: "#FFFFFF" });
    tg.MainButton.onClick(() => navigate("/form"));
  }, [tg]);

  useEffect(() => {
    if (itemsCount > 0) {
      tg.MainButton.show();
    } else {
      tg.MainButton.hide();
    }
  }, [itemsCount]);

  return (
    <ThemeProvider theme={theme}>
      <main>
        <Routes>
          <Route index element={<ProductList />} />
          <Route path={"cart"} element={<Cart />} />
          <Route path={"form"} element={<div>форма</div>} />
        </Routes>
        <Button onClick={() => navigate("/cart")}>к оформлению</Button>
      </main>
    </ThemeProvider>
  );
}

export default App;
