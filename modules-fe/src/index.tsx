import * as Sentry from '@sentry/react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './amsterdam.sans.typo.css'
import {isDev} from 'utils/isDev'
import App from './App'

if (!isDev) {
  Sentry.init({
    dsn: 'https://eaf4640f1d234fb28801572d453b72bb@o1315195.ingest.sentry.io/4504169232990208',
    tracesSampleRate: 0,
  })
}

const element = document.getElementById('root')

if (element) {
  const root = ReactDOM.createRoot(element)
  root.render(<App />)
}
