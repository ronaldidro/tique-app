import { Box, Container } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import CircularSpinner from '../../components/feedback/CircularSpinner'
import Categories from '../../components/market/Categories'
import Filters from '../../components/market/Filters'
import Header from '../../components/market/Header'
import { useGetShopQuery } from '../../services/shops'

const MarketShop = () => {
  const { id } = useParams()
  const { data: shop, isLoading } = useGetShopQuery(id)

  if (isLoading) return <CircularSpinner />

  return (
    <Box backgroundColor="gray.50">
      <Container maxW="5xl" paddingX={{ base: 0, md: 4 }}>
        <Header shopData={shop} />
        <Box paddingX={[4, 0]}>
          <Filters />
          <Categories categoriesData={shop.categories} />
        </Box>
      </Container>
    </Box>
  )
}

export default MarketShop
