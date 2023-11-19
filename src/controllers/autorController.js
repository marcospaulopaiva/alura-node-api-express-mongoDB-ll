import { autor } from "../models/Autor.js";
import mongoose from "mongoose";

class AutorController {

  static async listarAutores (req, res) {
    try {
      const listaAutores = await autor.find({});
      res.status(200).json(listaAutores);            
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição` });
    }
  }

  static async listarAutorPorId (req, res) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);

      if (autorEncontrado !== null) {
        res.status(200).json(autorEncontrado);            
      } else {
        res.status(404).send({message: "Id do Autor não localizado."});
      }
    } catch (erro) {
      if (erro instanceof mongoose.Error.CastError) {
        res.status(400).json({ message: "um ou mais dados fornecidos estão incorretos." });  
      }else {
        res.status(500).json({ message: `${erro.message} - falha na requisição` });
      }
    }
  }

  static async cadastrarAutor (req, res) {
    try {
      const novoAutor = await autor.create(req.body);   
      res.status(201).json({ message: "criado com sucesso", autor: novoAutor });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha ao castrar Autor` });
    }
  }

  static async atualizarAutor (req, res) {
    try {
      const id = req.params.id;
      await autor.findByIdAndUpdate(id, req.body);
      res.status(200).json({message: "autor atualizado"});            
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição` });
    }
  }

  static async excluirAutor (req, res) {
    try {
      const id = req.params.id;
      await autor.findByIdAndDelete(id);
      res.status(200).json({message: "autor excluido com sucesso"});            
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na exclusão` });
    }
  }
}

export default AutorController;