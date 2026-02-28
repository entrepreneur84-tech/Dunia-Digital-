export default {
  async fetch(request, env) {

    const url = new URL(request.url)

    // ================= DATABASE MEMORY =================
    if (!globalThis.db) {
      globalThis.db = {
        orders: {},
        users: {},
        resellers: {},
        commissions: {}
      }
    }

    const db = globalThis.db

    // ================== REGISTER ==================
    if (url.pathname === "/api/register" && request.method === "POST") {
      const { email, password } = await request.json()

      db.users[email] = {
        password,
        ebooks: []
      }

      return Response.json({ success: true })
    }

    // ================== LOGIN ==================
    if (url.pathname === "/api/login" && request.method === "POST") {
      const { email, password } = await request.json()

      if (!db.users[email] || db.users[email].password !== password) {
        return new Response("Login gagal", { status: 401 })
      }

      return Response.json({ success: true })
    }

    // ================== BUAT ORDER ==================
    if (url.pathname === "/api/create") {

      const email = url.searchParams.get("email")
      const ref = url.searchParams.get("ref")

      const basePrice = 149000
      const unique = Math.floor(Math.random() * 500)
      const finalPrice = basePrice + unique

      const id = crypto.randomUUID()

      db.orders[id] = {
        email,
        price: finalPrice,
        status: "pending",
        expiredAt: Date.now() + 15 * 60 * 1000
      }

      // KOMISI RESELLER 20%
      if (ref && db.resellers[ref]) {
        if (!db.commissions[ref]) db.commissions[ref] = 0
        db.commissions[ref] += Math.floor(finalPrice * 0.2)
      }

      return Response.json({ orderId: id })
    }

    // ================== CEK ORDER ==================
    if (url.pathname === "/api/order") {
      const id = url.searchParams.get("id")
      return Response.json(db.orders[id])
    }

    // ================== UPLOAD BUKTI ==================
    if (url.pathname === "/api/upload" && request.method === "POST") {

      const form = await request.formData()
      const orderId = form.get("orderId")

      if (!db.orders[orderId]) {
        return new Response("Order tidak ditemukan", { status: 404 })
      }

      if (Date.now() > db.orders[orderId].expiredAt) {
        return new Response("Expired", { status: 400 })
      }

      db.orders[orderId].status = "paid"
      const email = db.orders[orderId].email

      // Tambah akses ebook
      if (db.users[email]) {
        db.users[email].ebooks.push(orderId)
      }

      // TOKEN AKSES
      const token = crypto.randomUUID()
      db.orders[orderId].token = token

      // ================= EMAIL RESEND =================
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + env.RESEND_API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: "store@resend.dev",
          to: email,
          subject: "Ebook Anda Siap Diakses",
          html: `
            <h2>Pembayaran Berhasil</h2>
            <p>Klik link di bawah untuk akses ebook:</p>
            <a href="${url.origin}/viewer?order=${orderId}&token=${token}">
              Akses Ebook
            </a>
          `
        })
      })

      return Response.json({ success: true })
    }

    // ================== VIEWER ==================
    if (url.pathname === "/viewer") {

      const orderId = url.searchParams.get("order")
      const token = url.searchParams.get("token")

      if (!db.orders[orderId] ||
          db.orders[orderId].token !== token ||
          db.orders[orderId].status !== "paid") {

        return new Response("Akses ditolak", { status: 403 })
      }

      return new Response(`
        <h1>SELAMAT DATANG DI EBOOK PREMIUM</h1>
        <p>Konten ebook tampil di sini.</p>
      `, { headers: { "Content-Type": "text/html" } })
    }

    // ================== DAFTAR RESELLER ==================
    if (url.pathname === "/api/reseller" && request.method === "POST") {

      const { email } = await request.json()

      const code = Math.random().toString(36).substring(2,8)

      db.resellers[code] = email

      return Response.json({
        code,
        link: url.origin + "/?ref=" + code
      })
    }

    // ================== DASHBOARD ADMIN ==================
    if (url.pathname === "/api/admin") {

      let total = 0
      let paid = 0

      for (let id in db.orders) {
        if (db.orders[id].status === "paid") {
          total += db.orders[id].price
          paid++
        }
      }

      return Response.json({
        totalOmzet: total,
        totalOrderPaid: paid,
        totalUser: Object.keys(db.users).length
      })
    }

    return new Response("DIGITAL EMPIRE MAX ACTIVE 🚀")
  }
}
