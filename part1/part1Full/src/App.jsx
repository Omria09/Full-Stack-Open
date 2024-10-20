import { useState } from 'react'

const Button = (props) => {
  return(
    <>
      <button onClick={props.handleClick}>{props.text}</button> 
    </>
  )
}

const StatisticLine = (props) => {
  return(
    <>
    <tr>
      <td> {props.text} </td>
      <td> {props.value} </td>
    </tr>
    </>
  )
}

const VoteStatistics = (props) => {
  if (props.maxPoints == 0)
    {
      return(
      <>
        <h3>Waiting for a vote.</h3>
      </>
      )
    }
  return(
    <>
      {props.anecdotes[props.maxIndex]}
      <h4> has {props.maxPoints} votes </h4>
    </>
  )
}


const Statistics = ({good,neutral,bad}) => {
  if (good || neutral || bad)
    {
      const all = good+neutral+bad
      const average = (good-bad)/all
      const positive = good/all*100 + ' %'

      return(
        <>
          <h1> Statistics </h1>
          <table>
            <tbody>
                <StatisticLine text="Good" value={good}/>
                <StatisticLine text="Neutral" value={neutral}/>
                <StatisticLine text="Bad" value={bad}/>
                <StatisticLine text="All" value={all}/>
                <StatisticLine text="Average" value={average}/>
                <StatisticLine text="Positive" value={positive}/>
            </tbody>
          </table>
        </>
      )
    }
    return(
      <>
        <h3>No feedback given</h3>
      </>
    )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  let randomNumber = Math.floor(Math.random()*anecdotes.length)
  const [selected, setSelected] = useState(randomNumber)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const maxPoints = Math.max(...points)
  const maxIndex = points.indexOf(maxPoints)

  const handleGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
  }
  const handleNeutral = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }
  const handleBad = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
  }
  const handleRandom = () => {
    randomNumber = Math.floor(Math.random()*anecdotes.length)
    setSelected(randomNumber)
  }
  const handleVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <h4> has {points[selected]} votes </h4>
      <Button handleClick={handleVote} text="vote"/>
      <Button handleClick={handleRandom} text="next anecdote"/>

      <h1>Anecdote with most votes</h1>
      <VoteStatistics anecdotes={anecdotes} maxPoints={maxPoints} maxIndex={maxIndex}/>

      <h1> Give us feedback </h1>
      <Button handleClick={handleGood} text="Good"/>
      <Button handleClick={handleNeutral} text="Neutral"/>
      <Button handleClick={handleBad} text="Bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App