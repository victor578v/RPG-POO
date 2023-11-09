import { useState, useEffect } from "react";
import * as Equipamentos from "./equipamentos";
import { duasMaos } from "./propriedades";

export class Atributos {
    // Valores base dos Atributos
    forca: number;
    destreza: number;
    constituicao: number;
    inteligencia: number;
    sabedoria: number;
    carisma: number;

    // Bônus dos Atributos
    forcaBonus: number;
    destrezaBonus: number;
    constituicaoBonus: number;
    inteligenciaBonus: number;
    sabedoriaBonus: number;
    carismaBonus: number;

    // Proficiências em Testes de Resistência
    testeForca: boolean;
    testeDestreza: boolean;
    testeConstituicao: boolean;
    testeInteligencia: boolean;
    testeSabedoria: boolean;
    testeCarisma: boolean;

    // Proficiencias em Perícias
    atletismo: boolean;
    sobrevivencia: boolean;
    maoHabil: boolean;
    furtividade: boolean;
    acrobacias: boolean;
    arcanismo: boolean;
    natureza: boolean;
    medicina: boolean;
    percepcao: boolean;
    historia: boolean;
    intuicao: boolean;
    persuasao: boolean;
    enganacao: boolean;
    intimidacao: boolean;

    // Bônus de Proficiência
    bonusProficiencia: number;

    constructor(
        forca: number,
        destreza: number,
        constituicao: number,
        inteligencia: number,
        sabedoria: number,
        carisma: number,
    ) {
        // Inicializa os atributos
        this.forca = forca;
        this.destreza = destreza;
        this.constituicao = constituicao;
        this.inteligencia = inteligencia;
        this.sabedoria = sabedoria;
        this.carisma = carisma;

        // Inicializa o bonus dos atributos
        this.forcaBonus = Number(Math.floor((this.forca - 10) / 2));
        this.destrezaBonus = Number(Math.floor((this.destreza - 10) / 2));
        this.constituicaoBonus = Number(Math.floor((this.constituicao - 10) / 2));
        this.inteligenciaBonus = Number(Math.floor((this.inteligencia - 10) / 2));
        this.sabedoriaBonus = Number(Math.floor((this.sabedoria - 10) / 2));
        this.carismaBonus = Number(Math.floor((this.carisma - 10) / 2));

        // Inicializa as proficiências em testes de resistência
        this.testeForca = false;
        this.testeDestreza = false;
        this.testeConstituicao = false;
        this.testeInteligencia = false;
        this.testeSabedoria = false;
        this.testeCarisma = false;
        // Inicializa as proficiencias em pericias
        this.atletismo = false;
        this.sobrevivencia = false;
        this.maoHabil = false;
        this.furtividade = false;
        this.acrobacias = false;
        this.arcanismo = false;
        this.natureza = false;
        this.medicina = false;
        this.percepcao = false;
        this.historia = false;
        this.intuicao = false;
        this.persuasao = false;
        this.enganacao = false;
        this.intimidacao = false;

        // Inicializa o bônus de proficiência
        this.bonusProficiencia = 2; // TODO: Bonus de proficiencia baseado em nivel do personagem
    }
}

export class Personagem {
    nome: string;
    pontosVida: number;
    pontosVidaMaximos: number;
    atributos: Atributos;
    arma: Equipamentos.Arma;
    armadura: Equipamentos.Armadura;
    equipSecundario: Equipamentos.Arma | Equipamentos.EquipSecundario;
    percepcaoPassiva: number;
    classeArmadura?: number;
    bonusProficiencia: any;

    // Construtor que aceita um objeto com propriedades nomeadas
    constructor(options: {
        nome: string;
        pontosVida: number;
        pontosVidaMaximos: number;
        atributos: Atributos;
        arma: Equipamentos.Arma;
        armadura: Equipamentos.Armadura;
        equipSecundario: Equipamentos.Arma | Equipamentos.EquipSecundario;
        classeArmadura?: number;
    });
    // Construtor que aceita parâmetros individuais
    constructor(
        nome: string,
        pontosVida: number,
        pontosVidaMaximos: number,
        atributos: Atributos,
        arma: Equipamentos.Arma,
        armadura: Equipamentos.Armadura,
        equipSecundario: Equipamentos.Arma | Equipamentos.EquipSecundario,
        classeArmadura?: number
    );
    // Assinatura combinada do construtor usando sobrecarga de método (arg = argumento)
    constructor(
        // Primeiro parâmetro: Pode ser uma string (para 'nome') ou um objeto com propriedades nomeadas
        arg1: string | {
            nome: string;
            pontosVida: number;
            pontosVidaMaximos: number;
            atributos: Atributos;
            arma: Equipamentos.Arma;
            armadura: Equipamentos.Armadura;
            equipSecundario: Equipamentos.Arma | Equipamentos.EquipSecundario;
            classeArmadura?: number;
        },
        // Parâmetros individuais opcionais para o restante das propriedades 
        arg2?: number,
        arg3?: number,
        arg4?: Atributos,
        arg5?: Equipamentos.Arma,
        arg6?: Equipamentos.Armadura,
        arg7?: Equipamentos.Arma | Equipamentos.EquipSecundario,
        arg8?: number
    ) {
        if (typeof arg1 === 'string') {
            // Usa parametros individuais
            this.nome = arg1;
            this.pontosVida = arg2!;
            this.pontosVidaMaximos = arg3!;
            this.atributos = arg4!;
            this.arma = arg5!;
            this.armadura = arg6!;
            this.equipSecundario = arg7!;
            this.classeArmadura = arg8;
        } else {
            // Usa os parametros de um objeto
            this.nome = arg1.nome;
            this.pontosVida = arg1.pontosVida;
            this.pontosVidaMaximos = arg1.pontosVidaMaximos;
            this.atributos = arg1.atributos;
            this.arma = arg1.arma;
            this.armadura = arg1.armadura;
            this.equipSecundario = arg1.equipSecundario;
            this.classeArmadura = arg1.classeArmadura;
        }

        // Calcula a Percepcao Passiva (PP)
        this.percepcaoPassiva = 10 + (this.atributos.sabedoriaBonus || 0);
        if (this.atributos.percepcao) {
            this.percepcaoPassiva += this.atributos.bonusProficiencia;
        }
    }
    // Calcula a Classe de Armadura (CA)
    calcularClasseArmadura() {
        if (this.armadura) {
            this.classeArmadura = 10 + this.armadura.bonusCA;
            if (this.armadura.tipo === "leve" || this.armadura.tipo === "nenhuma") {
                this.classeArmadura += this.atributos.destrezaBonus;
            } else if (this.armadura.tipo === "media") {
                this.classeArmadura += Math.min(2, this.atributos.destrezaBonus);
            }
        } else {
            this.classeArmadura = 10 + this.atributos.destrezaBonus;
        }
        if (this.equipSecundario) {
            this.classeArmadura += this.equipSecundario.bonusCA;
        }
    }
    atualizarPersonagem(
        novaArma?: Equipamentos.Arma,
        novaArmadura?: Equipamentos.Armadura,
        novoEquip?: Equipamentos.EquipSecundario
    ) {

        if (novaArma) {
            if (novaArma.propriedades.includes(duasMaos)) {
                this.arma = novaArma
                this.equipSecundario = novaArma;
            } else if (this.equipSecundario === this.arma) {
                this.arma = novaArma
                this.equipSecundario = Equipamentos.vazioArma;
            } else {
                this.arma = novaArma
            }
        }

        if (novaArmadura) {
            this.armadura = novaArmadura
        }

        if (novoEquip) {
            if (this.arma.propriedades.includes(duasMaos)) {
                this.arma = Equipamentos.vazioArma;
                this.equipSecundario = novoEquip;
            } else {
                this.equipSecundario = novoEquip;
            }
        }

        // Recalculate stats
        this.calcularClasseArmadura();
    }
}

export function usePersonagem() {
    const atributos = new Atributos(10, 8, 8, 8, 8, 8);
    atributos.percepcao = true;

    const [personagem, setPersonagem] = useState(
        new Personagem("Sem Nome", 1, 1, atributos, Equipamentos.vazioArma, Equipamentos.vazioArmadura, Equipamentos.vazioArma)
    );

    useEffect(() => {
        personagem.calcularClasseArmadura();
        console.log("-".repeat(10));
        console.log("Nome:", personagem.nome);
        console.log("Forca:", personagem.atributos.forca + ` (${personagem.atributos.forcaBonus >= 0 ? '+' : ''}${personagem.atributos.forcaBonus})`);
        console.log("Destreza:", personagem.atributos.destreza + ` (${personagem.atributos.destrezaBonus >= 0 ? '+' : ''}${personagem.atributos.destrezaBonus})`);
        console.log("Constituicao:", personagem.atributos.constituicao + ` (${personagem.atributos.constituicaoBonus >= 0 ? '+' : ''}${personagem.atributos.constituicaoBonus})`);
        console.log("Inteligencia:", personagem.atributos.inteligencia + ` (${personagem.atributos.inteligenciaBonus >= 0 ? '+' : ''}${personagem.atributos.inteligenciaBonus})`);
        console.log("Sabedoria:", personagem.atributos.sabedoria + ` (${personagem.atributos.sabedoriaBonus >= 0 ? '+' : ''}${personagem.atributos.sabedoriaBonus})`);
        console.log("Carisma:", personagem.atributos.carisma + ` (${personagem.atributos.carismaBonus >= 0 ? '+' : ''}${personagem.atributos.carismaBonus})`);
        console.log("Mao Principal:", personagem.arma.nome);
        console.log("Mao Secundaria:", personagem.equipSecundario.nome);
        console.log("Armadura:", personagem.armadura.nome);
        console.log("Classe de Armadura:", personagem.classeArmadura);
    }, [personagem]);

    const atualizarPersonagem = (
        novaArma?: Equipamentos.Arma,
        novaArmadura?: Equipamentos.Armadura,
        novoEquip?: Equipamentos.EquipSecundario
    ) => {
        setPersonagem((basePersonagem) => {
            const mudarPersonagem = new Personagem({ ...basePersonagem });
            mudarPersonagem.atualizarPersonagem(novaArma, novaArmadura, novoEquip);
            return mudarPersonagem;
        });
    };

    return { personagem, atualizarPersonagem };
}
