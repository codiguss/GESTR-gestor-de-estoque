require("dotenv").config();
const fastify = require("fastify")({ logger: true });
const cors = require('@fastify/cors');
const mongoose = require("mongoose");

fastify.register(cors, { origin: "*" });

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log("Erro no Mongo:", err));

const Insumo = mongoose.model("Insumo", {
  nome: String,
  quantidade: Number,
  unidade: String,
  preco_compra: Number
});

const Encomenda = mongoose.model("Encomenda", {
  nome: String,
  preco_venda: Number,
  ingredientes: [
    {
      insumo_id: mongoose.Types.ObjectId,
      quantidade: Number,
      unidade: String
    }
  ]
});

const Venda = mongoose.model("Venda", {
  data: { type: Date, default: Date.now },
  encomenda_id: mongoose.Types.ObjectId,
  quantidade: Number,
  preco_total: Number,
  custo_total: Number,
  lucro: Number
});

fastify.post("/insumos", async (req, reply) => {
  const insumo = await Insumo.create(req.body);
  reply.send(insumo);
});

fastify.get("/insumos", async (req, reply) => {
  reply.send(await Insumo.find());
});

fastify.post("/encomendas", async (req, reply) => {
  const enc = await Encomenda.create(req.body);
  reply.send(enc);
});

fastify.get("/encomendas", async () => {
  return await Encomenda.find();
});

fastify.post("/vendas", async (req, reply) => {
  const { encomenda_id, quantidade } = req.body;

  const enc = await Encomenda.findById(encomenda_id);
  if (!enc) return reply.code(404).send({ erro: "Encomenda não encontrada" });

  let custo_total = 0;

  for (const item of enc.ingredientes) {
    const insumo = await Insumo.findById(item.insumo_id);

    if (!insumo) return reply.code(404).send({ erro: "Insumo não encontrado" });

    const necessario = item.quantidade * quantidade;

    if (insumo.quantidade < necessario)
      return reply.code(400).send({
        erro: `Estoque insuficiente do insumo ${insumo.nome}`
      });

    const proporcional = (item.quantidade * insumo.preco_compra);
    custo_total += proporcional * quantidade;
  }

  for (const item of enc.ingredientes) {
    const insumo = await Insumo.findById(item.insumo_id);
    insumo.quantidade -= item.quantidade * quantidade;
    await insumo.save();
  }

  const preco_total = enc.preco_venda * quantidade;
  const lucro = preco_total - custo_total;

  const venda = await Venda.create({
    encomenda_id,
    quantidade,
    preco_total,
    custo_total,
    lucro
  });

  reply.send(venda);
});

fastify.get("/balanco", async (req, reply) => {
  const mes = req.query.mes;

  if (!mes) return reply.send({ erro: "Informe o mês no formato YYYY-MM" });

  const inicio = new Date(`${mes}-01`);
  const fim = new Date(`${mes}-31`);

  const vendas = await Venda.find({
    data: { $gte: inicio, $lte: fim }
  });

  let total_vendas = 0;
  let total_custos = 0;
  let total_lucro = 0;

  vendas.forEach(v => {
    total_vendas += v.preco_total;
    total_custos += v.custo_total;
    total_lucro += v.lucro;
  });

  reply.send({
    mes,
    total_vendas,
    total_custos,
    total_lucro,
    qtd_vendas: vendas.length
  });
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log("Servidor rodando na porta 3000 🚀");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

module.exports = async (req, res) => {
  await fastify.ready();
  fastify.server.emit('request', req, res);
};
