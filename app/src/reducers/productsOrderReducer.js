const productsOrderReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_PRODUCT':
      return [...state, action.data]

    case 'MODIFY_PRODUCT':
      return state.map(product => (product.orderProductId !== action.data.orderProductId ? product : action.data))

    case 'REMOVE_PRODUCT':
      return state.filter(product => product.orderProductId !== action.data.orderProductId)

    case 'REMOVE_ALL_PRODUCTS':
      return []

    default:
      return state
  }
}

export const addProduct = productData => {
  return {
    type: 'NEW_PRODUCT',
    data: productData
  }
}

export const updateProduct = productData => {
  return {
    type: 'MODIFY_PRODUCT',
    data: productData
  }
}

export const deleteProduct = productData => {
  return {
    type: 'REMOVE_PRODUCT',
    data: productData
  }
}

export const deleteAllProducts = () => {
  return {
    type: 'REMOVE_ALL_PRODUCTS'
  }
}

export default productsOrderReducer
