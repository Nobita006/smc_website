async function fetchApps(query = '') {
    const response = await fetch(`php/apps.php?action=view&query=${query}`);
    const apps = await response.json();
    const appsList = document.getElementById('apps');
    appsList.innerHTML = ''; // Clear existing content

    apps.forEach(app => {
        const appItem = document.createElement('li');
        
        // Create a span for app name
        const appName = document.createElement('span');
        appName.textContent = app.name;
        
        // Create edit input
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = app.name;
        editInput.style.display = 'none';
        editInput.className = 'edit-input'; // Add class for consistent styling

        // Create a button container
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container'; // Add class for consistent styling

        // Create edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'action-button'; // Add class for consistent styling
        editButton.onclick = () => {
            editInput.style.display = 'inline';
            appName.style.display = 'none';
            saveButton.style.display = 'inline';
        };

        // Create save button
        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.style.display = 'none';
        saveButton.className = 'action-button'; // Add class for consistent styling
        saveButton.onclick = async () => {
            await updateApp(app.id, editInput.value);
            fetchApps(query);
        };

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'action-button'; // Add class for consistent styling
        deleteButton.onclick = async () => {
            await deleteApp(app.id);
            fetchApps(query);
        };

        // Append buttons to button container
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(saveButton);
        buttonContainer.appendChild(deleteButton);

        // Append elements to app item
        appItem.appendChild(appName);
        appItem.appendChild(editInput);
        appItem.appendChild(buttonContainer);

        // Append app item to list
        appsList.appendChild(appItem);
    });

    appsList.style.display = apps.length ? 'block' : 'none';
}

async function addApp() {
    const newApp = document.getElementById('newApp').value;
    const response = await fetch('php/apps.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `action=add&name=${encodeURIComponent(newApp)}`
    });
    const result = await response.json();
    alert(result.message);
    document.getElementById('newApp').value = '';
    fetchApps();
}

async function deleteApp(id) {
    const response = await fetch('php/apps.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `action=delete&id=${id}`
    });
    const result = await response.json();
    alert(result.message);
}

async function updateApp(id, name) {
    const response = await fetch('php/apps.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `action=edit&id=${id}&name=${encodeURIComponent(name)}`
    });
    const result = await response.json();
    alert(result.message);
}

document.getElementById('addAppForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addApp();
});

fetchApps();  // Initial load of apps
