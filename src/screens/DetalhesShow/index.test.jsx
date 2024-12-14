import React from 'react';
import { render } from '@testing-library/react-native';
import DetalheShowScreen from './DetalheShowScreen'; // Ajuste o caminho conforme necessário
import { VITE_IMG_URL } from '../../../config';

// Mock dos dados do filme
const mockMovie = {
  title: 'Filme de Exemplo',
  overview: 'Esta é uma sinopse de exemplo.',
  runtime: 120,
  genres: [{ name: 'Ação' }, { name: 'Aventura' }],
  release_date: '2024-12-14',
  adult: false,
  production_countries: [{ name: 'EUA' }, { name: 'Brasil' }],
  poster_path: '/path-to-image.jpg',
};

describe('DetalheShowScreen', () => {
  it('deve exibir corretamente os detalhes do filme', () => {
    const { getByText, getByTestId } = render(
      <DetalheShowScreen route={{ params: { movie: mockMovie } }} />
    );

    // Verifica se o título, sinopse, duração e outros detalhes estão presentes
    expect(getByText('Filme de Exemplo')).toBeTruthy();
    expect(getByText('Esta é uma sinopse de exemplo.')).toBeTruthy();
    expect(getByText('Duração: 120 minutos')).toBeTruthy();
    expect(getByText('Gêneros: Ação, Aventura')).toBeTruthy();
    expect(getByText('Lançamento: 2024-12-14')).toBeTruthy();
    expect(getByText('Países de produção: EUA, Brasil')).toBeTruthy();
    expect(getByText('Adulto: Não')).toBeTruthy();

    // Verifica se a imagem do filme foi carregada
    const image = getByTestId('movie-image'); // Adicionei um testID na imagem no código do componente
    expect(image.props.source.uri).toBe(`${VITE_IMG_URL}/path-to-image.jpg`);
  });
});
