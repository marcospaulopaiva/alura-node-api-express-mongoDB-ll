import ErroBase from "./ErroBase.js";

class ErroNaoEncontrado extends ErroBase{
  constructor(mensagem = "Página não encontrada"){
    super(mensagem, 404);
  }
}

export default ErroNaoEncontrado;