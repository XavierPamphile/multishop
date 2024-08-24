import { useContext } from 'react';
import { Context } from '../store/cart/Context';

// In this hook, we retrieve the Cart context and return it.
export const useCart = () => useContext(Context);