import './card.scss';

export default function Card({card, handleChoice, flipped, disabled}) {
  
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card)
    }
  }

  return (
    <div className="card">

        <img onClick={handleClick} className={`${flipped ? 'flipped' : ''} card--front`} src='images/wood.jpg' alt='wood' />
        <img className={`${flipped ? 'flipped' : ''} card--back`} src={card.src} alt='game card'/>

    </div>
  )
}
