import { forwardRef } from "react";
import InputMask, { Props as InputMaskProps } from "react-input-mask-next";

const MaskedInput = forwardRef<HTMLInputElement, InputMaskProps>(
    (props, ref) => <InputMask {...props} inputRef={ref} />
);

export default MaskedInput;
