import { Box, Button } from "@mui/material";
import TopBar from "../TopBar";
import logo from "../../assets/icons/logo.png";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { AddShoppingCart } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  Container: {
    backgroundColor: "#e7e7e7",
    width: "84vw",
    paddingInline: "8vw",
    paddingBlock: "1.5vh",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  Logo: {
    [theme.breakpoints.down("sm")]: {
      height: "6vh",
    },
    [theme.breakpoints.up("sm")]: {
      height: "8vh",
    },
    width: "fit-content",
  },
  ButtonsContainer: {
    minWidth: "50vw",
    maxWidth: "70vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  CartIcon: {
    [theme.breakpoints.down("sm")]: {
      height: "3vh !important",
    },
    [theme.breakpoints.up("sm")]: {
      height: "4vh",
    },
    width: "auto",
    color: "#606060",
  },
  ButtonStyle: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px !important",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "20px !important",
    },
  },
}));

export default function Header() {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Box sx={{ boxShadow: 10, position: 'fixed', top: 0, zIndex: 2}}>
      <TopBar />
      <Box className={classes.Container}>
        <Box>
          <img src={logo} className={classes.Logo} />
        </Box>
        <Box className={classes.ButtonsContainer}>
          <Button
            className={classes.ButtonStyle}
            variant="text"
            onClick={() => navigate("/")}
          >
            Home
          </Button>
          <Button
            className={classes.ButtonStyle}
            variant="text"
            onClick={() => navigate("/store")}
          >
            Store
          </Button>
          <Button
            className={classes.ButtonStyle}
            variant="text"
            onClick={() => navigate("/cart")}
          >
            Products
          </Button>
          <AddShoppingCart
            className={classes.CartIcon}
            onClick={() => navigate("/cart")}
          />
        </Box>
      </Box>
    </Box>
  );
}
