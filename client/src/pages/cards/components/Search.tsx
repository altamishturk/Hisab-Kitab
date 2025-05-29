import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';


interface SearchProps {
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

export function Search({setSearchTerm}:SearchProps) {
    const {register,watch} = useForm();
    const nameValue = watch('searchString');

 
    
    useEffect(() => {
        // console.log(nameValue);
        setSearchTerm(nameValue);
    }, [nameValue,setSearchTerm]);

    return (
        <div className='flex-1 relative'>
            <input {...register("searchString")} type="text" placeholder='Search Card..' className='border p-2 rounded-md w-full'/>
        </div>
    )
}

