import { useContext } from 'react';
import ArticleContext from '../context/article/ArticleContext';

const useArticle = () => useContext(ArticleContext);

export default useArticle;