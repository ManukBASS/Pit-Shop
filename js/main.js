/* GLOBAL */
const pitShopLogo = document.querySelector('.logo');
const scrollHeader = document.getElementById("headerNav");
const btnCarrito = document.getElementsByClassName("carrito");
const addToShoppingListBtn = document.querySelectorAll(".addCart");
const buyButton = document.querySelector('.buyButton');
const shoppingCartContainer = document.querySelector(".shoppingCartItemsContainer");

/* SHOPPPING CART */

buyButton.addEventListener('click', comprarButtonClicked);

addToShoppingListBtn.forEach((addToCartBtn) => {
  addToCartBtn.addEventListener('click', addToCartClicked);
});

function addToCartClicked(event) {
  const button = event.target;
  const item = button.closest(".product-card");

  const itemName = item.querySelector(".item-name").textContent;
  const itemImage = item.querySelector(".item-img").src;
  const itemPrice = item.querySelector(".price").textContent;


  addItemToShoppingCart(itemName, itemImage, itemPrice);
}

function addItemToShoppingCart(name, img, price) {
  const elementsTitle = shoppingCartContainer.getElementsByClassName(
    'shoppingCartItemTitle'
  );

  for (let i = 0; i < elementsTitle.length; i++) {
    if (elementsTitle[i].innerText === name) {
      let elementQuantity = elementsTitle[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        '.shoppingCartItemQuantity'
      );
      elementQuantity.value++;
      $('.toast').toast('show');
      updateShoppingCartTotal();
      return;
    }
  }

  const shoppingCartRow = document.createElement('div');
  const shoppingCartContent = `
  <div class="row shoppingCartItem">
    <div class="col-6">
      <div class="shopping-cart-item-box d-flex align-items-center h-100 border-bottom pb-2 pt-3">
          <h3 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${name}</h3>
          <img src=${img} class="shopping-cart-image">
      </div>
    </div>
    <div class="col-2">
      <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
        <p class="item-price mb-0 shoppingCartItemPrice">${price}</p>
      </div>
    </div>
    <div class="col-4">
      <div
        class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
        <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
          value="1">
          <button class="btn btn-danger buttonDelete" type="button">x</button>
      </div>
    </div>
  </div>`

  shoppingCartRow.innerHTML = shoppingCartContent;
  shoppingCartContainer.append(shoppingCartRow);

  shoppingCartRow
    .querySelector('.buttonDelete')
    .addEventListener('click', removeShoppingCartItem);

  shoppingCartRow
    .querySelector('.shoppingCartItemQuantity')
    .addEventListener('change', quantityChanged);

  updateShoppingCartTotal();
  updateCartIconTotal();
}

function updateShoppingCartTotal() {
  let total = 0;
  const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
      '.shoppingCartItemPrice'
    );
    const shoppingCartItemPrice = Number(
      shoppingCartItemPriceElement.textContent.replace('$', '')
    );
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
      '.shoppingCartItemQuantity'
    );
    const shoppingCartItemQuantity = Number(
      shoppingCartItemQuantityElement.value
    );
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
  });
  shoppingCartTotal.innerHTML =`$${total.toFixed(0)}`;
}

function updateCartIconTotal(){
  let total = 0;
  const numCarrito = document.getElementsByClassName("number-carrito");

  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

  shoppingCartItems.forEach(() =>{
      total ++;
      numCarrito.textContent = parseInt(total);
  })

}

function removeShoppingCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.closest('.shoppingCartItem').remove();
  updateShoppingCartTotal();
}

function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  updateShoppingCartTotal();
}

function comprarButtonClicked() {
  shoppingCartContainer.innerHTML = '';
  updateShoppingCartTotal();
}


/*STICKY HEADER */

let sticky = scrollHeader.offsetTop;
window.onscroll = function () { stickyHeader() };

function stickyHeader() {
  if (window.pageYOffset > sticky) {
    scrollHeader.classList.add("sticky");
  } else {
    scrollHeader.classList.remove("sticky");
  }
}

/*LOCATIONS*/

function changeShop() {
  window.location = "index.html";
}

function changeContact() {
  window.location = "contact.html";
}
