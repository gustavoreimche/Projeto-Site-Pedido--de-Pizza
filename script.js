let modalQtd = 1;

const getItemHTML = (el) => document.querySelector(el);
const getAllItemsHTML = (el) => document.querySelectorAll(el);


pizzaJson.map((item, index)=>{
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
        
        getItemHTML('.pizzaBig img').src = pizzaJson[key].img;
        getItemHTML('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        getItemHTML('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        
        getItemHTML('.pizzaInfo--size.selected').classList.remove('selected');
        
        getAllItemsHTML('.pizzaInfo--size').forEach((size, sizeIndex)=>{

            if(sizeIndex == 2){
                size.classList.add('selected');
            }

            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
        })
        getItemHTML('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`

        getItemHTML('.pizzaInfo--qt').innerHTML = modalQtd;

        getItemHTML('.pizzaWindowArea').style.opacity = 0;
        getItemHTML('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=>{
            getItemHTML('.pizzaWindowArea').style.opacity = 1;
        }, 50)



    });

    getItemHTML('.pizza-area').append(pizzaItem)
});

function closeModal (){
    getItemHTML('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        getItemHTML('.pizzaWindowArea').style.display = 'none';
    }, 500)
}





