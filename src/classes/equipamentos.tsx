import { DuasMaos, Propriedades } from "./propriedades";
import { TipoDano } from "./util";

export class Arma {
  nome: string;
  dadosDano: number; // Numero de dados de dano da arma
  dadoTipo: number; // Numero de lados do dado de dano Ex: d6, dado de 6 lados
  tipoDano: TipoDano; // Tipo de dano que a arma causa
  propriedades: Propriedades[]; // Lista as propriedades que a arma possui

  constructor(nome: string, dadosDano: number, dadoTipo: number, tipoDano: TipoDano, propriedades: Propriedades[] = []) {
    this.nome = nome;
    this.dadosDano = dadosDano;
    this.dadoTipo = dadoTipo;
    this.tipoDano = tipoDano;
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


// Lista de Armas
export const espadaGrande = new Arma("Espada Grande", 2, 6, TipoDano.Cortante, [new DuasMaos()]); // Espada grande, 2d6 dano, Propriedades: Duas Maos
export const malho = new Arma("Malho", 2, 8, TipoDano.Contundante, [new DuasMaos()]); //  malho, 2d8 dano, Propriedades: Duas Maos
export const machadoGrande = new Arma("Machado Grande", 2, 8, TipoDano.Cortante, [new DuasMaos()]); // Machado Grande, 2d8 dano, Propriedades: Duas Maos

// Lista de Armaduras
export const placas = new Armadura("Armadura de Placas", "pesada", 10, 0); // Armadura de Placas, Pesada, CA 20
