import { useState } from "react";
import { Box, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import Slider from "react-slick";

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const ImagesCarousel = ({ images }: any) => {
  const [slider, setSlider] = useState<Slider | null>(null);

  return (
    <Box position={"relative"} minW={"full"} overflow={"hidden"}>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {images.images.map((url: string, index: number) => (
          <Image
            objectFit="cover"
            key={index}
            alt={url}
            src={url}
            borderRadius="md"
          />
        ))}
      </Slider>
      <Flex justify="space-between" align="center">
        <Icon
          as={SlArrowLeft}
          w={[4, 5, 6]}
          h={[4, 5, 6]}
          zIndex={2}
          _hover={{ cursor: "pointer" }}
          onClick={() => slider?.slickPrev()}
        />
        <Icon
          as={SlArrowRight}
          w={[4, 5, 6]}
          h={[4, 5, 6]}
          zIndex={2}
          _hover={{ cursor: "pointer" }}
          onClick={() => slider?.slickNext()}
        />
      </Flex>
    </Box>
  );
};

export default ImagesCarousel;
