import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Rectangle8 from "../../assets/icons/Rectangle8.png";

const useStyles = makeStyles((theme) => ({
  Container: {
    backgroundColor: "#3d3d3d",
    width: "100vw",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  Logo: {
    [theme.breakpoints.down("sm")]: {
      height: "2.8vh",
    },
    [theme.breakpoints.up("sm")]: {
      height: "3.2vh",
    },
    width: "auto",
    padding: "1.5vw",
  },
  Text: {
    color: "#fff",
    [theme.breakpoints.down("sm")]: {
      fontSize: "9.8px !important",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "14px !important",
    },
    paddingRight: "4vw",
    fontFamily: "Roboto !important",
  },
}));

export default function TopBar() {
  const classes = useStyles();
  return (
    <Box className={classes.Container}>
      <img src={Rectangle8} className={classes.Logo} />
      <Typography className={classes.Text}>
        Download eHisaab now to maintain your business accounts and get online
        sale orders.
      </Typography>
    </Box>
  );
}
