import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import axios from 'axios'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  useEffect(() => {
    personsService.getAll()
    .then(response => {
      setPersons(response)
    })
  },[])  

  const [persons, setPersons] = useState([

  ])
  const initialPersonState = {name: 'enter a name..', number: 'enter a number..'}
  const [newPerson, setNewPerson] = useState(initialPersonState)
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [color, setColor] = useState('green')

  const handleNameChange = (event) => {
    setNewPerson({
      ...newPerson,
      name: event.target.value}
    )
  }

  const handleNumberChange = (event) => {
    setNewPerson({
      ...newPerson,
      number: event.target.value}
    )
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleDelete = (event) => {
    if (!window.confirm(`Are you sure you wanna delete ${event.target.name}`)) return
    personsService
    .deletePerson(event.target.id)
    .then(result => {
      setPersons(persons.filter(person => person.id !== event.target.id))
    })
  }

  const addName = (event) => {
    setColor('green')
    event.preventDefault()
    const personExists = persons.find(person => person.name === newPerson.name)
    
    if (personExists && !window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)){      
      return
    } else if (personExists) {
      personsService
      .update(personExists.id, newPerson)
      .then(ChangedPerson => {
        setMessage(
          `Existing ${newPerson.name} got his number updated`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setPersons(persons.map(person => person.id === personExists.id ? ChangedPerson : person))
        setNewPerson({name: '', number: ''})
      })
      .catch(error => {
        setColor('red')
        setMessage(`Information of ${newPerson.name} has already been removed from the server`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      
      return
    }

    personsService
    .create(newPerson)
    .then(result => {
      setMessage(
        `Added ${newPerson.name}`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setPersons(persons.concat(result))
      setNewPerson({name: '', number: ''})
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} color={color}/>
      <Filter persons={persons} handleFilterChange={handleFilterChange}/>

      <h3>Add a new</h3>

      <PersonForm
        addName={addName}
        name={newPerson.name}
        number={newPerson.number}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      
      <Persons persons={persons} newFilter={newFilter} handleDelete={handleDelete}/>

    </div>
  )
}

export default App