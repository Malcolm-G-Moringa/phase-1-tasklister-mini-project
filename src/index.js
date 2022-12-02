document.addEventListener("DOMContentLoaded", (e) => {
  const form = document.querySelector('#create-task-form');

  //Adding the priority dropdown 
  createPriorityDropdown();

  // Add event listener to add todo list item
  form.addEventListener('submit',handleToDo)

});

// Function to handle a submit event in the todo form
function handleToDo(e){
  // Preventpage refresh
  e.preventDefault();

  // create variables for the value input and the dropdown menu
  const todo = e.target['new-task-description'].value;
  const dropdown = e.target.querySelector('select');

  // Check that todo item is not an empty string
  if(todo == ''){
    console.error('Please input an actual value')
    return;
  }

  // Create list item
  const li = document.createElement('li');
  li.textContent = `${todo}  `

  // Change list color based on chosen priority
  if(dropdown.selectedIndex == 1){
    li.style.color = "Red";
  }
  else if(dropdown.selectedIndex == 2){
    li.style.color = "Orange";
  }
  else if(dropdown.selectedIndex == 3){
    li.style.color = "Green";
  }

  // Add a delete button with event listener and append to list element
  const btn = document.createElement('button');
  btn.textContent = 'delete';
  btn.addEventListener('click',(e)=>e.target.parentNode.remove());

  // Append delete button to list element
  li.append(" ",btn);

  // Append list element to todo list
  document.querySelector('#tasks').append(li);

  // Add a sort items button
  createSortButton();


  // Reset form
  e.target.reset();
}


// function to create a dropdown list to choose priority level of a list
function createPriorityDropdown(){
  // Add a priority dropdown to change color
  const priorityValue = document.createElement('select');

  // Create options in select tag

  // Create a default option and setting its attributes
  const noOption = document.createElement('option');
  noOption.setAttribute("value","");
  noOption.setAttribute("disabled","");
  noOption.setAttribute("selected","");
  noOption.textContent = "Choose priority level"

  // Creating three options
  const highPriority = document.createElement('option');
  highPriority.textContent = "High"
  const mediumPriority = document.createElement('option');
  mediumPriority.textContent = "Medium"
  const lowPriority = document.createElement('option');
  lowPriority.textContent = "Low"

  // Appending options to the select tag
  priorityValue.append(noOption,highPriority,mediumPriority,lowPriority);

  // Append to form
  document.querySelector('#create-task-form').append(" ",priorityValue);

  // Adding event listeners to the select tag.
  // priorityValue.addEventListener('change',priorityShow)

}

// Function to create a sort list button
function createSortButton(){
  const list = document.querySelector('#tasks');
  if(list.parentNode.querySelector('h2').children.length>=1){
    return;
  }
  if(list.children.length > 1){
    const sortBtn = document.createElement('button');
    sortBtn.textContent = "Sort list";
    list.parentNode.querySelector('h2').append(" ",sortBtn);
    sortBtn.addEventListener('click', sortList)
  }
  else{return}
}

// Function to handle a click event of the {sort list button} to sort list items based on their priority
function sortList(e){
  let list, i, switching, b, shouldSwitch;
  list = document.getElementById("tasks");
  switching = true;

  while(switching){
    switching = false;
    b = list.getElementsByTagName("LI");

    for(i = 0; i < (b.length - 1); i++){
      shouldSwitch = false;

      if(b[i].style.color != "red" && b[i+1].style.color == "red"){
        shouldSwitch = true;
        break;
      }

      if(b[i].style.color == "green" && b[i+1].style.color == "orange"){
        shouldSwitch = true;
        break;
      }
    }

    if(shouldSwitch){
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
    }
  }
}

console.log(document.querySelector('#tasks'))