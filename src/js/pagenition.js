import NewsApiService from '../js/news-api';
import articlesTpl from '../templates/news-tpl.hbs';
import LoadMoreBtn from './components/load-more-btn';

const formRef = document.querySelector('.js-search-form');
const containerRef = document.querySelector('.js-articles-container');
// const btnLoadMoreRef = document.querySelector('[data-action="load-more"]');

const newsApiService = new NewsApiService();

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
console.log(loadMoreBtn);

formRef.addEventListener('submit', onSearchSubmit);
// btnLoadMoreRef.addEventListener('click', onLoadMore);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

function onSearchSubmit(e) {
  e.preventDefault();
  newsApiService.query = e.currentTarget.elements.query.value;
  // clearArticlesContainer();

  if (newsApiService.query === '') {
    return alert('введите что-то');
  }

  loadMoreBtn.show();
  newsApiService.resetPage();
  clearArticlesContainer();

  fetchArticles();
  //   const options = {
  //     headers: {
  //       Authorization: '6a06574005bb43c49dfd8dd674dbbe89',
  //     },
  //   };

  //   const url = `https://newsapi.org/v2/everything?q=${searchQuery}&pageSize=5&page=2`;

  //   fetch(url, options)
  //     .then(r => r.json())
  //     .then(console.log);
}

function fetchArticles() {
  loadMoreBtn.disable();
  newsApiService.fetchArticles().then(articles => {
    renderArticles(articles);
    loadMoreBtn.enable();
  });
}

function renderArticles(articles) {
  containerRef.insertAdjacentHTML('beforeend', articlesTpl(articles));
}

function clearArticlesContainer() {
  containerRef.innerHTML = '';
}
