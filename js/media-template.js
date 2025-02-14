const OMDB_API_KEY = 'f2eda4e9';

// Récupérer l'identifiant du film depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const filmId = urlParams.get('id');

fetch('./js/movies.json')
   .then(response => response.json())
   .then(data => {
       const filmData = data.find(film => film.id === filmId);
       if (filmData) {
           // Remplir les éléments de la page avec les données du film
           document.title = filmData.title + " - Nitflex";
           document.getElementById('title-big').src = filmData.logo;
           document.getElementById('title').src = filmData.logo;
           document.getElementById('director').textContent = `par ` + filmData.director;
           document.getElementById('text').innerHTML = filmData.year + " \u25CF " + filmData.genre + " \u25CF " + filmData.duration + " \u25CF " + `<i class="fa fa-star" aria-hidden="true"></i>` + filmData.note;                  
           document.getElementById('actors').textContent = `Avec ` + filmData.actors;
           document.getElementById('synopsis').textContent = filmData.synopsis;
           document.getElementById('bg').src = filmData.bg;
           // Ajouter autoplay et mute à la bande-annonce
           const videoId = filmData.trailer.split("embed/")[1];  // extrait l'ID de la vidéo
           const trailerUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`;
           document.getElementById('trailer').src = trailerUrl;
           const photosContainer = document.getElementById('photos');

            // Ajouter les photos
            filmData.photos.forEach(photo => {
                const photoBx = document.createElement('section');
                photoBx.className = `photoBx`
                photoBx.innerHTML = `<img src="${photo}"></img>`;                
                photosContainer.appendChild(photoBx);
            });           
       }       
   })
   .catch(error => console.error('Erreur de chargement des données :', error));
   