import { List } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import OrderListItem from './OrderListItem'

const OrderList = ({ productsOrder }) => {
  return (
    <List>
      {productsOrder.map(product => (
        <OrderListItem key={product.id} productData={product} />
      ))}
    </List>
  )
}

OrderList.propTypes = {
  productsOrder: PropTypes.array
}

export default OrderList
