import React, { useState, useEffect } from 'react';

const AddPokemon = () => {
  const [pokemonOwnerName, setPokemonOwnerName] = useState('');
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonAbility, setPokemonAbility] = useState('');
  const [initialPositionX, setInitialPositionX] = useState('');
  const [initialPositionY, setInitialPositionY] = useState('');
  const [speed, setSpeed] = useState('');
  const [direction, setDirection] = useState('');
  const [pokemonNames, setPokemonNames] = useState([]);
  const [abilities, setAbilities] = useState([]);

  useEffect(() => {
    
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
      .then(response => response.json())
      .then(data => setPokemonNames(data.results));
  }, []);

  const handlePokemonNameChange = (e) => {
    const selectedPokemon = e.target.value;
    setPokemonName(selectedPokemon);

    if (selectedPokemon) {
      
      fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`)
        .then(response => response.json())
        .then(data => {
          const abilities = data.abilities.map(ability => ({
            name: ability.ability.name,
            url: ability.ability.url
          }));
          setAbilities(abilities);
          if (abilities.length === 1) {
            setPokemonAbility(abilities[0].name);
          } else {
            setPokemonAbility('');
          }
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPokemon = {
      pokemonOwnerName,
      pokemonName,
      pokemonAbility,
      initialPositionX,
      initialPositionY,
      speed,
      direction
    };

    fetch('http://localhost:3001/api/pokemon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPokemon)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Pokemon added:', data);
        
      });
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Create Pokémon User</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={pokemonOwnerName}
          onChange={e => setPokemonOwnerName(e.target.value)}
          placeholder="Pokemon Owner Name"
          style={styles.input}
        />
        <select value={pokemonName} onChange={handlePokemonNameChange} style={styles.select}>
          <option value="">Select Pokémon</option>
          {pokemonNames.map(pokemon => (
            <option key={pokemon.name} value={pokemon.name}>
              {pokemon.name}
            </option>
          ))}
        </select>
        <select value={pokemonAbility} onChange={e => setPokemonAbility(e.target.value)} style={styles.select}>
          {abilities.length > 0 ? (
            abilities.map(ability => (
              <option key={ability.name} value={ability.name}>
                {ability.name}
              </option>
            ))
          ) : (
            <option value="">Select Ability</option>
          )}
        </select>
        <input
          type="number"
          value={initialPositionX}
          onChange={e => setInitialPositionX(e.target.value)}
          placeholder="Initial Position X"
          style={styles.input}
        />
        <input
          type="number"
          value={initialPositionY}
          onChange={e => setInitialPositionY(e.target.value)}
          placeholder="Initial Position Y"
          style={styles.input}
        />
        <input
          type="number"
          value={speed}
          onChange={e => setSpeed(e.target.value)}
          placeholder="Speed"
          style={styles.input}
        />
        <input
          type="text"
          value={direction}
          onChange={e => setDirection(e.target.value)}
          placeholder="Direction"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Add Pokémon</button>
      </form>
    </div>
  );
};

const styles = {
  page: {
    padding: '20px',
    margin: '0',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#121212',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    marginBottom: '20px',
  },
  form: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
    width: '80%',
    maxWidth: '800px',
    border: '1px solid #444',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: '#282828',
  },
  input: {
    padding: '10px',
    background: '#333',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    gridColumn: 'span 2',
  },
  select: {
    padding: '10px',
    background: '#333',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    gridColumn: 'span 1',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    gridColumn: 'span 2',
    cursor: 'pointer',
  },
};

export default AddPokemon;
