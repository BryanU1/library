let myLibrary = [];
const add = document.querySelector('#add-book');
add.addEventListener('click', addBookToLibrary);
const container = document.querySelector('#grid-container');

function book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

book.prototype.info = function() {
  return this.title + "," + this.author + "," + this.pages + "," + this.read;
}

function addBookToLibrary() {
  document.getElementById('book-form').style.display = 'block';
}

function displayBooks() {
  let i = 0;
  for (const books of myLibrary) {
    const card = document.createElement('div');
    const titleText = document.createElement('h2');
    const authorText = document.createElement('p');
    const pagesText = document.createElement('p');
    const readText = document.createElement('p');
    const remove = document.createElement('button');
    const changeStatus = document.createElement('button');

    titleText.textContent = `Title: ${books.title}`;
    authorText.textContent = `Author: ${books.author}`;
    pagesText.textContent = `Pages: ${books.pages}`;
    if (books.read == 'yes') {
      readText.textContent = `Reading Status: Finished`;
    } else {
      readText.textContent = `Reading Status: In Progress`;
    }

    remove.textContent = 'Remove From Library';
    remove.setAttribute('data-index-number', `${i}`);
    remove.addEventListener('click', () => {
      myLibrary.splice(remove.dataset.indexNumber, 1);
      container.textContent = '';
      displayBooks();
    });

    changeStatus.textContent = 'Change Reading Status';
    changeStatus.setAttribute('data-index-number', `${i}`);
    changeStatus.addEventListener('click', () => {
      if (myLibrary[changeStatus.dataset.indexNumber].read == 'yes') {
        myLibrary[changeStatus.dataset.indexNumber].read = 'no';
      } else {
        myLibrary[changeStatus.dataset.indexNumber].read = 'yes';
      }
      container.textContent = '';
      displayBooks();
    });

    container.appendChild(card);
    card.append(titleText);
    card.append(authorText);
    card.append(pagesText);
    card.append(readText);
    card.append(remove);
    card.append(changeStatus);
    i++;
  }
}

function closeForm() {
  document.getElementById('book-form').style.display = 'none';
}

const book1 = new book("Harry Potter", "J.K. Rowling", 490, "yes");
const book2 = new book("On Writing", "King, Stephen", 350, "yes");
myLibrary.push(book1);
myLibrary.push(book2);

displayBooks();