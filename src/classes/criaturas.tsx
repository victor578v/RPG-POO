import { Atributos } from "./atributos";
import * as Equipamentos from "./equipamentos";
import { Personagem } from "./personagem";
import { danoExtra } from "./propriedades";
import { TipoDano } from "./util";

// Aqui tem Heranca e Polimorfismo (Monstro é um Personagem e herda seus atributos)
// Aqui tem Associacao (Monstro tem um ataque especial)
// Aqui tem Sobre escrita de metodos (calcularNivel de monstro é diferente)

export class Especial {
  protected nome: string;
  public descricao: string;
  public chance: number;
  public dadosDano?: number;
  public dadosTipo?: number;
  public danoTipo?: TipoDano;
  protected tipoEfeito?: string;
  protected tipoTR?: string;
  protected diffTR?: number;

  constructor(
    nome: string,
    descricao: string,
    chance: number,
    dadosDano?: number,
    dadosTipo?: number,
    danoTipo?: TipoDano,
    tipoEfeito?: string,
    tipoTR?: string,
    diffTR?: number
  ) {
    this.nome = nome;
    this.descricao = descricao;
    this.chance = chance;
    this.dadosDano = dadosDano;
    this.dadosTipo = dadosTipo;
    this.danoTipo = danoTipo;
    this.tipoEfeito = tipoEfeito;
    this.tipoTR = tipoTR;
    this.diffTR = diffTR;
  }
}

export class Monstro extends Personagem {
  public ataqueEspecial?: Especial;

  constructor(
    nome: string,
    pontosVidaMaximos: number,
    pontosVida: number,
    atributos: Atributos,
    arma: Equipamentos.Arma,
    armadura: Equipamentos.Armadura,
    equipSecundario: Equipamentos.EquipSecundario,
    imagem: string,
    tamanho: "Pequeno" | "Medio" | "Grande",
    nivel?: number,
    exp?: number,
    ataqueEspecial?: Especial,
  ) {
    super(nome, pontosVidaMaximos, pontosVida, atributos, arma, armadura, equipSecundario, undefined, undefined, nivel, undefined, undefined, undefined, imagem, tamanho, undefined, exp);
    this.ataqueEspecial = ataqueEspecial;
  }

  calcularNivel() { // Sobre escrita de metodos
    const bonusProf = [2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7];
    if (this.nivel) {
      this.atributos.bonusProficiencia = bonusProf[Math.ceil(this.nivel) - 1];
    }
  }
}


export function criarNovoGoblin(): Monstro {
  const atributos = new Atributos(8, 14, 10, 10, 8, 8);
  const nome = `Goblin Escudeiro`;

  const novoGoblin = new Monstro(nome, 7, 7, atributos, Equipamentos.espada, Equipamentos.couro, Equipamentos.escudo, './goblin.png', "Pequeno", 0.25, 25, undefined,);
  novoGoblin.atributos.furtividade = true;
  novoGoblin.inventario = [Equipamentos.espada, Equipamentos.couro, Equipamentos.escudo]
  novoGoblin.calcularClasseArmadura();
  novoGoblin.calcularNivel();

  return novoGoblin;
}

export function criarNovoBau(): Monstro {
  const atributos = new Atributos(8, 0, 10, 8, 8, 8);
  const nome = `Bau`;

  const novoBau = new Monstro(nome, 1, 1, atributos, Equipamentos.vazioArma, Equipamentos.vazioArmadura, Equipamentos.vazioArma, './bau.png', "Pequeno", 0, 0, undefined,);
  const lootPool = [Equipamentos.adaga, Equipamentos.halfPlacas, Equipamentos.placas, Equipamentos.espada, Equipamentos.studded, Equipamentos.machadoGrande, Equipamentos.malho, Equipamentos.espadaGrande, Equipamentos.shoushaBlade]
  novoBau.inventario = []
  const numberOfItems = Math.floor(Math.random() * 3) + 1;
  const shuffledLootPool = lootPool.sort(() => Math.random() - 0.5);
  const selectedItems = shuffledLootPool.slice(0, numberOfItems);
  novoBau.inventario.push(...selectedItems);
  novoBau.calcularClasseArmadura();

  return novoBau;
}

export function criarNovoEsqueleto(): Monstro {
  const atributos = new Atributos(10, 14, 15, 6, 8, 5);
  const nome = `Esqueleto Guerreiro`;

  const novoEsqueleto = new Monstro(nome, 13, 13, atributos, Equipamentos.espada, Equipamentos.broken, Equipamentos.escudo, './esqueleto.png', "Pequeno", 0.5, 50, undefined,);
  novoEsqueleto.calcularClasseArmadura();
  novoEsqueleto.calcularNivel();
  novoEsqueleto.inventario = [Equipamentos.espada, Equipamentos.broken, Equipamentos.escudo]
  return novoEsqueleto;
}

export function criarNovoDragaoVermelhoAdulto(): Monstro {
  const atributos = new Atributos(27, 10, 25, 16, 13, 21);
  const nome = `Dragao Vermelho Adulto`;
  const mordida = new Equipamentos.Arma("Mordida", "item Monstro", 2, 10, TipoDano.Perfurante, [danoExtra], 2, 6, TipoDano.Fogo)
  const soproFogo = new Especial("Sopro Flamejante", "O Dragao utiliza seu sopro flamejante!", 20, 18, 6, TipoDano.Fogo, "Area", "Destreza", 21)
  const escamasDragaoVermelho = new Equipamentos.Armadura("Escamas do Dragao Vermelho", "item Monstro", "nenhuma", 9);

  const novoDragaoVermelhoAdulto = new Monstro(nome, 256, 256, atributos, mordida, escamasDragaoVermelho, Equipamentos.vazioArma, './redDragon.png', "Grande", 17, 18000, soproFogo);
  novoDragaoVermelhoAdulto.atributos.furtividade = true;
  novoDragaoVermelhoAdulto.atributos.percepcao = true;
  novoDragaoVermelhoAdulto.inventario = [Equipamentos.shoushaBladeCorrupted]
  novoDragaoVermelhoAdulto.calcularClasseArmadura();
  novoDragaoVermelhoAdulto.calcularNivel();

  return novoDragaoVermelhoAdulto;
}