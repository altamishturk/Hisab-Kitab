import dayjs from 'dayjs';
import React, { useState } from 'react';
import { EditSVG } from '../../../components/SVGs/EditSVG';
import { DeleteSVG } from '../../../components/SVGs/DeleteSVG';


interface TransactionCardProps {
    tran: any;
    idx: number;
    setIdToDelete: React.Dispatch<React.SetStateAction<string>>;
    setIdToEdit: React.Dispatch<React.SetStateAction<string>>;
    currentBalances: null | number[];
}

export function TransactionCard({setIdToEdit,setIdToDelete,tran,idx,currentBalances}:TransactionCardProps) {
    const [showCrupButtons, setShowCrupButtons] = useState(false);

  return (
            <div className={`mb-2 flex rounded-md ${tran.from? "bg-red-100":"bg-green-100"} shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]`}>
                <div onClick={() => {setShowCrupButtons((p) => !p)}} className="cursor-pointer flex justify-center items-center bg-gray-100 p-2 rounded-tl-md rounded-bl-md">
                    <span className='text-[10px]'>{idx+1}</span>
                </div>
                <div className="flex flex-col p-2">
                    <span className='text-[10px]'>{dayjs(tran.borrowedAt).format("DD MMM YY - hh:mm a")}</span>
                    <span className='text-[12px]'>{tran.description}</span>
                </div>
                <div className="gap-2 flex flex-1 justify-end items-center">
                            <div className='flex flex-col'>
                                <span className='p-2 flex gap-[2px] font-bold pb-0'><span>₹</span><span>{tran.amount}</span></span>
                                {currentBalances && <>
                                    {
                                        currentBalances[idx] >=0?   <>
                                                                    <small className='text-[12px] p-2 pt-0 text-red-500 font-semibold'>Bal: {currentBalances[idx]}</small>
                                                                    </>:<>
                                                                        <small className='text-[12px] p-2 pt-0 text-green-500 font-semibold'>Bal: {Math.abs(currentBalances[idx])}</small>
                                                                    </>
                                    }
                                </>}
                                
                            </div>
                            {
                                showCrupButtons && <>
                                    <span className='flex gap-2 pr-2'>
                                        <EditSVG 
                                            onClick={() => {setIdToEdit(tran._id)}}
                                        />
                                        <DeleteSVG 
                                            onClick={() => {setIdToDelete(tran._id)}}
                                        />
                                    </span>
                                </>
                            }
                </div>
            </div>
  )
}
