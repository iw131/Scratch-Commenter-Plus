// Function to create new input fields
function createInputField(placeholder, onChange) {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = placeholder;
    input.style.marginLeft = '5px';
    input.style.width = '150px'; // Adjust width as needed
    input.style.height = '20px'; // Adjust height as needed
    input.style.fontSize = '12px'; // Adjust font size as needed
    input.addEventListener('change', onChange);
    return input;
}

// Function to add new input fields next to the comment input
function addInputFields() {
    const commentForm = document.querySelector('#comment-form .control-group.tooltip.right');
    if (commentForm) {
        // Create and add the heading
        const heading = document.createElement('div');
        heading.innerHTML = '<b>Scratch Commenter Plus by iw131</b>';
        heading.style.marginBottom = '10px';
        commentForm.parentNode.insertBefore(heading, commentForm);

        // Create and add the input fields
        const commentIdInput = createInputField('Enter Comment ID', (event) => {
            const postButton = document.querySelector('#main-post-form .button[data-control="post"]');
            postButton.setAttribute('data-parent-thread', event.target.value);
        });
        const commenteeIdInput = createInputField('Enter Commentee ID', (event) => {
            const postButton = document.querySelector('#main-post-form .button[data-control="post"]');
            postButton.setAttribute('data-commentee-id', event.target.value);
        });
        commentForm.appendChild(commentIdInput);
        commentForm.appendChild(commenteeIdInput);
    }
}

// Function to display comment ID next to each comment
function displayCommentIds() {
    const comments = document.querySelectorAll('.comment');
    comments.forEach(comment => {
        const commentId = comment.getAttribute('data-comment-id');
        if (commentId) {
            const commentIdDisplay = document.createElement('span');
            commentIdDisplay.textContent = `Comment ID: ${commentId}`;
            commentIdDisplay.style.display = 'block';
            commentIdDisplay.style.marginTop = '5px';
            const reportButton = comment.querySelector('.report-button');
            if (reportButton) {
                reportButton.insertAdjacentElement('afterend', commentIdDisplay);
            } else {
                comment.appendChild(commentIdDisplay);
            }
        }
    });
}

// Run the functions
addInputFields();
displayCommentIds();
