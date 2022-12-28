import axios from 'axios';

export const getImages = (query = '', page = 1) => {
  const response = `https://pixabay.com/api/?key=31258232-e3c8f840f0c2c0981cedb6e2e&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${page}`;
  return axios.get(response).then(res => res.data);
};
