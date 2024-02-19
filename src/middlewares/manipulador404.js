import ErroNaoEncontrado from "../erros/ErroNaoEncontrado.js";

function manipulador404(req, res, next){
  const erro404 = new ErroNaoEncontrado();
  next(erro404);
}

export default manipulador404;