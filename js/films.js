//Créer les sections de films
//
function createFilmSection(id, logo, bg1, bg2, side1, side2) {
    const section = document.createElement('section');
    section.id = id;
    section.className = 'film-section';
    section.innerHTML = ` 
        <article class="section-title">
            <article class="section-bg">
                <img class="bg-one" src="${bg1}"></img>
                <img class="bg-two" src="${bg2}"></img>
            </article>
            <img class="section-logo" src="${logo}"></img>
        </article>    
        <article class="side-picture">
            <img class="bg-one" src="${side1}"></img>
            <img class="bg-two" src="${side2}"></img>
        </article>                          
        <article id="${id}-row" class="film-row"></article>   
    `;
    document.getElementById('main-content').appendChild(section);
}
createFilmSection('starwars', 'https://res.cloudinary.com/den4g11ho/image/upload/v1739712877/starwarsctg2_c2xp6g.png', './img/sections/starwars_bg_1.jpg', './img/sections/starwars_bg_2.jpg','./img/sections/starwarside1.jpg','./img/sections/starwarside2.jpg' );
createFilmSection('harrypotter', 'https://res.cloudinary.com/den4g11ho/image/upload/v1739712856/HarryPotterSection_hjdfiv.png', './img/sections/hp_bg_1.jpg', './img/sections/hp_bg_2.jpg', './img/sections/harrypotterside1.jpg','./img/sections/harrypotterside2.jpg');
createFilmSection('marvel','https://res.cloudinary.com/den4g11ho/image/upload/v1739712874/MCU_g7bxou.png', './img/sections/mcu_bg_1.jpg', './img/sections/mcu_bg_2.jpg', './img/sections/mcuside1.jpg','./img/sections/mcuside2.jpg' );
createFilmSection('jurassicpark','https://res.cloudinary.com/den4g11ho/image/upload/v1739712854/jurassicpark-section_gh3mkr.png', './img/sections/jurassicpark_bg_1.jpg', './img/sections/jurassicpark_bg_2.jpg', './img/sections/jurassicpark_side1.jpg','./img/sections/jurassicpark_side2.jpg' );
createFilmSection('lordofrings','https://res.cloudinary.com/den4g11ho/image/upload/v1739712855/lordofrings-section_h0fell.png', './img/sections/lordofrings_bg_1.jpg', './img/sections/lordofrings_bg_2.jpg', './img/sections/lordofrings_side1.jpg','./img/sections/lordofrings_side2.jpg' );

fetch('./js/movies.json')
   .then(response => response.json())
   .then(data => {  
        movies = data; // Stocker les films dans une variable globale   
        // Filtres
        const starwars = data.filter(movie => movie.saga === 'Star Wars'); 
        starwars.sort((a, b) => new Date(b.release) - new Date(a.release));                          
        const harryp = data.filter(movie => movie.saga === 'Harry Potter');
        const marvel = data.filter(movie => movie.saga === 'Marvel');
        marvel.sort((a, b) => new Date(b.release) - new Date(a.release)); 
        const jurassicPark = data.filter(movie => movie.saga === 'Jurassic Park');  
        const lordofrings = data.filter(movie => movie.saga === 'Tolkien');        

        // Génération des éléments HTML pour les films Star Wars
         starwars.forEach(movie => {            
            const movieContainer = document.createElement('a');
            movieContainer.setAttribute("href", `media-template.html?id=${movie.id}`);
            movieContainer.className = "movies";
            movieContainer.innerHTML = `         
                <img class="imgMovie" src="${movie.image}" alt="${movie.title}">                      
                <article class="titleBx">
                    <h3>${movie.title}</h3>          
                </article>
                <article class="textBx">                    
                    <p>
                        ${movie.year} <i class="fa fa-circle" aria-hidden="true"></i>
                        ${movie.duration}<i class="fa fa-circle" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>${movie.note}
                    </p>                                
                </article>         
            `;
            document.querySelector('#starwars-row').appendChild(movieContainer);
        });        
        // Génération des éléments HTML pour les films Harry Potter
        harryp.forEach(movie => {
            const movieContainer = document.createElement('a');
            movieContainer.setAttribute("href", `media-template.html?id=${movie.id}`);
            movieContainer.className = "movies";
            movieContainer.innerHTML = `            
               <img class="imgMovie" src="${movie.image}" alt="${movie.title}">                      
                <article class="titleBx">
                    <h3>${movie.title}</h3>          
                </article>
                <article class="textBx">                    
                    <p>
                        ${movie.year} <i class="fa fa-circle" aria-hidden="true"></i>
                        ${movie.duration}<i class="fa fa-circle" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>${movie.note}
                    </p>                                
                </article>   
            `;
               document.querySelector('#harrypotter-row').appendChild(movieContainer);
           });
        // Génération des éléments HTML pour les films Marvel   
        marvel.forEach(movie => {
            const movieContainer = document.createElement('a');
            movieContainer.setAttribute("href", `media-template.html?id=${movie.id}`);
            movieContainer.className = "movies";
            movieContainer.innerHTML = `            
               <img class="imgMovie" src="${movie.image}" alt="${movie.title}">                      
                <article class="titleBx">
                    <h3>${movie.title}</h3>          
                </article>
                <article class="textBx">                    
                    <p>
                        ${movie.year} <i class="fa fa-circle" aria-hidden="true"></i>
                        ${movie.duration}<i class="fa fa-circle" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>${movie.note}
                    </p>                                
                </article>    
            `;
               document.querySelector('#marvel-row').appendChild(movieContainer);
        });  
        jurassicPark.forEach(movie => {
            const movieContainer = document.createElement('a');
            movieContainer.setAttribute("href", `media-template.html?id=${movie.id}`);
            movieContainer.className = "movies";
            movieContainer.innerHTML = `            
               <img class="imgMovie" src="${movie.image}" alt="${movie.title}">                      
                <article class="titleBx">
                    <h3>${movie.title}</h3>          
                </article>
                <article class="textBx">                    
                    <p>
                        ${movie.year} <i class="fa fa-circle" aria-hidden="true"></i>
                        ${movie.duration}<i class="fa fa-circle" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>${movie.note}
                    </p>                                
                </article>    
            `;
               document.querySelector('#jurassicpark-row').appendChild(movieContainer);
        });
        lordofrings.forEach(movie => {
            const movieContainer = document.createElement('a');
            movieContainer.setAttribute("href", `media-template.html?id=${movie.id}`);
            movieContainer.className = "movies";
            movieContainer.innerHTML = `            
               <img class="imgMovie" src="${movie.image}" alt="${movie.title}">                      
                <article class="titleBx">
                    <h3>${movie.title}</h3>          
                </article>
                <article class="textBx">                    
                    <p>
                        ${movie.year} <i class="fa fa-circle" aria-hidden="true"></i>
                        ${movie.duration}<i class="fa fa-circle" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>${movie.note}
                    </p>                                
                </article>    
            `;
               document.querySelector('#lordofrings-row').appendChild(movieContainer);
        });   
   })
.catch(error => console.error('Erreur lors du chargement des données :', error));

// Récupérer tous les titres et les sections associées
const titles = document.querySelectorAll(".section-title");
const sections = document.querySelectorAll(".film-row");
const backgrounds = document.querySelectorAll(".section-bg");
const sidepictures = document.querySelectorAll(".side-picture")

// Associer les événements pour chaque titre
titles.forEach((title, index) => {
  const section = sections[index]; // Associer chaque titre à sa section correspondante
  const background = backgrounds[index]; 
  const sidepicture = sidepictures[index];

  title.addEventListener("click", () => {
    if (!section.classList.contains("expanded")) {
      // Calculer la hauteur réelle de la section
      const height = section.scrollHeight + "px";
      section.style.height = height; // Appliquer la hauteur réelle
      section.classList.add("expanded");
      title.classList.add("moveleft");
      background.classList.add("remove");
      sidepicture.classList.add("fadein")

      // Réinitialiser la hauteur après l'animation pour garder la flexibilité
      setTimeout(() => {
        section.style.height = "auto";
      }, 300); // La durée doit correspondre à la durée de la transition CSS
    } else {
      section.style.height = section.scrollHeight + "px"; // Réinitialiser à la hauteur actuelle
      setTimeout(() => {
        section.style.height = "0";
        section.classList.remove("expanded");
        title.classList.remove("moveleft");
        background.classList.remove("remove");
        sidepicture.classList.remove("fadein")
      }, 10); // Légère pause pour activer l'animation
    }
  });
});
