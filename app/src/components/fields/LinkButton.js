import { Link } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { Link as ReachLink } from 'react-router-dom'

const LinkButton = ({ children, pathname, ...props }) => (
  <Link as={ReachLink} to={pathname} role="button" {...props}>
    {children}
  </Link>
)

LinkButton.propTypes = {
  children: PropTypes.node,
  pathname: PropTypes.string
}

export default LinkButton
