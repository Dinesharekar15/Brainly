interface ButttonProps{
    variant:"primary"|"secondary",
    starticon?:any,
    endicon?:any,
    size:"sm"|"md"|"lg",
    text:string,
    onClick:()=>void
}

export const Button=(props:ButttonProps)=>{
    return (
        <button>
        
        </button>
    )
}

<Button variant="primary" size="md" text="bold" onClick={()=>"rkfnkre"}/>