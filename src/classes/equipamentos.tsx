import { duasMaos, Propriedades } from "./propriedades";
import { TipoDano } from "./util";

export class Equipamento {
  nome: string;

  constructor(nome:string) {
    this.nome = nome
  }
}

export class Arma extends Equipamento {
  dadosDano: number; // Numero de dados de dano da arma
  dadoTipo: number; // Numero de lados do dado de dano Ex: d6, dado de 6 lados
  tipoDano: TipoDano; // Tipo de dano que a arma causa
  propriedades: Propriedades[]; // Lista as propriedades que a arma possui
  bonusCA: number;

  constructor(nome: string, dadosDano: number, dadoTipo: number, tipoDano: TipoDano, propriedades: Propriedades[] = []) {
    super(nome);
    this.dadosDano = dadosDano;
    this.dadoTipo = dadoTipo;
    this.tipoDano = tipoDano;
    this.propriedades = propriedades;
    this.bonusCA = 0;
  }
}

export class Armadura extends Equipamento {
  tipo: "leve" | "media" | "pesada" | "nenhuma";
  bonusCA: number;

  constructor(nome: string, tipo: "leve" | "media" | "pesada" | "nenhuma", bonusCA: number) {
    super(nome);
    this.tipo = tipo;
    this.bonusCA = bonusCA;
  }
}

export class EquipSecundario extends Equipamento {
  bonusCA: number;

  constructor(nome: string, bonusCA: number) {
    super(nome);
    this.bonusCA = bonusCA;
  }
}


// Lista de Armas
export const vazioArma = new Arma("Vazia", 0, 0, TipoDano.Contundante, []); // Nenhuma Arma
export const espadaGrande = new Arma("Espada Grande", 2, 6, TipoDano.Cortante, [duasMaos]); // Espada grande, 2d6 dano, Propriedades: Duas Maos
export const malho = new Arma("Malho", 2, 8, TipoDano.Contundante, [duasMaos]); //  malho, 2d8 dano, Propriedades: Duas Maos
export const machadoGrande = new Arma("Machado Grande", 2, 8, TipoDano.Cortante, [duasMaos]); // Machado Grande, 2d8 dano, Propriedades: Duas Maos
export const espada = new Arma("Espada", 1, 8, TipoDano.Cortante, []); // Espada Comum, 1d8 dano, Propriedades: Nenhuma


// Lista de Armaduras
export const vazioArmadura = new Armadura("Nenhuma", "nenhuma", 0); // Nenhuma Armadura
export const placas = new Armadura("Placas", "pesada", 10); // Armadura de Placas, Pesada, CA 20
export const halfPlacas = new Armadura("Meia Armadura", "media", 6); // Half Plate (Meia Armadura), Media, CA 16+Des(MAX +2)
export const studded = new Armadura("Couro Batido", "leve", 3); // Armadura de Couro Batido, Leve, CA 13+Des

// Lista de Equipamento Secundario
export const escudo = new EquipSecundario("Escudo", 2)
export const tocha = new EquipSecundario("Tocha", 0)
