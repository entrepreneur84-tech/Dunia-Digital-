export default {
  async fetch(request, env) {

    const url = new URL(request.url);

    // ==========================
    // CHECKOUT
    // ==========================
    if (url.pathname === "/api/checkout" && request.method === "POST") {

      const data = await request.json();
      const orderId = crypto.randomUUID();

      await env.ORDERS.put(orderId, JSON.stringify({
        id: orderId,
        name: data.name,
        email: data.email,
        product: data.product,
        status: "waiting_payment",
        created: Date.now()
      }));

      return Response.json({ success:true, orderId });
    }

    // ==========================
    // UPLOAD BUKTI
    // ==========================
    if (url.pathname === "/api/upload" && request.method === "POST") {

      const form = await request.formData();
      const orderId = form.get("orderId");
      const file = form.get("file");

      if (!orderId || !file) {
        return new Response("Data tidak lengkap", {status:400});
      }

      await env.PROOFS.put(orderId, await file.arrayBuffer());

      const order = await env.ORDERS.get(orderId);
      const parsed = JSON.parse(order);
      parsed.status = "waiting_verification";
      await env.ORDERS.put(orderId, JSON.stringify(parsed));

      return Response.json({ success:true });
    }

    // ==========================
    // SET PAID (ADMIN)
    // ==========================
    if (url.pathname === "/api/set-paid") {

      const id = url.searchParams.get("id");
      const order = await env.ORDERS.get(id);

      if (!order) return new Response("Not found", {status:404});

      const parsed = JSON.parse(order);
      parsed.status = "paid";
      await env.ORDERS.put(id, JSON.stringify(parsed));

      return new Response("Updated");
    }

    // ==========================
    // VIEWER PROTECTION
    // ==========================
    if (url.pathname === "/pages/store/viewer.html") {

      const orderId = url.searchParams.get("order");

      if (!orderId) return new Response("Forbidden", {status:403});

      const order = await env.ORDERS.get(orderId);
      if (!order) return new Response("Not found", {status:404});

      const parsed = JSON.parse(order);

      if (parsed.status !== "paid") {
        return new Response("Belum diverifikasi", {status:403});
      }

      return fetch(request);
    }

    // ==========================
    // LIST ORDERS
    // ==========================
    if (url.pathname === "/api/orders") {
      const list = await env.ORDERS.list();
      return Response.json(list);
    }

    return fetch(request);
  }
}
