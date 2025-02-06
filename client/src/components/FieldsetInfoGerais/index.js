import { useState } from "react";
import styles from "./FieldsetInfoGerais.module.css";
import FieldsetResponsavelPreenchimento from "../FieldsetResponsavelPreenchimento";

const FieldsetInfoGerais = () => {
    /* Hook - useState */
    const [nomeProjeto, setNomeProjeto] = useState('');
    const [descricaoResumida, setDescricaoResumida] = useState('');
    const [dataPreenchimento, setDataPreenchimento] = useState('');


  return (
    <fieldset className={styles.containerFieldset}>
      <legend>Informações gerais do projeto</legend>
      <div>
        <label htmlFor="nomeProjeto">Nome do projeto</label>
        <input
          type="text"
          name="nomeProjeto"
          id="nomeProjeto"
          value={nomeProjeto}
          onChange={(evento) => setNomeProjeto(evento.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="descricaoResumida">Descrição resumida</label>
        <input
          type="text"
          name="descricaoResumida"
          id="descricaoResumida"
          value={descricaoResumida}
          onChange={(evento) => setDescricaoResumida(evento.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="dataPreenchimento">Data de preenchimento</label>
        <input
          type="date"
          name="dataPreenchimento"
          id="dataPreenchimento"
          value={dataPreenchimento}
          onChange={(evento) => setDataPreenchimento(evento.target.value)}
          required
        />
      </div>
      <FieldsetResponsavelPreenchimento/>
      
    </fieldset>
  );
};

export default FieldsetInfoGerais;
