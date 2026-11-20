import React from 'react'
import './AppDownload.css'
import { assets, showcase } from '../../assets/frontend_assets/assets'
import { CheckIcon } from '../Icons/Icons'

const perks = [
  'Exclusive discounts & offers',
  'Faster checkout',
  'Real-time order tracking',
  'Easy reordering',
]

// Decorative QR-style pattern (placeholder, not a scannable code).
const QR_SIZE = 21
const isFinder = (r, c) => {
  const inBox = (r0, c0) => r >= r0 && r < r0 + 7 && c >= c0 && c < c0 + 7
  if (inBox(0, 0) || inBox(0, QR_SIZE - 7) || inBox(QR_SIZE - 7, 0)) {
    const [r0, c0] = inBox(0, 0) ? [0, 0] : inBox(0, QR_SIZE - 7) ? [0, QR_SIZE - 7] : [QR_SIZE - 7, 0]
    const rr = r - r0, cc = c - c0
    const edge = rr === 0 || rr === 6 || cc === 0 || cc === 6
    const core = rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4
    return edge || core
  }
  return null
}
const qrCells = []
for (let r = 0; r < QR_SIZE; r++) {
  for (let c = 0; c < QR_SIZE; c++) {
    const finder = isFinder(r, c)
    const nearFinder = (r < 8 && c < 8) || (r < 8 && c > QR_SIZE - 9) || (r > QR_SIZE - 9 && c < 8)
    const on = finder !== null ? finder : !nearFinder && ((r * 7 + c * 13 + r * c) % 5 < 2)
    if (on) qrCells.push([r, c])
  }
}

const AppDownload = () => {
  return (
    <section className='app-download' id='app-download'>
      <div className="app-phones" aria-hidden="true">
        <div className="phone p1">
          <span className="phone-notch" />
          <img src={showcase.phone1} alt="" />
          <img src={showcase.phone2} alt="" />
          <i /><i />
        </div>
        <div className="phone p2">
          <span className="phone-notch" />
          <div className="phone-map"><span className="pin" /></div>
          <i /><i />
        </div>
        <div className="phone p3">
          <span className="phone-notch" />
          <div className="phone-check"><CheckIcon size={30} /></div>
          <b>Order Placed!</b>
          <span className="phone-btn">Track Order</span>
        </div>
      </div>

      <div className="app-info">
        <h2>Download our app</h2>
        <h3>&amp; get exclusive benefits</h3>
        <ul>
          {perks.map((p) => (
            <li key={p}><CheckIcon size={14} /> {p}</li>
          ))}
        </ul>
        <div className="app-download-platforms">
          <img src={assets.play_store} alt="Get it on Google Play" />
          <img src={assets.app_store} alt="Download on the App Store" />
        </div>
      </div>

      <div className="app-qr">
        <div className="qr-box">
          <svg viewBox={`-1 -1 ${QR_SIZE + 2} ${QR_SIZE + 2}`} shapeRendering="crispEdges">
            <rect x="-1" y="-1" width={QR_SIZE + 2} height={QR_SIZE + 2} fill="#0a0709" />
            {qrCells.map(([r, c]) => (
              <rect key={r + '-' + c} x={c} y={r} width="1" height="1" fill="#ff5fa8" />
            ))}
          </svg>
        </div>
        <small>Scan to download</small>
      </div>
    </section>
  )
}

export default AppDownload
