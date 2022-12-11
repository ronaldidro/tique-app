import { Button, Container, Flex, SimpleGrid, Spacer, Text } from '@chakra-ui/react'
import { RiLoginBoxLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import CircularSpinner from '../../components/feedback/CircularSpinner'
import { CreativeTimLogo } from '../../components/icons/Icons'
import CompanyCard from '../../components/market/CompanyCard'
import { useResource } from '../../hooks'

const Home = () => {
  const companies = useResource('/companies')
  const navigate = useNavigate()

  if (!Object.keys(companies).length) return <CircularSpinner />

  return (
    <>
      <Flex alignItems="center" paddingY={2} paddingX={4} backgroundColor="gray.100">
        <CreativeTimLogo w="32px" h="32px" me="10px" />
        <Text fontWeight="bold" fontSize="sm" fontFamily="monospace">
          TIQUE APP
        </Text>
        <Spacer />
        <Button rightIcon={<RiLoginBoxLine />} onClick={() => navigate('/admin')}>
          Iniciar sesión
        </Button>
      </Flex>
      <Container maxW="5xl" marginY={5}>
        <SimpleGrid columns={[2, 3]} spacing={[5, 10]}>
          {companies.map((company, index) => (
            <CompanyCard key={index} companyData={company} />
          ))}
        </SimpleGrid>
      </Container>
    </>
  )
}

export default Home
