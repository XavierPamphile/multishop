// Initial state for the authentication context
const initialState = {
    isLogged: false,  // Indicates if the user is logged in or not
    name: null,       // Stores the user's name (initially null)
    isAdmin: false,   // Indicates if the user is an admin or not
}

// Reducer function to handle state changes based on actions
function reducer(state, action) {
    switch(action.type) {
        // Action for logging in the user
        case 'LOGIN':
            return {
                isLogged: true,                 // User is now logged in
                nickname: action.payload.name,  // Set the user's name from the action payload
                isAdmin: action.payload.isAdmin, // Set the admin status from the action payload
            }
        // Action for logging out the user
        case 'LOGOUT':
            return initialState;  // Reset state to the initial values
        // Default case to handle unknown action types
        default:
            throw new Error('Action type not found');  // Throw an error if action type is unrecognized
    }
}

// Export the initial state and the reducer function
export { initialState, reducer }
