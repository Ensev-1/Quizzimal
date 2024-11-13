import React from "react"

export default function Header() {
    const date = new Date()
    const hours = date.getHours();

    let greeting
    if (hours > 4 && hours < 12) {
        greeting = "morning"
    }
    else if (hours >= 12 && hours < 19) {
        greeting = "afternoon"
    }
    else
        greeting = "evening"

    return (
        <header>
            <div className="header">
                <h1 className="header--title">Quizzimal</h1>
                <p>{`Good ${greeting}, sir/madam!`}</p>
            </div>
        </header>
    )
}