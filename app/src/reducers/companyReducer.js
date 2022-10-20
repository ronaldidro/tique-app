const companyReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_COMPANY':
      return action.data

    default:
      return state
  }
}

export const initializeCompany = company => {
  return {
    type: 'INIT_COMPANY',
    data: company
  }
}

export default companyReducer
