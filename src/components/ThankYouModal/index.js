import { Box, Button, Modal, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import Banner from "../../assets/images/Banner.png";

const useStyles = makeStyles((theme) => ({
  Container: {
    backgroundColor: "#fff",
    [theme.breakpoints.down("sm")]: {
      width: "80vw",
    },
    [theme.breakpoints.up("sm")]: {
      width: "60vw",
    },
    marginTop: "15vh",
    margin: "auto",
  },
  Image: {
    width: "100%",
  },
  ThankYou: {
    fontWeight: "900",
    textAlign: "center",
    marginBlock: "2vh",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px !important",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "28px !important",
    },
  },
  Text: {
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px !important",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "22px !important",
    },
  },
}));

export default function ThankYouModal(props) {
  const classes = useStyles();

  const { show, close } = props;

  return (
    <Modal open={show} onClose={close}>
      <Box className={classes.Container}>
        <img src={Banner} className={classes.Image} />
        <Typography className={classes.ThankYou}>Thank You</Typography>
        <Typography className={classes.Text}>
          Jamal Garments will contact you see for confirmation
        </Typography>
        <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
          <Link
            to={"/store"}
            style={{ textDecoration: "none", marginBlock: "2vh" }}
          >
            <Button variant="contained">Continue Shopping</Button>
          </Link>
        </Box>
      </Box>
    </Modal>
  );
}
