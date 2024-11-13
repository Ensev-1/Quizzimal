import React from "react"
import Header from "./components/Header"
import Main from "./components/Main"
import Question from "./components/Question"

function App() {
    const [quizzStarted, setQuizzStarted] = React.useState(false)

    function startQuizz() {
        setQuizzStarted(prevQuizzStarted => !prevQuizzStarted)
    }

  return (
    <div className="App">
          <Header />
          {!quizzStarted && <Main onClick={startQuizz} />}
          {quizzStarted && <Question /> }
    </div>
  );
}

export default App;
