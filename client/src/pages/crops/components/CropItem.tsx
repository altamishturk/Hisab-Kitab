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
                <div className="bg-white rounded-xl border hover:shadow-md transition p-5 flex flex-col gap-4 min-w-[300px] flex-1">
                    {/* Top Bar */}
                    <div className="flex justify-between items-center">
                        <h2 className="text-md font-semibold text-gray-800 truncate">
                        {crop.title}
                        </h2>

                        <div className="flex gap-2">
                        <EditSVG onClick={() => setCropIdToUpdate(crop._id)} />
                        <DeleteSVG onClick={() => setShowModal(true)} />
                        </div>
                    </div>

                    {/* Highlight Section */}
                    <div className="flex justify-between items-center bg-gray-50 rounded-lg p-3">
                        <div>
                        <p className="text-xs text-gray-500">Total Profit</p>
                        <p className="text-lg font-semibold text-green-600">
                            {crop.partnershipType === "solo"
                            ? sumByKey(crop.sales, "amount") -
                                sumByKey(crop.yourExpenses, "amount")
                            : sales - (yourExpenses + partnerExpenses + sharedExpenses)}
                        </p>
                        </div>

                        <div className="text-right">
                        <p className="text-xs text-gray-500">Sales</p>
                        <p className="text-sm font-medium text-gray-800">
                            {crop.partnershipType === "solo"
                            ? sumByKey(crop.sales, "amount")
                            : sales}
                        </p>
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className="text-sm text-gray-600 space-y-1">
                        <p><span className="text-gray-400">Crop:</span> {crop.cropName}</p>
                        <p><span className="text-gray-400">Type:</span> {crop.partnershipType}</p>

                        {crop.partnershipType === "partnered" && (
                        <p>
                            <span className="text-gray-400">Partners:</span>{" "}
                            {crop.yourName} & {crop.partnerName}
                        </p>
                        )}
                    </div>

                    {/* Divider */}
                    <div className="border-t"></div>

                    {/* SOLO */}
                    {crop.partnershipType === "solo" && (
                        <div className="flex justify-between text-sm">
                        <div>
                            <p className="text-gray-400">Expense</p>
                            <p className="font-medium">
                            {sumByKey(crop.yourExpenses, "amount")}
                            </p>
                        </div>
                        </div>
                    )}

                    {/* PARTNERED */}
                    {crop.partnershipType === "partnered" && (
                        <div className="grid grid-cols-2 gap-4 text-sm">

                        {/* You */}
                        <div className="bg-blue-50 rounded-lg p-3">
                            <p className="text-xs text-gray-500 mb-1">You</p>
                            <p>Expense: <span className="font-medium">{yourExpenses}</span></p>
                            <p>Paid: <span className="font-medium">{youInitiallyPaid}</span></p>
                        </div>

                        {/* Partner */}
                        <div className="bg-purple-50 rounded-lg p-3">
                            <p className="text-xs text-gray-500 mb-1">Partner</p>
                            <p>Expense: <span className="font-medium">{partnerExpenses}</span></p>
                            <p>Paid: <span className="font-medium">{partnerInitiallyPaid}</span></p>
                        </div>

                        {/* Shared */}
                        <div className="col-span-2 bg-gray-50 rounded-lg p-3 flex justify-between">
                            <span className="text-gray-500">Shared Expense</span>
                            <span className="font-medium">{sharedExpenses}</span>
                        </div>
                        </div>
                    )}

                    {/* CTA */}
                    <NavLink
                        to={`/crops/${crop._id}`}
                        className="text-sm text-blue-600 font-medium hover:underline self-end"
                    >
                        View →
                    </NavLink>
                </div>

                <ConfirmDeleteModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={handleDelete}
                    itemName={crop.title}
                />
        </>        
  )
}





