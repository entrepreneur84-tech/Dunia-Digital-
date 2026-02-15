import { saveOrder, listOrders } from "../kv/orders.js"
import { json } from "../utils/response.js"

export async function createOrder(request, env){
  const body = await request.json()
  if(!body.invoiceNo || !body.email) return json({ok:false,error:"Data tidak lengkap"},400)

  await saveOrder(env,body)
  return json({ok:true,message:"Order tersimpan"})
}

export async function getOrders(request, env){
  const data = await listOrders(env)
  return json({ok:true,data})
    }
