import React from 'react'

type CampaignProps = {
  image: string
  title: string
  description: string
  onDonate?: () => void
}

const Card: React.FC<CampaignProps> = ({ image, title, description, onDonate }) => {
  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 24, boxShadow: '0 2px 8px #ccc', borderRadius: 8 }}>
      <img src={image} alt={title} style={{ width: '100%', borderRadius: 8 }} />
      <h1>{title}</h1>
      <p>{description}</p>
      <button 
        style={{ padding: '10px 24px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}
        onClick={onDonate}
      >
        Donate
      </button>
    </div>
  )
}

export default Card