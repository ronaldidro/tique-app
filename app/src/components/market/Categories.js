import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import Category from './Category'

const Categories = ({ categoriesData }) => (
  <Box paddingBottom={8}>
    {categoriesData.map(category => (
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

Categories.propTypes = {
  categoriesData: PropTypes.array
}

export default Categories
