import { Box, Container, Flex, Icon, Text, useDisclosure } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { BsCart4 } from 'react-icons/bs'
import CircularSpinner from '../../components/feedback/CircularSpinner'
import LinkButton from '../../components/fields/LinkButton'
import Header from '../../components/market/Header'
import Filters from '../../components/market/Filters'
import ProductCategories from '../../components/market/ProductCategories'
import UsageStepsModal from '../../components/market/UsageStepsModal'
import { useResource } from '../../hooks'
import { initializeCompany } from '../../reducers/companyReducer'
import { initializeProducts } from '../../reducers/productReducer'
import { getFilteredProducts, getProductsOrder } from '../../utils'

const CompanyProducts = () => {
  const { id } = useParams()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const company = useResource(`/shops/${id}`)
  const dispatch = useDispatch()
  const productsOrder = getProductsOrder()
  const products = getFilteredProducts()

  useEffect(() => onOpen(), [])

  useEffect(() => {
    if (Object.keys(company).length) {
      const { categories, ...companyData } = company
      dispatch(initializeCompany(companyData))
      dispatch(initializeProducts(categories))
    }
  }, [company])

  if (!Object.keys(company).length) return <CircularSpinner />

  return (
    <Container maxW="5xl" paddingX={{ base: 0, md: 4 }}>
      <Header companyData={company} />
      <Box paddingX={[4, 0]}>
        <Filters />
        <ProductCategories productCategoriesData={products} />
        {productsOrder.length > 0 && (
          <LinkButton pathname="/pedido" bgColor="green" position="fixed" bottom="35px" right="35px">
            <Flex>
              <Text paddingRight={2}>Ver Pedido</Text>
              <Icon as={BsCart4} />
            </Flex>
          </LinkButton>
        )}
        <UsageStepsModal isOpen={isOpen} onClose={onClose} />
      </Box>
    </Container>
  )
}

export default CompanyProducts
