document.addEventListener('DOMContentLoaded', () => {
    const back_logo = document.getElementById('back_logo');
    const back_text = document.getElementById('back_text');
    const remove_popup = document.getElementById('remove_popup');
    const confirm_remove = document.getElementById('confirm_remove');
    const cancel_remove = document.getElementById('cancel_remove');
    const edit_collection = document.getElementById('edit_collection');
    const edit_popup = document.getElementById('edit_popup');
    const collection_img = document.getElementById('collection_img');
    const collection_title = document.getElementById('collection_title');
    const description = document.getElementById('description');
    const close_popup = document.getElementById('close_popup');
    const more = document.getElementById('more');
    const dropdown_content = document.getElementById('dropdown_content');
    const sort_dropdown = document.getElementById('sort_dropdown');
    const sort_text = document.getElementById('sort_text');
    const delete_coll = document.getElementById('delete_coll');
    const remove_collection_popup = document.getElementById('remove_collection_popup');
    const cancel_delete_coll = document.getElementById('cancel_delete');
    const books_div = document.getElementById('books');
    const empty_text = document.getElementById('empty_text');
    const search_logo = document.getElementById('search_logo');
    const search_input = document.getElementById('search_input');


    const collectionId = localStorage.getItem('collectionId');
    let url = `http://localhost:8080/api/collection_books/${collectionId}`;

    fetch(`http://localhost:8080/api/collections/${collectionId}`)
        .then(response => response.json())
        .then(collection_info => {
            collection_img.setAttribute('src', `data:image/jpeg;base64,${collection_info.cover}`);
            collection_title.innerHTML = collection_info.collection_name;
            description.innerHTML = collection_info.description;
        });

    back_logo.addEventListener('click', () => {
        window.location.href = 'collections.html';
    });

    back_text.addEventListener('click', () => {
        window.location.href = 'collections.html';
    });

    confirm_remove.addEventListener('click', () => {
        remove_popup.style.display = 'none';
    });

    cancel_remove.addEventListener('click', () => {
        remove_popup.style.display = 'none';
    });

    edit_collection.addEventListener('click', () => {
        edit_popup.style.display = 'flex';
    });

    close_popup.addEventListener('click', () => {
        edit_popup.style.display = 'none';
    });

    more.addEventListener('mouseover', () => {
        dropdown_content.style.display = 'flex';
    });

    more.addEventListener('mouseout', () => {
        dropdown_content.style.display = 'none';
    });

    dropdown_content.addEventListener('mouseover', () => {
        dropdown_content.style.display = 'flex';
    });

    dropdown_content.addEventListener('mouseout', () => {
        dropdown_content.style.display = 'none';
    });

    delete_coll.addEventListener('click', () => {
        remove_collection_popup.style.display = 'flex';
    });

    cancel_delete_coll.addEventListener('click', () => {
        remove_collection_popup.style.display = 'none';
    });

    window.onclick = function (event) {
        if (event.target == remove_popup) {
            remove_popup.style.display = 'none';
        } else if (event.target == edit_popup) {
            edit_popup.style.display = 'none';
        } else if (event.target == remove_collection_popup) {
            remove_collection_popup.style.display = 'none';
        }
    }

    search_logo.addEventListener('click', () => {
        const input = search_input.value.trim();
        if (input == "") {
            url = `http://localhost:8080/api/collection_books/${collectionId}`;
        } else {
            url = `http://localhost:8080/api/collection_books/search/${collectionId}?pattern=${input}`;
        }
        getBooks();
    });

    search_input.addEventListener('keyup',(event) => {
        if (event.key === 'Enter') {
            search_logo.click();
        }
    });

    function getBooks() {
        fetch(url)
            .then(response => response.json())
            .then(books => {
                let counter = 1;

                if (books.length === 0) {
                    empty_text.style.display = 'flex';
                }

                books_div.innerHTML = '';
                books.forEach(book => {
                    const book_item = document.createElement('div');
                    book_item.classList.add('book_item');
                    book_item.setAttribute('id', 'book_item');

                    const book_number = document.createElement('p');
                    book_number.classList.add('item_text');
                    book_number.setAttribute('id', 'book_num');
                    book_number.textContent = counter++;
                    book_item.appendChild(book_number);

                    const book_image = document.createElement('img');
                    book_image.classList.add('item_img');
                    book_image.setAttribute('id', 'book_img');
                    if (book.image) {
                        book_image.src = `data:image/jpeg;base64,${book.image}`;
                    } else {
                        book_image.src = '/biblioteca_front/images/image_not_found.png';
                    }
                    book_item.appendChild(book_image);

                    const book_name = document.createElement('p');
                    book_name.classList.add('item_text');
                    book_name.setAttribute('id', 'book_name');
                    book_name.textContent = book.book_name;
                    book_item.appendChild(book_name);

                    const book_author = document.createElement('p');
                    book_author.classList.add('item_text');
                    book_author.setAttribute('id', 'book_author');
                    book_author.textContent = book.author;
                    book_item.appendChild(book_author);

                    const book_publishing = document.createElement('p');
                    book_publishing.classList.add('item_text');
                    book_publishing.setAttribute('id', 'book_publishing');
                    book_publishing.textContent = book.publishing_house;
                    book_item.appendChild(book_publishing);

                    const book_page = document.createElement('p');
                    book_page.classList.add('item_text');
                    book_page.setAttribute('id', 'book_page');
                    book_page.textContent = book.book_page;
                    book_item.appendChild(book_page);

                    const remove_book_img = document.createElement('img');
                    remove_book_img.setAttribute('id', 'remove_book');
                    remove_book_img.src = '/biblioteca_front/images/remove_book.png';
                    book_item.appendChild(remove_book_img);

                    books_div.appendChild(book_item);

                    remove_book_img.addEventListener('click', () => {
                        remove_popup.style.display = 'flex';
                    });
                });

            });
    }
    getBooks();

    let default_sort= document.getElementById('default');
    sort_text.addEventListener('mouseover', () => {
        sort_dropdown.style.display = 'flex';
    });

    sort_text.addEventListener('mouseout', () => {
        sort_dropdown.style.display = 'none';
    });

    sort_dropdown.addEventListener('mouseover', () => {
        sort_dropdown.style.display = 'flex';
    });

    sort_dropdown.addEventListener('mouseout', () => {
        sort_dropdown.style.display = 'none';
    });


});
