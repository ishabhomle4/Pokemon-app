import React, { useState, useEffect, useRef } from 'react';

const CIRCLE_SIZE = 50;
const CIRCLE_COLOR = 'yellow';

const directionMap = {
  'Right': 0,
  'Down': 90,
  'Left': 180,
  'Up': 270
};

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [pokemonStates, setPokemonStates] = useState({});
  const [selectedPokemon, setSelectedPokemon] = useState('');
  const [direction, setDirection] = useState('Right');
  const [speed, setSpeed] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/owners')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetch('http://localhost:3001/api/pokemon')
        .then(response => response.json())
        .then(data => {
          const userPokemons = data.filter(pokemon => pokemon.pokemonOwnerName === selectedUser);
          setPokemons(userPokemons);
          const initialStates = {};
          userPokemons.forEach(pokemon => {
            initialStates[pokemon.id] = { ...pokemon, visible: true };
          });
          setPokemonStates(initialStates);
          if (userPokemons.length > 0) {
            const firstPokemon = userPokemons[0];
            setSelectedPokemon(firstPokemon.id);
            setDirection(firstPokemon.direction || 'Right');
            setSpeed(firstPokemon.speed || 0);
          }
        })
        .catch(error => console.error('Error fetching pokemons:', error));
    }
  }, [selectedUser]);

  useEffect(() => {
    if (selectedPokemon) {
      const pokemon = pokemonStates[selectedPokemon];
      if (pokemon) {
        setDirection(pokemon.direction || 'Right');
        setSpeed(pokemon.speed || 0);
      }
    }
  }, [selectedPokemon]);

  useEffect(() => {
    let intervalId;

    if (isMoving) {
      intervalId = setInterval(() => {
        setPokemonStates(prevStates => {
          const updatedStates = { ...prevStates };
          Object.keys(updatedStates).forEach(pokemonId => {
            const pokemon = updatedStates[pokemonId];
            if (pokemon && pokemon.visible) {
              const container = containerRef.current;
              const containerWidth = container.clientWidth;
              const containerHeight = container.clientHeight;

              
              let newPositionX = pokemon.initialPositionX + speed * Math.cos((directionMap[pokemon.direction] || 0) * Math.PI / 180);
              let newPositionY = pokemon.initialPositionY + speed * Math.sin((directionMap[pokemon.direction] || 0) * Math.PI / 180);

              
              newPositionX = Math.max(0, Math.min(newPositionX, containerWidth - CIRCLE_SIZE));
              newPositionY = Math.max(0, Math.min(newPositionY, containerHeight - CIRCLE_SIZE));

              pokemon.initialPositionX = newPositionX;
              pokemon.initialPositionY = newPositionY;
              updatedStates[pokemonId] = pokemon;
            }
          });
          return updatedStates;
        });
      }, 100); 
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId); 
  }, [isMoving, speed, direction]);

  const handlePokemonGo = () => {
    setIsMoving(true);
  };

  const handlePokemonFlee = () => {
    setPokemonStates(prevStates => {
      const updatedStates = { ...prevStates };
      Object.keys(updatedStates).forEach(pokemonId => {
        const pokemon = updatedStates[pokemonId];
        if (pokemon) {
          
          pokemon.visible = !pokemon.visible;
          updatedStates[pokemonId] = pokemon;
        }
      });
      return updatedStates;
    });
  };

  const handlePokemonCease = () => {
    setIsMoving(false);
    setPokemonStates(prevStates => {
      const updatedStates = { ...prevStates };
      Object.keys(updatedStates).forEach(pokemonId => {
        const pokemon = updatedStates[pokemonId];
        if (pokemon) {
          pokemon.speed = 0;
          updatedStates[pokemonId] = pokemon;
        }
      });
      return updatedStates;
    });
  };

  const handleSelectPokemon = (e) => {
    const pokemonId = e.target.value;
    setSelectedPokemon(pokemonId);
    const selectedPokemon = pokemonStates[pokemonId];
    if (selectedPokemon) {
      setDirection(selectedPokemon.direction || 'Right');
      setSpeed(selectedPokemon.speed || 0);
    }
  };

  const handleDirectionChange = (e) => {
    const newDirection = e.target.value;
    setDirection(newDirection);
    setPokemonStates(prevStates => {
      const updatedStates = { ...prevStates };
      const pokemon = updatedStates[selectedPokemon];
      if (pokemon) {
        pokemon.direction = newDirection;
        updatedStates[selectedPokemon] = pokemon;
      }
      return updatedStates;
    });
  };

  const handleSpeedChange = (e) => {
    const newSpeed = parseFloat(e.target.value) || 0;
    setSpeed(newSpeed);
    setPokemonStates(prevStates => {
      const updatedStates = { ...prevStates };
      const pokemon = updatedStates[selectedPokemon];
      if (pokemon) {
        pokemon.speed = newSpeed;
        updatedStates[selectedPokemon] = pokemon;
      }
      return updatedStates;
    });
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Home Page</h1>

      <div style={styles.controlPanel}>
        <select onChange={e => setSelectedUser(e.target.value)} value={selectedUser} style={styles.select}>
          <option value="">Select a user</option>
          {users.map(user => (
            <option key={user} value={user}>{user}</option>
          ))}
        </select>

        <select onChange={handleSelectPokemon} value={selectedPokemon} style={styles.select}>
          <option value="">Select a Pokémon</option>
          {pokemons.map(pokemon => (
            <option key={pokemon.id} value={pokemon.id}>{pokemon.pokemonName}</option>
          ))}
        </select>

        {selectedPokemon && (
          <div style={styles.inlineBlock}>
            <label style={styles.label}>
              Direction:
              <select value={direction} onChange={handleDirectionChange} style={styles.input}>
                {Object.keys(directionMap).map(dir => (
                  <option key={dir} value={dir}>{dir}</option>
                ))}
              </select>
            </label>
            <label style={styles.label}>
              Speed:
              <input
                type="number"
                step="0.1"
                value={speed}
                onChange={handleSpeedChange}
                style={styles.input}
              />
            </label>
          </div>
        )}
      </div>

      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={handlePokemonGo}>Pokemon Go</button>
        <button style={styles.button} onClick={handlePokemonFlee}>Pokemon Flee</button>
        <button style={styles.button} onClick={handlePokemonCease}>Pokemon Cease</button>
      </div>

      <div ref={containerRef} style={styles.container}>
        {Object.keys(pokemonStates).map(pokemonId => {
          const pokemon = pokemonStates[pokemonId];
          return pokemon.visible && (
            <div
              key={pokemon.id}
              style={{
                ...styles.circle,
                left: pokemon.initialPositionX,
                top: pokemon.initialPositionY,
              }}
            />
          );
        })}
      </div>

      <div style={styles.warning}>
        <p>Note: Pokémon movement is bounded by container size. Ensure values stay within bounds.</p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    
    backgroundColor: '#121212',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    minHeight: '100vh',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  controlPanel: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
  select: {
    marginRight: '10px',
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  inlineBlock: {
    display: 'inline-block',
    marginRight: '10px',
  },
  label: {
    marginRight: '10px',
  },
  input: {
    marginLeft: '10px',
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  buttonContainer: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    marginRight: '10px',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#6200ea',
    color: 'white',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
  container: {
    position: 'relative',
    width: '800px',
    height: '600px',
    border: '6px solid purple',
    marginBottom: '20px',
    margin: '0 auto',
  },
  circle: {
    position: 'absolute',
    width: `${CIRCLE_SIZE}px`,
    height: `${CIRCLE_SIZE}px`,
    backgroundColor: CIRCLE_COLOR,
    borderRadius: '50%',
  },
  warning: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#ff5722',
  },
};

export default HomePage;
