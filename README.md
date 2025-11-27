# 🍰 Doce Gestão - Sistema de Controle para Confeitaria

![Badge Concluído](https://img.shields.io/static/v1?label=Status&message=Concluído&color=SUCCESS&style=for-the-badge)
![Badge Mobile First](https://img.shields.io/static/v1?label=Design&message=Mobile%20First&color=blue&style=for-the-badge)
![Badge NoSQL](https://img.shields.io/static/v1?label=Database&message=MongoDB&color=green&style=for-the-badge)

> Um sistema web completo para gestão de insumos, precificação de receitas e controle financeiro de pequenos negócios de confeitaria.

---

## 🖼️ Preview

*(Adicione aqui prints ou um GIF do seu sistema rodando. Ex: Tela de Vendas e Balanço)*

---

## 🎯 Sobre o Projeto

[cite_start]Este projeto foi desenvolvido como parte da avaliação **OAT 2 - Banco de Dados NoSQL**[cite: 3, 4].

[cite_start]O objetivo foi solucionar uma dor real de mercado: ajudar uma confeiteira que não conseguia precificar seus produtos corretamente e não tinha visibilidade do lucro real[cite: 7, 10]. [cite_start]O sistema automatiza o cálculo de custos baseado na ficha técnica (receita), realiza a baixa automática de estoque e gera relatórios financeiros mensais[cite: 13, 21].

---

## ✨ Funcionalidades

* [cite_start]📦 **Gestão de Estoque:** Cadastro de insumos com controle de quantidade e preço de compra[cite: 15, 17].
* [cite_start]📋 **Catálogo de Produtos:** Criação de fichas técnicas (receitas) que calculam automaticamente o custo base dos ingredientes[cite: 16].
* [cite_start]📱 **Ponto de Venda (PDV):** Registro de vendas rápido, pensado para celular (Mobile First), com verificação de estoque em tempo real[cite: 18, 20].
* [cite_start]💰 **Financeiro:** Balanço mensal automático exibindo faturamento, custos e lucro líquido[cite: 10, 19].
* ☁️ **Cloud:** Banco de dados hospedado no MongoDB Atlas e aplicação Serverless.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando uma arquitetura moderna e leve:

* **Frontend:** HTML5, CSS3 (TailwindCSS) e JavaScript Vanilla (SPA).
* **Backend:** Node.js com Fastify (API REST).
* [cite_start]**Banco de Dados:** MongoDB (NoSQL) com Mongoose[cite: 20].
* **Deploy:** Vercel (Serverless).

---

## 🚀 Como Rodar Localmente

Siga os passos abaixo para executar o projeto na sua máquina:

### Pré-requisitos
* Node.js instalado.
* Conta no MongoDB Atlas (ou MongoDB local).

### Instalação

1. **Clone o repositório:**
   ```bash
   git clone git@github.com:codiguss/GESTR-gestor-de-estoque.git
