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
import { categoryColumns } from '../../utils/tables'

const CategoryTable = () => {
  const [categories, setCategories] = useState([])
  const resources = useResource('/product-categories')
  const alertDialogRef = useRef()
  const navigate = useNavigate()
  const columns = categoryColumns()
  const toast = useToast()

  const handleDeleteCategory = async id => {
    try {
      const response = await request(`/product-categories/${id}`, 'DELETE')

      if (response.id) {
        const resourcesFiltered = resources.filter(item => item.id !== response.id)
        setCategoriesForTable(resourcesFiltered)

        showToast(
          toast,
          setToastContent(
            'Éxito',
            `Categoría ${response.description} eliminada correctamente`,
            'success',
            'subtle',
            'top'
          )
        )
      } else {
        showToast(toast, setToastContent('Error', 'No se pudo eliminar categoría', 'error', 'subtle', 'top'))
      }
    } catch (error) {
      showToast(toast, setToastContent('Error', error.response.data.error, 'error', 'subtle', 'top'))
    }
    alertDialogRef.current.closeAlert()
  }

  const setCategoriesForTable = resources => {
    const categoryData = resources.map(data => {
      return {
        ...data,
        productsNumber: data.products.length,
        status: <StatusTag active={data.active} />,
        actions: (
          <ActionButtons
            alertTitle="Eliminar Categoría"
            alertContent={`¿Está seguro de eliminar ${data.description}?`}
            handleEditButton={() => navigate(`/admin/categorias/editar/${data.id}`)}
            handleDeleteButton={() => handleDeleteCategory(data.id)}
            alertRef={alertDialogRef}
          />
        )
      }
    })
    setCategories(categoryData)
  }

  useEffect(() => {
    setCategoriesForTable(resources)
  }, [resources])

  if (!categories.length) return <CircularSpinner />

  return (
    <CustomTable
      title="Categorías"
      columns={columns}
      data={categories}
      handleAddButton={() => navigate('/admin/categorias/agregar')}
    />
  )
}

export default CategoryTable
