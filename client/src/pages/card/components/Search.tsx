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
            
            {
                nameValue && <>
                    <div className="absolute top-[100%] left-0 w-full bg-white shadow-sm rounded-md py-4">
                        {/* <p className='py-2 px-6 hover:bg-gray-500 hover:text-white'>Search 1</p>
                        <p className='py-2 px-6 hover:bg-gray-500 hover:text-white'>Search 2</p>
                        <p className='py-2 px-6 hover:bg-gray-500 hover:text-white'>Search 3</p> */}
                    </div>
                </>
            }
        </div>
    )
}

