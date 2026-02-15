// Simpan data reseller & komisi
export async function saveReseller(env,reseller){
  const key = "reseller:"+reseller.email
  await env.RESELLERS.put(key, JSON.stringify(reseller))
}

export async function getReseller(env,email){
  const data = await env.RESELLERS.get("reseller:"+email)
  return data ? JSON.parse(data) : null
}

export async function listResellers(env){
  const list = await env.RESELLERS.list()
  return list.keys
    }
