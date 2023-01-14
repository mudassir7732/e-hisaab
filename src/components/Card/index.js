import { Close } from "@mui/icons-material";
import { Box, Button, IconButton, Slide, Snackbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useDispatch } from "react-redux";
import { add_item } from "../../store/reducers/cartSlice";
import ItemModal from "../ItemModal";

const useStyles = makeStyles((theme) => ({
  Container: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      width: "30vw",
    },
    [theme.breakpoints.up("sm")]: {
      width: "22vw",
    },
    backgroundColor: "whitesmoke",
    border: "1px solid #e0e0e0",
    borderRadius: "5px",
    marginBlock: "2vh",
  },
  CarouselStyle: {
    [theme.breakpoints.down("sm")]: {
      height: "18vh",
    },
    [theme.breakpoints.up("sm")]: {
      height: "30vh",
    },
  },
  Thumbnail: {
    [theme.breakpoints.down("sm")]: {
      maxHeight: "25vw",
      width: "30vw",
    },
    [theme.breakpoints.up("sm")]: {
      maxHeight: "20vw",
      width: "22vw",
      // height:'20vw'
      // height:'8vh',
      // maxWidth:'40vw',
      // overflow:'hidden'
    },
    borderBottom:'0.5px solid #e0e0e0',
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
  },
  Title: {
    fontWeight: "600 !important",
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px !important",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "16px !important",
    },
  },
  desc:{
    paddingInline:'1.1vw',
    paddingTop:'0.8vh',

    [theme.breakpoints.down('sm')]:{
      fontSize:'9.8px !important',
    },
    [theme.breakpoints.up('sm')]:{
      fontSize:'15px !important'
    }
  },
  ButtonStyle: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px !important",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "18px !important",
    },
  },
}));

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

export default function Card(props) {
  const [showModal, setShowModal] = useState(false);
  const [showSnackbar, setSnackbar] = useState(false);
  const [transition, setTransition] = useState(undefined);
  const [counter, setCounter] = useState(1);
  const classes = useStyles();
  const dispatch = useDispatch();

  const { title, price, description, thumbnail, image1, image2, image3 } =
    props;

  const images = [thumbnail, image1, image2, image3];

  const increaseCounter = () => {
    setCounter(counter + 1);
  };
  const decreaseCounter = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };

  const confirmOrder = ({ title, price, image, count }) => {
    dispatch(add_item({ title, price, image, count }));
    setTransition(() => TransitionDown);
    setShowModal(false);
    setSnackbar(true);
  };

  return (
    <Box className={classes.Container}>
      <Snackbar
        open={showSnackbar}
        TransitionComponent={transition}
        onClose={() => setSnackbar(false)}
        autoHideDuration={2500}
        message="Added to Cart"
        anchorOrigin={{vertical:'top', horizontal:'right'}}
        action={
        <IconButton color="inherit" onClick={()=>setSnackbar(false)}>
          <Close />
        </IconButton>
        }
      />
      <Carousel
        autoPlay
        navButtonsAlwaysInvisible
        IndicatorIcon={false}
        className={classes.CarouselStyle}
      >
        {images.map((item) => (
          <img src={item} className={classes.Thumbnail} />
        ))}
      </Carousel>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "1vh",
          marginInline: "1.1vw",
        }}
      >
        <Typography className={classes.Title} sx={{ color: "black", textDecorationLine:'underline' }}>
          Rs.{title}
        </Typography>
        <Typography className={classes.Title} sx={{ color: "red" }}>
          Rs.{price}
        </Typography>
      </Box>
      <Typography className={classes.desc}>{description.slice(0,35).concat('...')}</Typography>
      <Button
        variant="text"
        className={classes.ButtonStyle}
        onClick={() => setShowModal(true)}
      >
        Add To Cart
      </Button>

      <ItemModal
        show={showModal}
        close={() => setShowModal(false)}
        increase={increaseCounter}
        decrease={decreaseCounter}
        counter={counter}
        confirmOrder={confirmOrder}
        title={title}
        price={price}
        desc={description}
        image={thumbnail}
        count={counter}
      />
    </Box>
  );
}
