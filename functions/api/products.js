export async function onRequest() {
  const products = [
    { id: "ebook1", title: "Kesadaran Diri Spiritual", price: 100000 },
    { id: "ebook2", title: "Makna Hidup & Kesadaran Jiwa", price: 200000 },
    { id: "bundle", title: "Bundle Spiritual Premium + Sistem", price: 250000 }
  ];

  return new Response(JSON.stringify(products), {
    headers: { "Content-Type": "application/json" }
  });
}
