const fs = require("fs");
const csv = require("csv-parser");

const jsonFile = "movies.json"; // Nom de ton fichier JSON
const csvFile = "images.csv"; // Nom du fichier CSV généré

// Charger le JSON
let jsonData = JSON.parse(fs.readFileSync(jsonFile, "utf8"));

// Charger le CSV et créer une correspondance {nomFichier: urlGoogleDrive}
let imageMap = {};
fs.createReadStream(csvFile)
  .pipe(csv())
  .on("data", (row) => {
    imageMap[row["Nom du fichier"]] = row["Lien direct"];
  })
  .on("end", () => {
    jsonData.forEach((item) => {
      // Remplacement des images principales
      ["image", "logo", "bg"].forEach((key) => {
        if (item[key]) {
          let fileName = item[key].split("/").pop(); // Récupère le nom du fichier seul
          if (imageMap[fileName]) {
            item[key] = imageMap[fileName]; // Remplace par le lien Google Drive
          }
        }
      });

      // Remplacement des photos (tableau d'images)
      if (Array.isArray(item.photos)) {
        item.photos = item.photos.map((photo) => {
          let fileName = photo.split("/").pop();
          return imageMap[fileName] || photo; // Remplace si trouvé, sinon garde l'original
        });
      }
    });

    // Sauvegarde du nouveau JSON mis à jour
    fs.writeFileSync(jsonFile, JSON.stringify(jsonData, null, 2));
    console.log("✅ Mise à jour du JSON terminée !");
  });
