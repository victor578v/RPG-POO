export class Propriedades {
  nome: string;

  // Inicializa as Propriedades de armas
  constructor(nome: string) {
    this.nome = nome;
  }
}

export const duasMaos = new Propriedades("Duas Maos")