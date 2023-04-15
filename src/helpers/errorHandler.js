function errorHandler(err, req, res, next) {
  console.error(err);
  let status = 500;
  let message = 'Error interno del servidor';
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    status = 400;
    message = 'Error SyntaxError en JSON';
  } else if (err.name === 'ValidationError') {
    status = 422;
    message = err.message;
  } else if (err.name === 'UnauthorizedError') {
    status = 401;
    message = err.message;
  }
  res.status(status).json({ error: message });
}

module.exports = errorHandler