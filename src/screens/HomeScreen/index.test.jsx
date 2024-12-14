import React from 'react';
import { render, screen } from '@testing-library/react-native';
import HomeScreen from '.';
import { useAppContext } from '../../Context';

// Mock do contexto
jest.mock('../../Context', () => ({
  useAppContext: jest.fn(),
}));

describe('HomeScreen', () => {
  it('deve renderizar a tela com o título "Top Filmes"', () => {
    useAppContext.mockReturnValue({
      filmesFiltrados: [],
      loading: false,
      filtro: '',
      setFiltro: jest.fn(),
    });

    render(<HomeScreen />);
    expect(screen.getByText('Top Filmes')).toBeTruthy();
  });

  it('deve mostrar "Carregando..." quando o estado de loading for true', () => {
    useAppContext.mockReturnValue({
      filmesFiltrados: [],
      loading: true,
      filtro: '',
      setFiltro: jest.fn(),
    });

    render(<HomeScreen />);
    expect(screen.getByText('Carregando...')).toBeTruthy();
  });

  it('deve mostrar mensagem de lista vazia quando não há filmes e loading for false', () => {
    useAppContext.mockReturnValue({
      filmesFiltrados: [],
      loading: false,
      filtro: '',
      setFiltro: jest.fn(),
    });

    render(<HomeScreen />);
    expect(screen.getByText('Não há filmes para exibir.')).toBeTruthy();
  });

  it('deve renderizar filmes quando houver dados em filmesFiltrados', () => {
    const mockFilmes = [
      { id: 1, title: 'Filme 1' },
      { id: 2, title: 'Filme 2' },
    ];

    useAppContext.mockReturnValue({
      filmesFiltrados: mockFilmes,
      loading: false,
      filtro: '',
      setFiltro: jest.fn(),
    });

    render(<HomeScreen />);
    expect(screen.getByText('Filme 1')).toBeTruthy();
    expect(screen.getByText('Filme 2')).toBeTruthy();
  });
});
