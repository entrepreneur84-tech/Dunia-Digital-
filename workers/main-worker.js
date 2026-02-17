export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // ROUTER API
    if (url.pathname === "/api/validate") {
      return handleValidate(url, env);
    }

    if (url.pathname === "/api/activate") {
      return handleActivate(request, env);
    }

    return new Response("API Dunia Digital Aktif 🚀", {
      status: 200,
      headers: { "Content-Type": "text/plain" }
    });
  }
};

// =============================
// VALIDATE LICENSE
// =============================
async function handleValidate(url, env) {
  const key = url.searchParams.get("key");

  if (!key) {
    return json({ valid: false, message: "License key kosong" });
  }

  // MODE DEMO (nanti diganti KV)
  const VALID_KEYS = ["DD-ACCESS-2026", "DD-PREMIUM-2026"];

  if (VALID_KEYS.includes(key)) {
    return json({
      valid: true,
      pdfUrl: "/protected/ebook.pdf" // nanti dari R2
    });
  }

  return json({
    valid: false,
    message: "License tidak valid"
  });
}

// =============================
// ACTIVATE LICENSE (ADMIN)
// =============================
async function handleActivate(request, env) {
  if (request.method !== "POST") {
    return json({ success: false, message: "Method harus POST" }, 405);
  }

  const body = await request.json();
  const { email, product } = body;

  if (!email || !product) {
    return json({ success: false, message: "Data tidak lengkap" });
  }

  // Generate license key sederhana
  const licenseKey = "DD-" + Math.random().toString(36).substring(2, 10).toUpperCase();

  // Nanti: simpan ke KV
  // await env.LICENSES.put(licenseKey, JSON.stringify({ email, product }));

  return json({
    success: true,
    license: licenseKey,
    message: "License berhasil diaktifkan"
  });
}

// =============================
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
