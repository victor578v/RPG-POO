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