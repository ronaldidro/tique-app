import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { Box, IconButton, Image } from '@chakra-ui/react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import PropTypes from 'prop-types'

const NavButton = ({ navIcon, handleClick, ...props }) => (
  <IconButton
    position="absolute"
    zIndex={2}
    top="calc(50% - 15px)"
    colorScheme="whiteAlpha"
    backgroundColor="transparent"
    icon={navIcon}
    onClick={handleClick}
    _hover={{
      opacity: 1
    }}
    _active={{
      opacity: 1
    }}
    {...props}
  />
)

const ImageSlider = ({ imageData }) => {
  const defaultItemIndex = imageData.findIndex(item => item.type === 'root')

  return (
    <Box width={['100%', '50%']}>
      <Carousel
        renderArrowPrev={(onClickHandler, hasPrev) =>
          hasPrev && <NavButton navIcon={<FaChevronLeft />} handleClick={onClickHandler} />
        }
        renderArrowNext={(onClickHandler, hasNext) =>
          hasNext && <NavButton navIcon={<FaChevronRight />} handleClick={onClickHandler} right={0} />
        }
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        selectedItem={defaultItemIndex}
      >
        {imageData.map((image, index) => (
          <Image
            key={index}
            src={image.url}
            objectFit="cover"
            alt="Product Image"
            height={['full', 'lg']}
            roundedLeft={['none', 'md']}
          />
        ))}
      </Carousel>
    </Box>
  )
}

ImageSlider.propTypes = {
  imageData: PropTypes.array
}

NavButton.propTypes = {
  navIcon: PropTypes.element,
  handleClick: PropTypes.func
}

export default ImageSlider
