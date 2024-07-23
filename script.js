async function displayBooks() {
    const searcField = document.getElementById("inputField").value;
    const bookData = await fetch(`https://openlibrary.org/search.json?q=${searcField}&fields=cover_edition_key,title,author_name,first_sentence,first_publish_year`)
    .then(function(response) {
        return response.json();
    }).then(function(data) {
        const booksDiv = document.getElementById('books');
        booksDiv.innerHTML = '';
        data.docs.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.classList.add("fixed-grid");
            bookElement.classList.add("has-3-cols");
            if (book.cover_edition_key && book.title && book.author_name && book.first_sentence && book.first_publish_year) {
                bookElement.innerHTML = `
                    <br />
                    <div class="content">
                        <div class="card">
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-left">
                                        <figure class="image is-48x48">
                                            <img
                                                src="https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg"
                                                alt="Image"
                                            />
                                        </figure>
                                    </div>
                                    <div class="media-content" sty>
                                        <p class="title is-4">${book.title  || "Book without title"}</p>
                                        <p class="subtitle is-6">${book.author_name[0] || "Book without author"}</p>
                                    </div>
                                </div>
                                <br />
    
                                <div class="content">
                                    <b>First setence: </b> ${book.first_sentence[0] || "Book without first setence"}
                                    <br />
                                    <p><b>Publish Year</b>: ${book.first_publish_year || "Book without publish year"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                if (book.editions && book.editions.docs.length > 0) {
                    const editionsList = document.createElement('ul');
                    book.editions.docs.forEach(edition => {
                        const editionItem = document.createElement('li');
                        editionItem.textContent = edition.title;
                        editionsList.appendChild(editionItem);
                    });
                    bookElement.appendChild(editionsList);
                }
                
                booksDiv.appendChild(bookElement);
            }

        });
    });
    
}