// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
// import AddPokemon from './components/AddPokemon';
// import PokemonList from './components/PokemonList';
// import HomePage from './components/HomePage';
// import Navigation from './components/Navigation';
// // import SplashPage from './components/SplashPage';
// function App() {
//   return (
//     <Router>
//       <div className="App">
       
//         <main style={{ marginLeft: '200px', padding: '20px', flex: 1 }}></main> 
//         <Routes>
//           <Route path="/" element={<Navigation />} />
//           {/* <Route path="/" exact component={SplashPage} /> */}
//           <Route path="/" exact element={<HomePage />} />  
//           <Route path="/add" element={<AddPokemon />} />
//           <Route path="/list" element={<PokemonList />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddPokemon from './components/AddPokemon';
import PokemonList from './components/PokemonList';
import HomePage from './components/HomePage';
import Navigation from './components/Navigation';
import AddPokemonAdditional from './components/AddPokemonAdditional';


function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Navigation />
        <main style={{ marginLeft: '200px', padding: '20px', flex: 1 }}>
          <Routes>
            
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddPokemon />} />
            <Route path="/list" element={<PokemonList />} />
            <Route path="/add-additional" element={<AddPokemonAdditional />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
