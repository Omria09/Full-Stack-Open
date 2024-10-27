const DisplayList = ({countries, handleShow}) => {
    if (countries === null || countries == [])
        return
    
    return(
        countries.map((country) => 
            <div key={country.name.common}>
                <li>
                    {country.name.common}
                    <button onClick={() => handleShow(country)}>show</button>
                </li>   
            </div>
        )
    )
}
export default DisplayList