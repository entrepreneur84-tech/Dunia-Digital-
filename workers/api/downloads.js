import { saveDownload, listDownloads } from "../kv/downloads.js"
import { json } from "../utils/response.js"

export async function recordDownload(request, env){
  const {licenseKey,fileName} = await request.json()
  if(!licenseKey || !fileName) return json({ok:false,error:"Data tidak lengkap"},400)

  await saveDownload(env,licenseKey,fileName)
  return json({ok:true})
}

export async function getDownloads(request, env){
  const data = await listDownloads(env)
  return json({ok:true,data})
    }
