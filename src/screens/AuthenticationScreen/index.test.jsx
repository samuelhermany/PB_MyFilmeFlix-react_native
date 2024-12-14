import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AuthenticationScreen from '../../screens/AuthenticationScreen';  // Ajuste o caminho conforme necessário
import { Linking } from 'react-native';

// Mock das funções do Linking
jest.mock('react-native', () => {
  return {
    ...jest.requireActual('react-native'),
    Linking: {
      canOpenURL: jest.fn(),
      openURL: jest.fn(),
    },
  };
});

describe('AuthenticationScreen', () => {
  it('deve exibir "Carregando..." quando estiver carregando', async () => {
    // Renderiza o componente
    const { getByText } = render(<AuthenticationScreen />);

    // Verifica se o texto "Carregando..." aparece quando o estado `loading` é true
    await waitFor(() => {
      expect(getByText('Carregando...')).toBeTruthy();
    });
  });

  it('deve chamar Linking.openURL quando o botão for pressionado', async () => {
    const { getByText } = render(<AuthenticationScreen />);

    // Simula o botão de autorização
    fireEvent.press(getByText('Autorizar no TMDb'));

    // Verifica se o Linking.openURL foi chamado
    await waitFor(() => {
      expect(Linking.openURL).toHaveBeenCalled();
    });
  });
});
