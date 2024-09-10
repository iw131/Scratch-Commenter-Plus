function createInputField(placeholder, onChange) {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = placeholder;
    input.style.marginLeft = '5px';
    input.style.width = '150px';
    input.style.height = '20px'; 
    input.style.fontSize = '12px'; 
    input.addEventListener('change', onChange);
    return input;
}

function addInputFields() {
    const commentForm = document.querySelector('#comment-form .control-group.tooltip.right');
    if (commentForm) {
        const heading = document.createElement('div');
        heading.innerHTML = '<b>Scratch Commenter Plus by iw131</b>';
        heading.style.marginBottom = '10px';
        commentForm.parentNode.insertBefore(heading, commentForm);
        
        const commentIdInput = createInputField('Enter Comment ID', (event) => {
            const postButton = document.querySelector('#main-post-form .button[data-control="post"]');
            postButton.setAttribute('data-parent-thread', event.target.value);
        });
        
        const commenteeIdInput = createInputField('Enter User/Commentee ID', (event) => {
            const postButton = document.querySelector('#main-post-form .button[data-control="post"]');
            postButton.setAttribute('data-commentee-id', event.target.value);
        });
        
        commentForm.appendChild(commentIdInput);
        commentForm.appendChild(commenteeIdInput);
    }
}

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

    comments.forEach(comment => {
        const commenteeId = comment.getAttribute('data-commentee-id');
        if (commenteeId) {
            const commenteeIdDisplay = document.createElement('span');
            commenteeIdDisplay.textContent = `User/Commentee ID: ${commenteeId}`;
            commenteeIdDisplay.style.display = 'block';
            commenteeIdDisplay.style.marginTop = '5px';
            const reportButton = comment.querySelector('.report-button');
            if (reportButton) {
                reportButton.insertAdjacentElement('afterend', commenteeIdDisplay);
            } else {
                comment.appendChild(commenteeIdDisplay);
            }
        }
    });
}

addInputFields();
displayCommentIds();
