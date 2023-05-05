import { formatPrice, orderModeOptions, payMethodOptions, urlLineBreak } from '.'

export const sendMessage = (phoneNumber, orderData, mode) => {
  const { firstName, lastName, address, deadline, orderMode, payMethod, products, totalItems, totalPrice } = orderData
  const { label: orderModeLabel } = orderModeOptions.find(mode => mode.value === orderMode)
  const { label: paymentMethodLabel } = payMethodOptions.find(method => method.value === payMethod)
  const date = deadline.split('T')[0].split('-').reverse().join('/')
  const hour = deadline.split('T')[1]

  const messageText = `
👋 *¡Hola! Estoy usando Tique*${urlLineBreak}${urlLineBreak}
🛒 Te envío el detalle de mi pedido:${urlLineBreak}${urlLineBreak}
📆 *Fecha de entrega:* ${date}${urlLineBreak}
⏰ *Hora de entrega:* ${hour}${urlLineBreak}${urlLineBreak}
👤 *Mis datos:*${urlLineBreak}
Nombres: ${firstName}${urlLineBreak}
Apellidos: ${lastName}${address ? urlLineBreak : `${urlLineBreak}${urlLineBreak}`}
${address && `Dirección: ${address}${urlLineBreak}${urlLineBreak}`}
📦 *Modo de pedido:* ${orderModeLabel}${urlLineBreak}${urlLineBreak}
💳 *Método de pago:* ${paymentMethodLabel}${urlLineBreak}${urlLineBreak}
📝 *Mi pedido:*${urlLineBreak}${urlLineBreak}
${products
  .map(product => {
    let productDetail = `✅ (x${product.quantity}) ${product.name} ➡️ ${formatPrice(product.totalPrice)}`
    if (product.comments && product.comments.trim() !== '')
      productDetail = productDetail.concat(urlLineBreak, `▪️ ${product.comments}`, urlLineBreak)
    return productDetail
  })
  .join(urlLineBreak)}${urlLineBreak}${urlLineBreak}
🛍️ *Total de artículos: ${totalItems}*${urlLineBreak}${urlLineBreak}
💰 *Monto total: ${formatPrice(totalPrice)}*${urlLineBreak}${urlLineBreak}
Espero su pronta atención 😉
`
  window.open(`https://${mode}.whatsapp.com/send?phone=${phoneNumber}&text=${messageText}`, '_blank')
}
