// script.js

// Função para carregar os dados do MongoDB
function loadProductData(productId, callback) {
  // Use a biblioteca ou framework de sua escolha para fazer a conexão com o MongoDB e buscar os dados do produto com o ID fornecido.
  // Aqui está um exemplo simples utilizando o pacote 'mongodb' do Node.js:
  const MongoClient = require('mongodb').MongoClient;
  const url = 'mongodb://localhost:27017';
  const dbName = 'Serafimoclocks';
  const collectionName = 'Produtos';

  MongoClient.connect(url, (err, client) => {
    if (err) throw err;

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    collection.findOne({ id: productId }, (err, result) => {
      if (err) throw err;

      callback(result);
      client.close();
    });
  });
}

// Função para exibir os dados do produto na página de detalhes do produto
function showProductDetails(productData) {
  const productContainer = document.getElementById('produto-container');
  productContainer.innerHTML = `
    <h2>${productData.name}</h2>
    <img src="${productData.imageUrl}" alt="${productData.name}">
    <p>${productData.description}</p>
    <button onclick="addToCart(${productData.id})">Adicionar ao Carrinho</button>
  `;
}

// Função para adicionar um produto ao carrinho
function addToCart(productId) {
  // Implemente a lógica para adicionar o produto ao carrinho.
  // Isso pode ser feito armazenando os IDs dos produtos selecionados em um array, ou salvando os dados completos do produto em um banco de dados, dependendo das suas necessidades.

  // Redirecionar para a página do carrinho
  window.location.href = 'carrinho.html';
}

// Função para exibir os produtos no carrinho
function showCartProducts() {
  const cartContainer = document.getElementById('carrinho-container');
  // Obtenha os produtos do carrinho do banco de dados ou armazenamento de sua escolha e exiba-os no carrinho.
  // Aqui está um exemplo básico:
  const productsInCart = [
    { id: 1, name: 'Relógio 1', price: 100 },
    { id: 2, name: 'Relógio 2', price: 150 },
  ];

  let totalPrice = 0;
  let cartHtml = '';

  productsInCart.forEach(product => {
    cartHtml += `<p>${product.name} - R$ ${product.price}</p>`;
    totalPrice += product.price;
  });

  cartHtml += `<p><strong>Total: R$ ${totalPrice}</strong></p>`;

  cartContainer.innerHTML = cartHtml;
}

// Verificar qual página está sendo carregada
const currentPage = window.location.pathname.split('/').pop();

// Lógica para cada página
if (currentPage === 'index.html') {
  // Página inicial
  // Não há operações adicionais necessárias
} else if (currentPage === 'produto.html') {
  // Página de detalhes do produto
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  loadProductData(productId, showProductDetails);
} else if (currentPage === 'carrinho.html') {
  // Página do carrinho de compras
  showCartProducts();
}
