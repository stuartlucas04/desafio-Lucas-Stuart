class CaixaDaLanchonete {
  // Definição do cardápio com códigos, descrições e valores dos itens
  cardapio = {
    cafe: { descricao: 'Café', valor: 3.0 },
    chantily: { descricao: 'Chantily (extra do Café)', valor: 1.5 },
    suco: { descricao: 'Suco Natural', valor: 6.2 },
    sanduiche: { descricao: 'Sanduíche', valor: 6.5 },
    queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.0 },
    salgado: { descricao: 'Salgado', valor: 7.25 },
    combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.5 },
    combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.5 },
  };

  // Método para calcular o valor da compra com base na forma de pagamento e nos itens selecionados
  calcularValorDaCompra(formaDePagamento, itens) {
    const validFormasDePagamento = ['debito', 'dinheiro', 'credito'];

    // Verifica se a forma de pagamento é válida
    if (validFormasDePagamento.includes(formaDePagamento) === false) {
      return 'Forma de pagamento inválida!';
    }

    let valorTotal = 0;
    let itemsMap = {}; // Usado para rastrear a quantidade de cada item no pedido

    // Percorre os itens do pedido e os processa
    itens.forEach(item => {
      const [codigo, quantidade] = item.split(',');
      console.log(codigo in this.cardapio)
      console.log((codigo in this.cardapio) === false)

      // Registra a quantidade do item no mapa de itens
      if (!itemsMap[codigo]) {
        itemsMap[codigo] = 0;
      }
      itemsMap[codigo] += parseInt(quantidade);
    });

    // Calcula o valor total da compra com base no mapa de itens
    for (const codigo in itemsMap) {
      const item = this.cardapio[codigo];
      const quantidade = itemsMap[codigo];

      // Verifica se o código do item é válido
      if (codigo in this.cardapio === false) {
        return 'Item inválido!';
      }

      // Verifica se o item extra foi pedido sem o item principal correspondente
      if (codigo === 'chantily' && !itemsMap['cafe']) {
        return 'Item extra não pode ser pedido sem o principal';
      }
      if (codigo === 'queijo' && !itemsMap['sanduiche']) {
        return 'Item extra não pode ser pedido sem o principal';
      }

    // Verifica se item enviado possui quantidade zero
    if (quantidade === 0) {
      return 'Quantidade inválida!';
    }

      valorTotal += item.valor * quantidade;
    }
    
    // Aplica descontos ou acréscimos com base na forma de pagamento
    if (formaDePagamento === 'dinheiro') {
      valorTotal *= 0.95; // Aplica 5% de desconto
    } else if (formaDePagamento === 'credito') {
      valorTotal *= 1.03; // Aplica 3% de acréscimo
    }

    // Verifica se não há itens no carrinho
    if (valorTotal === 0) {
      return 'Não há itens no carrinho de compra!';
    }

    // Retorna o valor formatado da compra
    return `R$ ${valorTotal.toFixed(2).replace('.',',')}`;
  }
}
// Exemplos de uso
const caixa = new CaixaDaLanchonete();

export { CaixaDaLanchonete };
