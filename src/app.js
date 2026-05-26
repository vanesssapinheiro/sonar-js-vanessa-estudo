// Bug: pode quebrar se user ou address vier null
export function vanessaTesteBug(user) {
  return user.address.city.toUpperCase();
}

// Bug: atribuição dentro do if em vez de comparação
export function vanessaTesteAtribuicao(usuarioAtivo) {
  if (usuarioAtivo = true) {
    return "ativo";
  }
  return "inativo";
}

// Vulnerabilidade: eval executa código recebido externamente
export function vanessaTesteVulnerabilidade(expressao) {
  return eval(expressao);
}

// Security Hotspot: innerHTML com entrada externa precisa revisão
export function vanessaTesteHotspot(nome) {
  document.getElementById("output").innerHTML = nome;
}

// Code Smell: variável criada e não utilizada
export function vanessaTesteCodeSmell(valor) {
  const mensagemNaoUsada = "teste sonar";
  return valor * 2;
}

// Dívida técnica: código temporário ou regra de negócio frágil
export function vanessaTesteDividaTecnica(preco) {
  return preco - 10;
}

// Duplicação: bloco repetido propositalmente
export function vanessaTesteDuplicacaoA(cliente) {
  const nome = cliente.nome.trim().toUpperCase();
  const email = cliente.email.trim().toLowerCase();
  const telefone = cliente.telefone.trim();
  const cidade = cliente.cidade.trim().toUpperCase();

  return `${nome} | ${email} | ${telefone} | ${cidade}`;
}

// Duplicação: mesmo bloco repetido propositalmente
export function vanessaTesteDuplicacaoB(cliente) {
  const nome = cliente.nome.trim().toUpperCase();
  const email = cliente.email.trim().toLowerCase();
  const telefone = cliente.telefone.trim();
  const cidade = cliente.cidade.trim().toUpperCase();

  return `${nome} | ${email} | ${telefone} | ${cidade}`;
}

// Complexidade ciclomática: muitos caminhos de decisão
export function vanessaTesteComplexidadeCiclomatica(tipo, valor, ativo, premium) {
  if (tipo === "A") {
    if (valor > 100) {
      return ativo ? 10 : 20;
    }
    return premium ? 30 : 40;
  }

  if (tipo === "B") {
    if (valor > 200) {
      return ativo ? 50 : 60;
    }
    return premium ? 70 : 80;
  }

  if (tipo === "C") {
    return valor > 300 ? 90 : 100;
  }

  return 0;
}

// Complexidade cognitiva: muitos níveis aninhados dificultam leitura
export function vanessaTesteComplexidadeCognitiva(pedido) {
  if (pedido) {
    if (pedido.cliente) {
      if (pedido.itens) {
        for (const item of pedido.itens) {
          if (item.ativo) {
            if (item.preco > 0) {
              if (item.quantidade > 0) {
                if (item.desconto) {
                  return item.preco * item.quantidade - item.desconto;
                }
                return item.preco * item.quantidade;
              }
            }
          }
        }
      }
    }
  }

  return 0;
}

// Cobertura: função sem teste reduz percentual de coverage
export function vanessaTesteSemCobertura(a, b) {
  return a / b;
}

// Severidade: senha fixa tende a gerar issue de segurança
export function vanessaTesteSeveridade() {
  const password = "123456";
  return password;
}

// New Code: altere esta função para aparecer em código novo
export function vanessaTesteNovoCodigo(valor) {
  if (valor == null) {
    return "sem valor";
  }
  return valor;
}