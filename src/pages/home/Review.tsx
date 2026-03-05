import {
  Avatar,
  Box,
  Container,
  Paper,
  Typography,
  Stack,
  Rating,
  alpha,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaQuoteLeft } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    text: "Rehan Bike Shop truly understands what a rider needs. The Gixxer SF I bought is performing exceptionally well, and the service team is incredibly professional. Highly recommended for any bike enthusiast!",
    name: "Mohammad Rehan",
    title: "verified Customer",
    rating: 5,
  },
  {
    id: 2,
    text: "Found my dream adventurous bike here. The transparency in pricing and the smooth checkout process made everything so easy. The collection they have is easily the best in Dhaka right now.",
    name: "Fuad Hasan",
    title: "Adventure Rider",
    rating: 5,
  },
  {
    id: 3,
    text: "The free service for the first 1000km is a game-changer. It shows they care about the customer even after the purchase. Great experience and even greater hospitality from the staff.",
    name: "Polash Mahmud",
    title: "Daily Commuter",
    rating: 4,
  },
  {
    id: 4,
    text: "Professionalism at its best. From the moment I entered the shop till I rode out on my new bike, every step was well-managed. The new search features on their web portal are also very handy!",
    name: "Shafin Ahmed",
    title: "Touring Enthusiast",
    rating: 5,
  },
  {
    id: 5,
    text: "Excellent collection of Suzuki bikes. I was confused between a few models, but their expert suggestions helped me pick the right one. Secure payment and fast delivery were the cherry on top.",
    name: "Nosbi Alim",
    title: "Biker",
    rating: 5,
  },
];

const Review = () => {
  return (
    <Box sx={{ bgcolor: "#fafafa", py: 12 }}>
      <Container id="review">
        <Box sx={{ mb: 8, textAlign: "center" }}>
          <Typography
            variant="overline"
            sx={{
              color: "#00CA52",
              fontWeight: "bold",
              letterSpacing: 2,
            }}
          >
            TESTIMONIALS
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              mt: 1,
              fontSize: { xs: "28px", md: "42px" },
              color: "#1a1a1a",
            }}
          >
            Opinions of Respected Customers
          </Typography>
          <Box
            sx={{
              width: 60,
              height: 4,
              backgroundColor: "#00CA52",
              margin: "20px auto 0",
              borderRadius: 2,
            }}
          />
        </Box>

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Pagination, Autoplay]}
          style={{ paddingBottom: "60px" }}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: "24px",
                  background: "#fff",
                  height: "100%",
                  minHeight: "320px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  border: "1px solid #eee",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: `0 20px 40px ${alpha("#000", 0.05)}`,
                    borderColor: "#00CA52",
                  },
                }}
              >
                <Box>
                  <Box sx={{ color: alpha("#00CA52", 0.2), mb: 2 }}>
                    <FaQuoteLeft size={32} />
                  </Box>
                  <Rating
                    value={review.rating}
                    readOnly
                    size="small"
                    sx={{ mb: 2, color: "#00CA52" }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#555",
                      fontStyle: "italic",
                      lineHeight: 1.7,
                      mb: 4,
                    }}
                  >
                    "{review.text}"
                  </Typography>
                </Box>

                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    sx={{
                      width: 50,
                      height: 50,
                      bgcolor: "#00CA52",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      boxShadow: "0 4px 10px rgba(0,202,82,0.2)",
                    }}
                  >
                    {review.name[0]}
                  </Avatar>
                  <Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      color="#333"
                    >
                      {review.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}
                    >
                      {review.title}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </SwiperSlide>
          ))}
        </Swiper>

        <style>
          {`
            .swiper-pagination-bullet-active {
              background-color: #00CA52 !important;
            }
          `}
        </style>
      </Container>
    </Box>
  );
};

export default Review;
