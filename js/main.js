// fonction pour cacher la page de lancement au click sur démarrer
const start = document.getElementById('start')

var launch = document.querySelector('.launch')
start.addEventListener('click', launchPage)

function launchPage()
{
    launch.style.display = 'none';    
}

//ne pas jouer l'animation à chaque retour
document.addEventListener('DOMContentLoaded', () => {
    const welcomeAnimations = document.getElementById('launch-page'); // Animation d'accueil

    // Vérifie si l'animation a déjà été jouée
    if (sessionStorage.getItem('welcomePlayed') === 'true') {
        if (welcomeAnimations) {
            welcomeAnimations.style.display = 'none';            
        }
    } else {
        // Si l'animation n'a pas été jouée, joue-la et enregistre l'état
        if (welcomeAnimations) {
            // Lancer l'animation ici, si nécessaire
            sessionStorage.setItem('welcomePlayed', 'true'); // Marquer l'animation comme jouée
        }
    }
});
//
//Bouton retour vers le haut
//
// Récupérer le bouton
const scrollToTopBtn = document.getElementById("scrollToTop");

// Fonction pour afficher/masquer le bouton en fonction du défilement
window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        scrollToTopBtn.style.display = "block"; // Affiche le bouton si on a défilé
    } else {
        scrollToTopBtn.style.display = "none"; // Cache le bouton si on est en haut
    }
});

// Fonction pour remonter en haut de la page
function scrollToTop() {
    window.scrollTo({
        top: 0,
        // behavior: "smooth"
    });
}
//
//Créer le carousel 
//
fetch('./js/carousel.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(movie => {
    // Crée et insère les éléments HTML pour chaque film
        const movieContainer = document.createElement('a');
        movieContainer.setAttribute("href", `media-template.html?id=${movie.id}`);
        movieContainer.className = "mySlides fade";
        movieContainer.innerHTML = `
           <img class="logo-carousel" src="${movie.logo}"></img>
           <p class="info-carousel">${movie.duration} \u25CF ${movie.genre} \u25CF <i style="color:gold;" class="fa fa-star" aria-hidden="true"></i> ${movie.note}</p>            
           <article class="imgBx"><img src="${movie.image}" alt="${movie.title}"></article>`;
        document.getElementById('carousel').appendChild(movieContainer);        
    });

      // Vérifie que les dots sont chargés et applique showSlides
    slideIndex = 1;
    showSlides(slideIndex); // Appel ici, après le chargement complet des slides et dots
})
.catch(error => console.error('Erreur lors du chargement des données :', error));

let slideIndex = 1; // Initialiser l'index des slides

// Fonction pour passer à la prochaine slide
function plusSlides(n) {
    showSlides(slideIndex += n);
    changeFilm(); // Relancer l'animation à chaque changement de slide
}

// Fonction pour aller à une slide spécifique
function currentSlide(n) {
    showSlides(slideIndex = n);
    changeFilm(); // Relancer l'animation à chaque changement de slide
}

// Fonction pour afficher la slide en fonction de l'index
function showSlides(n) {
    let slides = document.getElementsByClassName("mySlides");
    let totalSlides = slides.length;
    let dots = document.getElementsByClassName("dot");

    if (n > totalSlides) { slideIndex = 1; }
    if (n < 1) { slideIndex = totalSlides; }

    // Réinitialise les classes pour gérer la visibilité des slides et transitions
    Array.from(slides).forEach(slide => slide.classList.remove("active", "prev", "next"));

    // Active la slide courante et les slides adjacentes
    slides[slideIndex - 1].classList.add("active");
    if (slideIndex - 2 >= 0) {
        slides[slideIndex - 2].classList.add("prev");
    } else {
        slides[totalSlides - 1].classList.add("prev");
    }

    if (slideIndex < totalSlides) {
        slides[slideIndex].classList.add("next");
    } else {
        slides[0].classList.add("next");
    }

    // Active les points de navigation (dots)
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].className += " active";        
    }
}

// Fonction pour réinitialiser et relancer l'animation du logo
function changeFilm() {
    const logos = document.querySelectorAll('.logo-carousel'); // Assure-toi que cette classe correspond à ton logo

    // Retirer l'animation (si elle est appliquée) avant de la relancer
    logos.forEach(logo => logo.classList.remove('animate'));// Enlève la classe d'animation

    // Utilise setTimeout pour redémarrer l'animation
    setTimeout(() => {
        logos.forEach(logo => logo.classList.add('animate')); // Ajoute la classe pour relancer l'animation
    }, 50); // Le délai est très court pour que l'animation redémarre juste après sa suppression
}

// Auto-démarrage du slideshow toutes les x secondes
setInterval(() => {
    plusSlides(1);
}, 7000);


//Créer les sections de films
//
function createFilmSection(id, title, logoSrc) {
    const section = document.createElement('section');
    section.id = id;
    section.className = 'film-section';
    section.innerHTML = `        
        <article class="section-title">            
            <img src="${logoSrc}" class="section-logo">
            <span>${title}</span>
        </article>                
        <article id="${id}-row" class="film-row"></article>   
    `;
    document.getElementById('movies-list').appendChild(section);
}
createFilmSection('starwars', 'Films et séries récents', 'https://res.cloudinary.com/den4g11ho/image/upload/v1739712877/starwarsctg_k4ydwz.png');
createFilmSection('harrypotter','', 'https://res.cloudinary.com/den4g11ho/image/upload/v1739712856/HarryPotterSection_hjdfiv.png');
createFilmSection('marvel',"Derniers films", 'https://res.cloudinary.com/den4g11ho/image/upload/v1739712874/MarvelSection_gcqpoe.png');

//
//Créer les catégories
//
function createCategory(id, logo) {
    const ctglink = document.createElement('a');
    ctglink.setAttribute("href", `#${id}`);    
    ctglink.className = 'category';
    ctglink.innerHTML = `
        <img src="${logo}">
    `;
    document.getElementById('categories').appendChild(ctglink);    
}
createCategory('starwars', 'https://res.cloudinary.com/den4g11ho/image/upload/v1739712877/starwarsctg_k4ydwz.png');
createCategory('harrypotter', 'https://res.cloudinary.com/den4g11ho/image/upload/v1739712856/HarryPotterSection_hjdfiv.png');
createCategory('marvel', 'https://res.cloudinary.com/den4g11ho/image/upload/v1739712874/MarvelSection_gcqpoe.png');
//
//Créer les fiches de films
//
let movies = []

fetch('./js/movies.json')
   .then(response => response.json())
   .then(data => {  
        movies = data; // Stocker les films dans une variable globale   
        // Filtres
        const starwars = data.filter(movie => movie.saga === 'Star Wars' && movie.last === true);  
        starwars.sort((a, b) => b.year - a.year);      
        const harryp = data.filter(movie => movie.saga === 'Harry Potter');
        const marvel = data.filter(movie => movie.saga === 'Marvel' && movie.last === true);

        // Génération des éléments HTML pour les films Star Wars
         starwars.forEach(movie => {            
            const movieContainer = document.createElement('a');
            movieContainer.setAttribute("href", `media-template.html?id=${movie.id}`);
            movieContainer.className = "movies";
            movieContainer.innerHTML = `                
                <video class="video" autoplay muted loop>
                    <source src="${movie.video}" type="video/mp4">
                </video> 
                <img class="imgMovie" src="${movie.image}" alt="${movie.title}">                      
                <article class="logoBx">
                    <img class="imgLogoBx" src="${movie.logo}"></img>          
                </article>
                <article class="textBx">                    
                    <h5>${movie.year}</h5>                
                    <h5>${movie.duration}</h5>                
                    <h5><i class="fa fa-star" aria-hidden="true"></i>${movie.note}</h5>                    
                </article>
                <article class="synopsis">
                    <p>${movie.synopsis}</p>
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
               <video class="video" autoplay muted loop>
                    <source src="${movie.video}" type="video/mp4">
                </video> 
                <img class="imgMovie" src="${movie.image}" alt="${movie.title}">                      
                <article class="logoBx">
                    <img class="imgLogoBx" src="${movie.logo}"></img>          
                </article>
                <article class="textBx">                    
                    <h5>${movie.year}</h5>                
                    <h5>${movie.duration}</h5>                
                    <h5><i class="fa fa-star" aria-hidden="true"></i>${movie.note}</h5>                    
                </article>
                <article class="synopsis">
                    <p>${movie.synopsis}</p>
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
               <video class="video" autoplay muted loop>
                    <source src="${movie.video}" type="video/mp4">
                </video> 
                <img class="imgMovie" src="${movie.image}" alt="${movie.title}">                      
                <article class="logoBx">
                    <img class="imgLogoBx" src="${movie.logo}"></img>          
                </article>
                <article class="textBx">                    
                    <h5>${movie.year}</h5>                
                    <h5>${movie.duration}</h5>                
                    <h5><i class="fa fa-star" aria-hidden="true"></i>${movie.note}</h5>                    
                </article>
                <article class="synopsis">
                    <p>${movie.synopsis}</p>
                </article>
            `;
               document.querySelector('#marvel-row').appendChild(movieContainer);
        });   
   })
.catch(error => console.error('Erreur lors du chargement des données :', error));

/// Récupérer les éléments du DOM
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("search");
const resultsDiv = document.getElementById("results");

const mainContent = document.getElementById("main-content");
const footerContent = document.querySelector("footer");

// Modifier le gestionnaire de recherche
searchForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Empêche le rechargement de la page

  const query = searchInput.value.toLowerCase(); // Récupère la valeur de l'input
  resultsDiv.innerHTML = ""; // Vide les anciens résultats

  // Filtrer les films
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(query)
  );

  // Afficher ou masquer les résultats
  if (filteredMovies.length > 0) {
    filteredMovies.forEach(movie => {
      const result = document.createElement('a');
      result.setAttribute("href", `media-template.html?id=${movie.id}`);
      result.className = "resultBx";
      result.innerHTML = `                       
               <img class="imgMovie" src="${movie.image}" alt="${movie.title}">
               <article class="titleBx">
                   <h3>${movie.title}</h3>         
               </article>
            `;
      resultsDiv.appendChild(result);
    });

    resultsDiv.style.display = "grid"; // Afficher les résultats
    mainContent.style.display = "none";    
    footerContent.style.display = "none";     
  } else {
    resultsDiv.textContent = "Aucun résultat trouvé.";
    resultsDiv.style.display = "block";
    mainContent.style.display = "none";
    footerContent.style.display = "none";      // Masquer la page principale
  }
});

// Ajouter un moyen de quitter les résultats
resultsDiv.addEventListener("click", () => {
  resultsDiv.style.display = "none"; // Cacher les résultats
  mainContent.style.display = "block"; // Réafficher le reste
  footerContent.style.display = "block"; 
});
