import { orderModeOptions, payMethodOptions, urlLineBreak } from '.'

export const sendMessage = (phoneNumber, orderData) => {
  const { firstName, lastName, address, deadline, orderMode, payMethod, products, totalPrice } = orderData
  const { label: orderModeLabel } = orderModeOptions.find(mode => mode.value === orderMode)
  const { label: paymentMethodLabel } = payMethodOptions.find(method => method.value === payMethod)
  const date = deadline.split('T')[0].split('-').reverse().join('/')
  const hour = deadline.split('T')[1]

  const messageText = `
👋 *¡Hola! Estoy usando Tique*${urlLineBreak}${urlLineBreak}
_Te envío el detalle de mi pedido:_${urlLineBreak}${urlLineBreak}
📆 *Fecha de entrega:* ${date}${urlLineBreak}
⏰ *Hora de entrega:* ${hour}${urlLineBreak}${urlLineBreak}
👤 *Mis datos:*${urlLineBreak}
Nombres: ${firstName}${urlLineBreak}
Apellidos: ${lastName}${urlLineBreak}
Dirección: ${address}${urlLineBreak}${urlLineBreak}
📦 *Modo de pedido:* ${orderModeLabel}${urlLineBreak}${urlLineBreak}
💳 *Método de pago:* ${paymentMethodLabel}${urlLineBreak}${urlLineBreak}
📝 *Mi pedido:*${urlLineBreak}${urlLineBreak}
${products
  .map(product => {
    let productDetail = `✅ (x${product.quantity}) ${product.name} ➡️ S/ ${product.totalPrice.toFixed(2)}`
    if (product.comments !== '')
      productDetail = productDetail.concat(urlLineBreak, `▪️ ${product.comments}`, urlLineBreak)
    return productDetail
  })
  .join(urlLineBreak)}${urlLineBreak}${urlLineBreak}
💰 *Monto total: S/ ${totalPrice.toFixed(2)}*${urlLineBreak}${urlLineBreak}
_Espero su pronta atención_ 🙂
`
  window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${messageText}`, '_blank')
}
