import React, { createContext, useState, useEffect, useContext } from 'react';

// Criação do Contexto
const AppContext = createContext();

// Provedor do Contexto
export const AppProvider = ({ children }) => {
  const [filmes, setFilmes] = useState([]);
  const [filmesFiltrados, setFilmesFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('');

  // Função para buscar filmes
  const getTopRatedMovies = async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjg1MTUyN2RkNjRhOThiNWViMjJkNGQ2NzMzYjllZiIsIm5iZiI6MTcyODIzMTQwMC4wNzc2MDEsInN1YiI6IjY3MDJiNWIyZmEzZTY5ZTBlZjdkNDM3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SmfRY64PofmHH4AnI_zWK7HyrzSwyMhSjI5S_0AYtFE',
        },
      };

      const res = await fetch(
        'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
        options
      );

      const data = await res.json();
      setFilmes(data.results);
      setFilmesFiltrados(data.results);
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
    } finally {
      setLoading(false);
    }
  };

  // Função para aplicar o filtro
  const aplicarFiltro = () => {
    const filtrados = filmes.filter((item) =>
      item.title.toLowerCase().includes(filtro.toLowerCase())
    );
    setFilmesFiltrados(filtrados);
  };

  // Efeito para carregar filmes ao iniciar
  useEffect(() => {
    getTopRatedMovies();
  }, []);

  // Efeito para aplicar filtro ao mudar o texto
  useEffect(() => {
    aplicarFiltro();
  }, [filtro]);

  return (
    <AppContext.Provider
      value={{ filmesFiltrados, loading, filtro, setFiltro }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Hook para usar o contexto
export const useAppContext = () =>{ 
   const context = useContext(AppContext);
   if (context === null) {
      throw new Error("useAppContext must be used within an AppProvider");
   }
   return context;
}