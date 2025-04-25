
interface inputinterface{
    placeholder:string
    ref?:any
}

const Input = ({placeholder,ref}:inputinterface) => {
    return(
        <div>
            <input ref={ref} placeholder={placeholder} type="text" className="border border-blue-400 outline-none rounded-md p-2" />
        </div>
        )
}

export default Input
