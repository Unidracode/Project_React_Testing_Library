import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa componente <Pokedex.js />', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const header = screen.getByRole('heading', { level: 2, name: /Encountered pokémons/i });
    expect(header).toBeInTheDocument();
  });
  test('Teste se é exibido o próximo pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);
    const next = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(next);
    const nextPoke = screen.getByText(/Charmander/i);
    expect(next).toBeInTheDocument();
    expect(nextPoke).toBeInTheDocument();
  });
  test('Teste se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);
    const firstPoke = screen.getByText(/Pikachu/i);
    const next = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(next);
    const secondPoke = screen.getByText(/Charmander/i);
    expect(firstPoke).toBeInTheDocument();
    expect(secondPoke).toBeInTheDocument();
  });
  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: /All/i });
    const buttonElectric = screen.getByRole('button', { name: /Electric/i });
    const buttonFire = screen.getByRole('button', { name: /Fire/i });
    const buttonBug = screen.getByRole('button', { name: /Bug/i });
    const buttonPoison = screen.getByRole('button', { name: /Poison/i });
    const buttonPsychic = screen.getByRole('button', { name: /Psychic/i });
    const buttonNormal = screen.getByRole('button', { name: /Normal/i });
    const buttonDragon = screen.getByRole('button', { name: /Dragon/i });
    expect(buttonAll).toBeInTheDocument();
    expect(buttonElectric).toBeInTheDocument();
    expect(buttonFire).toBeInTheDocument();
    expect(buttonBug).toBeInTheDocument();
    expect(buttonPoison).toBeInTheDocument();
    expect(buttonPsychic).toBeInTheDocument();
    expect(buttonNormal).toBeInTheDocument();
    expect(buttonDragon).toBeInTheDocument();
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const type = screen.getAllByTestId('pokemon-type-button')[1];
    userEvent.click(type);
    expect(type).toBeInTheDocument();
    const buttonAll = screen.getByRole('button', { name: /All/i });
    const next = screen.getByRole('button', { name: /Próximo Pokémon/i });
    userEvent.click(buttonAll);
    userEvent.click(next);
    const secondPoke = screen.getByText(/Charmander/i);
    expect(buttonAll).toBeInTheDocument();
    expect(secondPoke).toBeInTheDocument();
  });
});
