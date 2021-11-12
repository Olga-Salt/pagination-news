const API_KEY = '6a06574005bb43c49dfd8dd674dbbe89';
const BASE_URL = 'https://newsapi.org/v2';
const options = {
  headers: {
    Authorization: API_KEY,
  },
};

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchArticles() {
    console.log('до запроса', this);

    const url = `${BASE_URL}/everything?q=${this.searchQuery}&language=en&pageSize=5&page=${this.page}`;

    return fetch(url, options)
      .then(r => r.json())
      .then(data => {
        this.page += 1;
        // console.log('после запроса', this);
        return data.articles;
      });
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  resetPage() {
    this.page = 1;
  }
}
