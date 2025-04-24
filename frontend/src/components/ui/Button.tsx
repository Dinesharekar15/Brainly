import { ReactElement } from "react"




type varianttpe="primary"|"secondary"

interface ButttonProps{
    variant:varianttpe,
    starticon?:ReactElement,
    endicon?:ReactElement,
    size:"sm"|"md"|"lg",
    text:string,
    onClick?:()=>void
    loading?:boolean
    
}

const variantStyle={
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-200 text-purple-600",
}

const sizeStyle={
    "sm":"py-1 px-2",
    "md":"py-2 px-3",
    "lg":"py-3 px-5"
}
const extrastyle="rounded-md flex font-sans gap-2 cursor-pointer"
export const Button=(props:ButttonProps)=>{
    return (
        <button onClick={props.onClick} disabled={props.loading} className={`${variantStyle[props.variant]} ${extrastyle} ${sizeStyle[props.size]} ${props.starticon? " ":" flex justify-center"} ${props.loading? " opacity-35":""}`}>
            {props.starticon?<div className="pr-2">{props.starticon}</div> :null}
            {/* <div className="font-sans"></div> */}
        {props.text}
        </button>
    )
}

