import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddPokemonAdditional = () => {
  const [ownerNames, setOwnerNames] = useState([]);  
  const [formData, setFormData] = useState({
    pokemonOwnerName: '',
    pokemonName: '',
    pokemonAbility: '',
    noOfPokemon: 1
  });
  const navigate = useNavigate();

  useEffect(() => {
    
    fetch('http://localhost:3001/api/owners')
      .then(response => response.json())
      .then(data => setOwnerNames(data))
      .catch(error => console.error('Error fetching owners:', error));
  }, []);
     
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const pokemonData = Array.from({ length: formData.noOfPokemon }, (_, index) => ({
      id: `${formData.pokemonOwnerName}-${formData.pokemonName}-${index}`,
      pokemonOwnerName: formData.pokemonOwnerName,
      pokemonName: formData.pokemonName,
      pokemonAbility: formData.pokemonAbility
    }));

    
    fetch('http://localhost:3001/api/pokemon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pokemonData)
    })
      .then(response => response.json())
      .then(() => {
        navigate('/list'); 
      })
      .catch(error => console.error('Error adding Pokémon:', error));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Add Pokémon</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Owner:</label>
          <select
            name="pokemonOwnerName"
            value={formData.pokemonOwnerName}
            onChange={handleChange}
            required
            style={styles.select}
          >
            <option value="">Select Owner</option>
            {ownerNames.map(ownerName => (
              <option key={ownerName} value={ownerName}>
                {ownerName}
              </option>
            ))}
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Pokémon Name:</label>
          <input
            type="text"
            name="pokemonName"
            value={formData.pokemonName}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Pokémon Ability:</label>
          <input
            type="text"
            name="pokemonAbility"
            value={formData.pokemonAbility}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Number of Pokémon:</label>
          <input
            type="number"
            name="noOfPokemon"
            value={formData.noOfPokemon}
            onChange={handleChange}
            min="1"
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Add Pokémon</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '170px',
    maxWidth: '2000px', 
    margin: ' auto',
    border: '1px solid #444',
    borderRadius: '5px',
    background: '#121212',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    overflow: 'hidden',
  },
  title: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    background: '#333',
    color: 'white',
    border: '1px solid #555',
    borderRadius: '5px',
  },
  select: {
    padding: '10px',
    background: '#333',
    color: 'white',
    border: '1px solid #555',
    borderRadius: '5px',
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    alignSelf: 'center',
  },
};

export default AddPokemonAdditional;

