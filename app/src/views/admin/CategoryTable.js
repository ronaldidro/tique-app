import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ActionButtons from '../../components/admin/ActionButtons'
import CustomTable from '../../components/admin/CustomTable'
import StatusTag from '../../components/admin/StatusTag'
import CircularSpinner from '../../components/feedback/CircularSpinner'
import { useCustomToast, useResource } from '../../hooks'
import { request } from '../../services'
import { toastBase } from '../../utils'
import { categoryColumns } from '../../utils/tables'

const CategoryTable = () => {
  const [categories, setCategories] = useState([])
  const resources = useResource('/categories')
  const alertDialogRef = useRef()
  const navigate = useNavigate()
  const columns = categoryColumns()
  const { showToast } = useCustomToast()

  const handleDeleteCategory = async id => {
    try {
      const response = await request(`/categories/${id}`, 'DELETE')

      if (response.id) {
        const resourcesFiltered = resources.filter(item => item.id !== response.id)

        setCategoriesForTable(resourcesFiltered)

        showToast({
          ...toastBase,
          title: 'Éxito',
          description: `Categoría ${response.description} eliminada correctamente`,
          status: 'success'
        })
      } else {
        showToast({ description: 'No se pudo eliminar categoría', ...toastBase })
      }
    } catch (error) {
      showToast({ description: error.response.data.error, ...toastBase })
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
