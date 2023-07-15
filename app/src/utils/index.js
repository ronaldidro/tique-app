import { Icon } from '@chakra-ui/react'
import { BsBoxSeam, BsColumnsGap, BsPerson, BsShopWindow } from 'react-icons/bs'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { useSelector } from 'react-redux'

export const APP_NAME = 'tique'

export const getProductsOrder = () => useSelector(state => state.productsOrder)

export const getProductOrderById = id => getProductsOrder().find(product => product.id === id)

export const getOrderTotalPrice = () => getProductsOrder().reduce((acc, product) => acc + product.totalPrice, 0)

export const getOrderTotalItems = () => getProductsOrder().reduce((acc, product) => acc + product.quantity, 0)

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

export const getShopData = () => useSelector(state => state.shop)

export const getUser = () => useSelector(state => state.user)

export const validateRequired = value => value.trim() === '' && 'Campo requerido'

export const orderModeOptions = [
  { label: 'Recojo en tienda', value: 'pickup' },
  { label: 'Entrega a domicilio', value: 'delivery' }
]

export const payMethodOptions = [
  { label: 'Efectivo', value: 'cash' },
  { label: 'Tarjeta', value: 'card' },
  { label: 'Transferencia', value: 'transfer' }
]

export const urlLineBreak = '%0A'

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

export const productImageOptions = [
  { description: 'Principal', value: 'root' },
  { description: 'Secundaria', value: 'other' }
]

export const adminSidebarOptions = [
  { text: 'Perfil', route: '/admin/perfil', icon: BsPerson, showWithoutShop: true },
  { text: 'Tienda', route: '/admin/tienda', icon: BsShopWindow, showWithoutShop: true },
  { text: 'Categorías', route: '/admin/categorias', icon: BsColumnsGap, showWithoutShop: false },
  { text: 'Productos', route: '/admin/productos', icon: BsBoxSeam, showWithoutShop: false }
]

export const statusOptions = [
  { description: 'Activo', value: true },
  { description: 'Inactivo', value: false }
]

export const toastBase = { title: 'Error', status: 'error', position: 'top', variant: 'subtle' }

export const getImageTypeUrl = (images = [], type = 'root') => images.find(image => image.type === type).url

export const convertToPercent = value => `${value * 100} %`

export const getDiscountedPrice = (price, discount) => price * (1 - discount)

export const formatPrice = value => {
  const formatter = new Intl.NumberFormat('es-PE', {
    currency: 'PEN',
    style: 'currency',
    maximumFractionDigits: 2
  })

  return formatter.format(value)
}

export const formatAttributeValues = (attributes, toArray = true) =>
  attributes.map(attribute => ({
    ...attribute,
    values: toArray ? attribute.values.split(',') : attribute.values.toString()
  }))

export const formatToSelectOptions = data => data.map(({ id: value, description }) => ({ description, value }))

export const setItemToLocalStorage = (key, value) => localStorage.setItem(key, value)

export const getItemFromLocalStorage = (key, jsonFormat = true) =>
  jsonFormat ? JSON.parse(getItemFromLocalStorage(key, false)) : localStorage.getItem(key)

export const removeItemFromLocalStorage = keys => keys.map(key => localStorage.removeItem(key))
