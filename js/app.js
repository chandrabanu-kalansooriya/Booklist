class Book {
    constructor(Title, Author, ISBN) {
        this.Title = Title,
        this.Author = Author,
        this.ISBN = ISBN
    }
}

class Store {
    static get() {
        let books;
        if(localStorage.getItem('books' === null)) {
            books = [];
        }else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static add(book) {
        let books = Store.get();
        books.push(JSON.stringify(book));
        localStorage.setItem('books', books);
    }

    static remove(isbn) {
        let books = Store.get();
        books.forEach((book, index) => {
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', books);
    }
}

class UI {
    static displayBooks() {
        
        const books = Store.get();
        
        books.forEach((book) => UI.addBookToList(book));

        
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.Title}</td>
            <td>${book.Author}</td>
            <td>${book.ISBN}</td>
            <td><a href = "#" class= "btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    }

    static clearInput(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    static deleteBook(e) {
        if(e.target.classList.contains('delete')) {
            e.target.parentElement.parentElement.remove();
            UI.showAlart('Book deleted', 'success');
            Store.remove(e.target.parentElement.previousElementSibling.textContent);
        }
    }

    static showAlart(message, type) {
        const div = document.createElement('div');
        div.className = `alert alert-${type}`;
        div.appendChild(document.createTextNode(message));
        const parent = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        parent.insertBefore(div, form);

        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
}

document.addEventListener('DOMContentLoded', UI.displayBooks());

document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault(true);
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    if(title === '' || author === '' || isbn === '') {
        UI.showAlart('Plase Fill In All Fileds', 'danger');
    }else {
        const book = new Book(title, author, isbn);

        UI.addBookToList(book);
        Store.add(book);
        UI.clearInput();
        UI.showAlart('Book Added', 'success');
    }
    
});

document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e);
});

