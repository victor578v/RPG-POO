import * as Equipamentos from "./equipamentos";
import { Atributos, Especial, Monstro} from "./personagem";
import { danoExtra } from "./propriedades";
import { TipoDano } from "./util";

let contadorCriatura = 1;

export function getContadorCriatura(): number {
  return contadorCriatura;
}

export function incrementarContadorCriatura(): void {
  contadorCriatura++;
}

export function reiniciarContadorCriatura(): void {
  contadorCriatura = 1;
}

export function criarNovoGoblin(): Monstro {
  const atributos = new Atributos(8, 14, 10, 10, 8, 8);
  const nome = `Goblin ${getContadorCriatura()}`;
  incrementarContadorCriatura();

  const novoGoblin = new Monstro(nome, 7, 7, atributos, Equipamentos.adaga, Equipamentos.couro, Equipamentos.vazioArma, '/goblin.png', "Pequeno");
  novoGoblin.atributos.furtividade = true;
  novoGoblin.calcularClasseArmadura();

  return novoGoblin;
}

export function criarNovoDragaoVermelhoAdulto(): Monstro {
  const atributos = new Atributos(27, 10, 25, 16, 13, 21);
  const nome = `Dragao Vermelho Adulto`;
  const mordida = new Equipamentos.Arma("Mordida", 2, 10, TipoDano.Perfurante, [danoExtra], 2, 6, TipoDano.Fogo)
  const soproFogo = new Especial("Sopro Flamejante", "O Dragao utiliza seu sopro flamejante!", 20, 18, 6, TipoDano.Fogo, "Area", "Destreza", 21)
  const escamasDragaoVermelho = new Equipamentos.Armadura("Escamas do Dragao Vermelho", "nenhuma", 9);

  const novoDragaoVermelhoAdulto = new Monstro(nome, 256, 256, atributos, mordida, escamasDragaoVermelho, Equipamentos.vazioArma, '/redDragon.png', "Grande",soproFogo);
  novoDragaoVermelhoAdulto.atributos.furtividade = true;
  novoDragaoVermelhoAdulto.atributos.percepcao = true;
  novoDragaoVermelhoAdulto.calcularClasseArmadura();

  return novoDragaoVermelhoAdulto;
}