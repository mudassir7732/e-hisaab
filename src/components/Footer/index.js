import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Rectangle8 from "../../assets/icons/Rectangle8crop.png";
import Rectangle10 from "../../assets/icons/Rectangle10.png";
import { Search } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  Container: {
    backgroundColor: "#e7e7e7",
    paddingBlock: "2vh",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "1vw",
      paddingRight: "1vw",
    },
    [theme.breakpoints.up("sm")]: {
      paddingLeft: "3vw",
      paddingRight: "8vw",
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  Image: {
    [theme.breakpoints.down("sm")]: {
      height: "3.5vh",
      paddingRight: "1vw",
    },
    [theme.breakpoints.up("sm")]: {
      height: "4.5vh",
      paddingInline: "2vw",
    },
    color: "#606060",
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <Box className={classes.Container}>
      <Box>
        <img src={Rectangle8} className={classes.Image} />
        <img src={Rectangle10} className={classes.Image} />
      </Box>
      <Box
        sx={{ width: "25%", display: "flex", justifyContent: "space-evenly" }}
      >
        <Search className={classes.Image} />
        <Search className={classes.Image} />
        <Search className={classes.Image} />
      </Box>
    </Box>
  );
}
