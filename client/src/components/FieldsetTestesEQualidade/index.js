/* Importando o CSS utilizando o SCSS */
import styles from "./FieldsetTestesEQualidade.module.css"

/* importando os componentes */
import { PassouPorTestes, SelectTestes } from '../SelectTestes'

/* importando os hooks */
import {useState} from "react"


const FieldsetTestesEQualidade = () => {

    const [passouPorTestes, setPassouPorTestes] = useState('')

    return (
        <fieldset className={styles.containerFieldsetTestesEQualidade}>
            <legend>Testes e qualidade</legend>
            <PassouPorTestes onchange={setPassouPorTestes}/>

            {passouPorTestes === "sim" && 
                <SelectTestes/>}
            
        </fieldset>
    )
}

export default FieldsetTestesEQualidade