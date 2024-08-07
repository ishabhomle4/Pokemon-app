import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    pokemonName: '',
    pokemonAbility: '',
    initialPositionX: '',
    initialPositionY: '',
    speed: '',
    direction: ''
  });

  useEffect(() => {
    fetch('http://localhost:3001/api/pokemon')
      .then(response => response.json())
      .then(data => setPokemons(data))
      .catch(error => console.error('Error fetching Pokémon:', error));
  }, []);

  const handleEditClick = (pokemon) => {
    setEditingId(pokemon.id);
    setEditFormData({
      pokemonName: pokemon.pokemonName,
      pokemonAbility: pokemon.pokemonAbility,
      initialPositionX: pokemon.initialPositionX,
      initialPositionY: pokemon.initialPositionY,
      speed: pokemon.speed,
      direction: pokemon.direction
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSaveClick = (id) => {
    fetch(`http://localhost:3001/api/pokemon/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editFormData)
    })
      .then(response => response.json())
      .then(() => {
        setPokemons(pokemons.map(pokemon =>
          pokemon.id === id ? { ...pokemon, ...editFormData } : pokemon
        ));
        setEditingId(null);
      })
      .catch(error => console.error('Error updating Pokémon:', error));
  };

  const handleCancelClick = () => {
    setEditingId(null);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/api/pokemon/${id}`, {
      method: 'DELETE'
    }).then(() => {
      setPokemons(pokemons.filter(pokemon => pokemon.id !== id));
    })
      .catch(error => console.error('Error deleting Pokémon:', error));
  };

  const handleDeleteAll = () => {
    fetch(`http://localhost:3001/api/pokemon`, {
      method: 'DELETE'
    }).then(() => {
      setPokemons([]);
    })
      .catch(error => console.error('Error deleting all Pokémon:', error));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>List of Pokémon Users</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            {['Pokemon Owner Name', 'Pokemon Name', 'Pokemon Ability', 'Initial Position X', 'Initial Position Y', 'Speed', 'Direction', 'No. of Pokémon', 'Add Pokémon', 'Edit', 'Delete'].map(header => (
              <th key={header} style={styles.tableHeader}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pokemons.map(pokemon => (
            <tr key={pokemon.id} style={styles.tableRow}>
              <td style={styles.tableCell}>{pokemon.pokemonOwnerName}</td>
              <td style={styles.tableCell}>
                {editingId === pokemon.id ? (
                  <input
                    type="text"
                    name="pokemonName"
                    value={editFormData.pokemonName}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                ) : (
                  pokemon.pokemonName
                )}
              </td>
              <td style={styles.tableCell}>
                {editingId === pokemon.id ? (
                  <input
                    type="text"
                    name="pokemonAbility"
                    value={editFormData.pokemonAbility}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                ) : (
                  pokemon.pokemonAbility
                )}
              </td>
              <td style={styles.tableCell}>
                {editingId === pokemon.id ? (
                  <input
                    type="number"
                    name="initialPositionX"
                    value={editFormData.initialPositionX}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                ) : (
                  pokemon.initialPositionX
                )}
              </td>
              <td style={styles.tableCell}>
                {editingId === pokemon.id ? (
                  <input
                    type="number"
                    name="initialPositionY"
                    value={editFormData.initialPositionY}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                ) : (
                  pokemon.initialPositionY
                )}
              </td>
              <td style={styles.tableCell}>
                {editingId === pokemon.id ? (
                  <input
                    type="number"
                    name="speed"
                    value={editFormData.speed}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                ) : (
                  pokemon.speed
                )}
              </td>
              <td style={styles.tableCell}>
                {editingId === pokemon.id ? (
                  <input
                    type="text"
                    name="direction"
                    value={editFormData.direction}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                ) : (
                  pokemon.direction
                )}
              </td>
              <td style={styles.tableCell}>
                {pokemons.filter(p => p.pokemonOwnerName === pokemon.pokemonOwnerName).length}
              </td>
              <td style={{ ...styles.tableCell, textAlign: 'center' }}>
                <Link to={`/add?owner=${pokemon.pokemonOwnerName}`}>
                  <button style={styles.button}>+</button>
                </Link>
              </td>
              <td style={{ ...styles.tableCell, textAlign: 'center' }}>
                {editingId === pokemon.id ? (
                  <>
                    <button style={styles.button} onClick={() => handleSaveClick(pokemon.id)}>Save</button>
                    <button style={styles.button} onClick={handleCancelClick}>Cancel</button>
                  </>
                ) : (
                  <button style={styles.button} onClick={() => handleEditClick(pokemon)}>Edit</button>
                )}
              </td>
              <td style={{ ...styles.tableCell, textAlign: 'center' }}>
                <button style={styles.button} onClick={() => handleDelete(pokemon.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={styles.deleteAllContainer}>
        <button style={styles.button} onClick={handleDeleteAll}>Delete All</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    margin: '0',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#121212',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    maxWidth: '1200px',
  },
  tableHeader: {
    border: '1px solid #444',
    padding: '10px',
    backgroundColor: '#333',
  },
  tableRow: {
    borderBottom: '1px solid #444',
  },
  tableCell: {
    border: '1px solid #444',
    padding: '10px',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    padding: '8px',
    background: '#333',
    color: 'white',
    border: '1px solid #555',
    borderRadius: '5px',
  },
  button: {
    padding: '5px 10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  deleteAllContainer: {
    marginTop: '10px',
    textAlign: 'right',
    width: '100%',
    maxWidth: '1200px',
  },
};

export default PokemonList;
