import './RadioIndicator.css'

type RadioIndicatorProps = {
  checked: boolean
  hasError: boolean
}

const RadioIndicator = ({checked, hasError}: RadioIndicatorProps) => (
  <svg
    className="RadioIndicator"
    data-has-error={hasError}
    height={24}
    viewBox="0 0 24 24"
    width={24}>
    <circle cx={12} cy={12} r={11} />
    {!!checked && <circle cx={12} cy={12} r={8} />}
  </svg>
)

export default RadioIndicator
