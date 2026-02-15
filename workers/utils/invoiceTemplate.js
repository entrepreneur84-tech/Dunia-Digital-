export function invoiceTemplate({email,plan,invoiceNo}){
  return `
    <h3>Invoice ${invoiceNo}</h3>
    <p>Email: ${email}</p>
    <p>Paket: ${plan}</p>
    <p>Silakan bayar via Bank atau Bitcoin/Ethereum. Konfirmasi WA/Email untuk aktivasi license.</p>
  `
}
