import { useState } from "react";
import styles from "./FieldsetInfoGerais.module.css";

const FieldsetInfoGerais = () => {
    /* Hook - useState */
    const [nomeResponsavel, setNomeResponsavel] = useState('');
    const [cargo, setCargo] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');


  return (
    <fieldset className={styles.containerFieldset}>
      <legend>Informações gerais</legend>
      <div>
        <label>Responsável</label>
        <input
          type="text"
          name="nomeResponsavel"
          value={nomeResponsavel}
          onChange={(evento) => setNomeResponsavel(evento.target.value)}
          required
        />
      </div>
      <div>
        <label>Cargo</label>
        <input
          type="text"
          name="cargo"
          value={cargo}
          onChange={(evento) => setCargo(evento.target.value)}
          required
        />
      </div>
      <div>
        <label>Telefone</label>
        <input
          type="tel"
          name="telefone"
          value={telefone}
          onChange={(evento) => setTelefone(evento.target.value)}
          required
        />
      </div>
      <div>
        <label>E-mail</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(evento) => setEmail(evento.target.value)}
          required
        />
      </div>
    </fieldset>
  );
};

export default FieldsetInfoGerais;
