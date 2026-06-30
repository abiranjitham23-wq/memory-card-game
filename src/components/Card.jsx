import React from "react";

const Card = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <div className="front">{card.image}</div>
        <div className="back" onClick={handleClick}>
          ❓
        </div>
      </div>
    </div>
  );
};

export default Card;
