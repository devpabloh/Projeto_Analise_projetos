import { PassouPorTestes, SelectTestes } from '../SelectTestes'
import {useState} from "react"
import styles from './FieldsetTestesEQualidade.module.css'

const FieldsetTestesEQualidade = () => {

    const [passouPorTestes, setPassouPorTestes] = useState('')

    return (
        <fieldset className={styles.containerFieldset}>
            <legend>Testes e qualidade</legend>
            <PassouPorTestes onchange={setPassouPorTestes}/>

            {passouPorTestes === "sim" && 
                <SelectTestes/>}
            
        </fieldset>
    )
}

export default FieldsetTestesEQualidade