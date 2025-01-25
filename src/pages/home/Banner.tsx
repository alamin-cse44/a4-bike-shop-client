import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import "../../styles/banner.css"

import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";

const Banner = () => {
  const [coverflowPosition, setCoverflowPosition] = useState(3); // Set initial position to the middle image
  const images = [
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/168886/bob-ross-1.jpg",
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/168886/bob-ross-2.jpg",
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/168886/bob-ross-3.jpg",
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/168886/bob-ross-4.jpg",
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/168886/bob-ross-5.jpg",
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/168886/bob-ross-6.jpg",
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/168886/bob-ross-7.jpg",
  ];

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
