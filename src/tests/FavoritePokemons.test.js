import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { FavoritePokemons } from '../pages';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa componente <FavoritePokemons.js />', () => {
  test('Teste se é exibida na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const notFound = screen.getByText(/No favorite pokemon found/i);
    expect(notFound).toBeInTheDocument();
  });
  test('Teste se são exibidos todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByText(/More details/i);
    userEvent.click(linkDetails);
    const notFavorite = screen.getByRole('checkbox', { checked: false });
    userEvent.click(notFavorite);
    const linkFav = screen.getByText(/Favorite Pokémons/i);
    userEvent.click(linkFav);
    const imageCard = screen.getByRole('link', { name: /More details/i });
    userEvent.click(imageCard);
  });
});
