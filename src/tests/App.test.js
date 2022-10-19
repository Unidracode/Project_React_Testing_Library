import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { screen } from '@testing-library/react';

describe('Testa Componente <App.js />', () => {
  test('O primeiro link deve possuir o texto Home', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /Home/i });
    expect(homeLink).toBeInTheDocument();
  });
  test('O segundo link deve possuir o texto About', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /About/i });
    expect(aboutLink).toBeInTheDocument();
  });
  test('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const favoritePokemonsLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoritePokemonsLink).toBeInTheDocument();
  });
});
