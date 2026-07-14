import './SpriteCard.css'

function SpriteCard({ sprite, onToggle, owned }) {
  const rarityColors = {
    common: '#999',
    uncommon: '#0f0',
    rare: '#00f',
    epic: '#b300ff',
    legendary: '#ff9500'
  }

  return (
    <div className="sprite-card" onClick={onToggle}>
      <div className="sprite-image-container">
        <img src={sprite.imageUrl} alt={sprite.name} className="sprite-image" />
        <div className={`owned-indicator ${owned ? 'owned' : ''}`}>
          {owned ? '✓' : '◯'}
        </div>
      </div>
      <div className="sprite-info">
        <h4>{sprite.name}</h4>
        <p className="category">{sprite.category}</p>
        <div className="rarity-badge" style={{ borderColor: rarityColors[sprite.rarity] }}>
          {sprite.rarity}
        </div>
      </div>
    </div>
  )
}

export default SpriteCard
