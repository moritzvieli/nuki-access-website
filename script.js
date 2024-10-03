let isLocked = true; // Default state, will be updated after fetching the actual state

// Function to toggle the lock
function toggleLock() {
    const switchElement = document.getElementById('lockSwitch');
    const statusText = document.getElementById('statusText');
    const switchIcon = document.getElementById('switchIcon');

    const action = isLocked ? 'unlock' : 'lock';

    const baseURL = window.location.origin + window.location.pathname.split('/').slice(0, -1).join('/') + '/';
    const apiUrl = baseURL + 'api.php';

    // Send request to api.php to lock/unlock
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `action=${action}`
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.error) {
            console.error('Error:', data.error);
        }
    })
    .catch(error => console.error('Error:', error));

    // Update the UI based on the action
    isLocked = !isLocked;

    if (isLocked) {
        switchElement.classList.remove('unlocked');
        switchElement.classList.add('locked');
        statusText.textContent = "Locked";
        switchIcon.classList.remove('fa-unlock');
        switchIcon.classList.add('fa-lock');
    } else {
        switchElement.classList.remove('locked');
        switchElement.classList.add('unlocked');
        statusText.textContent = "Unlocked";
        switchIcon.classList.remove('fa-lock');
        switchIcon.classList.add('fa-unlock');
    }
}

// Function to fetch the initial lock state from the server without animation
function fetchInitialState() {
    const loadingSpinner = document.getElementById('loadingSpinner');
    const lockControl = document.getElementById('lockControl');

    fetch('api.php', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        const switchElement = document.getElementById('lockSwitch');
        const statusText = document.getElementById('statusText');
        const switchIcon = document.getElementById('switchIcon');

        // Temporarily disable transitions to prevent animation
        switchElement.classList.add('no-transition');

        // Set the initial state based on the fetched data
        if (data.isLocked) {
            isLocked = true;
            switchElement.classList.add('locked');
            statusText.textContent = "Locked";
            switchIcon.classList.add('fa-lock');
        } else {
            isLocked = false;
            switchElement.classList.add('unlocked');
            statusText.textContent = "Unlocked";
            switchIcon.classList.add('fa-unlock');
        }

        // Hide the loading spinner and show the lock control
        loadingSpinner.classList.add('hidden');
        lockControl.classList.remove('hidden');
    })
    .catch(error => console.error('Error fetching initial state:', error));
}

// Call the function to fetch the initial state when the page loads
window.onload = fetchInitialState;
