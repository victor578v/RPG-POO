import { useState } from "react";
import * as Equipamentos from "./equipamentos";
import { acuidade, duasMaos } from "./propriedades";
import { _1d20, RolarDado } from "./util";
import { combate } from "./combate";

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
    // Calcula os bonus de habilidade
    calcularBonus() {
        this.atributos.forcaBonus = Number(Math.floor((this.atributos.forca - 10) / 2));
        this.atributos.destrezaBonus = Number(Math.floor((this.atributos.destreza - 10) / 2));
        this.atributos.constituicaoBonus = Number(Math.floor((this.atributos.constituicao - 10) / 2));
        this.atributos.inteligenciaBonus = Number(Math.floor((this.atributos.inteligencia - 10) / 2));
        this.atributos.sabedoriaBonus = Number(Math.floor((this.atributos.sabedoria - 10) / 2));
        this.atributos.carismaBonus = Number(Math.floor((this.atributos.carisma - 10) / 2));
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
    // Atualiza o personagem, usado mais adiante
    atualizarPersonagem(
        novoNome?: string,
        novaForca?: number,
        novaDestreza?: number,
        novaConstituicao?: number,
        novaInteligencia?: number,
        novaSabedoria?: number,
        novaCarisma?: number,
        novaArma?: Equipamentos.Arma,
        novaArmadura?: Equipamentos.Armadura,
        novoEquip?: Equipamentos.EquipSecundario
    ) {

        if (novaForca) {
            this.atributos.forca = novaForca
        }
        
        if (novaDestreza) {
            this.atributos.destreza = novaDestreza;
        }
    
        if (novaConstituicao) {
            this.atributos.constituicao = novaConstituicao;
        }
    
        if (novaInteligencia) {
            this.atributos.inteligencia = novaInteligencia;
        }
    
        if (novaSabedoria) {
            this.atributos.sabedoria = novaSabedoria;
        }
    
        if (novaCarisma) {
            this.atributos.carisma = novaCarisma;
        }

        if (novoNome) {
            this.nome = novoNome
        }

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
        this.calcularClasseArmadura();
    }
    // Logica para ataques.
    ataque(alvo: Personagem) {
        _1d20.rolarVezes();
        if (acuidade.acuidadeCheck(this)) { // Ataque com Destreza
            console.log(`1d20 + ${this.atributos.destrezaBonus + this.atributos.bonusProficiencia} = ${+_1d20.resultados + this.atributos.destrezaBonus + this.atributos.bonusProficiencia} (${_1d20.resultados} + ${this.atributos.destrezaBonus + this.atributos.bonusProficiencia})`);
            if (+_1d20.resultados == 20) {
                console.log("Acerto Critico!")
                return true;
            } else if (+_1d20.resultados + this.atributos.destrezaBonus + this.atributos.bonusProficiencia >= (alvo.classeArmadura ?? 0)) {
                console.log("Acerto!")
                return true;
            } else {
                console.log("Erro!")
                return false;
            }
        } else { // Ataque com Forca
            console.log(`1d20 + ${this.atributos.forcaBonus + this.atributos.bonusProficiencia} = ${+_1d20.resultados + this.atributos.forcaBonus + this.atributos.bonusProficiencia} (${_1d20.resultados} + ${this.atributos.forcaBonus + this.atributos.bonusProficiencia})`);
            if (+_1d20.resultados == 20) {
                console.log("Acerto Critico!")
                return true;
            } else if (+_1d20.resultados + this.atributos.forcaBonus + this.atributos.bonusProficiencia >= (alvo.classeArmadura ?? 0)) {
                console.log("Acerto!")
                return true;
            } else {
                console.log("Erro!")
                return false;
            }
        }
    }
    // Logica para dano.
    dano() {
        let dano;
        if (this.arma.nome == "Vazia") { // Dano desarmado
            dano = 1 + this.atributos.forcaBonus;
            console.log(`1 + ${this.atributos.forcaBonus} = ${1 + this.atributos.forcaBonus} (1 + ${this.atributos.forcaBonus}) ${this.arma.tipoDano}`);
        } else {
            let multiplicadorDados = 1;
            if (+_1d20.resultados == 20) {
                multiplicadorDados = 2;
            }

            if (acuidade.acuidadeCheck(this)) { // Dano com Destreza
                dano = new RolarDado(this.arma.dadoTipo, (this.arma.dadosDano * multiplicadorDados));
                dano.rolarVezes();
                console.log(`${this.arma.dadosDano * multiplicadorDados}d${this.arma.dadoTipo} + ${this.atributos.destrezaBonus} = ${+dano.total + this.atributos.destrezaBonus} (${dano.resultados} + ${this.atributos.destrezaBonus}) ${this.arma.tipoDano}`);
                dano = (dano.total + this.atributos.destrezaBonus) * multiplicadorDados;
            } else { // Dano com Forca
                dano = new RolarDado(this.arma.dadoTipo, (this.arma.dadosDano * multiplicadorDados));
                dano.rolarVezes();
                console.log(`${this.arma.dadosDano * multiplicadorDados}d${this.arma.dadoTipo} + ${this.atributos.forcaBonus} = ${+dano.total + this.atributos.forcaBonus} (${dano.resultados} + ${this.atributos.forcaBonus}) ${this.arma.tipoDano}`);
                dano = (dano.total + this.atributos.forcaBonus);
            }
        }
        return dano;
    }
    // Descanso longo
    descanso() {
        if (combate.rodada > 0) {
            console.log("Voce nao pode descansar agora!")
        } else {
            this.pontosVida = this.pontosVidaMaximos
            console.log("Pontos de vida recuperados!")
        }
    }
}

export function usePersonagem() {
    const atributos = new Atributos(10, 8, 8, 8, 8, 8);
    atributos.percepcao = true;

    const [personagem, setPersonagem] = useState(
        new Personagem("Sem Nome", 1, 1, atributos, Equipamentos.vazioArma, Equipamentos.vazioArmadura, Equipamentos.vazioArma)
    );
    
    personagem.calcularBonus()
    personagem.calcularClasseArmadura()

    const atualizarPersonagem = (
        novoNome?: string,
        novaForca?: number,
        novaDestreza?: number,
        novaConstituicao?: number,
        novaInteligencia?: number,
        novaSabedoria?: number,
        novaCarisma?: number,
        novaArma?: Equipamentos.Arma,
        novaArmadura?: Equipamentos.Armadura,
        novoEquip?: Equipamentos.EquipSecundario
    ) => {
        setPersonagem((basePersonagem) => {
            const mudarPersonagem = new Personagem({ ...basePersonagem });
            mudarPersonagem.atualizarPersonagem(novoNome, novaForca, novaDestreza, novaConstituicao, novaInteligencia, novaSabedoria, novaCarisma, novaArma, novaArmadura, novoEquip);
            return mudarPersonagem;
        });
    };

    return { personagem, atualizarPersonagem };
}
