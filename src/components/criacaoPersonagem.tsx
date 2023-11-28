import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useState } from 'react';
import './geral.css';
import { Personagem } from '../classes/personagem';
import { useForm } from 'react-hook-form';
import Ficha from './ficha';
import Tutorial from './Tutorial';
import { Arma, Armadura, EquipSecundario } from '../classes/equipamentos';

interface CriarPersonagemProps {
    personagem: Personagem;
    atualizarPersonagem: (
        novoNome?: string,
        novaForca?: number,
        novaDestreza?: number,
        novaConstituicao?: number,
        novaInteligencia?: number,
        novaSabedoria?: number,
        novaCarisma?: number,
        novaArma?: Arma,
        novaArmadura?: Armadura,
        novoEquip?: EquipSecundario,
        novaImagem?: string,
        novaRaca?: string,
        novaClasse?: string,
    ) => void;
}


const CriarPersonagem: React.FC<CriarPersonagemProps> = ({ personagem, atualizarPersonagem }) => {
    const { register, handleSubmit, watch } = useForm();
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [pontosAtributo, setPontosAtributo] = useState(24);
    const [personagemImg, setPersonagemImg] = useState('')
    const [personagemCriado, setPersonagemCriado] = useState(false);

    function checkPersonagem(personagem: Personagem) {
        if (personagem.nome !== "Sem Nome") {
            const confirma = window.confirm("Você já possui um personagem! Criar um novo irá resetar todo o progresso. Tem certeza que deseja criar um novo personagem?");
            if (confirma) {
                personagem.imagem = './placeholder.png'
                personagem.nome = 'Sem Nome'
                localStorage.clear();
                setOpen(true);
            }
        } else {
            setOpen(true);
        }
    }

    const onSubmit = (data: any) => {
        if (pontosAtributo < 0) {
            alert("Voce alocou mais pontos do que tem disponivel!")
        } else if (data.nome == "") {
            alert("De um nome ao personagem!")
        } else if (pontosAtributo > 0) {
            alert("Voce ainda tem pontos para alocar!")
        } else if (data.raca == "") {
            alert("Escolha uma Raca!")
        } else if (data.classe == "") {
            alert("Escolha uma Classe!")
        } else {
            escolherAtributos(data.forca, data.destreza, data.constituicao, data.inteligencia, data.sabedoria, data.carisma);
            escolherBasicos(data.nome, personagemImg, data.raca, data.classe);
            setOpen(false)
            setOpen2(true)
            alert("Personagem Criado!")
            setPersonagemCriado(true);
        }
    };

    const escolherBasicos = (novoNome: string, novaImagem: string, novaRaca: string, novaClasse: string) => {
        atualizarPersonagem(novoNome, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, novaImagem, novaRaca, novaClasse);
    }

    const escolherAtributos = (
        novaForca?: number,
        novaDestreza?: number,
        novaConstituicao?: number,
        novaInteligencia?: number,
        novaSabedoria?: number,
        novaCarisma?: number
    ) => {
        atualizarPersonagem(undefined, novaForca, novaDestreza, novaConstituicao, novaInteligencia, novaSabedoria, novaCarisma);
    };

    const mudaImagem = () => {
        const novaImagem = watch('imgPersonagem');
        if (urlValido(novaImagem)) {
            setPersonagemImg(novaImagem);
        } else {
            setPersonagemImg(novaImagem);
        }
    }

    function salvarPersonagem(personagem: Personagem) {
        localStorage.setItem("personagem", JSON.stringify(personagem));
    }

    function urlValido(url?: string): boolean {
        if (!url) {
            return false; // Se url for undefined, não é uma URL válida
        }

        const regex = /^(ftp|http|https):\/\/[^ "]+$/;
        return regex.test(url);
    }

    const alocarPontos = () => {
        const forca = +watch('forca');
        const destreza = +watch('destreza');
        const constituicao = +watch('constituicao');
        const inteligencia = +watch('inteligencia');
        const sabedoria = +watch('sabedoria');
        const carisma = +watch('carisma');

        const totalAtributos = forca + destreza + constituicao + inteligencia + sabedoria + carisma;
        const pontosAtributoGastos = totalAtributos - 48; // 48 é o total inicial (6 atributos * 8)

        setPontosAtributo(24 - pontosAtributoGastos);
    };

    return (
        <>
            {personagemCriado && <Modal open={open2} onClose={() => {setOpen2(false); salvarPersonagem(personagem)}} center classNames={{ overlay: 'customOverlay', modal: 'customModal' }} closeIcon={<span className='closeButton'>&times;</span>}><Ficha personagem={personagem} atualizarPersonagem={atualizarPersonagem}/></Modal>}
            <div className='botao' onClick={() => checkPersonagem(personagem)}><p>Criar Personagem</p></div>
            <Modal open={open} onClose={() => setOpen(false)} center classNames={{ overlay: 'customOverlay', modal: 'customModal' }} closeIcon={<span className='closeButton'>&times;</span>}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p className='separador'>Basicos</p>

                    <label htmlFor="nome">Nome:</label>
                    <input type="text" placeholder={personagem.nome} id="nome" {...register('nome')} />

                    <div className='separadorAtributos'>
                        <p className='separador'>Atributos</p>
                        <p>Pontos restantes: {pontosAtributo}</p>
                        <label htmlFor="forca">Forca</label>
                        <input type="number" id="forca" min={8} max={18} defaultValue={8} step={1} {...register('forca', { onChange: alocarPontos, onBlur: alocarPontos })} />
                        <label htmlFor="destreza">Destreza</label>
                        <input type="number" id="destreza" min={8} max={18} defaultValue={8} step={1}  {...register('destreza', { onChange: alocarPontos, onBlur: alocarPontos })} />
                        <label htmlFor="constituicao">Constituicao</label>
                        <input type="number" id="constituicao" min={8} max={18} defaultValue={8} step={1}  {...register('constituicao', { onChange: alocarPontos, onBlur: alocarPontos })} />
                        <label htmlFor="inteligencia">Inteligencia</label>
                        <input type="number" id="inteligencia" min={8} max={18} defaultValue={8} step={1}  {...register('inteligencia', { onChange: alocarPontos, onBlur: alocarPontos })} />
                        <label htmlFor="sabedoria">Sabedoria</label>
                        <input type="number" id="sabedoria" min={8} max={18} defaultValue={8} step={1} {...register('sabedoria', { onChange: alocarPontos, onBlur: alocarPontos })} />
                        <label htmlFor="carisma">Carisma</label>
                        <input type="number" id="carisma" min={8} max={18} defaultValue={8} step={1}  {...register('carisma', { onChange: alocarPontos, onBlur: alocarPontos })} />
                    </div>

                    <div>
                        <label htmlFor="imagemUrl">URL da Imagem:</label>
                        <input type="url" id="imagemUrl" placeholder="Insira o URL da imagem" value={personagemImg} {...register('imgPersonagem', { onChange: mudaImagem })} />
                        <img className='imagemPersonagem' src={`${urlValido(personagemImg) ? personagemImg : personagem.imagem}`} alt="Imagem do Personagem" width="100" height="100" />
                    </div>

                    <div>
                        <label htmlFor="racas">Raça:</label>
                        <select id="racas" {...register('raca')}>
                            <option value="" defaultValue={'' as string}>Selecione uma raça</option>
                            <option value="Humano">Humano</option>
                            <option value="Elfo">Elfo</option>
                            <option value="Anao">Anao</option>
                            <option value="Orc">Orc</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="classes">Classe:</label>
                        <select id="classes" {...register('classe')}>
                            <option value="" defaultValue={'' as string}>Selecione uma classe</option>
                            <option value="Guerreiro">Guerreiro</option>
                            <option value="Mago">Mago</option>
                            <option value="Ladino">Ladino</option>
                        </select>
                    </div>

                    <button type="submit">Salvar Personagem</button>
                </form>
                <Tutorial />
            </Modal>
        </>
    )
}

export default CriarPersonagem;