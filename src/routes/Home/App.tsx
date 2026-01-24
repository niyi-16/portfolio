
import Skills from '../../ui/Skills/Skills.tsx'
import Experience from '../../ui/Experience/Experience.tsx'
import './App.scss'

function App() {
    // const [count, setCount] = useState(0)

    return (
        <div className={"app-container"}>

            <blockquote>
                lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </blockquote>

            <section className={"about-me"}>
                <h1> About me</h1>
                <p>Meet Dasil, the future software programmer and data analyst extraordinaire! With a passion for all
                    things
                    tech-related, Dasil dreams of developing cutting-edge software that will change the world. Whether
                    it's
                    crunching data to uncover insights or building programs from scratch, Dasil is always up for a
                    challenge. In
                    fact, their idea of a fun Friday night is staying up late, tinkering with code and experimenting
                    with
                    new
                    tools. But don't let all the tech talk fool you – Dasil has a wicked sense of humor and loves
                    nothing
                    more
                    than cracking jokes and making their friends laugh. So watch out, world – Dasil is coming for you,
                    armed
                    with a keyboard and a whole lot of brainpower!</p>
            </section>

            <div className={"about-grid"}>

                <aside className={"experience"}>
                    <h2 className={"grid-title"}>Education and Work Section</h2>
                    <Experience/>
                </aside>

                <aside className={"skills"}>
                    <h2 className={"grid-title"}>Skills</h2>
                    <Skills/>
                </aside>

            </div>
        </div>
    )
}

export default App
