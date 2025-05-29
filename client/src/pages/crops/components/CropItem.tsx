import { NavLink } from 'react-router';
import { sumByKey } from '../../../utils/sumByKey';

interface CropItemProps {
    crop: any;
}

export function CropItem({crop}:CropItemProps) {
  return (<>
                {
                    crop.partnershipType === "solo" && <>
                        <div className="bg-white p-6 rounded-xl flex flex-col justify-between min-w-[300px] flex-1">
                            <div className='space-y-4 '>
                                <h2 className="text-xl font-semibold text-gray-700">📌 {crop.title}</h2>
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
                                        <h2 className="text-xl font-semibold text-gray-700">📌 {crop.title}</h2>
                                        <div className="text-gray-600">
                                            <p><span className="font-medium">Crop Name:</span> {crop.cropName}</p>
                                            <p><span className="font-medium">Description:</span> {crop.description}</p>
                                            <p><span className="font-medium">Partners:</span> {crop.yourName} & {crop.partnerName}</p>
                                            <p><span className="font-medium">Your Expense:</span> {sumByKey(crop.yourExpenses,"amount")}</p>
                                            <p><span className="font-medium">Partner Expense:</span> {sumByKey(crop.partnerExpenses,"amount")}</p>
                                            <p><span className="font-medium">Your Money Taken:</span> {sumByKey(crop.yourTakenMoney,"amount")}</p>
                                            <p><span className="font-medium">Partner Money Taken:</span> {sumByKey(crop.partnerTakenMoney,"amount")}</p>
                                            <p><span className="font-medium">Sales:</span> {sumByKey(crop.sales,"amount")}</p>
                                            <p><span className="font-medium">Total Profit:</span> {sumByKey(crop.sales,"amount")-(sumByKey(crop.yourExpenses,"amount")+sumByKey(crop.partnerExpenses,"amount"))}</p>
                                            <p><span className="text-blue-600 underline"><NavLink to={`/crops/${crop._id}`}>View Details...</NavLink></span></p>
                                        </div>
                                    </div>
                                </div>
                    </>
                }
                
        </>        
  )
}





