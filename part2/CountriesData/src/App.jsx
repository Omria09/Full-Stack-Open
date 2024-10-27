import { useEffect, useState } from 'react'
import axios from 'axios'
import countriesService from './services/countries'
import Country from './components/Country'
import DisplayList from './components/DisplayList'

const App = () => {
  const [country,setCountry] = useState('')
  const [message, setMessage] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [displayCountries, setDisplayCountries] = useState([])

  const handleShow = (countryClicked) => {
    setMessage(null)
    setSelectedCountry(countryClicked)
  } 

  const handleCountryChange = (event) =>
    {
      setCountry(event.target.value)
      countriesService
      .getAll()
      .then((returnedCountries) => {
        const filteredCountries = returnedCountries.filter(returnedCountry => returnedCountry.name.common.toLowerCase().includes(event.target.value))
        if (filteredCountries.length === 0){
          setMessage('No matches, change your query') 
          setDisplayCountries(null)
          setSelectedCountry(null)
        }
        else if (filteredCountries.length > 10){
          setMessage('Too many matches, specify another filter') 
          setDisplayCountries(null)
          setSelectedCountry(null)
        }
        else if (filteredCountries.length === 1){
          setMessage(null)
          setDisplayCountries(null)
          setSelectedCountry(filteredCountries[0])
        }
        else {
          setMessage(null)
          setSelectedCountry(null)
          setDisplayCountries(filteredCountries)
        }
      })
      .catch(error => alert('something is wrong'))
    }

  return (
    <div>
      <h2>find countries</h2>
        <input value={country} onChange={handleCountryChange}></input>
        {selectedCountry && <Country country={selectedCountry}/>}
        <DisplayList countries={displayCountries} handleShow={handleShow}/>
        <h3>{message}</h3>
    </div>
  )
}

export default App