import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import "../../styles/banner.css";

import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";

import b1 from "../../assets/images/banner/b1.webp";
import b2 from "../../assets/images/banner/b2.webp";
import b3 from "../../assets/images/banner/b3.webp";
import b4 from "../../assets/images/banner/b4.webp";
import b5 from "../../assets/images/banner/b5.webp";
import b6 from "../../assets/images/banner/b6.webp";
import b7 from "../../assets/images/banner/b7.webp";

const Banner = () => {
  const [coverflowPosition, setCoverflowPosition] = useState(3); // Set initial position to the middle image
  const images = [b1, b2, b3, b4, b5, b6, b7];

  const viewPrevImage = () => {
    setCoverflowPosition(
      (prev) => (prev > 1 ? prev - 1 : images.length) // If at the first image, loop back to the last
    );
  };

  const viewNextImage = () => {
    setCoverflowPosition(
      (prev) => (prev < images.length ? prev + 1 : 1) // If at the last image, loop back to the first
    );
  };

  const jumpToImage = (index: number) => {
    setCoverflowPosition(index + 1);
  };

  // Autoplay functionality
  useEffect(() => {
    const interval = setInterval(() => {
      viewNextImage();
    }, 4000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);
  return (
    <Box>
      <Box className="coverflow" data-coverflow-position={coverflowPosition}>
        <Box
          sx={{
            display: { xs: "none", sm: "block" },
          }}
        >
          <FaRegArrowAltCircleLeft
            className="prev-arrow"
            onClick={viewPrevImage}
            size={35}
          />
        </Box>
        {images.map((image, index) => (
          <Box
            key={index}
            component="img"
            src={image}
            alt={`Coverflow ${index + 1}`}
            onClick={() => jumpToImage(index)}
            data-coverflow-index={index + 1}
            className="coverflow__image"
            sx={{
              width: {
                xs: "360px",
                md: "450px",
              },
              height: {
                xs: "300px",
                md: "300px",
              },
              ml: {
                xs: 2.5,
                md: 0,
              },
            }}
          />
        ))}
        <Box
          sx={{
            display: { xs: "none", sm: "block" },
          }}
        >
          <FaRegArrowAltCircleRight
            className="next-arrow"
            onClick={viewNextImage}
            size={35}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Banner;
