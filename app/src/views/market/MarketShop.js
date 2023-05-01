import { Box, Container } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { TbFaceIdError } from 'react-icons/tb'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import CircularSpinner from '../../components/feedback/CircularSpinner'
import Categories from '../../components/market/Categories'
import CenteredIcon from '../../components/market/CenteredIcon'
import Filters from '../../components/market/Filters'
import Header from '../../components/market/Header'
import { useResource } from '../../hooks'
import { initializeProducts } from '../../reducers/productReducer'
import { initializeShop } from '../../reducers/shopReducer'
import { getFilteredProducts } from '../../utils'

const MarketShop = () => {
  const { id } = useParams()
  const shop = useResource(`/shops/${id}`)
  const dispatch = useDispatch()
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
            <CenteredIcon icon={TbFaceIdError} description="No se encontraron productos" showButton={false} />
          ) : (
            <Categories categoriesData={products} />
          )}
        </Box>
      </Container>
    </Box>
  )
}

export default MarketShop
