const commentInput = document.getElementById('comment-text');
const avatarInput = document.getElementById('avatar-url'); 
const postBtn = document.getElementById('post-comment-btn');
const commentsList = document.getElementById('comments-list');

postBtn.addEventListener('click', () => {
    const text = commentInput.value.trim();
    const avatarSrc = avatarInput.value.trim() || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpoR23TOoG_HqZZkhRevTxU7z4uMWAWd6mBJpwZNQId8xKxAaMspkT1vKV&s=10";

    if (text === '') {
        alert('Спочатку напишіть коментар!');
        return;
    }

    const today = new Date();
    const options = { day: 'numeric', month: 'short' };
    const dateString = today.toLocaleDateString('uk-UA', options);

    const newComment = document.createElement('div');
    newComment.className = 'comment';
    
    newComment.innerHTML = `
        <img src="${avatarSrc}" class="comment-avatar" alt="User avatar" onerror="this.src='uploads/2022/12/ava-stim-1.web'">
        <div class="comment-body">
            <strong>Ти (Гість)</strong> <span class="date">${dateString}</span>
            <p>${text}</p>
        </div>
    `;

    commentsList.prepend(newComment);

    commentInput.value = '';
    avatarInput.value = '';
});

commentInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        postBtn.click();
    }
});