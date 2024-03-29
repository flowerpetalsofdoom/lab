import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App'
import Logo from './img/flwrs-logo.png'

function Overlay() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', width: '100%', height: '100%' }}>
      <div style={{ position: 'absolute', top: 40, left: 40, fontSize: '13px' }}>flwrs —</div>
      <a href="https://atiqah.com/" style={{ position: 'absolute', bottom: 58, left: 90, fontSize: '13px' }}>
        atiqah.com
      </a>
      <a href="https://www.instagram.com/flowerpetalsofdoom/" style={{ position: 'absolute', bottom: 40, left: 90, fontSize: '13px' }}>
        @flowerpetalsofdoom
      </a>
      <div style={{ position: 'absolute', bottom: 40, right: 40, fontSize: '13px' }}>25/10/2022</div>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <>
    <App />
    <Overlay />
    <img src={Logo} style={{ position: 'absolute', bottom: 34, left: 34, width: 45 }} />
  </>
)
