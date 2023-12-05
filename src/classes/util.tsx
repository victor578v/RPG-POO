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
// Construtores e metodos de retorno aqui
export class RolarDado {
  public lados: number;
  public quantidade: number;
  public resultados: number[];
  public total: number;

  constructor(lados: number, quantidade: number) {
    this.lados = lados;
    this.quantidade = quantidade;
    this.resultados = []; 
    this.total = 0;
  }

  rolarVezes(): number[] {
    const resultados: number[] = [];

    for (let i = 0; i < this.quantidade; i++) {
      const resultadoDoDado = Math.floor(Math.random() * this.lados) + 1;
      resultados.push(resultadoDoDado);
    }

    this.resultados = resultados;
    this.calcularTotal(); // Chama o método para calcular o total
    return resultados;
  }

  calcularTotal() {
    this.total = this.resultados.reduce((acumula, resultado) => acumula + resultado, 0);
  }
}

export const _1d20 = new RolarDado(20, 1);