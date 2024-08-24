// Middleware to check if the user is authenticated.
// If the user is not logged in, send an error response.

export default (req, res, next) => {
    if (!req.session.user ) {
            res.status(403).json({message: "Vous devez être connecter pour effectuer cette action !"});
            return;
    }
    if(req.session.user){
          // If the user is logged in, proceed to the next step of the request (the controller).
        next();
    } 
}