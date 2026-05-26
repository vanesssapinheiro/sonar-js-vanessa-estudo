
// 1) BUG
// Objetivo: identificar código que pode gerar erro em execução.
// Problema: user pode ser null/undefined.
export function getUserCity(user) {
  return user.address.city.toUpperCase();
}


// 2) VULNERABILIDADE
// Objetivo: detectar falha de segurança explorável.
// Problema: eval executa código arbitrário.
export function dangerousCalculate(expression) {
  return eval(expression);
}


// 3) SECURITY HOTSPOT
// Objetivo: marcar trecho sensível para revisão humana.
// Problema: uso de innerHTML com dado externo pode virar XSS.
export function renderUserName(name) {
  const output = document.getElementById("output");
  output.innerHTML = "Olá, " + name;
}


// 4) CODE SMELL
// Objetivo: apontar problema de manutenibilidade.
// Problema: variável não usada.
export function calculateDiscount(price) {
  const debugMessage = "calculando desconto";
  return price * 0.9;
}


// 5) DÍVIDA TÉCNICA
// Objetivo: Sonar estima esforço para corrigir issues.
// Este  normalmente aparece como ponto de manutenção.
//remover regra temporária de desconto fixo.
export function legacyDiscount(price) {
  return price - 10;
}


// 6) QUALITY GATE
// Objetivo: aprovar/reprovar conforme critérios.
// Este arquivo força bugs, smells, duplicação e baixa cobertura.
// O gate pode falhar dependendo da configuração do servidor.


// 7) NEW CODE
// Objetivo: avaliar código novo ou alterado.
// Altere esta função em uma branch/PR para ver issues no "New Code".
export function newCodeExample(value) {
  if (value == null) {
    return "vazio";
  }

  return value;
}


// 8) COBERTURA DE TESTES
// Objetivo: mostrar quanto do código foi executado.
// Esta função terá teste.
export function sum(a, b) {
  return a + b;
}


// Esta função NÃO terá teste para reduzir a cobertura.
export function multiply(a, b) {
  return a * b;
}


// 9) DUPLICAÇÃO DE CÓDIGO
// Objetivo: detectar blocos repetidos.
// Há função parecida em duplicate.js.
export function formatCustomerA(customer) {
  const name = customer.name.trim().toUpperCase();
  const email = customer.email.trim().toLowerCase();
  const phone = customer.phone.trim();
  const city = customer.city.trim().toUpperCase();

  return `${name} | ${email} | ${phone} | ${city}`;
}
export function formatCustomerC(customer) {
  const name = customer.name.trim().toUpperCase();
  const email = customer.email.trim().toLowerCase();
  const phone = customer.phone.trim();
  const city = customer.city.trim().toUpperCase();

  return `${name} | ${email} | ${phone} | ${city}`;
}
export function formatCustomerC(customer) {
  const name = customer.name.trim().toUpperCase();
  const email = customer.email.trim().toLowerCase();
  const phone = customer.phone.trim();
  const city = customer.city.trim().toUpperCase();

  return `${name} | ${email} | ${phone} | ${city}`;
}


// 10) COMPLEXIDADE CICLOMÁTICA
// Objetivo: medir quantidade de caminhos lógicos.
// Muitos if/else aumentam caminhos possíveis.
export function calculateShipping(country, state, weight, isPremium) {
  if (country === "BR") {
    if (state === "SP") {
      if (weight > 10) {
        return isPremium ? 20 : 30;
      } else {
        return isPremium ? 10 : 15;
      }
    } else if (state === "RJ") {
      if (weight > 10) {
        return isPremium ? 25 : 35;
      } else {
        return isPremium ? 12 : 18;
      }
    } else {
      return weight > 10 ? 40 : 25;
    }
  } else if (country === "US") {
    return weight > 10 ? 50 : 30;
  } else {
    return 100;
  }
}


// 11) COMPLEXIDADE COGNITIVA
// Objetivo: medir dificuldade de entendimento.
// Muitos níveis aninhados aumentam a complexidade cognitiva.
export function processOrder(order) {
  if (order) {
    if (order.items) {
      if (order.items.length > 0) {
        for (const item of order.items) {
          if (item.active) {
            if (item.price > 0) {
              if (item.quantity > 0) {
                if (item.discount) {
                  return item.price * item.quantity - item.discount;
                } else {
                  return item.price * item.quantity;
                }
              }
            }
          }
        }
      }
    }
  }

  return 0;
}


// 12) ISSUES
// Objetivo: listar todos os problemas encontrados.
// Este projeto deve gerar issues em Bugs, Vulnerabilities,
// Security Hotspots e Code Smells.


// 13) SEVERIDADE
// Objetivo: classificar problemas por impacto.
// eval costuma ter severidade alta por risco de segurança.
// null dereference costuma aparecer como bug relevante.


// 14) REGRAS
// Objetivo: definir o que será considerado problema.
// Exemplo: regra contra eval, regra contra variável não usada,
// regra contra complexidade excessiva.


// 15) QUALITY PROFILE
// Objetivo: conjunto de regras usado por linguagem.
// No Sonar, use um Quality Profile JavaScript com as regras ativas.


// 16) DASHBOARD DO PROJETO
// Objetivo: visão geral da saúde.
// Após rodar scanner, veja Bugs, Vulnerabilities, Smells,
// Coverage, Duplications e Quality Gate no dashboard.


// 17) MEASURES / MÉTRICAS
// Objetivo: métricas detalhadas.
// Este projeto gera métricas de linhas, duplicação,
// complexidade, cobertura e issues.


// 18) BRANCH ANALYSIS
// Objetivo: analisar branches separadas.
// Rode scanner em uma branch diferente.
// Exemplo:
// sonar-scanner -Dsonar.branch.name=feature/sonar-demo


// 19) PULL REQUEST ANALYSIS
// Objetivo: avaliar qualidade antes do merge.
// Exemplo:
// sonar-scanner \
//   -Dsonar.pullrequest.key=123 \
//   -Dsonar.pullrequest.branch=feature/sonar-demo \
//   -Dsonar.pullrequest.base=main


// 20) CI/CD
// Objetivo: rodar análise automaticamente.
// Veja .github/workflows/sonar.yml.


// 21) FALSE POSITIVE
// Objetivo: marcar issue que não é problema real.
// Exemplo didático: após o Sonar apontar uma issue,
// marque como False Positive pela interface do Sonar.


// 22) ACCEPTED / WON'T FIX
// Objetivo: aceitar temporariamente um problema conhecido.
// Exemplo: manter código legado por decisão técnica documentada.


// 23) HISTÓRICO DE EVOLUÇÃO
// Objetivo: acompanhar melhora/piora.
// Faça commits corrigindo issues e veja o histórico do projeto.


// 24) PORTFOLIOS
// Objetivo: agrupar vários projetos para visão executiva.
// Recurso usado em edições comerciais do SonarQube.


// 25) APPLICATIONS
// Objetivo: agrupar projetos que formam uma aplicação maior.
// Também depende da edição/ambiente usado.


// 26) PERMISSÕES
// Objetivo: controlar quem vê/administra/altera projetos.
// Configure no SonarQube: Project Settings > Permissions.


// 27) WEB API
// Objetivo: automatizar consultas externas.
// Exemplo:
// GET /api/issues/search?componentKeys=sonar-js-demo


// 28) NOTIFICAÇÕES
// Objetivo: avisar mudanças.
// Configure notificações no usuário/projeto para Quality Gate,
// issues novas ou mudanças relevantes.


// Código de tela
document.getElementById("btn")?.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  renderUserName(name);
});