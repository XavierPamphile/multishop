import { useContext, useEffect } from 'react';
import { Context } from '../store/menu/Context';

// In this hook, we retrieve the Menu context and return it.
// We need the isMenuOpen state and the toggleMenu function,
// which we will make available in the components that need this functionality.
// This hook, when used, allows closing the menu if it is open
// and/or provides the menu state and the function to close it.
function useMenu() {
    const {isMenuOpen, toggleMenu} = useContext(Context);

    useEffect(()=>{
        if(isMenuOpen) toggleMenu();
    }, []);

    return  {isMenuOpen, toggleMenu }    
}

export default useMenu;
