import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import ActionButtons from '../../components/admin/ActionButtons'
import CustomTable from '../../components/admin/CustomTable'
import StatusTag from '../../components/admin/StatusTag'
import CircularSpinner from '../../components/feedback/CircularSpinner'
import { useResource } from '../../hooks'
import { request } from '../../services'
import { setToastContent, showToast } from '../../utils'
import { productColumns } from '../../utils/tables'

const PrductTable = () => {
  const [products, setProducts] = useState([])
  const resources = useResource('/products')
  const alertDialogRef = useRef()
  const navigate = useNavigate()
  const columns = productColumns()
  const toast = useToast()

  const handleDeleteProduct = async id => {
    try {
      const response = await request(`/products/${id}`, 'DELETE')

      if (response.id) {
        const resourcesFiltered = resources.filter(item => item.id !== response.id)
        setProductsForTable(resourcesFiltered)

        showToast(
          toast,
          setToastContent('Éxito', `Producto ${response.name} eliminado correctamente`, 'success', 'subtle', 'top')
        )
      } else {
        showToast(toast, setToastContent('Error', 'No se pudo eliminar producto', 'error', 'subtle', 'top'))
      }
    } catch (error) {
      showToast(toast, setToastContent('Error', error.response.data.error, 'error', 'subtle', 'top'))
    }
    alertDialogRef.current.closeAlert()
  }

  const setProductsForTable = resources => {
    const productData = resources.map(data => {
      return {
        ...data,
        price: `S/ ${data.price.toFixed(2)}`,
        discount: `${(data.discount * 100).toFixed(2)} %`,
        category: data.category.description,
        status: <StatusTag active={data.active} />,
        actions: (
          <ActionButtons
            alertTitle="Eliminar Producto"
            alertContent={`¿Está seguro de eliminar ${data.name}?`}
            handleEditButton={() => navigate(`/admin/productos/editar/${data.id}`)}
            handleDeleteButton={() => handleDeleteProduct(data.id)}
            alertRef={alertDialogRef}
          />
        )
      }
    })
    setProducts(productData)
  }

  useEffect(() => {
    setProductsForTable(resources)
  }, [resources])

  if (!products.length) return <CircularSpinner />

  return (
    <CustomTable
      title="Productos"
      columns={columns}
      data={products}
      handleAddButton={() => navigate('/admin/productos/agregar')}
    />
  )
}

export default PrductTable
