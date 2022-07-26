const InputField = ({ identifier, value, setValue }) => {
    const handleChange = event => {
        setValue(event.target.value)
        // DEBUG
        console.log(identifier, 'value is:', event.target.value)
    }

    return (
        <input
            className='inputfield'
            type="text"
            id={identifier}
            name={identifier}
            placeholder={identifier}
            onChange={handleChange}
            value={value}
        />
    )
}

export default InputField