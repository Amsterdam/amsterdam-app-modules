const InputField = ({ identifier, value, readonly, setValue }) => {
    const handleChange = event => { setValue(event.target.value) }

    return (
        <input
            className='inputfield'
            type="text"
            id={identifier}
            name={identifier}
            readOnly={readonly}
            placeholder={identifier}
            onChange={handleChange}
            value={value}
        />
    )
}

export default InputField