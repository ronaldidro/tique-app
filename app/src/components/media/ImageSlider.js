import { AspectRatio, IconButton, Image } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const NavButton = ({ navIcon, handleClick, ...props }) => (
  <IconButton
    position="absolute"
    zIndex={2}
    top="calc(50% - 15px)"
    colorScheme="whiteAlpha"
    backgroundColor="transparent"
    icon={navIcon}
    onClick={handleClick}
    _hover={{ opacity: 1 }}
    _active={{ opacity: 1 }}
    {...props}
  />
)

const ImageSlider = ({ imageData }) => {
  const defaultItemIndex = imageData.findIndex(item => item.type === 'root')

  return (
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
        <AspectRatio key={index} ratio={4 / 3}>
          <Image src={image.url} alt={`${image.type} image`} borderRadius={{ base: 'md', md: 'xl' }} />
        </AspectRatio>
      ))}
    </Carousel>
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
