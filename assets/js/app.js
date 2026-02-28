/* ======================================
   DUNIA DIGITAL SHOP - APP.JS FINAL
   Fungsi:
   - Handle tombol beli ebook
   - Simpan data ebook ke localStorage
   - Redirect ke halaman checkout
====================================== */

// ==============================
// DATA PRODUK EBOOK (23 EBOOK)
// ==============================
const ebooks = {
  "the-art-of-surrender": {
    title: "The Art of Surrender",
    price: 99000,
    img: "/assets/img/the-art-of-surrender.png"
  },
  "quantum-syukur": {
    title: "Quantum Syukur",
    price: 99000,
    img: "/assets/img/quantum-syukur.png"
  },
  "membongkar-realitas-hologram": {
    title: "Membongkar Realitas Hologram",
    price: 99000,
    img: "/assets/img/membongkar-realitas-hologram.png"
  },
  "healing-dzikir-of-powerful": {
    title: "Healing Dzikir of Powerful",
    price: 99000,
    img: "/assets/img/healing-dzikir-of-powerful.png"
  },
  "hakikat-quantum-ihsan": {
    title: "Hakikat Quantum Ihsan",
    price: 99000,
    img: "/assets/img/hakikat-quantum-ihsan.png"
  },
  "rahasia-mengenal-jatidiri": {
    title: "Rahasia Mengenal Jati Diri",
    price: 99000,
    img: "/assets/img/rahasia-mengenal-jatidiri.png"
  },
  "ksatria-spiritual": {
    title: "Ksatria Spiritual",
    price: 99000,
    img: "/assets/img/ksatria-spiritual.png"
  },
  "law-of-spiritual-attraction": {
    title: "Law of Spiritual Attraction",
    price: 99000,
    img: "/assets/img/law-of-spiritual-attraction.png"
  },
  "manunggal": {
    title: "Manunggal",
    price: 99000,
    img: "/assets/img/manunggal.png"
  },
  "menguak-potensi-diri": {
    title: "Menguak Potensi Diri Tanpa Batas",
    price: 99000,
    img: "/assets/img/menguak-potensi-diri.png"
  },
  "navigasi-hidup": {
    title: "Navigasi Hidup",
    price: 99000,
    img: "/assets/img/navigasi-hidup.png"
  },
  "tauhid-quantum": {
    title: "Tauhid Quantum",
    price: 99000,
    img: "/assets/img/tauhid-quantum.png"
  },
  "energi-qolbu": {
    title: "Energi Qolbu",
    price: 99000,
    img: "/assets/img/energi-qolbu.png"
  },
  "magnet-quantum": {
    title: "Magnet Quantum & Energetik",
    price: 99000,
    img: "/assets/img/magnet-quantum.png"
  },
  "kesadaran-ilahiah": {
    title: "Kesadaran Ilahiah",
    price: 99000,
    img: "/assets/img/kesadaran-ilahiah.png"
  },
  "jalan-makrifat": {
    title: "Jalan Makrifat Modern",
    price: 99000,
    img: "/assets/img/jalan-makrifat.png"
  },
  "rahasia-energi-dzikir": {
    title: "Rahasia Energi Dzikir",
    price: 99000,
    img: "/assets/img/rahasia-energi-dzikir.png"
  },
  "spiritual-reprogramming": {
    title: "Spiritual Reprogramming Mind",
    price: 99000,
    img: "/assets/img/spiritual-reprogramming.png"
  },
  "self-healing-qolbu": {
    title: "Self Healing Qolbu",
    price: 99000,
    img: "/assets/img/self-healing-qolbu.png"
  },
  "revolusi-kesadaran": {
    title: "Revolusi Kesadaran Diri",
    price: 99000,
    img: "/assets/img/revolusi-kesadaran.png"
  },
  "ilmu-rasa": {
    title: "Ilmu Rasa & Kesadaran",
    price: 99000,
    img: "/assets/img/ilmu-rasa.png"
  },
  "aktivasi-qolbu": {
    title: "Aktivasi Pusat Qolbu",
    price: 99000,
    img: "/assets/img/aktivasi-qolbu.png"
  },
  "rahasia-hidup-sadar": {
    title: "Rahasia Hidup Sadar",
    price: 99000,
    img: "/assets/img/rahasia-hidup-sadar.png"
  }
};

// ==============================
// FORMAT RUPIAH
// ==============================
function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

// ==============================
// HANDLE BUTTON BELI
// ==============================
function beliEbook(slug) {
  const ebook = ebooks[slug];
  if (!ebook) {
    alert("Produk tidak ditemukan!");
    return;
  }

  // Simpan ke localStorage
  localStorage.setItem("checkout_ebook", JSON.stringify({
    slug: slug,
    title: ebook.title,
    price: ebook.price,
    img: ebook.img
  }));

  // Redirect ke checkout
  window.location.href = "/pages/store/checkout.html";
}

// ==============================
// AUTO FORMAT HARGA (OPSIONAL)
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-price]").forEach(el => {
    const harga = parseInt(el.dataset.price);
    el.textContent = formatRupiah(harga);
  });
});
