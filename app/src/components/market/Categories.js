import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { TbFaceIdError } from 'react-icons/tb'
import { useDispatch } from 'react-redux'
import { initializeProducts } from '../../reducers/productReducer'
import { getFilteredProducts } from '../../utils'
import Category from './Category'
import CenteredIcon from './CenteredIcon'

const Categories = ({ categoriesData }) => {
  const filteredProducts = getFilteredProducts()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeProducts(categoriesData))
  }, [categoriesData])

  if (!filteredProducts.length)
    return <CenteredIcon icon={TbFaceIdError} description="No se encontraron productos" showButton={false} />

  return (
    <Box paddingBottom={8}>
      {filteredProducts.map(category => (
        <Accordion key={category.id} defaultIndex={[0]} allowMultiple>
          <AccordionItem>
            {({ isExpanded }) => (
              <>
                <h2>
                  <AccordionButton px={{ base: 2, md: 4 }}>
                    <Box as="span" flex="1" textAlign="left" fontSize="lg" fontWeight="medium">
                      {category.description}
                    </Box>
                    {isExpanded ? <MinusIcon boxSize={3} /> : <AddIcon boxSize={3} />}
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={7} px={{ base: 0, md: 4 }}>
                  <Category categoryData={category} />
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        </Accordion>
      ))}
    </Box>
  )
}

Categories.propTypes = {
  categoriesData: PropTypes.array
}

export default Categories
