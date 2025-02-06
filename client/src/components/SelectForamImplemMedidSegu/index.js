/* importando os hooks */
import { useState } from "react";

/* importando componentes */
import CheckboxQuaisMedidSegu from "../CheckboxQuaisMedidSegu";

/* importando o CSS utilizando o SCSS */
import styles from "./SelectForamImplemMedidSegu.module.css";

const SelectForamImplemMedidSegu = () => {
    const [formaImplementacaoMedidaSeguranca, setFormaImplementacaoMedidaSeguranca] = useState('')
    return(
        <div className={styles.containerSelectForamImplemMedidSegu}>
            <label htmlFor="formaImplementacaoMedidaSeguranca">Foram implementadas medidas de segurança no projeto ?</label>
            <select name="formaImplementacaoMedidaSeguranca" id="formaImplementacaoMedidaSeguranca" value={formaImplementacaoMedidaSeguranca} onChange={(e) => setFormaImplementacaoMedidaSeguranca(e.target.value)} required>
                <option value="" disabled>Selecione a opção</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>

            {formaImplementacaoMedidaSeguranca === "sim" && <CheckboxQuaisMedidSegu/>}
        </div>
    )
}

export default SelectForamImplemMedidSegu