import './MyButton.css'

export default function MyButton({ className = '', style = {}, onClick, title, type }) {
  const dynamicStyle = {
    ...(type === 'left' && { borderRadius: '50vw 0 0 50vw', borderRight: 0 }),
    ...(type === 'right' && { borderRadius: '0 50vw 50vw 0', borderLeft: 0 }),
    ...(type === 'middle' && { borderRadius: 0, borderLeft: 0, borderRight: 0 }),
  }

  return (
    <button
      className={className}
      style={{ ...style, ...dynamicStyle }}
      onClick={onClick}
    >
      {title}
    </button>
  )
}
