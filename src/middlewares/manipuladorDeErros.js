import mongoose from "mongoose";
import ErroBase from "../erros/ErroBase.js";
import ErroRequisicao from "../erros/ErroRequisicao.js";
import ErroValidacao from "../erros/ErroValidacao.js";
import ErroNaoEncontrado from "../erros/ErroNaoEncontrado.js";

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(erro, req, res, next) {
  console.log(erro);
  
  if (erro instanceof mongoose.Error.CastError) {
    new ErroRequisicao().enviarResposta(res);
  } 
  else if(erro instanceof mongoose.Error.ValidationError){
    new ErroValidacao(erro).enviarResposta(res);   
  } 
  else if (erro instanceof ErroNaoEncontrado) {
    erro.enviarResposta(res);
  }
  else {
    new ErroBase().enviarResposta(res);
  }
}

export default manipuladorDeErros;