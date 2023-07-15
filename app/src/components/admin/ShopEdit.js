import PropTypes from 'prop-types'
import { useCustomToast } from '../../hooks'
import { useGetShopQuery, usePatchShopMutation } from '../../services/shops'
import { getImageTypeUrl, toastBase } from '../../utils'
import CircularSpinner from '../feedback/CircularSpinner'
import ShopForm from './ShopForm'
import ShopHeader from './ShopHeader'

const ShopEdit = ({ id }) => {
  const { data: shop, isLoading } = useGetShopQuery(id)
  const [patchShop, { isLoading: isUpdating }] = usePatchShopMutation()
  const { showToast } = useCustomToast()
  const shopImagesUrl = shop ? ['headboard', 'profile'].map(type => getImageTypeUrl(shop.images, type)) : []

  const onUpdate = async values => {
    try {
      const response = await patchShop({ ...values, id, cellPhone: `+51${values.cellPhone}` })

      if (response.data.id) {
        showToast({
          ...toastBase,
          title: 'Éxito',
          description: 'Datos de tienda actualizados correctamente',
          status: 'success'
        })
      } else {
        showToast({ description: 'No se pudo actualizar datos de tienda', ...toastBase })
      }
    } catch (error) {
      showToast({ description: error.response.data.error, ...toastBase })
    }
  }

  if (isLoading) return <CircularSpinner />

  return (
    <>
      <ShopHeader coverImageUrl={shopImagesUrl[0]} profileImageUrl={shopImagesUrl[1]} />
      <ShopForm
        initialValues={{ ...shop, cellPhone: shop.cellPhone.slice(3) }}
        handleSubmit={onUpdate}
        isLoadingButton={isUpdating}
      />
    </>
  )
}

ShopEdit.propTypes = {
  id: PropTypes.string
}

export default ShopEdit
