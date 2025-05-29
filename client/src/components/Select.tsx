interface SelectProps {
    label: string;
    options: {
        label: string;
        value: string;
    }[];
    formHandler: any;
    fieldName: string;
    required?: boolean;
}

export function Select({label,options,formHandler,fieldName,required=false}:SelectProps){
    const isRequiredError = formHandler.formState.errors[fieldName];

    return <>
        <div className="">
            <label htmlFor={fieldName} className={`block mb-2 text-sm font-medium text-gray-900 ${isRequiredError? "text-red-600":""}`}>{label}</label>
            <select defaultValue={""} {...formHandler.register(fieldName,{required})} id={fieldName} name={fieldName} className={`block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 ${isRequiredError? "text-red-600 outline-red-600":""}`}>
                <option selected value={""}>Choose</option>
                {
                    options.map((op) => <option className='text-gray-900' key={op.value} value={op.value}>{op.label}</option>)
                }
            </select>
        </div>
    </>
}