let productImg = document.getElementById("product-img");
let productName = document.getElementById("name");
let productCategory = document.getElementById("brand");
let productPrice = document.getElementById("price");
let productPar = document.getElementById("par");
const id = new URLSearchParams(window.location.search).get("id");
fetch(`https://json-server-brown-five.vercel.app/products?id=${id}`)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    productImg.src = data[0].img;
    productName.innerHTML = data[0].name;
    productCategory.innerHTML = data[0].category;
    productPrice.innerHTML = `$${data[0].price}`;
    productPar.innerHTML = data[0].description;
  });

function scrollToTop() {
  document.documentElement.scrollTop = 0;
}

window.onscroll = function () {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("scrollToTopBtn").style.display = "block";
  } else {
    document.getElementById("scrollToTopBtn").style.display = "none";
  }
};

/** ----------- Navbar ----------- */
const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const close = document.getElementById("close");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}

if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}
