import React from "react";
import { Avatar, Box, Container, Paper, Typography } from "@mui/material";

// Import Swiper React components and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const reviews = [
  {
    id: 1,
    text: "Bike riding offers a thrilling sense of freedom, blending adventure with fitness and eco-friendliness. Every ride is a journey, where the road ahead becomes your path to discovery and self-reliance💝",
    name: "Rehan",
    title: "(Customer Profession)",
  },
  {
    id: 2,
    text: "Bike riding offers a thrilling sense of freedom, blending adventure with fitness and eco-friendliness. Every ride is a journey, where the road ahead becomes your path to discovery and self-reliance💝",
    name: "Fuad",
    title: "(Customer Profession)",
  },
  {
    id: 3,
    text: "Bike riding offers a thrilling sense of freedom, blending adventure with fitness and eco-friendliness. Every ride is a journey, where the road ahead becomes your path to discovery and self-reliance💝",
    name: "Polash",
    title: "(Customer Profession)",
  },
  {
    id: 4,
    text: "Bike riding offers a thrilling sense of freedom, blending adventure with fitness and eco-friendliness. Every ride is a journey, where the road ahead becomes your path to discovery and self-reliance💝",
    name: "Shafin",
    title: "(Customer Profession)",
  },
  {
    id: 5,
    text: "Bike riding offers a thrilling sense of freedom, blending adventure with fitness and eco-friendliness. Every ride is a journey, where the road ahead becomes your path to discovery and self-reliance💝",
    name: "Nosbi",
    title: "(Customer Profession)",
  },
];

const Review = () => {
  return (
    <Container id="review" sx={{ pt: 10 }}>
      <Box sx={{ mb: 7, textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 2,
            fontSize: { xs: "18px", md: "35px" },
          }}
        >
          Opinions of respected customers
        </Typography>
      </Box>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id} style={{ padding: "1px" }}>
            <Paper
              sx={{
                p: 2,
                borderRadius: "16px",
                background: "#fff",
                height: "250px",
                position: "relative",
                border: "1px solid green",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  mb: 2,
                  fontSize: { xs: "16px", md: "16px" },
                  textAlign: "justify",
                  lineHeight: 1.5,
                }}
              >
                {review.text}
              </Typography>
              <Box
                sx={{
                  textAlign: "center",
                  gap: 1,
                  position: "absolute",
                  bottom: "10px",
                  left: "40%",
                  transform: "translateX(-50%)",
                  display: "flex",
                }}
              >
                <Avatar sx={{ width: 40, height: 40, mb: 1 }}>
                  {review.name[0]}
                </Avatar>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      fontSize: { xs: "16px", md: "16px" },
                    }}
                  >
                    {review?.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: "14px", md: "14px" },
                    }}
                  >
                    {review?.title}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default Review;
