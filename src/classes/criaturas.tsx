import * as Equipamentos from "./equipamentos";
import { Atributos, Personagem } from "./personagem";

let contadorCriatura = 1;

export function criarNovoGoblin(): Personagem {
  const atributos = new Atributos(8, 14, 10, 10, 8, 8);
  const nome = `Goblin ${contadorCriatura}`;
  contadorCriatura++;

  const novoGoblin = new Personagem(nome, 7, 7, atributos, Equipamentos.adaga, Equipamentos.couro, Equipamentos.vazioArma);
  novoGoblin.atributos.furtividade = true;
  novoGoblin.calcularClasseArmadura();

  return novoGoblin;
}