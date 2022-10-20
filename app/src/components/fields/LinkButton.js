import { Link } from '@chakra-ui/react'
import { Link as ReachLink } from 'react-router-dom'
import PropTypes from 'prop-types'

const LinkButton = ({ children, pathname, bgColor = 'gray', ...props }) => {
  return (
    <Link
      as={ReachLink}
      to={pathname}
      role="button"
      padding={3}
      backgroundColor={`${bgColor}.500`}
      borderRadius="md"
      fontWeight="bold"
      color="white"
      _hover={{ backgroundColor: `${bgColor}.600` }}
      {...props}
    >
      {children}
    </Link>
  )
}

LinkButton.propTypes = {
  children: PropTypes.object,
  pathname: PropTypes.string,
  bgColor: PropTypes.string
}

export default LinkButton
