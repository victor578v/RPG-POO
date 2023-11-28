import { acuidade, danoExtra, duasMaos, Propriedades } from "./propriedades";
import { TipoDano } from "./util";

export class Item {
  nome: string;
  descricao: string;

  constructor(nome:string, descricao: string) {
    this.nome = nome
    this.descricao = descricao;
  }
}

export class Arma extends Item {
  dadosDano: number; // Numero de dados de dano da arma
  dadoTipo: number; // Numero de lados do dado de dano Ex: d6, dado de 6 lados
  tipoDano: TipoDano; // Tipo de dano que a arma causa
  propriedades: Propriedades[]; // Lista as propriedades que a arma possui
  bonusCA: number;
  dadosDanoExtra?: number; // Numero de dados de dano Extra da arma
  dadoTipoExtra?: number; // Numero de lados do dado de dano Extra
  tipoDanoExtra?: TipoDano; // Tipo de dano Extra que a arma causa

  constructor(
    nome: string,
    descricao: string,
    dadosDano: number,
    dadoTipo: number,
    tipoDano: TipoDano,
    propriedades: Propriedades[] = [],
    dadosDanoExtra?: number,
    dadoTipoExtra?: number,
    tipoDanoExtra?: TipoDano
  ) {
    super(nome, descricao);
    this.dadosDano = dadosDano;
    this.dadoTipo = dadoTipo;
    this.tipoDano = tipoDano;
    this.propriedades = propriedades;
    this.bonusCA = 0;
    this.dadosDanoExtra = dadosDanoExtra;
    this.dadoTipoExtra = dadoTipoExtra;
    this.tipoDanoExtra = tipoDanoExtra;
  }
}

export class Armadura extends Item {
  tipo: "leve" | "media" | "pesada" | "nenhuma";
  bonusCA: number;

  constructor(nome: string, descricao: string, tipo: "leve" | "media" | "pesada" | "nenhuma", bonusCA: number) {
    super(nome, descricao);
    this.tipo = tipo;
    this.bonusCA = bonusCA;
  }
}

export class EquipSecundario extends Item {
  bonusCA: number;

  constructor(nome: string, descricao: string, bonusCA: number) {
    super(nome, descricao);
    this.bonusCA = bonusCA;
  }
}


// Lista de Armas
export const vazioArma = new Arma("Vazia", "Nada. Apenas seus punhos.", 0, 0, TipoDano.Contundante, []); // Nenhuma Arma
export const espadaGrande = new Arma("Espada Grande", "Uma pesada espada de duas mãos.", 2, 6, TipoDano.Cortante, [duasMaos]); // Espada grande, 2d6 dano, Propriedades: Duas Mãos
export const malho = new Arma("Malho", "Um tipo grande de martelo feito para combate.", 2, 8, TipoDano.Contundante, [duasMaos]); //  Malho, 2d8 dano, Propriedades: Duas Mãos
export const machadoGrande = new Arma("Machado Grande", "Um machado de haste longa e cabeça pesada feito para combate.", 2, 8, TipoDano.Cortante, [duasMaos]); // Machado Grande, 2d8 dano, Propriedades: Duas Mãos
export const espada = new Arma("Espada", "Uma espada comum para combate.", 1, 8, TipoDano.Cortante, [acuidade]); // Espada Comum, 1d8 dano, Propriedades: Nenhuma
export const adaga = new Arma("Adaga", "Uma lâmina curta e afiada para ataques rápidos.", 1, 4, TipoDano.Perfurante, [acuidade]); // Adaga, 1d4 dano, Propriedades: Acuidade
export const shoushaBlade = new Arma("Odachi de Amaterasu", "Uma imponente odachi imbuida com a bencao da deusa solar Amaterasu.", 2, 6, TipoDano.Cortante, [duasMaos, danoExtra], 2, 6, TipoDano.Radiante); // Odachi de Amaterasu, 2d6 dano, Propriedades: Duas Mãos, Dano Extra (Radiante)
export const shoushaBladeCorrupted = new Arma("Furia do Dragao Vermelho", "Uma espada grande imbuida com a terrível fúria de um dragão vermelho. A lâmina emite um calor intenso e ondas de energia flamejante.", 2, 6, TipoDano.Cortante, [duasMaos, danoExtra], 2, 6, TipoDano.Fogo); // Odachi de Shura, 2d6 dano, Propriedades: Duas Mãos, Dano Extra (Fogo)

// Lista de Armaduras
export const vazioArmadura = new Armadura("Nenhuma", "Apenas uma roupa para cobrir o corpo.", "nenhuma", 0); // Nenhuma Armadura
export const placas = new Armadura("Armadura de Placas", "Uma armadura de placas de metal completa. Proteção Pesada.", "pesada", 10); // Armadura de Placas, Pesada, CA 20
export const halfPlacas = new Armadura("Meia Armadura", "Uma meia armadura feita de placas e tecido resistente.", "media", 6); // Half Plate (Meia Armadura), Média, CA 16 + Des(MAX +2)
export const studded = new Armadura("Armadura de Couro Batido", "Uma armadura de couro com reforços de metal.", "leve", 3); // Armadura de Couro Batido, Leve, CA 13 + Des
export const couro = new Armadura("Armadura de Couro", "Uma armadura básica feita de couro.", "leve", 1); // Armadura de Couro, Leve, CA 11 + Des

// Lista de Equipamento Secundario
export const escudo = new EquipSecundario("Escudo", "Um escudo comum com uma tira de couro para agarrar.", 2); // Escudo, Bônus de CA +2
export const tocha = new EquipSecundario("Tocha", "Uma tocha acesa para iluminar o caminho.", 0); // Tocha, Sem bônus de CA