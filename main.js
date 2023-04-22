//URL del los productos
const httpUrl='https://ecommercebackend.fundamentos-29.repl.co/';

//variables para cargar los div del carrito
const cartToggle = document.querySelector('.cart-toggle');
const cartMenu = document.querySelector('.cart-menu');
const menuTitle = document.querySelector('.menu_title');
const cart_Color = document.querySelector('nav button i');

//variables para obtener los selectores
const cls_products = document.querySelector("#cls_producs");
const producs_filter = document.querySelector("#dv-producs_filter");
const carDelete = document.querySelector("#cart");
const carDeleteAll = document.querySelector("#empty-cart");

//variable para obtener los id de los botones 'add to cart'
let product_btn_id = document.querySelector("#cls_producs");
let cart_products = document.querySelector('#cart-products');
let btn_id ;

//Arreglo para almacenar los productos
let productsInfo = [];

//Arreglo de productos para llenar el carrito
let cartProductList = [];

//* listener para mostrar el menu desplegable del carrito.
cartToggle.addEventListener('mouseover', () => {
  cartMenu.classList.toggle("cart-visible")
  cart_Color.classList.toggle('cartColor');
  carTitle()
})

cartMenu.addEventListener('mouseleave', () => {
  cartMenu.classList.remove("cart-visible")
  cart_Color.classList.toggle('cartColor');
})

//eliminar un producto del carrito
carDelete.addEventListener('click', deleteProduct)

//eliminar todos los productos del carrito
carDeleteAll.addEventListener('click', deleteAllProducts)


function getProducts() {
  axios.get(httpUrl)
    .then(function (result){
      const data = result.data;
      productsInfo = data.filter(element => element)
      showData(productsInfo);
    })
    .catch(function(error){
      window.alert(error);
    })
}

//llamar la funcion getProducts() para cargar los productos de la Api
getProducts();





producs_filter.addEventListener('change', () => {
  let select = document.querySelector("#producs_types");
  switch(select.value) {
      case "all":
        showData(productsInfo.sort((a, b) => a.id - b.id));
        break;
      case "price":
        showData(productsInfo.sort((a, b) => a.price - b.price));
        break;
      case "hoddie":
        showData(productsInfo.filter(element => element.category === 'hoddie'));
        break;
      case "sweater":
        showData(productsInfo.filter(element => element.category === 'sweater'));
        break;
      default:
        showData(productsInfo);
        break;
    }
})


   product_btn_id.addEventListener('click', addProduct);

 function addProduct(event){

    if(event.target.classList.contains('add_btn_cart')){
      const products = event.target.parentElement.parentElement.parentElement;
      cartProducts(products); 
   }
 }

function cartProducts(product){
  const infoProduct = {
    id: product.querySelector('button').getAttribute('data-id'),
    image: product.querySelector('img').src,
    name: product.querySelector('.product_name p').textContent,
    price: product.querySelector('.product_price p').textContent,
    quantity: 1
  }
/////

    if(cartProductList.some(product => product.id === infoProduct.id)){
      const product = cartProductList.map(product => {
        if(product.id === infoProduct.id){
          product.quantity ++;
          return product;
        } else {
          return product;
        }
      })
      cartProductList = [...product]
    } else {
      cartProductList = [...cartProductList, infoProduct]
    }
    console.log(cartProductList)
    cartElementsHTML()
}

function carTitle(){
  menuTitle.innerHTML = 
          `<div class="dv-title-cart">
              <h3 class="title_cart">Shopping cart</h3>
           </div>
          `
}

function cartElementsHTML(){
  cart_products.innerHTML = "";
  cartProductList.forEach(product => {
    const div = document.createElement('div');
    div.innerHTML = `
      <div class="cart__product">
        <div class="cart__product__image">
          <img src="${product.image}">
        </div>
        <div class="cart__product__description">
          <p>${product.name}</p>
          <p>Precio: ${product.price}</p>
          <p>Cantidad: ${product.quantity}</p>
        </div>
        <div class="cart__product__button">
          <button class="delete__product">
            <i class="fa-solid fa-trash delete_Product_car" data-id="${product.id}"></i>
          </button>
        </div>
      </div>
      <hr>
    `;
   cart_products.appendChild(div);
  })
}

//funcion para mostrar el filtro
function showFilter(){
  let show = '';
    show += `
        <label id="producs_filter" for="producs_types"></label>
        <select id="producs_types">
          <option value="all">${'All'}</option>
          <option value="price">${'Price'}</option>
          <option value="hoddie">${'Hoddie'}</option>
          <option value="sweater">${'Sweater'}</option>
        </select>
        `
  producs_filter.innerHTML = show;
}

//llamar la funcion showFilter()
showFilter();

//funcion para pintar los productos en el HTML
function showData(data){
  let show = '';
  for (const item of data) {
    show += `
              <div class="cls_show_producs">
                <div class="product_img">
                    <img src="${item.image}" alt="img"></img>  
                </div>
                <div class="product_name">
                    <p>${item.name}</p>
                </div>
                <div class="product_color">
                    <div class="product_color1">
                    </div>
                    <div class="product_color2">
                    </div>
                </div>
                <div class="product_price">
                    <p>$${item.price.toFixed(2)}</p>
                </div>
                <div class="dv-btns">
                    <div class="product_button">
                        <button class="cart_btn_button add_btn_cart" id="add_btn_cart" data-id="${item.id}">Add to cart</button>
                    </div>
                    <div class="product_button_details">
                        <button class="btn_modal_details btn_details" id="btn_details">View details</button>
                    </div>
                </div>
              </div>
    `
  }
  cls_products.innerHTML = show;
}

function deleteProduct(event){
  if(event.target.classList.contains('delete_Product_car')){
    const productId = event.target.getAttribute('data-id');
    cartProductList = cartProductList.filter(product => product.id !== productId);
    cartElementsHTML();
  }
}

function deleteAllProducts(){
  cartProductList = [];
  cartElementsHTML();
}
