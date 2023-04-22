import { Box, Container, Flex, Icon, IconButton, SimpleGrid, Spacer, Tooltip } from '@chakra-ui/react'
import { RiLoginBoxLine, RiStore3Fill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import AppLogo from '../../components/AppLogo'
import CircularSpinner from '../../components/feedback/CircularSpinner'
import ShopCard from '../../components/market/ShopCard'
import { useResource } from '../../hooks'
import { getItemFromLocalStorage } from '../../utils'

const Home = () => {
  const shops = useResource('/shops')
  const navigate = useNavigate()
  const user = getItemFromLocalStorage('loggedTiqueAppUser', true) || null

  if (!Object.keys(shops).length) return <CircularSpinner />

  return (
    <Box backgroundColor="gray.50" minHeight="3xl">
      <Flex alignItems="center" paddingY={4} paddingX={4} backgroundColor="whiteAlpha.900" boxShadow="md">
        <AppLogo />
        <Spacer />
        <Tooltip label={user ? 'Mi tienda' : 'Iniciar sesión'}>
          <IconButton
            icon={<Icon as={user ? RiStore3Fill : RiLoginBoxLine} boxSize={6} />}
            onClick={() => navigate('/admin')}
          />
        </Tooltip>
      </Flex>
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
