import { useContext } from 'react';
import CategoryContext from '../context/category/CategoryContext';

const useCategory = () => useContext(CategoryContext);

export default useCategory;