const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const estudoRoutes = require("./routes/estudosRoutes");
const favoritosRoutes = require("./routes/favoritosRoutes");

const app = express();
const PORT = process.env.PORT || 3000;


// ===============================
// MIDDLEWARES
// ===============================

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ⭐ FALTAVA ISSO

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


// ===============================
// ROTAS
// ===============================
app.use("/auth", authRoutes);
app.use("/estudos", estudoRoutes);
app.use("/favoritos", favoritosRoutes);


// ===============================
app.get("/", (req, res) => {
  res.send("API Estudos Bíblicos funcionando 🚀");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});