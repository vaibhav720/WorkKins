// Import Swiper React components
import * as React from "react";
import Grid from "@mui/material/Grid";
import { Swiper, SwiperSlide, useSwiperSlide } from "swiper/react";
import CssBaseline from "@mui/material/CssBaseline";
import { useState, useEffect } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Navigation } from "swiper";

export default function Slider() {
  const [text, setText] = useState("");
  const [fullText, setFullText] = useState("We Provide wellness");
  const [index, setIndex] = useState(0);
  const swiperSlide = useSwiperSlide();

  useEffect(() => {
    if (index < fullText.length) {
      setTimeout(() => {
        setText(text + fullText[index]);
        setIndex(index + 1);
      }, 80);
    }
  }, [index]);

  return (
    <React.Fragment>
      <br />
      <br />
      <CssBaseline />
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              {text}
            </Grid>{" "}
            <Grid item xs={8}>
              <img src={require("../asset/carosalImages/1.jpg")} alt="health" />{" "}
            </Grid>
          </Grid>
        </SwiperSlide>
        <SwiperSlide>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              {text}
            </Grid>{" "}
            <Grid item xs={8}>
              <img src={require("../asset/carosalImages/2.jpg")} alt="health" />{" "}
            </Grid>
          </Grid>
        </SwiperSlide>
        <SwiperSlide>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              {text}
            </Grid>{" "}
            <Grid item xs={8}>
              <img src={require("../asset/carosalImages/3.jpg")} alt="health" />{" "}
            </Grid>
          </Grid>
        </SwiperSlide>
      </Swiper>
    </React.Fragment>
  );
}
