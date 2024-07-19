async function displayBooks() {
    const searcField = document.getElementById("inputField").value;
    const bookData = await fetch(`https://openlibrary.org/search.json?title=${searcField}`)
    .then(function(response) {
        return response.json();
    }).then(function(data) {
        const booksDiv = document.getElementById('books');
        data.docs.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.classList.add("fixed-grid");
            bookElement.classList.add("has-3-cols");
            bookElement.innerHTML = `
                <div class="content">
                    <div class="card">
                        <div class="card-content">
                            <div class="media">
                            <div class="media-left">
                                <figure class="image is-48x48">
                                <img
                                    src="https://bulma.io/assets/images/placeholders/96x96.png"
                                    alt="Placeholder image"
                                />
                                </figure>
                            </div>
                            <div class="media-content">
                                <p class="title is-4">John Smith</p>
                                <p class="subtitle is-6">@johnsmith</p>
                            </div>
                            </div>

                            <div class="content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
                            iaculis mauris. <a>@bulmaio</a>. <a href="#">#css</a>
                            <a href="#">#responsive</a>
                            <br />
                            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
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
        });
    });
    
}