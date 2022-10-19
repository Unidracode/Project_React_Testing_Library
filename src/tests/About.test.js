import React from 'react';
import { screen } from '@testing-library/react';
import About from '../pages/About';
import renderWithRouter from '../renderWithRouter';

describe('Testa componente <About.js />.', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const info = screen.getByText(/This application simulates a Pokédex/i);
    expect(info).toBeDefined();
  });
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const header = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(header).toBeInTheDocument();
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const paragraph = screen.getByText(/This application simulates/i);
    expect(paragraph).toBeDefined();
  });
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const image = screen.getByAltText(/pokédex/i).src;
    expect(image).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
