import * as Equipamentos from "./equipamentos";
import { Atributos, Personagem } from "./personagem";

const atributos = new Atributos(8, 14, 10, 10, 8, 8);
export const goblin1 = new Personagem("Goblin", 7, 7, atributos, Equipamentos.adaga, Equipamentos.couro, Equipamentos.vazioArma);
goblin1.atributos.furtividade = true;
goblin1.calcularClasseArmadura();