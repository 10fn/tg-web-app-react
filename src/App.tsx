import "./App.css";
import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import ProductList from "./pages/ProductList/ProductList";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import DeliveryForm from "./pages/DeliveryForm/DeliveryForm";

function App() {
  const { tg } = useTelegram();

  const mode = tg.colorScheme;
  const theme = createTheme({ palette: { mode } });

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <main>
        <Routes>
          <Route index element={<ProductList tg={tg} />} />
          <Route path={"cart"} element={<Cart tg={tg} />} />
          <Route path={"form"} element={<DeliveryForm tg={tg} />} />
        </Routes>
      </main>
    </ThemeProvider>
  );
}

export default App;
