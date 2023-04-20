//URL del los productos
const httpUrl='https://ecommercebackend.fundamentos-29.repl.co/';

//variables para cargar los div del carrito
const carToggle = document.querySelector('.car-toggle');
const carMenu = document.querySelector('.car-menu');

//variables para obtener los selectores
const cls_products = document.querySelector("#cls_producs");
const producs_filter = document.querySelector("#dv-producs_filter");

//variable para obtener los id de los botones 'add to car'
let product_btn_id = document.querySelector("#cls_producs");
let car_products = document.querySelector('#car-products');
let btn_id ;

//Arreglo para almacenar los productos
let productsInfo = [];

//Arreglo de productos para llenar el carrito
let carProductList = [];

//* listener para mostrar el menu desplegable del carrito.
carToggle.addEventListener('click', () => {
carMenu.classList.toggle("car-visible")
})

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

    if(event.target.classList.contains('add_btn_car')){
      const products = event.target.parentElement.parentElement.parentElement;
      carProducts(products); 
   }
 }

function carProducts(product){
  const infoProduct = {
    id: product.querySelector('button').getAttribute('data-id'),
    image: product.querySelector('img').src,
    name: product.querySelector('.product_name p').textContent,
    price: product.querySelector('.product_price p').textContent,
    quantity: 1
  }
/////

    if(carProductList.some(product => product.id === infoProduct.id)){
      // Si el producto al que le doy click en infoProduct ya existe en carProducts, entonces:
      const product = carProductList.map(product => {
        // Como tengo un producto que ya existe dentro de carProducts, entonces debo mapearlo y sumarle una unidad a la cantidad del elemento igual.
        if(product.id === infoProduct.id){
          product.quantity ++;
          return product;
        } else {
          return product;
        }
      })
      carProductList = [...product]
    } else {
      carProductList = [...carProductList, infoProduct]
    }
    console.log(carProductList)
    carElementsHTML()
}


function carElementsHTML(){

  car_products.innerHTML = "";

  carProductList.forEach(product => {
    const div = document.createElement('div');
    // createElement, permite crear etiquetas desde el DOM.
    div.innerHTML = `
      <div class="car__product">
        <div class="car__product__image">
          <img src="${product.image}">
        </div>
        <div class="car__product__description">
          <p>${product.name}</p>
          <p>Precio: ${product.price}</p>
          <p>Cantidad: ${product.quantity}</p>
        </div>
        <div class="car__product__button">
          <button class="delete__product" data-id="${product.id}">
            Delete
          </button>
        </div>
      </div>
      <hr>
    `;
    // appendChild permite insertar elementos al DOM, muy similar a innerHTML
    car_products.appendChild(div);
  })
}



//funcion para pintar el filtro
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
                        <button class="car_btn_button add_btn_car" id="add_btn_car" data-id="${item.id}">Add to car</button>
                    </div>
                    <div class="product_button_details">
                        <button class="btn_modal_details btn_details" id="btn_details">Details</button>
                    </div>
                </div>
              </div>
    `
  }
  cls_products.innerHTML = show;
}