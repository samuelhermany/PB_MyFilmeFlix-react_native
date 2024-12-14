const config = {
   VITE_API_KEY: '1f851527dd64a98b5eb22d4d6733b9ef' ?? "",
   VITE_API_URL: 'https://api.themoviedb.org/3/' ?? "",
   VITE_API_URL_MOVIE: 'https://api.themoviedb.org/3/movie/' ?? "",
   VITE_API_URL_AUTENTICATION: 'https://api.themoviedb.org/3/authentication/' ?? "",
   VITE_API_URL_REDIRECT: 'http://localhost:5173/PB_MyFilmeFlix' ?? "",
   VITE_API_TOKEN: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjg1MTUyN2RkNjRhOThiNWViMjJkNGQ2NzMzYjllZiIsIm5iZiI6MTcyOTUxOTQyMy4xNTMwNDQsInN1YiI6IjY3MDJiNWIyZmEzZTY5ZTBlZjdkNDM3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5_T_-dc94XQspxVMAspP0B8zDB__ZkSbwNEfCIs9xOA' ?? "",
   VITE_SEARCH: 'https://api.themoviedb.org/3/search/movie' ?? "",
   VITE_API_USERNAME: 'samuelhermany' ?? "",
   VITE_API_PASSWORD: '10#Sulmaq#12' ?? "",
   VITE_IMG_URL: 'https://image.tmdb.org/t/p/w154/' ?? "",
   VITE_IMG_92: 'https://image.tmdb.org/t/p/w92/' ?? "",
   VITE_IMG_154: 'https://image.tmdb.org/t/p/w154/' ?? "",
   VITE_IMG_185: 'https://image.tmdb.org/t/p/w185/' ?? "",
   VITE_IMG_342: 'https://image.tmdb.org/t/p/w342/' ?? "",
   VITE_IMG_500: 'https://image.tmdb.org/t/p/w500/' ?? "",
   VITE_IMG_780: 'https://image.tmdb.org/t/p/w780/' ?? "",
   VITE_IMG_1280: 'https://image.tmdb.org/t/p/w1280/' ?? "",
   VITE_IMG_original: 'https://image.tmdb.org/t/p/original/' ?? "",
};

// Exporta as chaves individuais
export const {
   VITE_API_KEY,
   VITE_API_URL,
   VITE_API_URL_MOVIE,
   VITE_API_URL_AUTENTICATION,
   VITE_API_URL_REDIRECT,
   VITE_API_TOKEN,
   VITE_SEARCH,
   VITE_API_USERNAME,
   VITE_API_PASSWORD,
   VITE_IMG_URL,
   VITE_IMG_92,
   VITE_IMG_154,
   VITE_IMG_185,
   VITE_IMG_342,
   VITE_IMG_500,
   VITE_IMG_780,
   VITE_IMG_1280,
   VITE_IMG_original,
} = config;

// Exporta o objeto completo como padrão
export default config;