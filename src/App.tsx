import "./App.css";
import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import ProductList from "./components/ProductList/ProductList";
import { Route, Routes } from "react-router-dom";
import Cart from "./components/Cart/Cart";

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
          <Route path={"form"} element={<div>форма</div>} />
        </Routes>
      </main>
    </ThemeProvider>
  );
}

export default App;
