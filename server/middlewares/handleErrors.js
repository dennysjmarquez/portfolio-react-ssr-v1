// Se controla la salida de los errores para evitar que se vea lo que no interesa
const handleErrorsMiddleware = function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
}

module.exports = handleErrorsMiddleware;
