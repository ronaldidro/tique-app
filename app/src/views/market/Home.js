import { Box, Container, SimpleGrid } from '@chakra-ui/react'
import CircularSpinner from '../../components/feedback/CircularSpinner'
import ShopCard from '../../components/market/ShopCard'
import { useGetShopsQuery } from '../../services/shops'

const Home = () => {
  const { data: shops, isLoading } = useGetShopsQuery()

  if (isLoading) return <CircularSpinner />

  return (
    <Box backgroundColor="gray.50" minHeight="3xl">
      <Container maxW="5xl" paddingY={5}>
        <SimpleGrid columns={[2, 3]} spacing={[5, 10]}>
          {shops.map((shop, index) => (
            <ShopCard key={index} shopData={shop} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default Home
