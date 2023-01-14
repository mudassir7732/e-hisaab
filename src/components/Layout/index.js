import { Box } from "@mui/material";
import Footer from "../Footer";
import Header from "../Header";

export default function Layout({ children }) {
  return (
    <Box>
      <Header />
      {children}
      <Footer />
    </Box>
  );
}
