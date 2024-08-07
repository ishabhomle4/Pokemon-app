import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav style={styles.nav}>
      <ul style={styles.ul}>
        <li style={styles.li}><Link to="/" style={styles.link}>Home</Link></li>
        <li style={styles.li}><Link to="/add" style={styles.link}>Add Pokémon</Link></li>
        <li style={styles.li}><Link to="/list" style={styles.link}>List Pokémon</Link></li>
        <li style={styles.li}><Link to="/add-additional" style={styles.link}>Additional Add Pokémon</Link></li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    width: '198px',
    background: '#1f1f1f',
    padding: '10px',
    position: 'fixed',
    height: '100%',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
  },
  ul: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  li: {
    marginBottom: '15px',
  },
  link: {
    textDecoration: 'none',
    color: 'white',
    fontSize: '18px',
    padding: '10px',
    display: 'block',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  },
};

export default Navigation;
