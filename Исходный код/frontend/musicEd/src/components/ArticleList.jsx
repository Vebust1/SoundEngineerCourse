import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('/data/articles.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data); // Лог для проверки данных
        setArticles(data);
      })
      .catch(error => {
        console.error('Error fetching articles:', error);
      });
  }, []);

  return (
    <div>
      <h1 className="text-4xl text-white mb-5 text-center">Список статей</h1>
      <ul>
        {articles.map(article => (
          <li className="m-5 border-2 border-almost-black rounded-md p-4" key={article.id}>
            <Link className="text-2xl text-white hover:text-almost-black" to={`/articles/${article.id}`}>{article.title}</Link>
            <img className="my-5" src={article.image} alt={article.title} width="200" />
            <div className="text-white" dangerouslySetInnerHTML={{ __html: article.description }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;

