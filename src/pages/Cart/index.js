import {
  ControlPoint,
  DeleteOutline,
  RemoveCircleOutline,
  Search,
} from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ThankYouModal from "../../components/ThankYouModal";
import * as yup from "yup";
import axios from "axios";
import {
  remove_item,
  increase_count,
  decrease_count,
} from "../../store/reducers/cartSlice";

const ValidationSchema = yup.object({
  name: yup.string("Enter Name").required("Name required"),
  phone: yup.string("Enter Phone").required("Phone required"),
  city: yup.string("Enter City").required("City required"),
  state: yup.string("Enter State").required("State required"),
  street: yup.string("Enter Street").required("Street required"),
});

const useStyles = makeStyles((theme) => ({
  Container: {
    width: "80vw",
    marginInline: "10vw",
    marginBottom: "3vh",
    marginTop: "20vh",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row-reverse",
    },
  },
  LeftBlock: {
    [theme.breakpoints.up("sm")]: {
      width: "65%",
    },
  },
  ItemCard: {
    backgroundColor: "#fafafa",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingInline: "4vh",
    paddingBlock: "2.5vh",
    border: "1px solid #e9e9e9",
    borderRadius: "3px",
    margin: "2vh",
  },
  Image: {
    height: "65px",
    border: "1px solid #e9e9e9",
    marginBlock: "1vh",
    marginRight: "2.2vh",
  },
  RightBlock: {
    [theme.breakpoints.up("sm")]: {
      width: "35%",
    },
  },
  CredentialsCard: {
    backgroundColor: "#fafafa",
    border: "1px solid #e9e9e9",
    borderRadius: "3px",
    margin: "2vh",
    height: "fit-content",
    paddingBlock: "3vh",
    paddingInline: "2.5vw",
  },
  Input: {
    paddingInline: "10px",
    marginTop: "1.5vh !important",
    backgroundColor: "#f0f0f0",
  },
  SearchIcon: {
    fontSize: "17px !important",
    color: "#808080",
    paddingRight: "1vh",
  },
  TotalPrice: {
    margin: "2vh",
    border: "1px solid #e9e9e9",
    borderRadius: "3px",
    backgroundColor: "#fafafa",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingInline: "3vh",
    paddingBlock: "1.5vh",
  },
}));

export default function Cart() {
  const [showModal, setShowModal] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const classes = useStyles();
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state?.cart);
  console.log(cartData, " = Cart Data");

  const calculateTotalCost = () => {
    let sum = 0;
    let pro = 0;
    {
      cartData.map(
        (item) => (
          (pro = item?.price * item?.count),
          (sum = sum + pro),
          console.log(pro, " = Pro"),
          console.log(sum, " = Sum"),
          console.log("")
        )
      );
      setTotalCost(sum)
    }
  };

  useEffect(() => {
    calculateTotalCost();
  }, [cartData]);

  const placeOrder = async (v) => {
    await axios
      .post("http://192.168.88.250:5000/api/cod", {
        name: v.name,
        phoneNumber: v.phone,
        city: v.city,
        state: v.state,
        streetAddress: v.street,
      })
      .then((res) => {
        console.log(res, " = Result");
      })
      .catch((err) => {
        console.log(err, " = Error");
      });
    setShowModal(true);
  };

  return (
    <Box className={classes.Container}>
      <Box className={classes.RightBlock}>
        <Typography>{totalCost}</Typography>
        <Formik
          initialValues={{
            name: "",
            phone: "",
            city: "",
            state: "",
            street: "",
          }}
          validationSchema={ValidationSchema}
          onSubmit={(values) => placeOrder(values)}
        >
          {({ values, handleChange, errors, handleSubmit, touched }) => (
            <Form>
              <Box className={classes.CredentialsCard} sx={{ boxShadow: 2 }}>
                <TextField
                  placeholder="Name"
                  size="small"
                  className={classes.Input}
                  name="name"
                  fullWidth
                  error={errors.name && touched.name}
                  value={values.name}
                  onChange={handleChange}
                  type="text"
                  InputProps={{
                    startAdornment: <Search className={classes.SearchIcon} />,
                  }}
                />
                <Typography>
                  {errors.name && touched.name && errors.name}
                </Typography>

                <TextField
                  placeholder="Phone"
                  size="small"
                  className={classes.Input}
                  name="phone"
                  fullWidth
                  error={errors.phone && touched.phone}
                  value={values.phone}
                  onChange={handleChange}
                  type="text"
                  InputProps={{
                    startAdornment: <Search className={classes.SearchIcon} />,
                  }}
                />
                <Typography>
                  {errors.phone && touched.phone && errors.phone}
                </Typography>

                <TextField
                  placeholder="City"
                  size="small"
                  className={classes.Input}
                  name="city"
                  fullWidth
                  error={errors.city && touched.city}
                  value={values.city}
                  onChange={handleChange}
                  type="text"
                  InputProps={{
                    startAdornment: <Search className={classes.SearchIcon} />,
                  }}
                />
                <Typography>
                  {errors.city && touched.city && errors.city}
                </Typography>

                <TextField
                  placeholder="State"
                  size="small"
                  className={classes.Input}
                  name="state"
                  fullWidth
                  error={errors.state && touched.state}
                  value={values.state}
                  onChange={handleChange}
                  type="text"
                  InputProps={{
                    startAdornment: <Search className={classes.SearchIcon} />,
                  }}
                />
                <Typography>
                  {errors.state && touched.state && errors.state}
                </Typography>

                <TextField
                  placeholder="Street Address"
                  size="small"
                  className={classes.Input}
                  name="street"
                  fullWidth
                  error={errors.street && touched.street}
                  value={values.street}
                  onChange={handleChange}
                  type="text"
                  InputProps={{
                    startAdornment: <Search className={classes.SearchIcon} />,
                  }}
                />
                <Typography>
                  {errors.street && touched.street && errors.street}
                </Typography>
              </Box>

              <Box className={classes.TotalPrice} sx={{ boxShadow: 2 }}>
                <Typography>Total Price</Typography>
                <Typography>{totalCost}</Typography>
              </Box>

              <Box sx={{ marginInline: "2vh", paddingBottom: "2vh" }}>
                <Button fullWidth variant="contained" onClick={handleSubmit}>
                  Place Order (COD)
                </Button>
              </Box>
            </Form>
          )}
        </Formik>

        <ThankYouModal show={showModal} close={placeOrder} />
      </Box>

      <Box className={classes.LeftBlock}>
        {cartData &&
          cartData?.map((item, index) => (
            <Box className={classes.ItemCard} sx={{ boxShadow: 2 }}>
              <Box>
                <Typography
                  sx={{ textDecorationLine: "underline", fontStyle: "italic" }}
                >
                  Package {index + 1}
                </Typography>
                <Typography>Store Name</Typography>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <img src={item?.image} className={classes.Image} />
                  <Box>
                    <Typography
                      sx={{
                        color: "#006500",
                        fontWeight: "900",
                        textDecorationLine: "underline",
                      }}
                    >
                      {item?.title}
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <Typography>{item?.price} x </Typography>
                      <Typography>
                        {item?.count} = {"  "}
                      </Typography>
                      <Typography sx={{ color: "" }}>
                        {item?.price * item?.count}{" "}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <ControlPoint
                    sx={{ height: "16.5px", width: "16.5px" }}
                    onClick={() => dispatch(increase_count(index))}
                  />
                  <Typography sx={{ fontSize: "13px", paddingInline: "1vh" }}>
                    {item?.count}
                  </Typography>
                  <RemoveCircleOutline
                    sx={{ height: "16.5px", width: "16.5px" }}
                    onClick={() => dispatch(decrease_count(index))}
                  />
                </Box>
                <DeleteOutline
                  sx={{ alignSelf: "end", height: "19px", color: "red" }}
                  onClick={() => dispatch(remove_item(index))}
                />
              </Box>
            </Box>
          ))}
      </Box>
    </Box>
  );
}
