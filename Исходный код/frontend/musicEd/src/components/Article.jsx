import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetch('/data/articles.json')
      .then(response => response.json())
      .then(data => {
        const foundArticle = data.find(article => article.id === id);
        setArticle(foundArticle);
      });
  }, [id]);

  if (!article) {
    return <div>Статья не найдена</div>;
  }

  return (
    <div className='flex flex-col items-center text-white mb-10 px-8'>
      <h1 className='mb-2'>{article.title}</h1>
      <img className='mb-4' src={article.image} alt={article.title} width="400" />
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </div>
  );
};

export default Article;

