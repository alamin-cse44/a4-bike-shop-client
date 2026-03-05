import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import b1 from "../../assets/images/banner/b1.webp";
import b2 from "../../assets/images/banner/b2.webp";
import b3 from "../../assets/images/banner/b3.webp";
import b4 from "../../assets/images/banner/b4.webp";
import b5 from "../../assets/images/banner/b5.webp";
import b6 from "../../assets/images/banner/b6.webp";
import b7 from "../../assets/images/banner/b7.webp";

const Banner = () => {
  const images = [b1, b2, b3, b4, b5, b6, b7];

  return (
    <Box
      sx={{
        py: 4,
        overflow: "hidden",
        bgcolor: "#fcfcfc",
        "& .swiper": {
          paddingBottom: "50px",
          paddingTop: "20px",
        },
        "& .swiper-pagination-bullet-active": {
          bgcolor: "#00CA52",
        },
      }}
    >
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, EffectCoverflow, Pagination]}
        className="bannerSwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            style={{
              width: "auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              component="img"
              src={image}
              alt={`Banner ${index + 1}`}
              sx={{
                width: {
                  xs: "300px",
                  sm: "450px",
                  md: "600px",
                },
                height: {
                  xs: "200px",
                  sm: "300px",
                  md: "400px",
                },
                borderRadius: "24px",
                objectFit: "cover",
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                transition: "transform 0.3s ease",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Banner;
