export class Propriedades {
  nome: string;

  // Inicializa as Propriedades de armas
  constructor(nome: string) {
    this.nome = nome;
  }
}

// Propriedade de Duas Maos para armas
export class DuasMaos extends Propriedades {
  constructor() {
    super("Duas Mãos");
  }

  isDuasMaos(): boolean {
    return true;
  }
}

// Propriedade Leve para armas
export class Leve extends Propriedades {
  constructor() {
    super("Leve");
  }

  isLeve(): boolean {
    return true;
  }
}