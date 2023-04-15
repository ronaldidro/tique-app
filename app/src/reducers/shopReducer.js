const shopReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_SHOP':
      return action.data

    default:
      return state
  }
}

export const initializeShop = shop => {
  return {
    type: 'INIT_SHOP',
    data: shop
  }
}

export default shopReducer
