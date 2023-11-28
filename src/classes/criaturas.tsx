import * as Equipamentos from "./equipamentos";
import { Atributos, Especial, Monstro} from "./personagem";
import { danoExtra } from "./propriedades";
import { TipoDano } from "./util";

export function criarNovoGoblin(): Monstro {
  const atributos = new Atributos(8, 14, 10, 10, 8, 8);
  const nome = `Goblin Escudeiro`;

  const novoGoblin = new Monstro(nome, 7, 7, atributos, Equipamentos.espada, Equipamentos.couro, Equipamentos.escudo, './goblin.png', "Pequeno", undefined, 0.25);
  novoGoblin.atributos.furtividade = true;
  novoGoblin.inventario = [Equipamentos.espada, Equipamentos.couro, Equipamentos.escudo]
  novoGoblin.calcularClasseArmadura();

  return novoGoblin;
}

export function criarNovoEsqueleto(): Monstro {
  const atributos = new Atributos(10, 14, 15, 6, 8, 5);
  const nome = `Esqueleto Guerreiro`;

  const novoEsqueleto = new Monstro(nome, 13, 13, atributos, Equipamentos.espada, Equipamentos.halfPlacas, Equipamentos.escudo, './esqueleto.png', "Pequeno", undefined, 0.25);
  novoEsqueleto.calcularClasseArmadura();
  novoEsqueleto.inventario = [Equipamentos.espada, Equipamentos.halfPlacas, Equipamentos.escudo]
  return novoEsqueleto;
}

export function criarNovoDragaoVermelhoAdulto(): Monstro {
  const atributos = new Atributos(27, 10, 25, 16, 13, 21);
  const nome = `Dragao Vermelho Adulto`;
  const mordida = new Equipamentos.Arma("Mordida", "item Monstro", 2, 10, TipoDano.Perfurante, [danoExtra], 2, 6, TipoDano.Fogo)
  const soproFogo = new Especial("Sopro Flamejante", "O Dragao utiliza seu sopro flamejante!", 20, 18, 6, TipoDano.Fogo, "Area", "Destreza", 21)
  const escamasDragaoVermelho = new Equipamentos.Armadura("Escamas do Dragao Vermelho", "item Monstro", "nenhuma", 9);

  const novoDragaoVermelhoAdulto = new Monstro(nome, 256, 256, atributos, mordida, escamasDragaoVermelho, Equipamentos.vazioArma, './redDragon.png', "Grande",soproFogo, 17);
  novoDragaoVermelhoAdulto.atributos.furtividade = true;
  novoDragaoVermelhoAdulto.atributos.percepcao = true;
  novoDragaoVermelhoAdulto.inventario = [Equipamentos.shoushaBladeCorrupted]
  novoDragaoVermelhoAdulto.calcularClasseArmadura();

  return novoDragaoVermelhoAdulto;
}