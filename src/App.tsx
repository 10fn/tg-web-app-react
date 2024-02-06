import { useEffect } from "react";
import "./App.css";
import { useTelegram } from "./hooks/useTelegram";
import Footer from "./components/Footer";
import { Box, createTheme, ThemeProvider } from "@mui/material";

function App() {
  const { tg } = useTelegram();
  const mode = tg.colorScheme;

  const theme = createTheme({ palette: { mode } });

  useEffect(() => {
    tg.ready();
  }, [tg]);

  return (
    <ThemeProvider theme={theme}>
      <nav>
        <Box>is nox</Box>
        <Footer />
      </nav>
    </ThemeProvider>
  );
}

export default App;
