export function exportCSV(data){
  if(!data || !data.length) return ""
  const keys = Object.keys(data[0])
  const csv = [keys.join(",")]
  data.forEach(row=>{
    csv.push(keys.map(k=>row[k]).join(","))
  })
  return csv.join("\n")
}
