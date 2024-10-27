import axios from 'axios'
import { useState, useEffect } from 'react'

const Country = ({country}) => {
    
    const apiKey = import.meta.env.VITE_WEATHER_KEY;
    const [condition, setCondition] = useState({
        icon:'',
        text:'',
        wind:'',
        temp:''
    })

    useEffect(() => {
        axios
        .get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${country.capital[0]}`)
        .then(result => {
            setCondition({
                icon: result.data.current.condition.icon,
                text: result.data.current.condition.text,
                wind: result.data.current.wind_mph,
                temp: result.data.current.temp_c
            })
        })
        .catch(error => alert('An error occured'))
    }, [country.capital[0]])
   
    return (
        <>
            <h1>{country.name.common}</h1>
            <p> Capital: {country.capital.map(city => city)}</p>
            <p> Area: {country.area}</p>
            <h2>Languages:</h2>
            <ul>
                {Object.values(country.languages).map((value, index) =>(
                    <li key={index}>{value}</li>
                ))}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt}></img>
            <h1>Weather in {country.name.common}</h1>
            <img src={condition.icon} alt='wether report'></img>
            <h4>{condition.text}</h4>
            <p>Tempature {condition.temp} Celcius</p>
            <p>Wind {condition.wind} mp/h</p>
        </>
    )
}
export default Country