let modalQtd = 1;
let keySize = 2;
let pizzaId;
let cart = [];

const getItemHTML = (el) => document.querySelector(el);
const getAllItemsHTML = (el) => document.querySelectorAll(el);


pizzaJson.map((item, index) => {
    let pizzaItem = getItemHTML('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key', index);

    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQtd = 1;
        pizzaId = key;

        getItemHTML('.pizzaBig img').src = pizzaJson[key].img;
        getItemHTML('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        getItemHTML('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;

        getItemHTML('.pizzaInfo--size.selected').classList.remove('selected');

        getAllItemsHTML('.pizzaInfo--size').forEach((size, sizeIndex) => {

            if (sizeIndex == 2) {
                size.classList.add('selected');
                keySize = 2;
            }

            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
        })
        getItemHTML('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`

        getItemHTML('.pizzaInfo--qt').innerHTML = modalQtd;

        getItemHTML('.pizzaWindowArea').style.opacity = 0;
        getItemHTML('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            getItemHTML('.pizzaWindowArea').style.opacity = 1;
        }, 50)



    });

    getItemHTML('.pizza-area').append(pizzaItem)
});

function closeModal() {
    getItemHTML('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        getItemHTML('.pizzaWindowArea').style.display = 'none';
    }, 500)
}

getItemHTML('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQtd++;
    getItemHTML('.pizzaInfo--qt').innerHTML = modalQtd
})

getItemHTML('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if (modalQtd > 1) {
        modalQtd--;
        getItemHTML('.pizzaInfo--qt').innerHTML = modalQtd
    }
})

getAllItemsHTML('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', () => {
        keySize = sizeIndex;
        getItemHTML('.pizzaInfo--size.selected').classList.remove("selected")
        size.classList.add("selected")
    })
})

getItemHTML('.pizzaInfo--addButton').addEventListener('click', () => {
    let identifier = pizzaJson[pizzaId].id + "@" + keySize

    let key = cart.findIndex((item) => item.identifier == identifier)

    if (key > -1) {
        cart[key].qtd += modalQtd;
    } else {
        cart.push({
            identifier,
            pizzaId: pizzaJson[pizzaId].id,
            size: keySize,
            qtd: modalQtd
        })
    }

    closeModal();
    updateCart();
})

getItemHTML('.menu-openner').addEventListener('click', () => {
    getItemHTML('aside').style.left = "0";
})

getItemHTML('.menu-closer').addEventListener('click', () => {
    getItemHTML('aside').style.left = "100vw";
})

function updateCart() {
let subTotal = 0;
let total = 0;
let desconto = 0.1;

    if (cart.length > 0) {
        getItemHTML('aside').classList.add('show')
        getItemHTML('.menu-openner span').innerHTML = cart.length
        getItemHTML('.cart').innerHTML = '';

        for (let i in cart) {
            let pizzaItem = pizzaJson.find((item) => item.id == cart[i].pizzaId)
            let cartItem = getItemHTML('.models .cart--item').cloneNode(true)

            cartItem.querySelector('img').src = pizzaItem.img;
            switch (cart[i].size) {
                case 0:
                    cartItem.querySelector('.cart--item-nome').innerHTML = `${pizzaItem.name} (P)`;
                    break;
                case 1:
                    cartItem.querySelector('.cart--item-nome').innerHTML = `${pizzaItem.name} (M)`;
                    break;
                case 2:
                    cartItem.querySelector('.cart--item-nome').innerHTML = `${pizzaItem.name} (G)`;
                    break;
            }

            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qtd


            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].qtd++;
                updateCart();
            })

            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if (cart[i].qtd > 1) {
                    cart[i].qtd--;
                } else {
                    cart.splice(i, 1);
                }
                updateCart();
            })

            subTotal += (pizzaItem.price * cart[i].qtd);

            getItemHTML('.cart').append(cartItem)

        }


        total = subTotal - (subTotal * desconto)

        getItemHTML('.subtotal span:last-child').innerHTML = `R$ ${subTotal.toFixed(2)}`
        getItemHTML('.desconto span:last-child').innerHTML = `R$ ${(subTotal*desconto).toFixed(2)}`
        getItemHTML('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`


    } else {
        getItemHTML('aside').classList.remove('show')
        getItemHTML('.menu-openner span').innerHTML = cart.length
        getItemHTML('aside').style.left = "100vw";
    }



}

