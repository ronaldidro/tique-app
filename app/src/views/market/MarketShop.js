import { Box, Center, Container, Flex, Icon, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { BsCart4 } from 'react-icons/bs'
import { TbFaceIdError } from 'react-icons/tb'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import CircularSpinner from '../../components/feedback/CircularSpinner'
import LinkButton from '../../components/fields/LinkButton'
import Categories from '../../components/market/Categories'
import Filters from '../../components/market/Filters'
import Header from '../../components/market/Header'
import { useResource } from '../../hooks'
import { initializeProducts } from '../../reducers/productReducer'
import { initializeShop } from '../../reducers/shopReducer'
import { getFilteredProducts, getProductsOrder } from '../../utils'

const MarketShop = () => {
  const { id } = useParams()
  const shop = useResource(`/shops/${id}`)
  const dispatch = useDispatch()
  const productsOrder = getProductsOrder()
  const products = getFilteredProducts()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (Object.keys(shop).length) {
      const { categories, ...shopData } = shop
      dispatch(initializeShop(shopData))
      dispatch(initializeProducts(categories))
      setIsLoading(false)
    }
  }, [shop])

  if (isLoading) return <CircularSpinner />

  return (
    <Box backgroundColor="gray.50">
      <Container maxW="5xl" paddingX={{ base: 0, md: 4 }}>
        <Header shopData={shop} />
        <Box paddingX={[4, 0]}>
          <Filters />
          {!products.length ? (
            <Center minHeight="xl">
              <Box textAlign="center">
                <Icon as={TbFaceIdError} boxSize={40} />
                <Text fontWeight="bold" marginY={5}>
                  No se encontraron productos
                </Text>
              </Box>
            </Center>
          ) : (
            <Categories categoriesData={products} />
          )}
          {productsOrder.length > 0 && (
            <LinkButton
              pathname="/pedido"
              padding={3}
              borderRadius="md"
              backgroundColor="green.500"
              fontWeight="bold"
              color="white"
              _hover={{ backgroundColor: 'green.600' }}
              zIndex={2}
              position="fixed"
              bottom="35px"
              right="35px"
            >
              <Flex>
                <Text paddingRight={2}>Ver carrito</Text>
                <Icon as={BsCart4} />
              </Flex>
            </LinkButton>
          )}
        </Box>
      </Container>
    </Box>
  )
}

export default MarketShop
