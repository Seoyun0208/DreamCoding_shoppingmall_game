// Fetch the items from the JSON file

function loadItems() {
	return fetch("data/data.json")
		.then((res) => res.json())
		.then((json) => json.items);
}

// Update the list with the given items

function displayItems(items) {
	const container = document.querySelector("#items");
	container.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

// Create HTML list item from the givent data item

function createHTMLString(item) {
	return `
    <li class="item">
      <img
        src="${item.image}"
        alt="${item.type}"
        class="item__thumbnail"
      />
      <span class="item__description">${item.gender} / ${item.size}</span>
    </li>
  `;
}

// Handle button click
function onButtonClick(e, items) {
	const dataset = e.target.dataset;
	const key = dataset.key;
	const value = dataset.value;

	if (key == null || value == null) {
		return;
	}

	displayItems(items.filter((item) => item[key] === value));
}

function setEventListeners(items) {
	// logo click event
	const logo = document.querySelector("#logo");
	logo.addEventListener("click", () => displayItems(items));

	// btns click event
	const btns = document.querySelector("#btns");
	btns.addEventListener("click", (e) => onButtonClick(e, items));
}

// main

loadItems()
	.then((items) => {
		displayItems(items);
		setEventListeners(items);
	})
	.catch(console.log);
