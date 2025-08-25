import express from "express";
import dados from "./src/data/dados.js";
import bruxos from "./src/data/bruxos.js";

const { varinhas, animais, pocoes } = dados;
const app = express()

app.get("/", (req, res) => {
    res.send(`
    <div style="
      background: linear-gradient(135deg, #1a237e, #3949ab);
      color: white;
      padding: 50px;
      text-align: center;
      font-family: 'Georgia', serif;
      min-height: 100vh;
      margin: 0;
    ">
      <h1 style="
        font-size: 3rem;
        color: #ffd700;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        margin-bottom: 20px;
      ">
        ⚡ Bem-vindo à Hogwarts! ⚡
      </h1>
      <p style="font-size: 1.5rem; margin: 20px 0;">
        🏰 Escola de Magia e Bruxaria
      </p>
      <p style="font-size: 1.2rem; opacity: 0.9;">
        "É preciso muito mais que coragem para enfrentar nossos inimigos, 
        mas muito mais ainda para enfrentar nossos amigos."
      </p>
      <div style="margin-top: 30px;">
        <span style="font-size: 1.1rem;">🦁 Grifinória | 🐍 Sonserina | 🦅 Corvinal | 🦡 Lufa-lufa</span>
      </div>
    </div>
  `)
});

app.get("/bruxos", (req, res) => {
    res.json(bruxos);
});

app.get("/bruxos/:id", (req, res) => {
  let id = req.params.id
    id = parseInt(id)
    const bruxo = bruxos.find(b => b.id === id)
    
    if(bruxo){
      res.status(200).json(bruxo)
    }else{ 
      res.status(404).json({
        menssagem: "Bruxo não encontrado"
    })
  }
});

app.get("/bruxos/nome/:nome", (req, res) => {
  let nome = req.params.nome.toLowerCase();
  const bruxosEncontrados = bruxos.filter(b => 
      b.nome.toLowerCase().includes(nome)
  );

  if (bruxosEncontrados.length > 0) {
      res.status(200).json(bruxosEncontrados);
  } else {
      res.status(404).json({
          mensagem: "Bruxo(s) nao encontrado(s)!"
      });
  }
});


app.get("/bruxos/casa/:casa", (req, res) => {
  let casa = req.params.casa;
  const bruxosDaCasa = bruxos.filter(b => b.casa.toLowerCase() === casa.toLowerCase());
  if (bruxosDaCasa.length > 0) {
      res.status(200).json(bruxosDaCasa);
  } else {
      res.status(404).json({
          mensagem: "Nenhum bruxo encontrado nessa casa!"
      })
  }
});

app.get("/varinhas", (req, res) => {
  res.json(varinhas);
});

app.get("/animais", (req, res) => {
  res.json(animais);
});

app.get("/pocoes", (req, res) => {
  res.json(pocoes);
});

app.listen(3000, () => {
    console.log("🧙‍♂️ API dos Bruxos está no ar na porta 3000!");
});
