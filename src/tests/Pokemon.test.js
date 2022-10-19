import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa componente <Pokemon.js />', () => {
  const pokeName = 'pokemon-name';
  const pokeType = 'pokemon-type';
  const pokeWeight = 'pokemon-weight';

  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId(pokeName);
    const pokemonType = screen.getByTestId(pokeType);
    const pokemonWeight = screen.getByTestId(pokeWeight);
    const value = pokemonWeight.innerHTML;
    const name = pokemonName.innerHTML;
    const type = pokemonType.innerHTML;
    const typePoke = screen.getAllByText(`${type}`)[0];
    const txtWeight = screen.getByText(value);
    const altImg = screen.getByAltText(`${name} sprite`);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonType).toContainHTML(`<p data-testid="pokemon-type">${type}</p>`);
    expect(typePoke).toBeInTheDocument();
    expect(txtWeight).toBeInTheDocument();
    expect(altImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(altImg).toBeInTheDocument();
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
