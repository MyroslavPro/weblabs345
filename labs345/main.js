import {
  EDIT_BUTTON_PREFIX,
  DELETE_BUTTON_PREFIX,
  clearInputs,
  renderItemsList,
  getInputValues,
} from "./dom_util.js";

import {postItem, editItem, deleteItem, getAllItems} from "./api.js";

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

const onEditItem = async (e) => {
  if (!validateInput()) {
    return;
  }
  const itemId = e.target.id.replace(EDIT_BUTTON_PREFIX, "");
  
  await editItem(itemId, getInputValues())

  clearInputs();
  
  refetchallItems();
};

const onDeleteItem = async (e) => {
    const itemId = e.target.id.replace(DELETE_BUTTON_PREFIX, "");
    await deleteItem(itemId);
    refetchallItems();
}


export const refetchallItems = async () => { 
  const recievedItems =await getAllItems();
  items = recievedItems.items.sort((item1,item2) =>item2.name.localeCompare(item1.name));

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
    const {name, price, country, provider} = getInputValues();
    postItem({
      name, price, country, provider
    })
    clearInputs();
    refetchallItems()
});

findButton.addEventListener("click", () => {
  const foundItems = items.filter(
    (hamster) => hamster.name.search(findInput.value) !== -1
  );

  renderItemsList(foundItems, onEditItem, onDeleteItem);
});

cancelFindButton.addEventListener("click",() => {
  renderItemsList(items, onEditItem, onDeleteItem);
  findInput.value = "";
});

countButton.addEventListener("click",() => {
  const items_price = items.map(item => item.price).reduce((prev, curr) => prev + curr, 0);
  document.getElementById("sum_price").innerText = items_price;
});

refetchallItems();