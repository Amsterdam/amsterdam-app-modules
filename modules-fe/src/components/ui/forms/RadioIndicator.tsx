import './RadioIndicator.css'

type RadioIndicatorProps = {
  hasError: boolean
  isSelected: boolean
}

const RadioIndicator = ({hasError, isSelected}: RadioIndicatorProps) => (
  <svg viewBox="0 0 24 24" width={24} height={24}>
    <circle className="RadioIndicatorBorder" data-has-error={hasError} />
    {isSelected && (
      <circle className="RadioIndicatorDot" data-has-error={hasError} />
    )}
  </svg>
)

export default RadioIndicator
