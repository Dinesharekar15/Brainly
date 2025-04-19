import { ReactElement } from "react"




type varianttpe="primary"|"secondary"

interface ButttonProps{
    variant:varianttpe,
    starticon?:ReactElement,
    endicon?:ReactElement,
    size:"sm"|"md"|"lg",
    text:string,
    onClick?:()=>void
}

const variantStyle={
    "primary":"bg-purple-600 text-white",
    "secondary":"bg-purple-400 text-purple-600"
}

const sizeStyle={
    "sm":"py-1 px-2",
    "md":"py-2 px-3",
    "lg":"py-3 px-5"
}

const extrastyle="rounded-md flex"
export const Button=(props:ButttonProps)=>{
    return (
        <button className={`${variantStyle[props.variant]} ${extrastyle} ${sizeStyle[props.size]}`}>
            {props.starticon?<div className="pr-2">{props.starticon}</div> :null}
        {props.text}
        </button>
    )
}

<Button variant="primary" size="md" text="bold" onClick={()=>"rkfnkre"}/>