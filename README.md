# Films Web Application using SWAPI

This is a web application built with Node.js/Express.js for server-side, and Boostrap for the front, that fetches data about Star Wars films from the SWAPI (Star Wars API) and displays them on a web page. Users can view information about each film and add them to a MongoDB database.

![Screenshot1](https://github.com/charafzi/Swapi_Nodejs-with-Docker/blob/main/Screenshots/swapiwebapp.png)
![Screenshot2](https://github.com/charafzi/Swapi_Nodejs-with-Docker/blob/main/Screenshots/mongodb.png)

## Installation

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/charafzi/Swapi_Nodejs-with-Docker.git
    ```

2. Navigate to the project directory:

    ```bash
    cd films-web-app
    ```

3. Build Docker image

    ```bash
    docker build -t swapi-webapp .
    ```
4. Pull MongoDb image from Dockerhub
    ```bash
    docker pull mongo
    ```
5. Run a Docker MongoDb container
   ```bash
    docker run -d -p 27017:27017 --name mongodb mongo
    ```
6. Run the Docker application container
   ```bash
    docker run -p 3000:3000 -d swapi-webapp
    ```
   
## Usage

1. Open your web browser and navigate to [http://localhost:3000](http://localhost:3000).

2. Click on "Afficher les films" to view the list of Star Wars films.

3. To add a film to the database, click on the "Ajouter" button next to the film.

## Dependencies

- [Express.js](https://expressjs.com/): Fast, unopinionated, minimalist web framework for Node.js.
- [body-parser](https://www.npmjs.com/package/body-parser): Node.js body parsing middleware.
- [mongoose](https://mongoosejs.com/): MongoDB object modeling tool designed to work in an asynchronous environment.
- [fetch](https://www.npmjs.com/package/fetch): A window.fetch polyfill for Node.js.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

