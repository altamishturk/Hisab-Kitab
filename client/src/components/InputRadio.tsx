
interface InputRadioProps {
  formHandler: any;
  fieldName: string;
  label: string;
  options: {
    value: string;
    label: string;
  }[]
}


export function InputRadio({ formHandler, fieldName, label, options}:InputRadioProps) {
    const isRequiredError = formHandler.formState.errors[fieldName];

  return (
    <div className="border p-2 md:p-4 rounded-md">
      <label htmlFor={fieldName} className={`block mb-2 text-sm font-medium text-gray-900 ${isRequiredError? "text-red-600":""}`}>{label}</label>
      <div className="flex gap-4">
        {
            options.map(option => <>
            <label className="flex items-center space-x-2">
                <input
                    type="radio"
                    value={option.value}
                    {...formHandler.register(fieldName,{required: true})}
                />
                <span>{option.label}</span>
            </label>
            </>)
        }
      </div>
    </div>
  )
}
