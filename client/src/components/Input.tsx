type HTMLInputType = "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week";



interface InputProps {
    label: string;
    placeholder?: string;
    type: HTMLInputType;
    formHandler: any;
    fieldName: string;
    required?: boolean;
}

export function Input({label,placeholder,type,formHandler,fieldName,required=false}:InputProps){
    const isRequiredError = formHandler.formState.errors[fieldName];

    return <>
        <div className='mb-2'>
            <label htmlFor={fieldName} className={`block mb-2 text-sm font-medium text-gray-900 ${isRequiredError? "text-red-600":""}`}>{label}</label>
            <input 
                {...formHandler.register(fieldName,{required})} 
                type={type} 
                id={fieldName} 
                name={fieldName} 
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${isRequiredError? "outline-red-600 bg-red-50":""}`} 
                placeholder={placeholder}
            />
        </div>
    </>
}