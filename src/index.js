import "./styles.css";

// Utility function to toggle the sidebar visibility
function toggleSidebar() {
    document.body.classList.toggle('hidden-sidebar');
}

// Function to update the selected tile and display its content in tasksbanner
function updateSelectedTile(clickedTile, tasksbanner) {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => tile.classList.remove('selected'));

    // Add 'selected' class to the clicked tile
    clickedTile.classList.add('selected');

    // Update tasksbanner with the clicked tile content
    const tileContent = clickedTile.querySelector('[data-name]').innerText;
    tasksbanner.innerText = tileContent;
    
    const tileId = clickedTile.id;

    if (tileId === 'allTasks') {
        filterTasks('all'); // Show all tasks
    } else if (tileId === 'today') {
        filterTasks('today'); // Show tasks due today
    } else if (tileId === 'thisWeek') {
        filterTasks('thisWeek'); // Show tasks due in the next 7 days
    } else if(tileId==="important"){
        filterTasks("important");
    }
}

// Function to show the "Add Project" form
function showAddProjectForm() {
    document.getElementById('addProjectForm').style.display = 'block';
    document.getElementById('showAddProjectForm').style.display = 'none';
}

// Function to hide the "Add Project" form and reset input
function hideAddProjectForm() {
    document.getElementById('addProjectForm').style.display = 'none';
    document.getElementById('showAddProjectForm').style.display = 'flex';
    document.getElementById('projectNameInput').value = '';
}

// Function to create a new project tile and append it to the project list
function addNewProject(tasksbanner) {
    const projectName = document.getElementById('projectNameInput').value.trim();

    if (projectName !== '') {
        const newProjectTile = document.createElement('div');
        newProjectTile.classList.add('tile');

        const projectText = document.createElement('div');
        projectText.setAttribute('data-name', projectName);
        projectText.textContent = projectName;

        newProjectTile.appendChild(projectText);
        document.getElementById('projects-list').appendChild(newProjectTile);

        // Update the selected tile and tasksbanner with the new project
        updateSelectedTile(newProjectTile, tasksbanner);

        // Hide the form and reset input
        hideAddProjectForm();
    }
}
function checkDateInput() {
    const dateInput = document.getElementById('dateInput');
    dateInput.style.color = dateInput.value === "" ? "#999" : "white"; // Change color based on input value
}
// Add taskk show and hide modal shit
function showTaskModal(){
    document.getElementById("taskDialog").showModal();

}
function hideTaskModal(){
    document.getElementById("taskDialog").close();

}

// Remove taskk show and hide modal shit

function showDeleteModal(){
    document.getElementById("deleteDialog").showModal()
    console.log("delte dialog opends")

}
function hideDeleteModal(){
    document.getElementById("deleteDialog").close()

    
}

function deleteTask(){

}


function handleFormSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    const taskData = getFormData(); // Get form data as an object

    // Validate form data
    if (!validateFormData(taskData)) {
        alert('Title is required!');
        return;
    }

    // Create task object and render it
    const newTask = createTask(taskData);
    renderTask(newTask);

    // Clear form after task is added
    clearForm();
    hideTaskModal();
}


// Function to get form data
function getFormData() {
    const title = document.getElementById('listInput').value;
    const details = document.getElementById('listInputDetail').value;
    const dueDate = document.getElementById('dateInput').value;

    return {
        title,
        details,
        dueDate: dueDate || 'No date set' // Default to 'No date set' if no due date
    };
}

// Function to validate form data (more validation rules can be added)
function validateFormData(taskData) {
    return taskData.title.trim() !== ''; // Task title is required
}



// Function to create a task object
// Prerendered task objects
let taskList = [
    {
        title: 'Complete Project Proposal',
        details: 'Prepare and submit the final draft of the project proposal to the team.',
        dueDate: '2024-10-07', // Set the due date
        important:false
    },
    {
        title: 'Buy Groceries',
        details: 'Get milk, eggs, and vegetables from the store.',
        dueDate: '2024-10-05',
        important:true
    },
    {
        title: 'Read JavaScript Book',
        details: 'Read at least two chapters from the new JS book.',
        dueDate: '2024-10-10',
        important:true

    }
];
// Array to store all tasks


function createTask(taskData) {
    const task = {
        title: taskData.title,
        details: taskData.details || 'No details provided',
        dueDate: taskData.dueDate, // Store the due date
        important: taskData.important
    };
    
    taskList.push(task); // Store the task in the array
    return task;
}

// function for icon genration 
const createSpanIcon = (name) => {
    const icon = document.createElement('span');
    icon.classList.add("material-icons-round");
    icon.textContent = name;
    return icon;
}
// universal toggleIcon fucntion
function toggleIcon(iconElement, checkedIcon, uncheckedIcon) {
    if (iconElement.textContent === uncheckedIcon) {
        iconElement.textContent = checkedIcon; // Mark as checked
    } else {
        iconElement.textContent = uncheckedIcon; // Mark as unchecked
    }
}
// Function to render a task to the DOM
function renderTask(task) {
    const tasksContainer = document.getElementById('taskscon');
    const leftTask=document.createElement('div');
    const taskDiv = document.createElement('div');
    const righDiv = document.createElement("div");
    const bigLeft = document.createElement("div");
    bigLeft.classList.add("bigleft")
    leftTask.classList.add("leftTask")
    taskDiv.classList.add('task');
    
    leftTask.innerHTML = `
        <h3 class="task-title">${task.title}</h3>
        <p><strong>Details:</strong> ${task.details}</p>
        <p><strong>Due Date:</strong> ${task.dueDate}</p>
    `;

    righDiv.classList.add("rightTask")

    
    const checkOutline=createSpanIcon("check_circle_outline")
    const starOutline = createSpanIcon("star_outline");
    const deleteOutline=createSpanIcon("delete_outline")
    checkOutline.classList.add("check_icon")
    starOutline.classList.add("star_icon")
    deleteOutline.classList.add("delete_icon")
    


    bigLeft.appendChild(checkOutline)
    bigLeft.appendChild(leftTask)
    
    righDiv.appendChild(starOutline)
    righDiv.appendChild(deleteOutline)
    taskDiv.appendChild(bigLeft)
    taskDiv.appendChild(righDiv)

    tasksContainer.appendChild(taskDiv);
}

// Function to clear the form after submission
function clearForm() {
    document.getElementById('listForm').reset(); // Reset form fields
}

function filterTasks(filter){
    const tasksContainer = document.getElementById('taskscon');
    tasksContainer.innerHTML = '';
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    const nextWeekDateObj = new Date(); // Create a new Date object for today
    nextWeekDateObj.setDate(nextWeekDateObj.getDate() + 7); // Add 7 days
    const nextWeekDate = nextWeekDateObj.toISOString().split('T')[0]; 
    taskList.forEach(task =>{
        let includeTask = false;
        if (filter==="all"){
            includeTask=true
        }
        else if (filter==="today"){
            includeTask=(task.dueDate===today)
        }
        else if (filter==="thisWeek"){
            includeTask=(task.dueDate >= today && task.dueDate <= nextWeekDate)
        }
        else if (filter==="important")
            includeTask=(task.important===true)
    if(includeTask){
        renderTask(task)
    }
})
}




// Main function to initialize all event listeners
function initializeApp() {
    // Select the tasks container and append it to the main section
    const current = document.querySelector(".selected").innerText;


    const tasksbanner = document.getElementById("title");
    tasksbanner.classList.add("tasksbanner");
    tasksbanner.innerText=current;

    // task manger 
    const taskForm = document.getElementById('listForm');
    
    taskForm.addEventListener('submit', handleFormSubmit);

    // date shit 
        checkDateInput(); // Set initial color for the date input

        // Add event listener for date input change
        const dateInput = document.getElementById('dateInput');
        dateInput.addEventListener('input', checkDateInput); // Using 'input' event
    
   

    // Toggle sidebar button
    const toggleButton = document.getElementById('toggleButton');
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleSidebar);
    }

    // Event delegation for tile selection
    const sideSection = document.getElementById('side');
    sideSection.addEventListener('click', function (event) {
        const clickedTile = event.target.closest('.tile');
        if (clickedTile) {
            updateSelectedTile(clickedTile, tasksbanner);
        }
    });

    // hide task form button
    const cancelbuttuon = document.getElementById("listCancelBtn")
    cancelbuttuon.addEventListener("click",hideTaskModal)

    // Show "Add task" form button
    const showtask=document.getElementById("showbutton")
    showtask.addEventListener("click",showTaskModal)


    let taskToDelete = null;
    //show delte task dialog
    document.getElementById("taskscon").addEventListener("click", function(event) {
        if (event.target && event.target.classList.contains("delete_icon")) {
            taskToDelete = event.target.closest('.task');

            showDeleteModal() 

        }
    });

    // hide delte task dtalog
    const noDelete=document.getElementById("noDeleteBtn")
    noDelete.addEventListener("click",hideDeleteModal)



    // confirm delete task 
    document.querySelector(".deleteDialogButtons").addEventListener("click", function(event) {
        if (event.target && event.target.id === "deleteBtn") {
            // Check if we have a task to delete
            if (taskToDelete) {
                taskToDelete.remove(); // Remove the task from the DOM
                console.log("Task deleted"); // Optional: Log confirmation
                taskToDelete = null; // Reset taskToDelete for next time
                hideDeleteModal(); // Hide the delete confirmation modal
            } else {
                console.error("No task selected for deletion.");
            }
        }
    });
    
        
    // Show "Add Project" form button
    const showFormButton = document.getElementById('showAddProjectForm');
    showFormButton.addEventListener('click', showAddProjectForm);

    // Cancel project form button
    const cancelProjectButton = document.getElementById('cancelProjectButton');
    cancelProjectButton.addEventListener('click', hideAddProjectForm);

    // Add new project button
    const addProjectButton = document.getElementById('addProjectButton');
    addProjectButton.addEventListener('click', function () {
        addNewProject(tasksbanner);
    });

    // check buttuon

    document.getElementById("taskscon").addEventListener("click", function(event) {
        
        if (event.target && event.target.classList.contains("check_icon")) {
            toggleIcon(event.target, "check_circle", "check_circle_outline");  

            const taskDiv = event.target.closest('.task');
        
            
            if (taskDiv) {
                
                const taskTitle = taskDiv.querySelector('.task-title'); 
                const taskDetails = taskDiv.querySelector('p');
                
                taskTitle.classList.toggle('strikethrough');
                
                if (taskDetails) {
                    taskDetails.classList.toggle('strikethrough');
                } else {
                    console.error("Task title element not found.");
                }
                taskDiv.classList.toggle("completed")
            } else {
                console.error("Task div not found.");
            }
        }
        
    });
    
    // star button 

    document.getElementById("taskscon").addEventListener("click", function(event) {
        if (event.target && event.target.classList.contains("star_icon")) {
            toggleIcon(event.target, "star", "star_outline");  

    
        }
    });



    // testing shit 
    taskList.forEach(task => renderTask(task)); 

}

// Initialize the app
initializeApp();
