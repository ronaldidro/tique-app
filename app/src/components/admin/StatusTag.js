import { Tag } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const StatusTag = ({ active }) => <Tag colorScheme={active ? 'green' : 'red'}>{active ? 'Activo' : 'Inactivo'}</Tag>

StatusTag.propTypes = {
  active: PropTypes.bool
}

export default StatusTag
