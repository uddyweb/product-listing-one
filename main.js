const icon = document.querySelector('.icon');
const body = document.querySelector('body');
const closeIcon = document.querySelector('.close');
const listCartHtml = document.querySelector('.listCart')
const iconCart = document.querySelector('.quant');
const checkOut = document.querySelector('.checkout');
const totalAmount = document.querySelector('.totalAmount');
icon.addEventListener('click', () =>{
    body.classList.add('showCart');
});
closeIcon.addEventListener('click', () =>{
    body.classList.remove('showCart');
})
let listProductHTML = document.querySelector('.listProduct');
let listProducts = [];
const addDataToHtml = () =>{
    listProductHTML.innerHTML = "";
    if(listProducts.length > 0){
        listProducts.forEach(product =>{
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
             <img src="${product.image}" alt="">
                <p>${product.category}</p>
                <p class="para">${product.name}</p>
                <b>$${product.price}</b>
                <button class="btn">Add to cart</button>
            `;
            listProductHTML.appendChild(newProduct);
        })
    }
}
const initApp = () =>{
  fetch("./data.json")
  .then(res => res.json())
  .then(data => {
    listProducts = data;
    addDataToHtml();

    if(localStorage.getItem('cart')){
        carts = JSON.parse(localStorage.getItem('cart'));
        addCartToHtml();
    }
  })
}
initApp();

let carts = [];

listProductHTML.addEventListener('click', (event) =>{
    let positionOnClick = event.target;
    if(positionOnClick.classList.contains('btn')){
        let product_id = positionOnClick.parentElement.dataset.id;
        addToCart(product_id);
    }
})
const addToCart = (product_id) =>{
    let positionThisProduct = carts.findIndex((value) => value.product_id == product_id);
   if(carts.length <= 0){
    carts = [{
        product_id: product_id,
        quanity: 1
    }]
   }else if(positionThisProduct  < 0){
     carts.push({
        product_id: product_id,
        quanity: 1,
     })
   }else{
    carts[positionThisProduct].quanity = carts[positionThisProduct].quanity + 1;
   }
   addCartToHtml();
   addCartToMemory();
}
const addCartToMemory = () =>{
    localStorage.setItem('cart',JSON.stringify(carts))
}
const addCartToHtml = () =>{
    listCartHtml.innerHTML = "";
    if(carts.length > 0){
        carts.forEach(cart =>{
            totalQuantity = totalQuantity + 1;
            let newCart = document.createElement('div');
            newCart.dataset.id = cart.product_id
            let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
            let info = listProducts[positionProduct];
            newCart.classList.add('item');
            newCart.innerHTML = `
            <div class="image">
                <img src="${info.image}">
            </div>
            <div class="name">
                ${info.name}
            </div>
            <div class="totalPrice">
              $${cart.quanity * info.price}
            </div>
            <div class="quantity">
                <span class="minus">-</span>
                <span class="number">${cart.quanity}</span>
                <span class="add">+</span>
            </div>
            `;
            listCartHtml.appendChild(newCart);
        })
    }
    iconCart.innerText = totalQuantity;
}
let totalQuantity = 0;
listCartHtml.addEventListener('click', (event) =>{
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('add')){
     let product_id = positionClick.parentElement.parentElement.dataset.id
     let type = 'minus';
     if(positionClick.classList.contains('add')){
        type = 'add';
     }
     changeQuantity(product_id, type)
    }
})
const changeQuantity = (product_id, type) =>{
    let positionItemCart = carts.findIndex((value) => value.product_id == product_id)
    if(positionItemCart >= 0){
        switch (type){
            case 'add':
            carts[positionItemCart].quanity = carts[positionItemCart].quanity + 1;
            break;

            default:
                let valueChange = carts[positionItemCart].quanity - 1;
                if(valueChange > 0){
                    carts[positionItemCart].quanity = valueChange
                }else{
                    carts.splice(positionItemCart, 1);
                }
                 break;
        }
    }
    addCartToMemory();
    addCartToHtml();
}
let total = 0
checkOut.addEventListener('click', () =>{
 totalAmount.textContent= 'Thank for your time!';    
})