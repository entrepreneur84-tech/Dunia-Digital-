const languages = {
  "id": {
    welcome:"Selamat datang",
    checkout:"Checkout Membership"
  },
  "en": {
    welcome:"Welcome",
    checkout:"Membership Checkout"
  }
}

function setLanguage(lang){
  document.querySelectorAll("[data-text]").forEach(el=>{
    const key = el.getAttribute("data-text")
    if(languages[lang][key]) el.innerText = languages[lang][key]
  })
}
