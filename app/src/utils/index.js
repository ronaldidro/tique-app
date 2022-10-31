import { useSelector } from 'react-redux'
import { Icon } from '@chakra-ui/react'
import { FaFacebook, FaInstagram, FaUser, FaBoxOpen } from 'react-icons/fa'

export const convertToPercent = value => `${value * 100} %`

export const getDiscountedPrice = (price, discount) => (price * (1 - discount)).toFixed(2)

export const getProductsOrder = () => useSelector(state => state.productsOrder)

export const getProductOrderById = id => getProductsOrder().find(product => product.id === id)

export const getProducts = () => useSelector(state => state.products)

export const getFilteredProducts = () =>
  useSelector(({ filter, products }) => {
    if (filter.mode === 'ALL') return products
    if (filter.mode === 'BY_CATEGORY') return products.filter(category => category.id === filter.content)
    if (filter.mode === 'BY_NAME') {
      const initialFilter = products.map(({ id, description, products }) => {
        const productsFiltered = products.filter(product =>
          product.name.toLocaleLowerCase().includes(filter.content.toLocaleLowerCase())
        )
        return { id, description, products: productsFiltered }
      })
      return initialFilter.filter(item => item.products.length > 0)
    }
  })

export const getCompanyData = () => useSelector(state => state.company)

export const validateRequired = value => !value && 'Campo obligatorio'

export const orderModeOptions = [
  { label: 'Recojo en tienda', value: 'pickup' },
  { label: 'Entrega a domicilio', value: 'delivery' }
]

export const paymentMethodOptions = [
  { label: 'Efectivo', value: 'cash' },
  { label: 'Tarjeta', value: 'card' },
  { label: 'Transferencia', value: 'transfer' }
]

export const urlLineBreak = '%0A'

export const orderShippingNotification = {
  title: '¡Pedido completado!',
  description: 'Acabamos de enviar tu pedido vía Whatsapp 🙂',
  status: 'success',
  position: 'top-right',
  variant: 'left-accent',
  duration: null,
  isClosable: true
}

export const showToast = (toast, toastData) => toast({ ...toastData })

export const usageSteps = [
  'Busca y elige tus productos.',
  'Revisa y completa los detalles de tu pedido.',
  '¡Listo! Enviaremos tu pedido vía WhatsApp.'
]

export const socialNetworkIcons = [
  { type: 'fb', icon: <Icon as={FaFacebook} boxSize={10} color="facebook.500" /> },
  { type: 'ig', icon: <Icon as={FaInstagram} boxSize={10} color="red.500" /> }
]

export const adminSidebarOptions = [
  { text: 'Perfil', route: '/admin/perfil', icon: FaUser },
  { text: 'Productos', route: '/admin/productos', icon: FaBoxOpen }
]
