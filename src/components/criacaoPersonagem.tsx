import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useState } from 'react';
import * as Equipamentos from '../classes/equipamentos';
import './Menu.css';
import { Personagem } from '../classes/personagem';
import { useForm } from 'react-hook-form';
import Ficha from './ficha';
import Tutorial from './Tutorial';

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
        novaArma?: Equipamentos.Arma,
        novaArmadura?: Equipamentos.Armadura,
        novoEquip?: Equipamentos.EquipSecundario
    ) => void;
}


const CriarPersonagem: React.FC<CriarPersonagemProps> = ({ personagem, atualizarPersonagem }) => {
    const { register, handleSubmit, watch } = useForm();
    const [open, setOpen] = useState(false);
    const [pontosAtributo, setPontosAtributo] = useState(24);
    const [personagemCriado, setPersonagemCriado] = useState(false);

    function checkPersonagem(personagem: Personagem) {
        if (personagem.nome != "Sem Nome") {
            alert("Voce já possui um personagem!")
        } else {
            setOpen(true)
        }
    }

    const onSubmit = (data: any) => {
        if (pontosAtributo < 0) {
            alert("Voce alocou mais pontos do que tem disponivel!")
        } else if (data.nome == "") {
            alert("De um nome ao personagem!")
        } else if (pontosAtributo > 0) {
            alert("Voce ainda tem pontos para alocar!")
        } else {
            escolherNome(data.nome);
            escolherAtributos(data.forca, data.destreza, data.constituicao, data.inteligencia, data.sabedoria, data.carisma);
            setOpen(false)
            alert("Personagem Criado!")
            setPersonagemCriado(true);
        }
    };

    const escolherNome = (novoNome: string) => {
        atualizarPersonagem(novoNome);
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
            {personagemCriado && <Ficha personagem={personagem} />}
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

                    <button type="submit">Salvar Personagem</button>
                </form>
                <Tutorial />
            </Modal>
        </>
    )
}

export default CriarPersonagem;