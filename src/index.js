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
function dateShit(){
    const dateInput = document.getElementById('dateInput');
    if (dateInput.value === "") {
        dateInput.style.color = "#999"; // Color for empty input
    } else {
        dateInput.style.color = "white"; // Color for filled input
    }
}

function showTaskModal(){
    document.querySelector("dialog").showModal();

}

function addNewTask(){
    
}


// Main function to initialize all event listeners
function initializeApp() {
    // Select the tasks container and append it to the main section
    const current = document.querySelector(".selected").innerText;


    const tasksbanner = document.getElementById("title");
    tasksbanner.classList.add("tasksbanner");
    tasksbanner.innerText=current;

    // date shit 
    dateShit()
   

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

    // Show "Add task" form button
    const showtask=document.getElementById("showbutton")
    showtask.addEventListener("click",showTaskModal)

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
}

// Initialize the app
initializeApp();
