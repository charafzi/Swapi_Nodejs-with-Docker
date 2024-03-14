const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Film = require("./film");

const PORT = 3000;
const app = express();
app.use(bodyParser.json());

// fichers static du dossier "public"
app.use(express.static("public"));

//fonction qui récupère le JSON d'un API
async function fetchData(dataLink) {
  try {
    const response = await fetch(dataLink);

    if (!response.ok) {
      throw new Error("Problème de récupération des données de API!");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

app.get("/films", async (request, response) => {
  try {
    let filmsHTML = `<!DOCTYPE html>
    <html lang='en'>
      <head>
        <meta charset='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='stylesheet' href='css/bootstrap.min.css'>
        <title>Films</title>
      </head>
      <nav class='navbar navbar-expand navbar-dark bg-dark' style='margin-bottom: 20px ;'>
        <div class='container'>
          <a href='#' class='navbar-brand'>Films</a>
        </div>  
      </nav>
      <div class='container'>`;

    const data = await fetchData(
      "https://swapi.py4e.com/api/films/?format=json"
    ); // attendre la résolution

    var id = 1;
    for (let i = 0; i < data.results.length; i++) {
      const film = data.results[i];
      console.log(film.title);

      filmsHTML += "<div class='card'>";
      filmsHTML += "<div class='card-body'>";
      filmsHTML +=
        "<h2 class='card-title' style='color: #0047AB;'>" +
        film.title +
        "</h2>";
      filmsHTML += "<div class='card-text'>";
      filmsHTML += "<div class='container'>";

      filmsHTML += "<div class='row'>";
      filmsHTML += "<div class='col'><b>Episode Id :</b></div>";
      filmsHTML += "<div class='col'>" + film.episode_id + "</div>";
      filmsHTML += "</div>";

      filmsHTML += "<div class='row'>";
      filmsHTML += "<div class='col'><p>" + film.opening_crawl + "</p></div>";
      filmsHTML += "</div>";

      filmsHTML += "<div class='row'>";
      filmsHTML += "<div class='col'><b>Director :</b></div>";
      filmsHTML += "<div class='col'>" + film.director + "</div>";
      filmsHTML += "</div>";

      const producers = film.producer.split(",");
      filmsHTML += "<div class='row'>";
      filmsHTML += "<div class='col'><b>Producers :</b></div>";
      for (let j = 0; j < producers.length; j++) {
        filmsHTML += "<div class='col'>" + producers[j] + "</div>";
      }
      filmsHTML += "</div>";

      filmsHTML += "<div class='row'>";
      filmsHTML += "<div class='col'><b>Release date :</b></div>";
      filmsHTML += "<div class='col'><b>" + film.release_date + "</b></div>";
      filmsHTML += "</div>";
      filmsHTML += "<form method='post' action='/films/" + id + "'>";
      filmsHTML += "<div class='row'>";
      filmsHTML +=
        "<div class='col'><button class='btn btn-primary' type='submit'>Ajouter</button></div>";
      filmsHTML += "</div>";
      filmsHTML += "</form>";
      filmsHTML += "</div>";
      filmsHTML += "</div>";
      filmsHTML += "</div>";
      filmsHTML += "</div><br>";
      id = id + 1;
    }
    filmsHTML += `</div>
    <script src="js/bootstrap.bundle.js"></script>
    </body>
  </html>`;

    response.send(filmsHTML);
  } catch (error) {
    response.status(500).send("Problème dans le serveur.");
  }
});

app.get("/", (request, response) => {
  response.send(`<!DOCTYPE html>
    <html lang='en'>
      <head>
        <meta charset='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='stylesheet' href='css/bootstrap.min.css'>
        <title>Films</title>
      </head>
      <nav class='navbar navbar-expand navbar-dark bg-dark' style='margin-bottom: 20px ;'>
        <div class='container'>
          <a href='#' class='navbar-brand'>Films</a>
        </div>  
      </nav>
      <body>
      <div class='container'>
      <form action="/redirect" method="POST">
      <button class='btn btn-primary'>Afficher les films</button>
      </form>
      </div>
      </body>
    </html>
      `);
});

app.post("/films/:id", async (request, response) => {
  try {
    const data1 = await fetchData(
      "https://swapi.py4e.com/api/films/" + request.params.id + "/?format=json"
    );

    const film = new Film({
      title: data1.title,
      episode_id: data1.episode_id,
      director: data1.director,
      producer: data1.producer,
      release_date: data1.release_date,
    });

    await film.save();
    response
      .status(201)
      .json({ message: "Film bien enregistré !", film: film.toObject() });
  } catch (error) {
    response
      .status(500)
      .json({ message: "Problème lors de l'enregistrement !" });
  }
});

app.post("/redirect", (request, response) => {
  response.redirect("/films");
});

mongoose
  .connect("mongodb://172.17.0.2:27017/films", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Bien connecté dans MongoDb");
  })
  .catch((error) => {
    console.error("Problème lors de la connexion MongoDB", error);
  });

app.listen(PORT, () => {
  console.log("Started on port " + PORT);
});
