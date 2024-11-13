import React from "react"
import timerIcon from "../photos/timer-icon.png"

export default function Main(props) {
    return (
        <main>
            <div className="main--container">
                <h2>Animals Quizz</h2>
                <h3>This quizz randomizes some of the most common questions asked about animals.
                Do you feel like you know a lot about animals? Try your skills with this quizz!</h3>
                <button className="main--button" onClick={props.onClick} >Start</button>
                <div className="main--info">
                    <p>10 Questions</p>
                    <p>1 minute Timer <img src={timerIcon} alt="clock icon" className="main--info-timerIcon"/></p>
                </div>
            </div>
        </main>
    )
}