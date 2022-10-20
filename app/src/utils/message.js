import { orderModeOptions, paymentMethodOptions, urlLineBreak } from '.'

export const sendMessage = (phoneNumber, orderData) => {
  const { firstName, lastName, address, datetime, orderMode, paymentMethod, products } = orderData
  const totalPrice = products.reduce((acc, product) => acc + product.totalPrice, 0)
  const { label: orderModeLabel } = orderModeOptions.find(mode => mode.value === orderMode)
  const { label: paymentMethodLabel } = paymentMethodOptions.find(method => method.value === paymentMethod)
  const date = datetime.split('T')[0].split('-').reverse().join('/')
  const hour = datetime.split('T')[1]

  const messageText = `
👋 *¡Hola! Estoy usando Tique App*${urlLineBreak}${urlLineBreak}
_Te envío el detalle de mi pedido:_${urlLineBreak}${urlLineBreak}
📆 *Fecha:* ${date}${urlLineBreak}
⏰ *Hora:* ${hour}${urlLineBreak}${urlLineBreak}
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
