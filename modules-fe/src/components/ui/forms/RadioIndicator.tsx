import './RadioIndicator.css'

type RadioIndicatorProps = {
  hasError: boolean
  isSelected: boolean
}

const RadioIndicator = ({hasError, isSelected}: RadioIndicatorProps) => (
  <svg
    className="RadioIndicator"
    data-has-error={hasError}
    height={24}
    viewBox="0 0 24 24"
    width={24}>
    <circle />
    {isSelected && <circle />}
  </svg>
)

export default RadioIndicator
