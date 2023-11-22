import mongoose from "mongoose";

const livroSchema = new mongoose.Schema( {
  id: {type: String},
  titulo: { 
    type: String, 
    required: [true, "O título do livro é obrigatório."] 
  },
  preco: { type: Number },
  paginas: { 
    type: Number,
    validate: {
      validator: (valor) => {
        return valor >= 10 && valor <= 5000;
      },
      message: "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}"
    }
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "autores", 
    required: [true, "O(a) autor(a) é obrigatório."]
  },
  editora: {
    type: String,
    required: [true, "A editora é obrigatória."],
    enum: {
      values: ["Casa do código","Alura"],
      message: "A editora {VALUE} não é um valor permitido."
    }
  },
}, { versionKey: false });

const livro = mongoose.model("livros", livroSchema);

export default livro;