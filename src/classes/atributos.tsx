
// Aqui tem encapsulamento c/ Getter e Setters
// Aqui tem construtores

export class Atributos {
    // Valores base dos Atributos
    private _forca: number;
    private _destreza: number;
    private _constituicao: number;
    private _inteligencia: number;
    private _sabedoria: number;
    private _carisma: number;

    // Bônus dos Atributos
    private _forcaBonus: number;
    private _destrezaBonus: number;
    private _constituicaoBonus: number;
    private _inteligenciaBonus: number;
    private _sabedoriaBonus: number;
    private _carismaBonus: number;

    // Proficiências em Testes de Resistência NAO É USADO
    public testeForca: boolean;
    public testeDestreza: boolean;
    public testeConstituicao: boolean;
    public testeInteligencia: boolean;
    public testeSabedoria: boolean;
    public testeCarisma: boolean;

    // Proficiencias em Perícias NAO É USADO
    public atletismo: boolean;
    public sobrevivencia: boolean;
    public maoHabil: boolean;
    public furtividade: boolean;
    public acrobacias: boolean;
    public arcanismo: boolean;
    public natureza: boolean;
    public medicina: boolean;
    public percepcao: boolean;
    public historia: boolean;
    public intuicao: boolean;
    public persuasao: boolean;
    public enganacao: boolean;
    public intimidacao: boolean;

    // Bônus de Proficiência 
    public bonusProficiencia: number;

    constructor(
        forca: number,
        destreza: number,
        constituicao: number,
        inteligencia: number,
        sabedoria: number,
        carisma: number,
    ) {
        // Inicializa os atributos
        this._forca = forca;
        this._destreza = destreza;
        this._constituicao = constituicao;
        this._inteligencia = inteligencia;
        this._sabedoria = sabedoria;
        this._carisma = carisma;

        // Inicializa o bonus dos atributos
        this._forcaBonus = Number(Math.floor((this._forca - 10) / 2));
        this._destrezaBonus = Number(Math.floor((this._destreza - 10) / 2));
        this._constituicaoBonus = Number(Math.floor((this._constituicao - 10) / 2));
        this._inteligenciaBonus = Number(Math.floor((this._inteligencia - 10) / 2));
        this._sabedoriaBonus = Number(Math.floor((this._sabedoria - 10) / 2));
        this._carismaBonus = Number(Math.floor((this._carisma - 10) / 2));

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
        this.bonusProficiencia = 2;
    }

    get forca(): number {
        return this._forca;
    }

    set forca(forca: number) {
        this._forca = forca;
        this._forcaBonus = Math.floor((this._forca - 10) / 2);
    }

    get destreza(): number {
        return this._destreza;
    }

    set destreza(destreza: number) {
        this._destreza = destreza;
        this._destrezaBonus = Math.floor((this._destreza - 10) / 2);
    }

    get constituicao(): number {
        return this._constituicao;
    }

    set constituicao(constituicao: number) {
        this._constituicao = constituicao;
        this._constituicaoBonus = Math.floor((this._constituicao - 10) / 2);
    }

    get inteligencia(): number {
        return this._inteligencia;
    }

    set inteligencia(inteligencia: number) {
        this._inteligencia = inteligencia;
        this._inteligenciaBonus = Math.floor((this._inteligencia - 10) / 2);
    }

    get sabedoria(): number {
        return this._sabedoria;
    }

    set sabedoria(sabedoria: number) {
        this._sabedoria = sabedoria;
        this._sabedoriaBonus = Math.floor((this._sabedoria - 10) / 2);
    }

    get carisma(): number {
        return this._carisma;
    }

    set carisma(carisma: number) {
        this._carisma = carisma;
        this._carismaBonus = Math.floor((this._carisma - 10) / 2);
    }

    get forcaBonus(): number {
        return this._forcaBonus;
    }

    set forcaBonus(bonus: number) {
        this._forcaBonus = bonus;
    }

    get destrezaBonus(): number {
        return this._destrezaBonus;
    }

    set destrezaBonus(bonus: number) {
        this._destrezaBonus = bonus;
    }

    get constituicaoBonus(): number {
        return this._constituicaoBonus;
    }

    set constituicaoBonus(bonus: number) {
        this._constituicaoBonus = bonus;
    }

    get inteligenciaBonus(): number {
        return this._inteligenciaBonus;
    }

    set inteligenciaBonus(bonus: number) {
        this._inteligenciaBonus = bonus;
    }

    get sabedoriaBonus(): number {
        return this._sabedoriaBonus;
    }

    set sabedoriaBonus(bonus: number) {
        this._sabedoriaBonus = bonus;
    }

    get carismaBonus(): number {
        return this._carismaBonus;
    }

    set carismaBonus(bonus: number) {
        this._carismaBonus = bonus;
    }
}