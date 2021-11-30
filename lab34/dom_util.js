const NameInput = document.getElementById("name_of_item_input");
const PriceInput = document.getElementById("price_input");
const CountryInput = document.getElementById("country_input");
const ProviderInput = document.getElementById("provider_input");
const itemsContainer = document.getElementById("items_container");

export const EDIT_BUTTON_PREFIX = 'edit-button-';
export const DELETE_BUTTON_PREFIX = 'delete-button-';



const itemTemplate = ({ id, name, price, country, provider }) => `
<li id="${id}" class="card item-card">
  <img
    src="https://image.freepik.com/free-photo/summer-holiday-background-beach-accessories-white-wood-copy-space-vacation-travel-items-concept_1205-1427.jpg"
    class="item-container__image card-img-top" alt="card">
  <div class="card-body">
    <h5 class="card-title">Name: ${name}</h5>
    <p class="card-text">Price: ${price}</p>
    <p class="card-text">Origin: ${country}</p>
    <p class="card-text">Provider: ${provider}</p>
  </div>
  <div class="horizontal_cont">
  <button id="${EDIT_BUTTON_PREFIX}${id}" type="button" class="default_button">
      Edit
  </button>
  <button id="${DELETE_BUTTON_PREFIX}${id}" type="button" class="default_button" style = "background-color: #F53838;">
    Delete
  </button>
  </div>
</li>`;



export const addItemToPage = ({ id, name, price, country, provider}, onEditItem , onDeleteItem ) => {
    itemsContainer.insertAdjacentHTML(
      "afterbegin",
      itemTemplate({ id, name, price, country, provider }),
    );
    
    const editButton = document.getElementById(`${EDIT_BUTTON_PREFIX}${id}`);
    editButton.addEventListener("click", onEditItem);
    const deleteButton = document.getElementById(`${DELETE_BUTTON_PREFIX}${id}`);
    deleteButton.addEventListener("click", onDeleteItem);
};

export const clearInputs = () => {
    NameInput.value = "";
    PriceInput.value = "";
    CountryInput.value = "";
    ProviderInput.value = "";
  };

export const renderItemsList = (items, onEditItem, onDeleteItem) => {
  itemsContainer.innerHTML = "";

  for (const item of items) {
    addItemToPage(item, onEditItem, onDeleteItem);
  }
};

export const getInputValues = () => {
  return {
    name:NameInput.value,
    price:parseFloat(PriceInput.value),
    country:CountryInput.value,
    provider:ProviderInput.value,
  };
};