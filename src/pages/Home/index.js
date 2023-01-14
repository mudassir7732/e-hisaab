import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  CircularProgress,
  Select,
  TextField,
  Backdrop,
  Pagination,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { Search } from "@mui/icons-material";
import Banner from "../../assets/images/Banner.png";
import Card from "../../components/Card";

const useStyles = makeStyles((theme) => ({
  Container: {
    width: "100vw",
    marginBottom: "3vh",
    marginTop: "17.8vh",
  },
  BannerStyle: {
    width: "100%",
  },
  SearchBarContainer: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent: "center",
    },
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      marginBlock: "4vh",
      justifyContent: "space-evenly",
    },
    width: "90vw",
    margin: "auto",
  },
  SearchBarStyle: {
    [theme.breakpoints.down("sm")]: {
      width: "60vw !important",
      marginTop: "2vh",
      marginInline: "auto !important",
    },
    [theme.breakpoints.up("sm")]: {
      width: "22vw !important",
    },
    backgroundColor: "whitesmoke",
  },
  InputLabelStyle: {
    [theme.breakpoints.down("sm")]: {
      marginInline: "15vw",
      marginTop: "2vh",
    },
  },
  CardsContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "78vw",
    marginInline: "11vw",
  },
}));

export default function Home() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [priceRange, setPriceRange] = useState(Infinity);
  const [totalPages, setTotalPages] = useState();
  const [pageNo, setPageNo] = useState(1);
  const [startingIndex, setStartingIndex] = useState(0);
  const [endingIndex, setEndingIndex] = useState(5);

  const classes = useStyles();

  const getCardData = async (e) => {
    await axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        setData(res?.data?.products);
      })
      .catch((err) => {
        console.log(err, " = Error");
      });
  };

  const getCategoriesList = async () => {
    await axios
      .get("https://dummyjson.com/products/categories")
      .then((res) => {
        setCategoriesList(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err, " = Error");
      });
  };

  useEffect(() => {
    getCardData();
    // countItems();
    getCategoriesList();
  }, []);

  const getCategoryData = async (e) => {
    const client = axios.create({
      baseURL: `https://dummyjson.com/products/category/${e.target.value}`,
    });
    await client
      .get()
      .then((res) => {
        console.log(res, " = Result");
        setData(res?.data?.products);
      })
      .catch((err) => {
        console.log(err, " = Error");
      });
  };

  const getSearchData = async (e) => {
    await axios
      .get(`https://dummyjson.com/products/search?q=${e.target.value}`)
      .then((res) => {
        setData(res?.data?.products);
      })
      .catch((err) => {
        console.log(err, "fetch item error");
      });
  };

  const useDebounce = (e) => {
    setTimeout(() => {
      getSearchData(e);
    }, 1800);
  };

  const getData = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products");
      setData(res?.data?.products);
      setTotalPages(data?.length / 9);
      setTotalPages(Math.ceil(data?.length / 9));
    } catch (err) {
      console.log(err, " = Error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // const getTotalPages = () => {
  //   // setTotalPages(Math.ceil(data?.length / 9));
  // };

  // useEffect(() => {
  //   getTotalPages();
  // }, [data]);

  const set = () => {
    let pro = pageNo * 9;
    setStartingIndex(pro - 9);
    setEndingIndex(pro);
  };

  useEffect(() => {
    set();
  }, [pageNo]);

  return (
    <>
      {loading && (
        <Backdrop
          open={loading}
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Box className={classes.Container}>
        <img src={Banner} className={classes.BannerStyle} />

        <Box className={classes.SearchBarContainer}>
          <TextField
            placeholder="Search bar"
            className={classes.SearchBarStyle}
            onChange={(e) => useDebounce(e)}
            InputProps={{
              startAdornment: (
                <Search sx={{ fontSize: "20px", color: "#808080" }} />
              ),
            }}
          />

          <FormControl>
            <InputLabel className={classes.InputLabelStyle}>
              Categories
            </InputLabel>
            <Select
              className={classes.SearchBarStyle}
              onChange={(e) => getCategoryData(e)}
            >
              {categoriesList?.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel className={classes.InputLabelStyle}>
              Min Price-Max Price
            </InputLabel>
            <Select
              className={classes.SearchBarStyle}
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <MenuItem value={200}>Less than 200</MenuItem>
              <MenuItem value={300}>Less than 300</MenuItem>
              <MenuItem value={400}>Less than 400</MenuItem>
              <MenuItem value={500}>Less than 500</MenuItem>
              <MenuItem value={600}>Less than 600</MenuItem>
              <MenuItem value={700}>Less than 700</MenuItem>
              <MenuItem value={800}>Less than 800</MenuItem>
              <MenuItem value={900}>Less than 900</MenuItem>
              <MenuItem value={1000}>Less than 1000</MenuItem>
              <MenuItem value={Infinity}>More than 1000</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box className={classes.CardsContainer}>
          {data &&
            data
              .filter((filtered) => filtered.price < priceRange)
              .slice(startingIndex, endingIndex)
              .map((item) => {
                return (
                  <>
                    {item?.title && (
                      <Card
                        title={item?.title}
                        price={item?.price}
                        description={item?.description}
                        thumbnail={item?.thumbnail}
                        image1={item?.images[0]}
                        image2={item?.images[1]}
                        image3={item?.images[2]}
                      />
                    )}
                  </>
                );
              })}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingBlock: "1vh",
          }}
        >
          <Pagination
            count={totalPages}
            page={pageNo}
            onChange={(event, value) => setPageNo(value)}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      </Box>
    </>
  );
}
