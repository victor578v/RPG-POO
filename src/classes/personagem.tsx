class Atributos {
    forca: number;
    destreza: number;
    constituicao: number;
    inteligencia: number;
    sabedoria: number;
    carisma: number;
  
    constructor(
      forca: number,
      destreza: number,
      constituicao: number,
      inteligencia: number,
      sabedoria: number,
      carisma: number
    ) {
      this.forca = forca;
      this.destreza = destreza;
      this.constituicao = constituicao;
      this.inteligencia = inteligencia;
      this.sabedoria = sabedoria;
      this.carisma = carisma;
    }
  }
  
  class Personagem {
    nome: string;
    pontosVida: number;
    pontosVidaMaximos: number;
    atributos: Atributos;
  
    constructor(
      nome: string,
      pontosVida: number,
      pontosVidaMaximos: number,
      atributos: Atributos
    ) {
      this.nome = nome;
      this.pontosVida = pontosVida;
      this.pontosVidaMaximos = pontosVidaMaximos;
      this.atributos = atributos;
    }
  }