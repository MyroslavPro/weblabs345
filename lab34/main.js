import {
  EDIT_BUTTON_PREFIX,
  DELETE_BUTTON_PREFIX,
  addItemToPage,
  clearInputs,
  renderItemsList,
  getInputValues,
} from "./dom_util.js";


const submitButton = document.getElementById("submit_button");
const findButton = document.getElementById("find_button");
const cancelFindButton = document.getElementById("clear_button");
const sortCheckbox = document.getElementById("sort_checkbox");
const countButton = document.getElementById("count_button");
const findInput = document.getElementById("find_item_input");
const formFields = document.getElementsByClassName("form-control");

let items = [];

// sortckbox
sortCheckbox.addEventListener("change", () => {
  let sorted_items = Array.from(items);
  if (sortCheckbox.checked){
    sorted_items = items.sort((item1,item2) =>item1.price - item2.price);
    renderItemsList(sorted_items, onEditItem, onDeleteItem);
  }
  else{
    refetchallItems();
  }
});


const addItem = ({name, price, country, provider}) => {
  const genereatedId = uuid.v1();
  const newItem = {
    id:genereatedId,
    name, price, country, provider
  };
  items.push(newItem)

  addItemToPage(newItem)
}

const onEditItem = async (e) => {
  if (!validateInput()) {
    return;
  }
  const itemId = e.target.id.replace(EDIT_BUTTON_PREFIX, "");
  let i  = items.findIndex(item => item.id === itemId);
  let input =  getInputValues();
  items[i].name = input.name;
  items[i].price = input.price;
  items[i].country = input.country;
  items[i].provider = input.provider;

  clearInputs();
  
  refetchallItems();
};

const onDeleteItem = async (e) => {
    const itemId = e.target.id.replace(DELETE_BUTTON_PREFIX, "");
    let i  = items.findIndex(item => item.id === itemId);
    items.splice(i,1);
    refetchallItems();
}

const refetchallItems = () => {  
  items = items.sort((item1,item2) =>item2.name.localeCompare(item1.name));
  renderItemsList(items, onEditItem, onDeleteItem);
};


const validateInput = () => {
  if (Array.from(formFields).filter(x => x.value.trim() === "").length !== 0) {
    alert("Some fields are empty or some input values don't match to the required conditions!"); 
    return false;
  }
  else{
    return true;
  }
}


submitButton.addEventListener("click", (event) => {
  // Prevents default page reload on submit
  event.preventDefault();
  if (!validateInput()) {
    return;

  }
  else{
    const {name, price, country, provider} = getInputValues();

    clearInputs();

    addItem({
      name, price, country, provider
    });
    refetchallItems();
  }
});

findButton.addEventListener("click", (event) => {
  const foundItems = items.filter(
    (hamster) => hamster.name.search(findInput.value) !== -1
  );

  renderItemsList(foundItems, onEditItem, onDeleteItem);
});

cancelFindButton.addEventListener("click",(event) => {
  renderItemsList(items, onEditItem, onDeleteItem);
  findInput.value = "";
});

countButton.addEventListener("click",(event) => {
  const items_price = items.map(item => item.price).reduce((prev, curr) => prev + curr, 0);
  document.getElementById("sum_price").innerText = items_price;
});

