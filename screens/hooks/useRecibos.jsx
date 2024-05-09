import { useContext } from 'react';
import RecibosContext from '../context/recibos/RecibosContext';

const useRecibos = () =>  useContext(RecibosContext)

export default useRecibos;