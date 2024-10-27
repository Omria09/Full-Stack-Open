const Persons = ({newFilter, persons, handleDelete}) => {
    
    const personsToShow = newFilter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

    return (
        personsToShow.map(person => <p key={person.name}>{person.name + ' ' + person.number}<button name={person.name} id={person.id} onClick={handleDelete}>delete</button></p>)
    )
}
export default Persons