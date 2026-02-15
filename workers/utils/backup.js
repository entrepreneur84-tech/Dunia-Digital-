import { google } from "googleapis"

export async function backupToDrive(auth, folderId, filename, data){
  const drive = google.drive({version:"v3", auth})
  const fileMetadata = {name:filename, parents:[folderId]}
  const media = { mimeType:"application/json", body:JSON.stringify(data) }
  await drive.files.create({resource:fileMetadata, media, fields:"id"})
}
export function exportCSV(data){
  if(!data || !data.length) return ""
  const keys = Object.keys(data[0])
  const csv = [keys.join(",")]
  data.forEach(row=>{
    csv.push(keys.map(k=>row[k]).join(","))
  })
  return csv.join("\n")
}
