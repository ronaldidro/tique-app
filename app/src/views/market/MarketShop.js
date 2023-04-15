import { Box, Container, Flex, Icon, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { BsCart4 } from 'react-icons/bs'
import CircularSpinner from '../../components/feedback/CircularSpinner'
import LinkButton from '../../components/fields/LinkButton'
import Header from '../../components/market/Header'
import Categories from '../../components/market/Categories'
import Filters from '../../components/market/Filters'
import { useResource } from '../../hooks'
import { initializeShop } from '../../reducers/shopReducer'
import { initializeProducts } from '../../reducers/productReducer'
import { getFilteredProducts, getProductsOrder } from '../../utils'

const MarketShop = () => {
  const { id } = useParams()
  const shop = useResource(`/shops/${id}`)
  const dispatch = useDispatch()
  const productsOrder = getProductsOrder()
  const products = getFilteredProducts()

  useEffect(() => {
    if (Object.keys(shop).length) {
      const { categories, ...shopData } = shop
      dispatch(initializeShop(shopData))
      dispatch(initializeProducts(categories))
    }
  }, [shop])

  if (!Object.keys(shop).length) return <CircularSpinner />

  return (
    <Container maxW="5xl" paddingX={{ base: 0, md: 4 }}>
      <Header shopData={shop} />
      <Box paddingX={[4, 0]}>
        <Filters />
        <Categories categoriesData={products} />
        {productsOrder.length > 0 && (
          <LinkButton pathname="/pedido" bgColor="green" position="fixed" bottom="35px" right="35px">
            <Flex>
              <Text paddingRight={2}>Ver carrito</Text>
              <Icon as={BsCart4} />
            </Flex>
          </LinkButton>
        )}
      </Box>
    </Container>
  )
}

export default MarketShop
