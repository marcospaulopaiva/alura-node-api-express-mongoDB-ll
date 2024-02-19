import ErroNaoEncontrado from "../erros/ErroNaoEncontrado.js";
import { autor } from "../models/index.js";

class AutorController {

  static async listarAutores (req, res, next) {
    try {
      const buscarAutores = autor.find();

      req.resultado = buscarAutores;

      next();
    } catch (erro) {
      next(erro);
    }
  }

  static async listarAutorPorId (req, res, next) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);

      if (autorEncontrado !== null) {
        res.status(200).json(autorEncontrado);            
      } 
      else {
        next(new ErroNaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async cadastrarAutor (req, res, next) {
    try {
      const novoAutor = await autor.create(req.body);   
      res.status(201).json({ message: "Criado com sucesso", autor: novoAutor });
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarAutor (req, res, next) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);

      if (autorEncontrado !== null) {
        await autor.findByIdAndUpdate(id, req.body);
        res.status(200).json({message: "Autor atualizado", status: 200}); 
      } 
      else {
        next(new ErroNaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async excluirAutor (req, res, next) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);

      if (autorEncontrado !== null) {
        await autor.findByIdAndDelete(id);
        res.status(200).json({message: "Autor excluido com sucesso", status: 200}); 
      } 
      else {
        next(new ErroNaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  }
}

export default AutorController;