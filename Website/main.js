let search = document.querySelector('.search-box');

document.querySelector('#search-icon').onclick = ()=>{
    search.classList.toggle('active');
    cart.classList.remove('active');
    user.classList.remove('active');
    navbar.classList.remove('active');

}


let cart = document.querySelector('.cart');

document.querySelector('#cart-icon').onclick = ()=>{
    cart.classList.toggle('active');
    search.classList.remove('active');
    user.classList.remove('active');
    navbar.classList.remove('active');

}

document.querySelectorAll('.cart-item').forEach(item => {    
    item.onclick=()=>{
    cart.classList.toggle('active');
    }
});

let user = document.querySelector('.user');

document.querySelector('#user-icon').onclick = ()=>{
    user.classList.toggle('active');
    cart.classList.remove('active');
    search.classList.remove('active');
    navbar.classList.remove('active');
}



let shopNow = document.querySelector('#products');
document.querySelector('.shop-now').addEventListener('click',()=>shopNow.scrollIntoView()) 


let navbar = document.querySelector('.navbar');

document.querySelector('#menu-icon').onclick = ()=>{
    navbar.classList.toggle('active');
    user.classList.remove('active');
    cart.classList.remove('active');
    search.classList.remove('active');
}

window.onscroll = () =>{
    navbar.classList.remove('active');
    user.classList.remove('active');
    cart.classList.remove('active');
    search.classList.remove('active');
}

// Navbar Scroll
let header = document.querySelector('header');
window.addEventListener('scroll',()=>{
    header.classList.toggle('shadow', window.scrollY > 0)
})


//Swiper
var swiper = new Swiper(".new-arrival", {
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    centeredSlides:true,
    breakpoints: {
    0:{
        slidesPerView :1,
    },
    568:{
        slidesPerView :2,
    },
    768:{
        slidesPerView :2,
    },
    1020:{
        slidesPerView :3,
    },
    },
  });


