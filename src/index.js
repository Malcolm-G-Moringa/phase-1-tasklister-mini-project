document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('#create-task-form');
  createPriorityDropdown();
  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    handleToDo(e);
    form.reset();
  })
});

function handleToDo(e){

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
}



// Function for changing the color of a todo item basedon priority level
// function priorityShow(e){
//   const priority = e.target.selectedIndex;
//   if(priority == '1'){
//     e.target.parentNode.style.color = "Red"
//   }
//   else if(priority == '2'){
//     e.target.parentNode.style.color = "Yellow"
//   }
//   else if(priority == '3'){
//     e.target.parentNode.style.color = "Green"
//   }
// }



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