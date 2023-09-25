const contenedor = document.querySelector(".pokemon-container");
const showMoreBtn = document.querySelector(".ver-mas_btn")

const catergoriesContainer = document.querySelector(".categories")
const categoriesList = document.querySelectorAll(".category")

const cartBtn = document.querySelector(".cart-label");
const cartMenu = document.querySelector(".cart");
const barsMenu = document.querySelector(".navbar-list")
const menuBtn = document.querySelector(".menu-label")

const productsCart = document.querySelector(".cart-container")
const total = document.querySelector(".total")
const succesModal = document.querySelector(".modal")

const buyBtn = document.querySelector(".cart-btn-buy")
const deleteBtn = document.querySelector(".cart-btn-delete")
const CartBubble = document.querySelector(".cart-bubble")

const formulario = document.getElementById("form")
const nombre = document.getElementById("nombre")
const telefono = document.getElementById("telefono")
const email = document.getElementById("email")





const createProductTemplate = (product) => {
    const { id, name, cardImg, price } = product;
    return `
    <div class="products">
            <div class="card-img">
                <img src= ${cardImg} alt="poke">
            </div>
        <div class="products-info">
            <h3 class="name_card">${name}</h3>
            <p class="price-card">$${price}</p><br>
        </div>
            <div class="products-btn">
                <button class="btn-card"
                data-id="${id}"
                data-name="${name}"
                data-price="${price}"
                data-img="${cardImg}" >Capturar
            </button>
        </div>
    </div>`;
};

const renderPokemones = (productsData) => {
    contenedor.innerHTML += productsData.map(createProductTemplate).join("");
};


const showMoreProducts = () => {
    appState.currentProductsIndex += 1;
    let { products, currentProductsIndex } = appState;
    renderPokemones(products[currentProductsIndex]);
    if (isLastIndexOf()) {
        showMoreBtn.classList.add("hidden");
    }
};

const isLastIndexOf = () => {
    return appState.currentProductsIndex === appState.productsLimit - 1;
};

// filtros para clases*
const applyfilter = ({ target }) => {
    if (!isInactiveFilterBtn(target)) return;
    changeFilterState(target)
    contenedor.innerHTML = '';
    if (appState.activeFilter) {
        renderFilteredProducts();
        appState.currentProductsIndex = 0;
        return;
    };
    renderPokemones(appState.products[0]);
};

const isInactiveFilterBtn = (element) => {
    return (element.classList.contains("category") &&
        !element.classList.contains("active"));
};

const changeFilterState = (btn) => {
    appState.activeFilter = btn.dataset.category;
    changeBtnActiveState(appState.activeFilter);
    setShowMoreVisibility();
};

const changeBtnActiveState = (selectedCategory) => {
    const categories = [...categoriesList];
    categories.forEach((categoryBtn) => {
        if (categoryBtn.dataset.category !== selectedCategory) {
            categoryBtn.classList.remove("active");
            return;
        };
        categoryBtn.classList.add("active");
    });
};

const renderFilteredProducts = () => {
    const FilteredProducts = productsData.filter(
        (product) => product.category === appState.activeFilter);
    renderPokemones(FilteredProducts);
};

const setShowMoreVisibility = () => {
    if(!appState.activeFilter) {
        showMoreBtn.classList.remove("hidden");
        return;
    }
    showMoreBtn.classList.add("hidden");
};


//menues 992*
const toggleCart = () => {
    cartMenu.classList.toggle("open-cart");
    if (barsMenu.classList.contains("open-menu")) {
        barsMenu.classList.remove("open-menu");
        return;
    };
};

const toggleMenu = () => {
    barsMenu.classList.toggle("open-menu");
    if (cartMenu.classList.contains("open-cart")) {
        cartMenu.classList.remove("open-cart");
        return;
    };
};

const closeOnScroll = () => {
    if (!barsMenu.classList.contains("open-menu") &&
        !cartMenu.classList.contains("open-cart")) {
        return
    };
    barsMenu.classList.remove("open-menu");
    cartMenu.classList.remove("open-cart");
};

const closeOnClick = (e) => {
    if (e.target.classList);
};

//carritos render
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

const renderCart = () => {
    if (!cart.length) {
        productsCart.innerHTML = `<p class="mensaje-vacio"> Aun no Capturaste Ningun Pokemon! </p> `;
        return;
    }
    productsCart.innerHTML = cart.map(createCartProductTemplate).join("");
};

const createCartProductTemplate = (cartproduct) => {
    const { id, name, price, img, quantity } = cartproduct;
    return `
<div class="cart-item">
    <img src= "${img}" alt="">
    <div class="item-data">
        <div class="item-info">
            <h2>${name}</h2>
            <span class="item-price">Valor $${price}</span>
        </div>
        <div class="item-handler">
            <span class="quantity-handler down" data-id=${id}>-</span>
            <span class="item-quantity">${quantity}</span>
            <span class="quantity-handler up" data-id=${id}>+</span>
        </div>
    </div>
</div>
        `
};

const showCartTotal = () => {
    total.innerHTML = `$${getCartTotal()}`;
};

const getCartTotal = () => {
    return cart.reduce((acc, cur) => acc + Number(cur.price) * cur.quantity, 0)
};

//cargarproductos
const addProduct = (e) => {
    if (!e.target.classList.contains("btn-card")) {
        return
    }
    const product = createProductData(e.target.dataset);
    if (isExistingCartProduct(product)) {
        addUnitToProduct(product);
        showSuccesModal("Pokemon Capturado")
    }
    else {
        createCartProduct(product);
        showSuccesModal("Pokemon Capturado")
    };
    updateCartState();
};



const createProductData = (product) => {
    const { img, id, name, price } = product;
    return { img, id, name, price };
};

const isExistingCartProduct = (product) => {
    return cart.find((item) => item.id === product.id);
};

const addUnitToProduct = (product) => {
    cart = cart.map((cartProduct) =>
        cartProduct.id === product.id
            ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
            : cartProduct);
};

const showSuccesModal = (msg) => {
    succesModal.classList.add("active-modal");
    succesModal.textContent = msg;
    setTimeout(() => {
        succesModal.classList.remove("active-modal")
    }, 1500);
};

const createCartProduct = (product) => {
    cart = [...cart, { ...product, quantity: 1 }];
};

const updateCartState = () => {
    saveCart();
    renderCart();
    showCartTotal();
    disableBtn(buyBtn);
    disableBtn(deleteBtn);
    renderCartBubble();
};

const disableBtn = (btn) => {
    if (!cart.length) {
        btn.classList.add("inactive-btn")
        btn.classList.add("inactive-hover")
    } else {
        btn.classList.remove("inactive-btn")
        btn.classList.remove("inactive-hover")
    }
};

const renderCartBubble = () => {
    CartBubble.textContent = cart.reduce((acc, cur) => {
        return acc + cur.quantity;
    }, 0);
};

const resetCartItems = () => {
    cart = [];
    updateCartState();
};

const completeCartAction = (confirmMsg, successMsg) => {
    if (!cart.length) return; 
    if (window.confirm(confirmMsg)) {
        resetCartItems();
        alert(successMsg);
    }
};

const completeBuy = () => {
    completeCartAction(
        "¿Desea completar su compra?",
        "Buena suerte en la aventura");
};

const deleteCart = () => {
    completeCartAction(
        "¿Desea vaciar el carrito?",
        "Carrito Borrado"
    );
};




const restarQuantity = (id) => {
    const existingCartProduct = cart.find((item) => item.id === id);
    if (existingCartProduct.quantity === 1) {
        removeProduct(existingCartProduct)
    }
    substractProductUnit(existingCartProduct)
}

const substractProductUnit = (existingProduct) => {
    cart = cart.map((product) => {
        return product.id === existingProduct.id
            ? { ...product, quantity: Number(product.quantity) - 1 }
            : product
    })
};

const removeProduct = (existingProduct) => {
    cart = cart.filter((product) => product.id !== existingProduct.id)
    updateCartState()
    return alert("borrar pokemon?")
};

const sumarQuantity = (id) => {
    const existingCartProduct = cart.find((item) => item.id === id)
    addUnitToProduct(existingCartProduct)
};


const handleQuantity = (e) => {
    if (e.target.classList.contains("down")) {
        restarQuantity(e.target.dataset.id)
    } else if (e.target.classList.contains("up")) {
        sumarQuantity(e.target.dataset.id)
    }
    updateCartState();
};


const mensaje = JSON.parse(localStorage.getItem("mensaje")) || [];
const saveToLocalStorage = () => {
    localStorage.setItem("mensaje", JSON.stringify(mensaje));
};



const isPhoneValid = (input) => {
    const re = /^[0-9]{10}$/;
    return re.test(input.value.trim());
}

const isEmailValid = (input) => {
    const re = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/;
    return re.test(input.value.trim());
};

const isExistingEmail = (input) => {
    return mensaje.some((mensaje) => mensaje.email === input.value.trim())
};

const isEmpty = (input) => {
    return !input.value.trim().length;
};

const showError = (input, message) => {
    const cajasForm = input.parentElement;
    cajasForm.classList.remove("success");
    cajasForm.classList.add("error");
    const error = cajasForm.querySelector("small");
    error.style.display = "block";
    error.textContent = message;
};

const showSucces = (input) => {
    const cajasForm = input.parentElement;
    cajasForm.classList.remove("error");
    cajasForm.classList.add("success");
    const error = cajasForm.querySelector("small");
    error.style.display = "block";
    error.textContent = " ";
}

const isBetween = (input, min, max) => {
    return input.value.length >= min && input.value.length <= max;
};

const checkTextInput = (input) => {
    let valid = false;
    const minCharacters = 4;
    const maxCharacters = 15;
    if (isEmpty(input)) {
        showError(input, `este campo es obligatorio`);
        return
    };
    if (!isBetween(input, minCharacters, maxCharacters)) {
        showError(input, `minimo entre ${minCharacters} y ${maxCharacters} por favor`);
        return;
    };
    showSucces(input);
    valid = true;
    return valid;
};

const checkEmail = (input) => {
    let valid = false;
    if (isEmpty(input)) {
        showError(input, `este campo es obligatorio`);
        return;
    } if (!isEmailValid(input)) {
        showError(input, `este email no parece valido`);
        return;
    } if (isExistingEmail(input)) {
        showError(input, `Este email ya esta registrado`);
        return;
    }
    showSucces(input);
    valid = true;
    return valid;
};

const checkTel = (input) => {
    let valid = false;
    if (isEmpty(input)) {
        showError(input, `Este campo es obligatorio`);
        return;
    } if (!isPhoneValid(input)) {
        showError(input, `El Telefono no es valido`);
        return;
    }
    showSucces(input);
    valid = true;
    return valid;
};


const validateForm = (e) => {
    e.preventDefault();
    let isNamevalid = checkTextInput(nombre);
    let isEmailValid = checkEmail(email);
    let isPhoneValid = checkTel(telefono);

    let isValidForm = isNamevalid && isEmailValid && isPhoneValid;
    if (isValidForm) {
        mensaje.push({
            name: nombre.value,
            email: email.value,
            phone: telefono.value
        });
        saveToLocalStorage(mensaje);
        alert("Recibimos tu mensaje, pronto estaremos en contacto");
        window.location.href = "index.html";
    }
};






//incio 
const init = () => {
    renderPokemones(appState.products[0]);
    showMoreBtn.addEventListener("click", showMoreProducts);
    catergoriesContainer.addEventListener("click", applyfilter)
    cartBtn.addEventListener("click", toggleCart)
    menuBtn.addEventListener("click", toggleMenu)
    window.addEventListener("scroll", closeOnScroll);
    barsMenu.addEventListener("click", closeOnClick);
    document.addEventListener("DOMContentLoaded", renderCart);
    document.addEventListener("DOMContentLoaded", showCartTotal);
    contenedor.addEventListener("click", addProduct);
    productsCart.addEventListener("click", handleQuantity)
    buyBtn.addEventListener("click", completeBuy);
    deleteBtn.addEventListener("click", deleteCart);
    disableBtn(buyBtn);
    disableBtn(deleteBtn);

    form.addEventListener("submit", validateForm);
    nombre.addEventListener("input", () => checkTextInput(nombre));
    email.addEventListener("input", () => checkEmail(email));
    telefono.addEventListener("input", () => checkTel(telefono));
};

init();
