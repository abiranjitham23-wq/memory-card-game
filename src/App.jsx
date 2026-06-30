import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import cardImages from "./data";

function App() {
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, uniqueId: Math.random(), matched: false }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setMoves(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.image === choiceTwo.image) {
        setCards((prev) =>
          prev.map((card) =>
            card.image === choiceOne.image ? { ...card, matched: true } : card,
          ),
        );
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
    setMoves((prev) => prev + 1);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  const won = cards.length > 0 && cards.every((card) => card.matched);

  return (
    <div className="App">
      <h1>🧠 Memory Card Game</h1>

      <button onClick={shuffleCards}>New Game</button>

      <p>Moves: {moves}</p>

      {won && <h2>🎉 Congratulations! You Won! 🎉</h2>}

      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.uniqueId}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
