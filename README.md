
# Pokemon-app

This is a full-stack application designed to manage Pokémon data. It allows users to add, edit, and delete Pokémon records. The application consists of a React frontend and an Express backend, connected to a JSON file for data storage.
## Features
Add Pokémon: Users can add new Pokémon with various attributes.
List Pokémon: View a list of all added Pokémon with options to edit or delete.
Additional Pokémon: Add multiple Pokémon at once for a selected owner.
Home Page: Display Pokémon with interactive actions such as move, freeze, and disappear.

### Technologies Used

Frontend: React, React Router
Backend: Node.js, Express
Database: JSON file (used as a mock database)
Styling: Custom CSS (no CSS frameworks used)

### steps

Installation and Setup
Follow these steps to get the application running on your local machine:

1. Clone the Repository
To get a copy of this project, clone the repository using the following command:
 ## git clone https://github.com/ishabhomle4/Pokemon-app.git
  ## cd Pokemon-app  
2. Install Dependencies
   cd client
   npm install
  cd server
  npm install
or you can install globally as well.
3. Ensure that the backend is set up to handle data storage in a JSON file. No additional configuration should be needed unless you change the data storage method.

### Run the Application
1.For client that means for frontend 
make sure you are in client
cd client
npm start
2.For Backend
node server.js

## Access the Application
Open your web browser and navigate to:
http://localhost:3000 - for frontend
 http://localhost:3001 - for backend

## Application Structure
Frontend/ client
1. src/App.js: Main application component handling routing.
2. src/components/Navigation.js: Navigation bar component.
3. src/components/AddPokemon.js: Component for adding new Pokémon.
4. src/components/PokemonList.js: Component for listing and managing Pokémon.
5. src/components/AddPokemonAdditional.js: Component for adding multiple Pokémon at once.
6. src/pages/HomePage.js: Home page displaying Pokémon with interactive actions.

## Backend
server.js: Main server file configuring Express routes.
data.json: where the data of pokemon is stored based on user activity
