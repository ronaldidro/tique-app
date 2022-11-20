import { useSelector } from 'react-redux'
import { Icon } from '@chakra-ui/react'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { BsPerson, BsShopWindow, BsColumnsGap, BsBoxSeam } from 'react-icons/bs'

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

export const getUser = () => useSelector(state => state.user)

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

export const setToastContent = (title, description, status, variant, position, ...rest) =>
  Object.assign(
    {
      title,
      description,
      status,
      position,
      variant
    },
    ...rest
  )

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

export const socialNetworksOptions = [
  { description: 'Facebook', value: 'fb' },
  { description: 'Instagram', value: 'ig' },
  { description: 'Twitter', value: 'tw' }
]

export const shopImageOptions = [
  { description: 'Inicial', value: 'initial' },
  { description: 'Perfil', value: 'profile' },
  { description: 'Portada', value: 'headboard' }
]

export const adminSidebarOptions = [
  { text: 'Perfil', route: '/admin/perfil', icon: BsPerson },
  { text: 'Tienda', route: '/admin/tienda', icon: BsShopWindow },
  { text: 'Categorías', route: '/admin/categorias', icon: BsColumnsGap },
  { text: 'Productos', route: '/admin/productos', icon: BsBoxSeam }
]

export const setItemToLocalStorage = (key, value) => localStorage.setItem(key, value)

export const getItemFromLocalStorage = (key, jsonFormat) =>
  jsonFormat ? JSON.parse(getItemFromLocalStorage(key)) : localStorage.getItem(key)

export const removeItemFromLocalStorage = keys => keys.map(key => localStorage.removeItem(key))
