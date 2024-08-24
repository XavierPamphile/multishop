// Middleware to check if the user is an administrator.
// If the user is not logged in or is not an administrator, send an error response.

export default (req, res, next) => {
    if (!req.session.user || !req.session.user.isAdmin) {
            res.status(403).json({message: "Vous n'êtes pas autorisé à effectuer cette action"});
            return;
    }
    if(req.session.user.isAdmin){
        // If the user is an admin, proceed to the next step of the request (the controller).
        next();
    } 
}