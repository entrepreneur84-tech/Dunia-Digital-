// Simpan semua transaksi
export async function saveOrder(env, order){
  const key = "order:" + order.invoiceNo
  await env.ORDERS.put(key, JSON.stringify(order))
}

export async function getOrder(env, invoiceNo){
  const data = await env.ORDERS.get("order:" + invoiceNo)
  return data ? JSON.parse(data) : null
}

export async function listOrders(env){
  const list = await env.ORDERS.list()
  return list.keys
}
