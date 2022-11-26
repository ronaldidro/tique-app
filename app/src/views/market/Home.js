import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import CircularSpinner from '../../components/feedback/CircularSpinner'
import SearchField from '../../components/fields/SearchField'
import CompanyCard from '../../components/market/CompanyCard'
import { useResource } from '../../hooks'

const Home = () => {
  const companies = useResource('/companies')

  if (!Object.keys(companies).length) return <CircularSpinner />

  return (
    <Box marginY={5}>
      <Heading as="h1">Tique App</Heading>
      <Text marginBottom={4}>Genera tus pedidos al instante 😎</Text>
      <SearchField placeholder="Buscar negocio" marginBottom={5} />
      <SimpleGrid columns={[2, 3]} spacing={[5, 10]}>
        {companies.map((company, index) => (
          <CompanyCard key={index} companyData={company} />
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default Home
