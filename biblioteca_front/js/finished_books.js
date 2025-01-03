import { AuthManager } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    AuthManager.checkToken();
const homepageItem = document.getElementById('homepage');
const exploreItem = document.getElementById('explore');
const accountItem = document.getElementById('account');
const favoritesItem = document.getElementById('favorites');
const settingsItem = document.getElementById('settings');
const books = document.getElementById('books');
const search = document.getElementById('search');

const token = localStorage.getItem('authToken'); 
const userId = localStorage.getItem('userId');
if (!userId || !token) {
    console.error('User or token not found');
    return;
}

let url = `http://localhost:8080/api/user_books/${userId}?status=3`; 


function redirectTo(url) {
    window.location.href = url;
}

homepageItem.addEventListener('click', () => {
    redirectTo('homepage.html');
});

exploreItem.addEventListener('click', () => {
    redirectTo('explore.html');
});

accountItem.addEventListener('click', () => {
    redirectTo('account.html');
});

favoritesItem.addEventListener('click', () => {
    redirectTo('favorites.html');
});

settingsItem.addEventListener('click', () => {
    redirectTo('settings.html');
});

search.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        searchFunc();
    }
});

function getBooks() {
    books.innerHTML = '';
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            data.forEach(bookItem => {
                const book_item = document.createElement('div');
                book_item.classList.add('book_item');
                books.appendChild(book_item);

                const close = document.createElement('img');
                close.classList.add('remove_book');
                close.src = "/biblioteca_front/images/close.png";
                book_item.appendChild(close);

                const book_image = document.createElement('img');
                book_image.classList.add('book_image');
                book_image.src = `data:image/jpeg;base64,${bookItem.book.image}`;
                book_item.appendChild(book_image);

                const book_title = document.createElement('p');
                book_title.classList.add('book_title');
                book_title.textContent = bookItem.book.book_name;
                book_item.appendChild(book_title);

                const date = document.createElement('p');
                date.classList.add('finished_date');
                date.textContent = bookItem.updated_at;
                book_item.appendChild(date);

                const comment= document.createElement('div');
                comment.classList.add('comment');
                comment.textContent = 'Share your thoughts';
                book_item.appendChild(comment);

                close.addEventListener('click', () => {
                    fetch(`http://localhost:8080/api/user_books/delete/${bookItem.bookId}?userId=${bookItem.userId}&type=FINISHED`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    })
                    .then(response => {
                        if (response.ok) {
                            showSuccessMessage('Book removed successfully!');
                            setTimeout(() => {
                                window.location.reload();
                            }, 2000);
                        } else {
                            showErrorMessage('Failed to remove book.');
                        }
                    });
                });
            });
        });
}

getBooks();

function searchFunc() {
    const input = search.value.trim();
    if (input === "") {
        url = `http://localhost:8080/api/user_books/${userId}?status=3`;
    } else {
        url = `http://localhost:8080/api/user_books/${userId}?status=3&pattern=${input}`;
    }
    getBooks();
}
});