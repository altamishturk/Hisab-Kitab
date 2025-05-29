import React from 'react'
import { NavLink } from 'react-router';

interface CropItemProps {
    crop: any;
}



export function CropItem({crop}:CropItemProps) {
  return (
                <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 mt-3 md:mt-5">
                    <h5 className="text-xl font-bold leading-none text-gray-700 text-center">{crop.title}</h5>
                    <p className="my-4 text-center my-1 mb-5 text-gray-500">{crop.description}</p>

                    <div className="flex flex-wrap justify-between gap-2">
                        {
                            crop.partnershipType === "solo" && <>
                                <MiniCard label={`Expenses`} amount={100}/>
                                <MiniCard label={`Sales`} amount={100}/>
                                <MiniCard label={`Profit`} amount={100}/>
                            </>
                        }
                        {
                            crop.partnershipType === "partnered" && <>
                                <MiniCard label={`${crop.yourName} Expense`} amount={100}/>
                                <MiniCard label={`${crop.partnerName} Expense`} amount={100}/>
                                <MiniCard label={`Shared Expenses`} amount={100}/>
                                <MiniCard label={`Sales`} amount={100}/>
                                <MiniCard label={`Sales Money ${crop.yourName} have`} amount={100}/>
                                <MiniCard label={`Sales Money ${crop.partnerName} have`} amount={100}/>
                                <MiniCard label={`Profit`} amount={100}/>
                            </>
                        }

                        <NavLink to={`/crops/${crop._id}`} className={"border p-2 rounded-md flex justify-center items-center"}>
                            View Details
                        </NavLink>
                    </div>
                </div>
  )
}



interface MiniCardProps {
    label: string;
    amount: number;
}

function MiniCard({label,amount}:MiniCardProps){


    return <>
        <div className="min-w-[120px] flex-1 border  p-2 rounded-md flex flex-col items-center justify-center">
            <dt className="mb-2 text-3xl font-extrabold">₹ {amount}</dt>
            <dd className="text-gray-500 text-xs text-center">{label}</dd>
        </div>
    </>
}