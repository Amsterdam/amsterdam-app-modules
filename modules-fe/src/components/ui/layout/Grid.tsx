import {ReactNode} from 'react'
import './Grid.css'

type GridProps = {
  children: ReactNode
  numColumns?: number
}

const Grid = ({children, numColumns}: GridProps) => (
  <div className="Grid" data-fluid-columns={numColumns}>
    {children}
  </div>
)

export default Grid
