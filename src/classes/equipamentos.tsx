export class Arma {
  nome: string;
  dadosDano: string; // Numero de dados de dano da arma
  propriedades: string[]; // Exemplo: ["duas maos", "leve"]

  constructor(nome: string, dadosDano: string, propriedades: string[] = []) {
    this.nome = nome;
    this.dadosDano = dadosDano;
    this.propriedades = propriedades;
  }
}

export class Armadura {
  nome: string;
  tipo: "leve" | "media" | "pesada";
  bonusCA: number;
  bonusDestrezaMaximo: number;

  constructor(nome: string, tipo: "leve" | "media" | "pesada", bonusCA: number, bonusDestrezaMaximo: number) {
    this.nome = nome;
    this.tipo = tipo;
    this.bonusCA = bonusCA;
    this.bonusDestrezaMaximo = bonusDestrezaMaximo;
  }
}





