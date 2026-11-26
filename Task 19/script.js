
const products = [
  { id: 1, name:"Wash & Fold",img:"https://c8.alamy.com/comp/2CA28T4/wash-clothes-in-hand-wash-basins-flat-vector-illustration-2CA28T4.jpg",  price: 499 },
  { id: 2, name: "Stain remove",img:"https://www.marthastewart.com/thmb/LVVl6PzPXY11Tewzz97wFVpeemU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/stain-removal-getty-1220-2000-f7cd873a18e34aacbfa129d36dfe1b98.jpg", price: 1499 },
  { id: 3, name: "Dry Cleaning",img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfrD5y9tk2bXgz50wKQcyMZ9jBS57LqKwVtRr6cTp8KQs56Z7239PLihXb&s=10", price: 999 },
  { id: 4, name: "leaher cleaing",img:"https://theleatherlaundry.com/wp-content/uploads/2026/08/7f108ab3-53d4-4513-a26b-d8cd8fef04f0-1024x683.png", price: 499 },
  { id: 5, name: "ironing",img:"https://steam-one.com/cdn/shop/articles/blog_repassage_tue_microbes.png?v=1767887226", price: 1499 },
  { id: 6, name: "wedding dress cleaning",img:"https://www.foxborodrycleaners.com/images/foxboro-dry-cleaners-wedding-dress-packaging.webp", price: 999 }
];

let cartItems = [];
let currentIndex = 0;

const productBox = document.getElementById("products");
const cartBox = document.getElementById("cart");
function emptycart() {
  if (cartItems.length === 0) {
    cartBox.innerHTML = "<h3>No products added!</h3>";
  } else {
    showCart();
  }
}

// Show one product at a time
function showProducts() {
  if (currentIndex >= products.length) {
    productBox.innerHTML = "<h3>No more products!</h3>";
    return;
  }

  const product = products[currentIndex];

  productBox.innerHTML = `
    <div class="card">
    <img src="${product.img}" 
           alt="${product.name}"
           width="100%"
           height="200"
           style="object-fit: contain;">
           <div class="name-price">
      <span>${product.name}</span> <span>Price: ₹${product.price}</span>
</div>
<div class="add-skip-btn">
      <button class="add" onclick="addToCart(${product.id})">
        Add item
      </button>

      <button class="skip" onclick="skipProduct()">
        Skip item
      </button>
      </div>
    </div>
  `;
}

// Add product and move to next
function addToCart(id) {
  const product = products.find(item => item.id === id);
  const existingItem = cartItems.find(item => item.id === id);

  if (existingItem) {
    existingItem.qty++;
  } else {
    cartItems.push({ ...product, qty: 1 });
  }

  showCart();

  currentIndex++;
  showProducts();
  bookcart();
}

// Skip product without adding it
function skipProduct() {
  currentIndex++;
  showProducts();
}

// Display cart
function showCart() {
  if (cartItems.length === 0) {
    cartBox.innerHTML = "<h3>No products added!</h3>";
    document.getElementById("total").innerText = "Total: ₹0";
    return;
  }

  cartBox.innerHTML = cartItems.map(item => `
  
    <div class="cart-item">
      <span class="item-name">${item.name}</span>

      <span>₹${item.price}</span>

      <div class="quantity">
        <button onclick="changeQty(${item.id}, -1)">-</button>
        <span>${item.qty}</span>
        <button onclick="changeQty(${item.id}, 1)">+</button>
      </div>

      <button class="remove-btn"
        onclick="removeItem(${item.id})">
        &#215;
      </button>
    </div>
  `).join("");


  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  document.getElementById("total").innerText =
    "Total: ₹" + total;
}

// Change quantity
function changeQty(id, amount) {
  const item = cartItems.find(item => item.id === id);

  if (!item) return;

  item.qty += amount;

  if (item.qty <= 0) {
    cartItems = cartItems.filter(item => item.id !== id);
  }

  showCart();
  bookcart()
}

// Remove item from cart
function removeItem(id) {
  cartItems = cartItems.filter(item => item.id !== id);
  showCart();
  bookcart()
}


function error() {
  const error = document.getElementById("bookError");

  if (cartItems.length <= 0) {
    error.innerText = "Please add a service to book now";
  } else {
    error.innerText = "Thank you for connecting! We will get back to you soon.";
      error.style.color = "green";
    cartItems = []; // Empty the cart after booking
    showCart();     // Refresh the cart (if you have this function)
  }
}
function bookcart() {
  const bookbtn = document.getElementById("bookNow");

  if (cartItems.length > 0) {
    bookbtn.disabled = false;
    
  } else {
    bookbtn.disabled = true;

    
  }
}
// Start project
showProducts();
showCart();
emptycart()

