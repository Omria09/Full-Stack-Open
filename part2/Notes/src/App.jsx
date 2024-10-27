import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification'


const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2024</em>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const addNote = event => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    noteService
    .create(noteObject)
    .then(updatedNotes => {
      setNotes(notes.concat(updatedNotes))
      setNewNote('')
    })
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
      .then(changedNote => {
        setNotes(notes.map(n => n.id === id ? changedNote : n))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }
  
  console.log('render', notes.length, 'notes')
  return(
    <div>
      <h1>Notes:</h1>
      <Notification message={errorMessage}/>
      {notes.map((note) => 
      <Note 
        key={note.id}
        note={note}
        toggleImportance={() => toggleImportanceOf(note.id)} />)}
      <h1>add note:</h1>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}>
        </input>
        <button type='submit'>add note</button>
      </form>
      <Footer/>
    </div>
  )
}
export default App