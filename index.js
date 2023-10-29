document.addEventListener("DOMContentLoaded", () => {
    const toyCollection = document.getElementById("toy-collection");
    const toyForm = document.querySelector(".add-toy-form");
    const createToyBtn = document.querySelector("#new-toy-btn");
  
    createToyBtn.addEventListener("click", () => {
      // Toggle the form's visibility or style
      toyForm.style.display = toyForm.style.display === "none" ? "block" : "none";
    });
  
    toyForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newToyData = {
        name: e.target.name.value,
        image: e.target.image.value,
        likes: 0,
      };
  
      createNewToy(newToyData);
    });
  
    fetchToys();
  
    function fetchToys() {
      fetch("http://localhost:3000/toys")
        .then((response) => response.json())
        .then((data) => {
          data.forEach((toy) => {
            toyCollection.appendChild(createToyCard(toy));
          });
        });
    }
  
    function createToyCard(toy) {
      const card = document.createElement("div");
      card.className = "card";
      card.id = toy.id;
  
      const h2 = document.createElement("h2");
      h2.innerText = toy.name;
  
      const img = document.createElement("img");
      img.src = toy.image;
      img.className = "toy-avatar";
  
      const p = document.createElement("p");
      p.innerText = `${toy.likes} Likes`;
  
      const likeBtn = document.createElement("button");
      likeBtn.className = "like-btn";
      likeBtn.id = toy.id;
      likeBtn.innerText = "Like ❤️";
      
      likeBtn.addEventListener("click", () => {
        updateLikes(toy);
      });
  
      card.appendChild(h2);
      card.appendChild(img);
      card.appendChild(p);
      card.appendChild(likeBtn);
  
      return card;
    }
  
    function createNewToy(newToyData) {
      fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(newToyData),
      })
        .then((response) => response.json())
        .then((data) => {
          toyCollection.appendChild(createToyCard(data));
        });
    }
  
    function updateLikes(toy) {
      const newLikes = toy.likes + 1;
      
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ likes: newLikes }),
      })
        .then((response) => response.json())
        .then((data) => {
          const card = document.getElementById(data.id);
          const likesElement = card.querySelector("p");
          likesElement.innerText = `${data.likes} Likes`;
        });
    }
  });