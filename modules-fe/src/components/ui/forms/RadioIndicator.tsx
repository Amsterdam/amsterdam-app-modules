type RadioIndicatorProps = {
  hasError: boolean
  isSelected: boolean
}

const RadioIndicator = ({hasError, isSelected}: RadioIndicatorProps) => (
  <svg viewBox="0 0 24 24" width={24} height={24}>
    <circle
      cx="12"
      cy="12"
      fill="white"
      r="11"
      stroke={hasError ? '#ec0000' : '#004699'}
      strokeWidth="2"
    />
    {isSelected && (
      <circle cx="12" cy="12" fill={hasError ? '#ec0000' : '#004699'} r="8" />
    )}
  </svg>
)

export default RadioIndicator
