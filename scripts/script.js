function createPizza() {
	class Pizza {
		constructor(name, price, heat, toppings, photo) {
			this.name = name;
			this.price = price;
			this.heat = heat;
			this.toppings = toppings;
			this.photo = photo;
		}
	}

	var name = document.getElementById("name").value;
	var price = document.getElementById("price").value;
	var heat = document.getElementById("heat").value;
	var toppings = document.getElementById("toppings").value;
	var radios = document.getElementsByName("photo");


	for (var i = 0; i < radios.length; i++) {
		if (radios[i].checked) {
			var photo = document.getElementsByName("photo")[i].value;
			break;
		}
	}
	var createdPizza = new Pizza(name, price, heat, toppings, photo);
	if (sessionStorage.pizza) {
		var fullMenu = JSON.parse(sessionStorage.getItem('pizza'));
		for (var j = 0; j < fullMenu.length; j++) {
			if (name == fullMenu[j].name) {
				alert("A pizza with this name already exists");
				return;
			}
		}
	} else {
		var fullMenu = [];
	}
	fullMenu.push(createdPizza);
	sessionStorage.setItem('pizza', JSON.stringify(fullMenu));
}

function showPizza() {
	var retrievePizza = sessionStorage.getItem('pizza');
	var fullMenu = JSON.parse(retrievePizza)
	for (let i = 0; i < fullMenu.length; i++) {
		var divPizza = document.createElement('div');
		var tag1 = `pizzaDiv${i}`
		divPizza.setAttribute("id", tag1)
		divPizza.setAttribute("class", "singlePizza")
		divPizza.setAttribute("data-name", fullMenu[i].name)
		divPizza.setAttribute("data-price", fullMenu[i].price)
		divPizza.setAttribute("data-heat", fullMenu[i].heat)
		var spanPhoto = document.createElement('span');
		var tag2 = `pizzaPhoto${i}`
		spanPhoto.setAttribute("id", tag2)
		divPizza.appendChild(spanPhoto);
		var headingElement = document.createElement('h2');
		var spanName = document.createElement('span');
		var tag3 = `pizzaName${i}`
		spanName.setAttribute("id", tag3)
		headingElement.appendChild(spanName);
		for (let j = 0; j < fullMenu[i].heat; j++) {
			var imgHeat = document.createElement('img');
			imgHeat.setAttribute("src", '/images/chili.png')
			imgHeat.setAttribute("id", 'chili')
			headingElement.appendChild(imgHeat);
		}
		divPizza.appendChild(headingElement);
		var pToppings = document.createElement('p');
		var tag4 = `pizzaToppings${i}`
		pToppings.setAttribute("id", tag4)
		pToppings.setAttribute("class", "toppings")
		divPizza.appendChild(pToppings);
		var spanPrice = document.createElement('span');
		var tag5 = `pizzaPrice${i}`
		spanPrice.setAttribute("id", tag5)
		spanPrice.setAttribute("class", "price")
    var euroTag = document.createElement("h3");
    var euro = document.createTextNode("  \u20ac");
		euroTag.appendChild(spanPrice);
		euroTag.appendChild(euro);
		divPizza.appendChild(euroTag);
		var deleteButton = document.createElement("button");
		var tag6 = `${i}`
		deleteButton.setAttribute("id", tag6)
		deleteButton.setAttribute("onClick", "confirmDelete(this.id)")
		var buttonText = document.createTextNode("Delete");
		deleteButton.appendChild(buttonText);
		deleteButton.setAttribute("class", "myButton")
		divPizza.appendChild(deleteButton);
    var divElement = document.getElementById("new");
		divElement.appendChild(divPizza);
		var pizzaImage = `<img src=${fullMenu[i].photo} onerror="this.style.display='none'">`;
		var floatPrice = Math.round((fullMenu[i].price * 100) / 100).toFixed(2);
		document.getElementById(tag3).innerHTML = fullMenu[i].name;
		document.getElementById(tag5).innerHTML = floatPrice;
		document.getElementById(tag4).innerHTML = fullMenu[i].toppings;
		document.getElementById(tag2).innerHTML = pizzaImage;
	}
}

function confirmDelete(clicked_id) {
	if (confirm('Are you sure you want to delete this pizza from the menu?')) {
		removePizza(clicked_id)
	}
}

function removePizza(clicked_id) {
	var retrievePizza = sessionStorage.getItem('pizza');
	var fullMenu = JSON.parse(retrievePizza)
	var divId = `pizzaDiv${clicked_id}`;
	var removeDivElement = document.getElementById(divId);
	removeDivElement.parentNode.removeChild(removeDivElement);

	const index = parseInt(clicked_id);
	fullMenu.splice(index, 1);
	sessionStorage.setItem('pizza', JSON.stringify(fullMenu));
}

function ascendingByName(s) {
	Array.prototype.slice.call(document.body.querySelectorAll(s)).sort(function sort (a, b) {
        if (a.dataset.name < b.dataset.name) return -1;
        if (a.dataset.name > b.dataset.name) return 1;
        return 0;
    }).forEach(function(div) {
        div.parentElement.appendChild(div);
    });
}

function descendingByName(s) {
	Array.prototype.slice.call(document.body.querySelectorAll(s)).sort(function sort (a, b) {
        if (a.dataset.name > b.dataset.name) return -1;
        if (a.dataset.name < b.dataset.name) return 1;
        return 0;
    }).forEach(function(div) {
        div.parentElement.appendChild(div);
    });
}

function start(s){
	showPizza()
	ascendingByName(s)
}

const buttonContainer = document.getElementById('button-group')

const orderFunctions = {
	ascendingByPrice: (a, b) => a.dataset.price - b.dataset.price,
	descendingByPrice: (a, b) => b.dataset.price - a.dataset.price,
	ascendingByHeat: (a, b) => a.dataset.heat - b.dataset.heat,
	descendingByHeat: (a, b) => b.dataset.heat - a.dataset.heat
}

let currentOrder = orderFunctions.ascendingByPrice

buttonContainer.addEventListener('click', (e) => {
	if (e.target.id == "button-group") return;

	currentOrder = orderFunctions[e.target.dataset.order]
	order()
})

const order = function () {
	const ordered = [...document.getElementsByClassName('singlePizza')].sort(currentOrder)
	ordered.forEach((elem, index) => {
		elem.style.order = index
	})
}
