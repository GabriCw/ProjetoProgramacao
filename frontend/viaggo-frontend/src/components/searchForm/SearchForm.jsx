import { orange } from "@mui/material/colors";
import "./style.css"
import { useEffect, useState } from "react";

const SearchForm = () => {
    const [typeDate, setTypeDate] = useState('text')
    const [typeDate2, setTypeDate2] = useState('text')

    const handleTypeDate = () => {
        if (typeDate === 'text') setTypeDate('date')
    }

    const handleTypeDate2 = () => {
        if (typeDate2 === 'text') setTypeDate2('date')
    }

    const [typeTravel, setTypeTravel] = useState('foward-back')

    // const handleTypeTravel = () => {
    //     typeTravel !== 'forward-back' ? setTypeTravel('forward') : setTypeTravel('forward-back')
    // }

    // useEffect(() => {
    //     document.getElementById("foward-back").click()
    // }, [])

    // onClick={handleTypeTravel('forward-back')} style={typeTravel === 'forward-back' ? {backgroundColor: "#004071"} : null}
    // onClick={handleTypeTravel('forward')}
  return <div className="container-searchform">
    <div className="searchform">
        <div className="container-data-1">
            <a className="data-text">
                Monte seu pacote
            </a>
            <button onClick={console.log('Ida e Volta')} className="option-buttons" id="foward-back" >Ida e Volta</button>
            <button onClick={console.log('Ida')} className="option-buttons" >Ida</button>
            <input type="text" className="place-information" placeholder="Origem" />
            <input type="text" className="place-information" placeholder="Destino" />
        </div>
        <div className="container-data-2">
            <input type={typeDate} className="date-information" placeholder="Data de Ida" onFocus={handleTypeDate} onBlur={handleTypeDate} />
            <input type={typeDate2} className="date-information" placeholder="Data de Volta" onFocus={handleTypeDate2} onBlur={handleTypeDate2} />
            <input type="number" className="passenger-numbers" placeholder="Num. Adultos" />
            <input type="number" className="passenger-numbers" placeholder="Num. Menores" />
            <select name="travel-class" id="travel-class" className="travel-class">
                <option value="economic">Econômica</option>
                <option value="premium-economy">Premium Economy</option>
                <option value="executive-business">Executiva/Business</option>
                <option value="first-class">Primeira Classe</option>
            </select>
            <button className="search-button">Buscar</button>
        </div>
    </div>
  </div>
}

export default SearchForm