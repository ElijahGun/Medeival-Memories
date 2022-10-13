import "./App.scss";
import { useState, useEffect } from "react";
import Card from "./components/Card";



const images = [
  { src: "images/castle-white.jpg", match: false },
  { src: "images/castle-brown.jpg", match: false },
  { src: "images/church.jpg", match: false },
  { src: "images/crown.jpg", match: false },
  { src: "images/sheild.jpg", match: false },
  { src: "images/torch.jpg", match: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null); // states for player card selections
  const [attempts, setAttempts] = useState(0) // players tries for match

  //Starts new game
  const newGame = () => {
    //shuffles the cards and issues unique id
    const shuffledCards = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setAttempts(0)
  };

  //start game upon loading
  useEffect(() => {
    newGame();
  }, []);

  //Handles logic when player selects cards
  const handleChoice = (card) => {
    console.log("you made a choice.. bravo!");
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // handles game logic
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setAttempts(prevAttempts => prevAttempts + 1)
      if (choiceOne.src === choiceTwo.src) {
        console.log("YESSS they same!!!");
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return ({...card, match: true})
            } else {
              return card
            }
          })
        })
        setChoiceOne(null)
        setChoiceTwo(null)
      } else {
        console.log("NOO DIFF SOn!");
        setTimeout(() => {      setChoiceOne(null)
          setChoiceTwo(null)}, 1000)
      }
    }

  }, [choiceOne, choiceTwo]);

  return (
    <div className="App">
      <h1 className="heading heading--primary">Medeivel Memories</h1>
      <h2 className="heading heading--secondary">Attempts: {attempts}</h2>
      <button onClick={newGame} className="btn">
        New Game
      </button>
      <div className="card-grid">
        {cards && cards.map((card) => {
          return <Card key={card.id} card={card} handleChoice={handleChoice} flipped={card.match || card === choiceOne || card === choiceTwo} />;
        })}
      </div>
    </div>
  );
}

export default App;
