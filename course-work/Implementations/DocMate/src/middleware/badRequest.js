exports.badRequestMiddleware = (e, req, res, next) => {
    if (e.message === "Bad request") {
        res.status(400).json({
          error: {
            message: e.message,
            suggestion: `Don't act too smart :)`
            // stack: e.stack
          }
        });
    }
    
    next();
}