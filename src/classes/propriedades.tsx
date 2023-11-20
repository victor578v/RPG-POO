import { Personagem } from "./personagem";

export class Propriedades {
  nome: string;
  desc: string;

  // Inicializa as Propriedades de armas
  constructor(nome: string, desc: string) {
    this.nome = nome;
    this.desc = desc;
  }
  acuidadeCheck(personagem: Personagem) {
    if (personagem.atributos.destreza >  personagem.atributos.forca && personagem.arma.propriedades.includes(acuidade)) {
      return true;
    } else {
      return false;
    }
  }
}

export const duasMaos = new Propriedades("Duas Maos", "Armas com a propriedade de Duas Maos requerem o uso de ambas a Mao Primaria e Secundaria para serem utilizadas.")
export const acuidade = new Propriedades("Acuidade", "Armas com a propriedade Acuidade podem atacar utilizando a destreza ou a forca do usuario, quaisquer que for maior.")
export const danoExtra = new Propriedades("Dano Extra", "Esta arma causa d de outro tipo")