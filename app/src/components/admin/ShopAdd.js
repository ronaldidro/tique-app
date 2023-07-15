import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useCustomToast } from '../../hooks'
import { setUser } from '../../reducers/userReducer'
import { usePostShopMutation } from '../../services/shops'
import { toastBase } from '../../utils'
import ShopForm from './ShopForm'
import ShopHeader from './ShopHeader'

const ShopAdd = ({ user }) => {
  const [postShop, { isLoading: isAdding }] = usePostShopMutation()
  const { showToast } = useCustomToast()
  const dispatch = useDispatch()

  const onCreate = async values => {
    try {
      const response = await postShop({ ...values, cellPhone: `+51${values.cellPhone}` })

      if (response.data.id) {
        dispatch(setUser({ ...user, shop: response.data.id }))

        showToast({
          ...toastBase,
          title: 'Éxito',
          description: 'Datos de tienda registrados correctamente',
          status: 'success'
        })
      } else {
        showToast({ description: 'No se pudo registrar datos de tienda', ...toastBase })
      }
    } catch (error) {
      showToast({ description: error.response.data.error, ...toastBase })
    }
  }

  return (
    <>
      <ShopHeader />
      <ShopForm
        initialValues={{
          name: '',
          description: '',
          address: '',
          placeService: '',
          cellPhone: '',
          attentionSchedule: [{ day: '', schedule: '' }],
          socialNetworks: [{ type: 'ig', url: '' }],
          images: [
            { type: 'initial', url: '' },
            { type: 'headboard', url: '' },
            { type: 'profile', url: '' }
          ]
        }}
        handleSubmit={onCreate}
        isLoadingButton={isAdding}
      />
    </>
  )
}

ShopAdd.propTypes = {
  user: PropTypes.object
}

export default ShopAdd
