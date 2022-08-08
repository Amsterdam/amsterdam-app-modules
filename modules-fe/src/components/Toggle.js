import { Switch } from "@amsterdam/asc-ui"


const Toggle = (props) => {
    return (
        <div>
            <Switch
                onChange={() => props.onSwitch(props.identifier)}
                defaultChecked={props.checked === 1 ? true : false}
            />
        </div>
    )
}

export default Toggle