document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("Book");
  const form = document.getElementById("Form");         // Will be null on search.html
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");

  // Load books from localStorage or initialize default list (only on index.html)
  let books = JSON.parse(localStorage.getItem("books")) || [
    ["Elantris", "Brandon Sanderson", 2005],
    ["Mistborn: The Final Empire ", "Brandon Sanderson", 2006],
    ["The Hope of Elantris", "Brandon Sanderson", 2006], // Short story
    ["The Well of Ascension", "Brandon Sanderson", 2007],
    ["Alcatraz Versus the Evil Librarians", "Brandon Sanderson", 2007],
    ["Defending Elysium", "Brandon Sanderson", 2007], // Short story
    ["The Hero of Ages", "Brandon Sanderson", 2008],
    ["The Scrivener's Bone", "Brandon Sanderson", 2008],
    ["The Knights of Crystallia", "Brandon Sanderson", 2009],
    ["The Gathering Storm", "Brandon Sanderson", 2009], // Wheel of Time, with Robert Jordan
    ["Firstborn", "Brandon Sanderson", 2009], // Short story
    ["The Way of Kings", "Brandon Sanderson", 2010],
    ["Towers of Midnight", "Brandon Sanderson", 2010], // Wheel of Time, with Robert Jordan
    ["The Shattered Lens", "Brandon Sanderson", 2010],
    ["The Alloy of Law", "Brandon Sanderson", 2011],
    ["Infinity Blade: Awakening", "Brandon Sanderson", 2011], // Novella
    ["The Eleventh Metal", "Brandon Sanderson", 2012], // Short story
    ["The Emperor's Soul", "Brandon Sanderson", 2012], // Novella
    ["Legion", "Brandon Sanderson", 2012], // Novella
    ["A Memory of Light", "Brandon Sanderson", 2013], // Wheel of Time, with Robert Jordan
    ["The Rithmatist", "Brandon Sanderson", 2013],
    ["Steelheart", "Brandon Sanderson", 2013],
    ["Shadows for Silence in the Forests of Hell", "Brandon Sanderson", 2013], // Novella
    ["Sixth of the Dusk", "Brandon Sanderson", 2014], // Novella
    ["Words of Radiance", "Brandon Sanderson", 2014],
    ["Mitosis", "Brandon Sanderson", 2014], // Novella
    ["Firefight", "Brandon Sanderson", 2015],
    ["Perfect State", "Brandon Sanderson", 2015], // Novella
    ["Shadows of Self", "Brandon Sanderson", 2015],
    ["The Bands of Mourning", "Brandon Sanderson", 2016],
    ["Mistborn: Secret History", "Brandon Sanderson", 2016], // Novella
    ["Calamity", "Brandon Sanderson", 2016],
    ["White Sand Volume 1", "Brandon Sanderson", 2016], // Graphic novel, with Rik Hoskin
    ["The Dark Talent", "Brandon Sanderson", 2016],
    ["Arcanum Unbounded: The Cosmere Collection", "Brandon Sanderson", 2016], // Includes previously published stories like "The Hope of Elantris," "The Eleventh Metal," "Shadows for Silence," "Sixth of the Dusk," plus new stories
    ["Edgedancer", "Brandon Sanderson", 2016], // Novella
    ["Snapshot", "Brandon Sanderson", 2017], // Novella
    ["Oathbringer", "Brandon Sanderson", 2017],
    ["White Sand Volume 2", "Brandon Sanderson", 2018], // Graphic novel, with Rik Hoskin
    ["Legion: Skin Deep", "Brandon Sanderson", 2018], // Novella
    ["Skyward", "Brandon Sanderson", 2018],
    ["Legion: Lies of the Beholder", "Brandon Sanderson", 2018], // Novella
    ["White Sand Volume 3", "Brandon Sanderson", 2019], // Graphic novel, with Rik Hoskin
    ["Starsight", "Brandon Sanderson", 2019],
    ["Dark One Volume 1", "Brandon Sanderson", 2020], // Graphic novel, with Jackson Lanzing and Collin Kelly
    ["Dawnshard", "Brandon Sanderson", 2020], // Novella
    ["Rhythm of War", "Brandon Sanderson", 2020],
    ["Sunreach", "Brandon Sanderson", 2021], // Novella, with Janci Patterson
    ["ReDawn", "Brandon Sanderson", 2021], // Novella, with Janci Patterson
    ["Cytonic", "Brandon Sanderson", 2021],
    ["Evershore", "Brandon Sanderson", 2021], // Novella, with Janci Patterson
    ["The Lost Metal", "Brandon Sanderson", 2022],
    ["Bastille vs. the Evil Librarians", "Brandon Sanderson", 2022], // With Janci Patterson
    ["Tress of the Emerald Sea", "Brandon Sanderson", 2023],
    ["The Frugal Wizard's Handbook for Surviving Medieval England", "Brandon Sanderson", 2023],
    ["Yumi and the Nightmare Painter", "Brandon Sanderson", 2023],
    ["The Sunlit Man", "Brandon Sanderson", 2023],
    ["Defiant", "Brandon Sanderson", 2023],
    ["Wind and Truth", "Brandon Sanderson", 2024],
    ["Dad's Book", "Casey Shurtliff", 2025]
  ];

  function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
  }

  // Display books with a delete button
  function displayBooks(bookArray) {
    list.innerHTML = "";
    if (bookArray.length === 0) {
      list.innerHTML = "<li>No matching books found.</li>";
      return;
    }
    bookArray.forEach((book, index) => {
      const li = document.createElement("li");
      const p = document.createElement("p");
      p.textContent = `${book[0]} (${book[2]}) by ${book[1]} `;

      // Create delete button
      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.addEventListener("click", () => {
        // Remove book at this index from main books array
        // Note: bookArray might be filtered, so find index in full books list
        const realIndex = books.findIndex(b =>
          b[0] === book[0] && b[1] === book[1] && b[2] === book[2]
        );
        if (realIndex > -1) {
          books.splice(realIndex, 1);
          saveBooks();
          displayBooks(books);
        }
      });
      li.appendChild(p);
      li.appendChild(delBtn);
      list.appendChild(li);
    });
  }

  // If add-book form exists (index.html)
  if (form) {
    if (!localStorage.getItem("books")) {
      saveBooks(); // Save default books if not saved yet
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    displayBooks(books);

    form.addEventListener("submit", e => {
      e.preventDefault();

      const title = document.getElementById("title").value.trim();
      const author = document.getElementById("author").value.trim();
      const year = parseInt(document.getElementById("year").value.trim());

      if (title && author && !isNaN(year)) {
        const newBook = [title, author, year];
        books.push(newBook);
        saveBooks();
        displayBooks(books);
        form.reset();
        alert("Book added!");
      } else {
        alert("Please fill in all fields correctly.");
      }
    });
  }

  // Search functionality (both pages)
  if (searchForm && searchInput) {
    // Always refresh books from storage on search start
    books = JSON.parse(localStorage.getItem("books")) || [];

    searchForm.addEventListener("submit", e => {
      e.preventDefault();

      const query = searchInput.value.trim().toLowerCase();

      const filteredBooks = books.filter(book =>
        book[0].toLowerCase().includes(query) || book[1].toLowerCase().includes(query)
      );

      displayBooks(filteredBooks);
    });
  }
});
