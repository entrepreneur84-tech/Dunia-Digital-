// assets/js/app.js
document.addEventListener("DOMContentLoaded", function() {

  // Data semua ebook
  const ebooks = [
    { title: "Ksatria Spiritual", img: "assets/img/ksatria-spiritual.png", price: 150000 },
    { title: "Rahasia Membongkar Potensi Diri", img: "assets/img/rahasia-membongkar-potensi-diri.png", price: 150000 },
    { title: "Quantum Dzikir", img: "assets/img/quantum-dzikir.png", price: 150000 },
    { title: "Quantum Cahaya", img: "assets/img/quantum-cahaya.png", price: 150000 },
    { title: "Quantum Syukur", img: "assets/img/quantum-syukur.png", price: 150000 },
    { title: "Hakikat Quantum Ihsan", img: "assets/img/hakikat-quantum-ihsan.png", price: 150000 },
    { title: "The Art of Surrender", img: "assets/img/the-art-of-surrender.png", price: 150000 },
    { title: "Law of Spiritual Attraction", img: "assets/img/law-of-spiritual-attraction.png", price: 150000 },
    { title: "The Radiance Within", img: "assets/img/the-radiance-within.png", price: 150000 },
    { title: "Healing Dzikir of Powerful", img: "assets/img/healing-dzikir-of-powerful.png", price: 150000 },
    { title: "Jatidiri", img: "assets/img/jatidiri.png", price: 150000 },
    { title: "The Dzikir of Powerfull", img: "assets/img/the-dzikir-of-powerfull.png", price: 150000 },
    { title: "Membongkar Realitas Hologram", img: "assets/img/membongkar-realitas-hologram.png", price: 150000 },
    { title: "The Untouchable", img: "assets/img/the-untouchable.png", price: 150000 },
    { title: "Quantum Ruh", img: "assets/img/quantum-ruh.png", price: 150000 },
    { title: "Zero Points Dzikir", img: "assets/img/zero-points-dzikir.png", price: 150000 },
    { title: "Pasrah Adalah Dzikir", img: "assets/img/pasrah-adalah-dzikir.png", price: 150000 },
    { title: "Manunggal", img: "assets/img/manunggal.png", price: 150000 },
    { title: "Navigasi Cahaya", img: "assets/img/navigasi-cahaya.png", price: 150000 },
    { title: "Rahasia Menemukan Kode Sumber Realitas", img: "assets/img/rahasia-menemukan-kode-sumber-realitas.png", price: 150000 },
    { title: "Menguak Potensi Diri Tanpa Batas", img: "assets/img/menguak-potensi-diri-tanpa-batas.png", price: 150000 },
    { title: "Cara Jitu Berdamai Dengan Diri", img: "assets/img/cara-jitu-berdamai-dengan-diri.png", price: 150000 },
    { title: "Tauhid Quantum", img: "assets/img/tauhid-quantum.png", price: 150000 }
  ];

  // Tombol Beli
  const buyButtons = document.querySelectorAll(".btn");
  buyButtons.forEach(button => {
    button.addEventListener("click", function(e) {
      e.preventDefault();
      const productTitle = this.closest(".card").querySelector(".title").textContent;
      const product = ebooks.find(e => e.title === productTitle);

      if(product) {
        // Simpan produk ke localStorage
        localStorage.setItem("selectedProduct", JSON.stringify(product));

        // Redirect ke checkout
        window.location.href = this.getAttribute("href");
      }
    });
  });

  // Search / Filter
  const searchInput = document.getElementById("searchEbook");
  if(searchInput) {
    searchInput.addEventListener("input", function() {
      const query = this.value.toLowerCase();
      const cards = document.querySelectorAll(".card");
      cards.forEach(card => {
        const title = card.querySelector(".title").textContent.toLowerCase();
        card.style.display = title.includes(query) ? "block" : "none";
      });
    });
  }

  // Checkout page
  const checkoutContainer = document.getElementById("checkoutProductContainer");
  if(checkoutContainer) {
    const selected = JSON.parse(localStorage.getItem("selectedProduct"));
    if(selected) {
      checkoutContainer.innerHTML = `
        <img src="${selected.img}" alt="${selected.title}" style="width:150px;margin-bottom:10px;">
        <h2>${selected.title}</h2>
        <p>Harga: Rp ${selected.price.toLocaleString()}</p>
      `;
    }
  }

});
