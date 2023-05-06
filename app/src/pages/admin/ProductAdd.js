import { useNavigate } from 'react-router-dom'
import ProductForm from '../../components/admin/ProductForm'
import CircularSpinner from '../../components/feedback/CircularSpinner'
import { useCustomToast } from '../../hooks'
import { useGetCategoriesQuery } from '../../services/categories'
import { usePostProductMutation } from '../../services/products'
import { formatToSelectOptions, toastBase } from '../../utils'

const initialValues = {
  name: '',
  description: '',
  price: 0.0,
  discount: 0.0,
  images: [],
  active: true
}

const ProductAdd = () => {
  const navigate = useNavigate()
  const { showToast } = useCustomToast()
  const { data, isLoading } = useGetCategoriesQuery()
  const [postProduct, { isLoading: isAdding }] = usePostProductMutation()
  const categories = data ? formatToSelectOptions(data) : []

  const goToProducts = () => navigate('/admin/productos')

  const handleAddProduct = async values => {
    try {
      const response = await postProduct({ ...values, discount: values.discount / 100 })

      if (response.data.id) {
        goToProducts()
        showToast({
          ...toastBase,
          title: 'Éxito',
          description: `Producto ${response.data.name} creado correctamente`,
          status: 'success'
        })
      } else {
        showToast({ description: 'No se pudo crear producto', ...toastBase })
      }
    } catch (error) {
      showToast({ description: error.response.data.error, ...toastBase })
    }
  }

  if (isLoading) return <CircularSpinner />

  return (
    <ProductForm
      title="Agregar producto"
      initialValues={{ ...initialValues, category: categories[0].value }}
      loadingStatus={isAdding}
      categoriesList={categories}
      handleSubmit={handleAddProduct}
      handleCancel={goToProducts}
    />
  )
}

export default ProductAdd
