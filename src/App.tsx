import "./App.css";
import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import ProductList from "./components/ProductList/ProductList";
import { useCartContext } from "./context/CartContext";
import { Route, Routes } from "react-router-dom";
function App() {
  const { tg, showMainButton, hideMainButton } = useTelegram();
  const { itemsCount } = useCartContext();

  const mode = tg.colorScheme;
  const theme = createTheme({ palette: { mode } });

  useEffect(() => {
    tg.ready();
    tg.MainButton.textColor = "#7FFF00";
    tg.MainButton.setParams({ text: "К оформлению", text_color: "#FFFFFF" });
    tg.MainButton.onClick(() => alert("test"));
  }, [tg]);

  useEffect(() => {
    if (itemsCount > 0) {
      showMainButton();
    } else {
      hideMainButton();
    }
  }, [itemsCount]);

  return (
    <ThemeProvider theme={theme}>
      <main>
        <Routes>
          <Route index element={<ProductList />} />
          <Route path={"form"} element={<div>заполни форму</div>} />
        </Routes>
      </main>
    </ThemeProvider>
  );
}

export default App;
