import { StrictMode } from "react";
import { GlobalStyle, ThemeProvider } from "@amsterdam/asc-ui";
import App from "App";
import { AuthProvider } from "./context/AuthProvider";

const Root = () => (
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);

export default Root;
