import { useContext } from 'react';
import { Context } from '../store/user/Context';

// In this hook, we retrieve the User context and return it.
export const useUser = () => useContext(Context);
