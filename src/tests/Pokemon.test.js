import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa componente <Pokemon.js />', () => {
  const pokeName = 'pokemon-name';

  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const pikachuName = screen.getByTestId('pokemon-name');
    expect(pikachuName).toHaveTextContent('Pikachu');
    const pikachuType = screen.getByTestId('pokemon-type');
    expect(pikachuType).toHaveTextContent('Electric');
    const pikachuWeight = screen.getByTestId('pokemon-weight');
    expect(pikachuWeight).toHaveTextContent('Average weight: 6.0 kg');

    const pikachuImg = screen.getByRole('img', { name: /Pikachu sprite/i });
    expect(pikachuImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  test('Teste se o card do pokémon indicado na Pokédex contém um link de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const linkDetails = screen.getByText(/More details/i);
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);
    const summary = screen.getByRole('heading', { level: 2, name: /Summary/i });
    const url = history.location.pathname;
    expect(url).toBe('/pokemons/25');
    expect(summary).toBeInTheDocument();
  });
  test('Teste também se a URL exibida no navegador muda', () => {
    const { history } = renderWithRouter(<App />);
    const currentUrl = history.location.pathname;
    const linkDetails = screen.getByText(/More details/i);
    expect(currentUrl).toBe('/');
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);
    const newUrl = history.location.pathname;
    expect(newUrl).toBe('/pokemons/25');
  });
  test('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByText(/More details/i);
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);
    const notFavorite = screen.getByRole('checkbox', { checked: false });
    expect(notFavorite).toBeInTheDocument();
    userEvent.click(notFavorite);
    const linkFavorites = screen.getByText(/Favorite Pokémons/i);
    expect(linkFavorites).toBeInTheDocument();
    userEvent.click(linkFavorites);
    const pokemon = screen.getByTestId(pokeName);
    expect(pokemon).toBeInTheDocument();
    const pokemonName = screen.getByTestId(pokeName);
    const name = pokemonName.innerHTML;
    const altImg = screen.getByAltText(`${name} is marked as favorite`);
    expect(altImg).toBeDefined();
    const srcImg = altImg.src;
    expect(srcImg).toContain('/star-icon.svg');
  });
});
