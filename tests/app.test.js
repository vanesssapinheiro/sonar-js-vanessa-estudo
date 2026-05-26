import {
  vanessaTesteBug,
  vanessaTesteAtribuicao,
  vanessaTesteVulnerabilidade,
  vanessaTesteHotspot,
  vanessaTesteCodeSmell,
  vanessaTesteDividaTecnica,
  vanessaTesteDuplicacaoA,
  vanessaTesteDuplicacaoB,
  vanessaTesteComplexidadeCiclomatica,
  vanessaTesteComplexidadeCognitiva,
  vanessaTesteSeveridade,
  vanessaTesteNovoCodigo
} from "../src/app.js";

describe("Testes Vanessa Sonar", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="output"></div>';
  });

  test("vanessaTesteBug", () => {
    const user = {
      address: {
        city: "sao paulo"
      }
    };

    expect(vanessaTesteBug(user)).toBe("SAO PAULO");
  });

  test("vanessaTesteAtribuicao", () => {
    expect(vanessaTesteAtribuicao(false)).toBe("ativo");
  });

  test("vanessaTesteVulnerabilidade", () => {
    expect(vanessaTesteVulnerabilidade("2 + 2")).toBe(4);
  });

  test("vanessaTesteHotspot", () => {
    vanessaTesteHotspot("Vanessa");

    expect(document.getElementById("output").innerHTML).toBe("Vanessa");
  });

  test("vanessaTesteCodeSmell", () => {
    expect(vanessaTesteCodeSmell(10)).toBe(20);
  });

  test("vanessaTesteDividaTecnica", () => {
    expect(vanessaTesteDividaTecnica(100)).toBe(90);
  });

  test("vanessaTesteDuplicacaoA", () => {
    const cliente = {
      nome: " Vanessa ",
      email: " VANESSA@TESTE.COM ",
      telefone: " 99999 ",
      cidade: " sao paulo "
    };

    expect(vanessaTesteDuplicacaoA(cliente)).toBe(
      "VANESSA | vanessa@teste.com | 99999 | SAO PAULO"
    );
  });

  test("vanessaTesteDuplicacaoB", () => {
    const cliente = {
      nome: " Maria ",
      email: " MARIA@TESTE.COM ",
      telefone: " 88888 ",
      cidade: " rio "
    };

    expect(vanessaTesteDuplicacaoB(cliente)).toBe(
      "MARIA | maria@teste.com | 88888 | RIO"
    );
  });

  test("vanessaTesteComplexidadeCiclomatica tipo A valor maior que 100", () => {
    expect(
      vanessaTesteComplexidadeCiclomatica("A", 150, true, false)
    ).toBe(10);
  });

  test("vanessaTesteComplexidadeCiclomatica tipo B valor menor que 200", () => {
    expect(
      vanessaTesteComplexidadeCiclomatica("B", 100, false, true)
    ).toBe(70);
  });

  test("vanessaTesteComplexidadeCiclomatica tipo C valor maior que 300", () => {
    expect(
      vanessaTesteComplexidadeCiclomatica("C", 350, false, false)
    ).toBe(90);
  });

  test("vanessaTesteComplexidadeCiclomatica tipo inválido", () => {
    expect(
      vanessaTesteComplexidadeCiclomatica("X", 10, false, false)
    ).toBe(0);
  });

  test("vanessaTesteComplexidadeCognitiva com desconto", () => {
    const pedido = {
      cliente: true,
      itens: [
        {
          ativo: true,
          preco: 10,
          quantidade: 3,
          desconto: 5
        }
      ]
    };

    expect(vanessaTesteComplexidadeCognitiva(pedido)).toBe(25);
  });

  test("vanessaTesteComplexidadeCognitiva sem desconto", () => {
    const pedido = {
      cliente: true,
      itens: [
        {
          ativo: true,
          preco: 10,
          quantidade: 3
        }
      ]
    };

    expect(vanessaTesteComplexidadeCognitiva(pedido)).toBe(30);
  });

  test("vanessaTesteComplexidadeCognitiva pedido vazio", () => {
    expect(vanessaTesteComplexidadeCognitiva(null)).toBe(0);
  });

  test("vanessaTesteSeveridade", () => {
    expect(vanessaTesteSeveridade()).toBe("123456");
  });

  test("vanessaTesteNovoCodigo com null", () => {
    expect(vanessaTesteNovoCodigo(null)).toBe("sem valor");
  });

  test("vanessaTesteNovoCodigo com valor", () => {
    expect(vanessaTesteNovoCodigo("ok")).toBe("ok");
  });
});