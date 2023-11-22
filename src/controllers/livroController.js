import ErroNaoEncontrado from "../erros/ErroNaoEncontrado.js";
import livros from "../models/Livro.js";

class LivroController {

  static async listarLivros (req, res, next) {
    try {
      const listaLivros = await livros.find({});
      res.status(200).json(listaLivros);            
    } catch (erro) {
      next(erro);
    }
  }

  static async listarLivroPorId (req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livros.findById(id);

      if (livroEncontrado !== null) {
        res.status(200).json(livroEncontrado);            
      } 
      else {
        next(new ErroNaoEncontrado("Id do Livro não localizado."));
      }          
    } catch (erro) {
      next(erro);
    }
  }


  static async cadastrarLivro (req, res, next) {
    try {
      let livro = new livros(req.body);

      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarLivro (req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livros.findById(id);

      if (livroEncontrado !== null) {
        await livros.findByIdAndUpdate(id, req.body);
        res.status(200).json({message: "Livro atualizado", status: 200});            
      } 
      else {
        next(new ErroNaoEncontrado("Id do Livro não localizado."));
      }          
    } catch (erro) {
      next(erro);
    }
  }

  static async excluirLivro (req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livros.findById(id);

      if (livroEncontrado !== null) {
        await livros.findByIdAndDelete(id);
        res.status(200).json({message: "Livro excluido com sucesso", status: 200});                      
      } 
      else {
        next(new ErroNaoEncontrado("Id do Livro não localizado."));
      }  
    } catch (erro) {
      next(erro);
    }
  }

  static async listarLivrosPorEditora (req, res, next) {
    const editora = req.query.editora;
    try {
      const livrosPorEditora = await livros.find({ editora: editora });
      res.status(200).json(livrosPorEditora);
    } catch (erro) {
      next(erro);
    }
  }
}

export default LivroController;