

import './form-input.styles'
import {FormInputLabel, Group, Input, InputLabel} from "./form-input.styles";

const FormInput = ({label, ...otherProps}) =>
{
    return (
        <Group>

            <Input { ...otherProps }  />
            { label && (
            <FormInputLabel shrink={otherProps.value.length} >
                {label}
            </FormInputLabel>)}


        </Group>
    )
}

export default FormInput;