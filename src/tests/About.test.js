import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente <About.js />.', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/About');
    const info = screen.getByText(/This application simulates a Pokédex/i);
    expect(info).toBeDefined();
  });
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/About');
    const h2 = screen.getByRole('heading', { level: 2, name: /About Pokédex /i });
    expect(h2).toBeInTheDocument();
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/About');
    const paragraph = screen.getByText(/This application simulates/i);
    expect(paragraph).toBeDefined();
  });
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/About');
    const image = screen.getByAltText(/Pokédex/i).src;
    expect(image).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
