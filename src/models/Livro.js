import mongoose from "mongoose";

const livroSchema = new mongoose.Schema( {
  id: {type: String},
  titulo: { type: String, require: true },
  editora: { type: String },
  preco: { type: Number },
  paginas: { type: Number },
  autor: {type: mongoose.Schema.Types.ObjectId, ref: "autores", required: true},
}, { versionKey: false });

const livro = mongoose.model("livros", livroSchema);

export default livro;