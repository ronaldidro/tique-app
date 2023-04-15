import { Button, Container, Flex, SimpleGrid, Spacer } from '@chakra-ui/react'
import { RiLoginBoxLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import AppLogo from '../../components/AppLogo'
import CircularSpinner from '../../components/feedback/CircularSpinner'
import ShopCard from '../../components/market/ShopCard'
import { useResource } from '../../hooks'

const Home = () => {
  const shops = useResource('/shops')
  const navigate = useNavigate()

  if (!Object.keys(shops).length) return <CircularSpinner />

  return (
    <>
      <Flex alignItems="center" paddingY={2} paddingX={4} backgroundColor="gray.100">
        <AppLogo />
        <Spacer />
        <Button rightIcon={<RiLoginBoxLine />} onClick={() => navigate('/admin')}>
          Iniciar sesión
        </Button>
      </Flex>
      <Container maxW="5xl" marginY={5}>
        <SimpleGrid columns={[2, 3]} spacing={[5, 10]}>
          {shops.map((shop, index) => (
            <ShopCard key={index} shopData={shop} />
          ))}
        </SimpleGrid>
      </Container>
    </>
  )
}

export default Home
