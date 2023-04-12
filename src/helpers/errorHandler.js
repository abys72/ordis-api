function errorHandler(err, req, res, next) {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      res.status(400).json({ error: 'Error SyntaxError in JSON' });
    } else {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
  

  module.exports = errorHandler