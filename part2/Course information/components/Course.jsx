const Header = (props) => {
    return <h2>{props.course}</h2>
}
  
const Total = (props) => {
return <h4>total of {props.sumOfExercises} exercises</h4>
}

const Part = (props) => {
return (
    <p>
    {props.part} {props.exercises}
    </p>
    )
}

const Content = ({parts}) => {
return (
    <div>
    {
        parts.map(part => 
        <Part key={part.id} part={part.name} exercises={part.exercises}/>
    )}
    </div>
    )
}

const Course = ({course}) => {
    const sum = course.parts.reduce((total, part) => total + part.exercises, 0)
    return(
      <>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total sumOfExercises={sum}/>
      </>
    )
}

export default Course  