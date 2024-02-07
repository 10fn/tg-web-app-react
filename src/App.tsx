import "./App.css";
import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import ProductList from "./components/ProductList/ProductList";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";

function App() {
  const { tg } = useTelegram();
  const mode = tg.colorScheme;

  const theme = createTheme({ palette: { mode } });

  useEffect(() => {
    tg.ready();
  }, [tg]);

  return (
    <ThemeProvider theme={theme}>
      <CartProvider>
        <main>
          <ProductList />
        </main>
        <nav>
          <Footer />
        </nav>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
