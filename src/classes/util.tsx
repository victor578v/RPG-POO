export enum TipoDano {
  Cortante = "Cortante",
  Contundante = "Contundante",
  Perfurante = "Perfurante",
  Fogo = "Fogo",
  Frio = "Frio",
  Eletrico = "Elétrico",
  Psiquico = "Psíquico",
  Radiante = "Radiante",
  Veneno = "Veneno",
  Forca = "Força",
  Necrotico = "Necrótico",
  Acido = "Acido",
}

export class RolarDado {
  lados: number;
  quantidade: number;
  resultados: number[];

  constructor(lados: number, quantidade: number) {
    this.lados = lados;
    this.quantidade = quantidade;
    this.resultados = []; // Initialize the array here
  }

  rolarVezes(): number[] {
    const resultados: number[] = [];

    for (let i = 0; i < this.quantidade; i++) {
      // Gera um número aleatório de 1 ao numero de lados
      const resultadoDoDado = Math.floor(Math.random() * this.lados) + 1;

      // Adiciona o resultado ao array
      resultados.push(resultadoDoDado);
    }

    // Atualiza a propriedade resultados com os resultados obtidos
    this.resultados = resultados;

    return resultados;
  }
}

export const _1d20 = new RolarDado(20, 1);