import ErroNaoEncontrado from "../erros/ErroNaoEncontrado.js";
import { autor, livros } from "../models/index.js";

class LivroController {

  static async listarLivros (req, res, next) {
    try {
      const buscarLivros = livros.find();

      req.resultado = buscarLivros;

      next();
    } catch (erro) {
      next(erro);
    }
  }

  static async listarLivroPorId (req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livros
        .findById(id, {}, { autopopulate: false })
        .populate("autor");

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

  static async listarLivrosPorFiltro (req, res, next) {
    try {
      const busca = await processaBusca(req.query);
      
      const livrosResultado = livros
        .find(busca);

      req.resultado = livrosResultado;
      
      next();

    } catch (erro) {
      next(erro);
    }
  }
}

async function processaBusca(parametros) {
  const {editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;

  let busca = {};
  
  if(editora) busca.editora = editora;
  if(titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if(minPaginas || maxPaginas) busca.paginas = {};
  
  //gte = Maior ou igual que
  if(minPaginas) busca.paginas.$gte = minPaginas;
  //lte = Menor ou igual que
  if(maxPaginas) busca.paginas.$lte = maxPaginas;

  if(nomeAutor) {
    const _autor = await autor.findOne({ nome: nomeAutor });
    
    if (_autor !== null) {
      busca.autor = _autor._id;
    } 
    else {
      busca.autor = null;
    }
  }

  return busca;
}


export default LivroController;