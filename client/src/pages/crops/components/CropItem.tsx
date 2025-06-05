import { NavLink } from 'react-router';
import { sumByKey } from '../../../utils/sumByKey';
import { EditSVG } from '../../../components/SVGs/EditSVG';
import { DeleteSVG } from '../../../components/SVGs/DeleteSVG';
import { ConfirmDeleteModal } from '../../../components/ConfirmDeleteModal';
import { useState } from 'react';
import { axiosInstance } from '../../../utils';

interface CropItemProps {
    crop: any;
    setCropIdToUpdate: React.Dispatch<React.SetStateAction<string | null>>;
    setCrops: any;
}

export function CropItem({setCrops,crop,setCropIdToUpdate}:CropItemProps) {
    const [showModal, setShowModal] = useState(false);
    const yourExpenses = sumByKey(crop.yourExpenses,"amount");
    const partnerExpenses = sumByKey(crop.partnerExpenses,"amount");
    const sharedExpenses = sumByKey(crop.sharedExpenses,"amount");
    const youInitiallyPaid = sumByKey(crop.sharedExpenses?.filter((exp:any) => exp.initialPayer === "you"),"amount");
    const partnerInitiallyPaid = sumByKey(crop.sharedExpenses?.filter((exp:any) => exp.initialPayer === "partner"),"amount");
    const yourTakenMoney = sumByKey(crop.sales?.filter((exp:any) => exp.cashHolder === "you"),"amount")+sumByKey(crop.yourTakenMoney,"amount");
    const partnerTekenMoney = sumByKey(crop.sales?.filter((exp:any) => exp.cashHolder === "partner"),"amount")+sumByKey(crop.partnerTakenMoney,"amount");
    const sales = sumByKey(crop.sales,"amount");


    const handleDelete = async () => {
        try {
            const response = await axiosInstance.delete(`crops/${crop._id}`);

            if(response?.data){
                setCrops((p:any) => {
                    return p.filter((cr:any) => cr._id !== crop._id);
                })
                setShowModal(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (<>
                {
                    crop.partnershipType === "solo" && <>
                        <div className="bg-white p-6 rounded-xl flex flex-col justify-between min-w-[300px] flex-1">
                            <div className='space-y-4 '>
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold text-gray-700">📌 {crop.title}</h2>
                                    <div className="flex gap-2">
                                        <EditSVG onClick={()=>{setCropIdToUpdate(crop._id)}}/>
                                        <DeleteSVG onClick={()=>{setShowModal(true)}}/>
                                    </div>    
                                </div>
                                <div className="text-gray-600">
                                    <p><span className="font-medium">Crop Name:</span> {crop.cropName}</p>
                                    <p><span className="font-medium">Description:</span> {crop.description}</p>
                                    <p><span className="font-medium">Partners:</span> No</p>
                                    <p><span className="font-medium">Your Expense:</span> {sumByKey(crop.yourExpenses,"amount")}</p>
                                    <p><span className="font-medium">Sales:</span> {sumByKey(crop.sales,"amount")}</p>
                                    <p><span className="font-medium">Total Profit:</span> {sumByKey(crop.sales,"amount")-sumByKey(crop.yourExpenses,"amount")}</p>
                                    <p><span className="text-blue-600 underline"><NavLink to={`/crops/${crop._id}`}>View Details...</NavLink></span></p>
                                </div>
                            </div>
                        </div>
                    </>
                }
                {
                    crop.partnershipType === "partnered" && <>
                                <div className="bg-white p-6 rounded-xl flex flex-col justify-between min-w-[300px] flex-1">
                                    <div className='space-y-4'>
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-xl font-semibold text-gray-700">📌 {crop.title}</h2>
                                            <div className="flex gap-2">
                                                <EditSVG onClick={()=>{setCropIdToUpdate(crop._id)}}/>
                                                <DeleteSVG onClick={()=>{setShowModal(true)}}/>
                                            </div>    
                                        </div>
                                        <div className="text-gray-600">
                                            <p><span className="font-medium">Crop Name:</span> {crop.cropName}</p>
                                            <p><span className="font-medium">Description:</span> {crop.description}</p>
                                            <p><span className="font-medium">Partners:</span> {crop.yourName} & {crop.partnerName}</p>

                                            <p><span className="font-medium">Your Expense:</span> {yourExpenses}</p>
                                            <p><span className="font-medium">Partner Expense:</span> {partnerExpenses}</p>
                                            <p><span className="font-medium">Shared Expense:</span> {sharedExpenses}</p>
                                            <p><span className="font-medium">Total Expense:</span> {yourExpenses+partnerExpenses+sharedExpenses}</p>

                                            <p><span className="font-medium">You Initially Paid:</span> {youInitiallyPaid}</p>
                                            <p><span className="font-medium">Partner Initially Paid:</span> {partnerInitiallyPaid}</p>
                                            <p><span className="font-medium">Extra Money You Paid for Expenses:</span> {youInitiallyPaid-partnerInitiallyPaid}</p>

                                            <p><span className="font-medium">Your Taken Money:</span> {yourTakenMoney-partnerTekenMoney}</p>
                                            <p><span className="font-medium">Partner Taken Money:</span> {partnerTekenMoney}</p>
                                            <p><span className="font-medium">Extra Shared Money:</span> {(yourTakenMoney-partnerTekenMoney)-partnerTekenMoney}</p>
                                            <p><span className="font-medium">Profit Share:</span> {sales/2}</p>
                                            
                                            <p><span className="font-medium">Sales:</span> {sales}</p>
                                            <p><span className="font-medium">Total Profit:</span> {sales-(yourExpenses+partnerExpenses+sharedExpenses)}</p>
                                            <p><span className="text-blue-600 underline"><NavLink to={`/crops/${crop._id}`}>View Details...</NavLink></span></p>
                                        </div>
                                    </div>
                                </div>
                    </>
                }
                
                <ConfirmDeleteModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={handleDelete}
                    itemName={crop.title}
                />
        </>        
  )
}





