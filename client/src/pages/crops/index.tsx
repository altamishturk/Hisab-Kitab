import Section from "../../components/Section";
import { PlusSVG } from "../../components/SVGs/PlusSVG";
import { AddNewCropModal } from "./components/AddNewCropModal";
import { CropItem } from "./components/CropItem";
import { UpdateCropModal } from "./components/UpdateCropModal";
import { useCropLogic } from "./hooks/useCropLogic";
import Skeleton from 'react-loading-skeleton'

export function Crops() {
    const {
        showAddCropModal,
        setShowAddCropModal,
        crops,
        setCrops,
        cropIdToUpdate,
        setCropIdToUpdate,
        isLoading
    } = useCropLogic();
   

    // if(isLoading){
    //     return <>
    //         <div className="w-full h-[100vh] p-4">
    //             <Skeleton
    //             //   className="bg-gray-400"
    //             //   height="100%"
    //             />
    //         </div>
    //     </>
    // }

    return (
        <Section>
            <div className="p-2 md:p-5">
                <div className="bg-gray-200 flex justify-between gap-2 md:gap-5 sticky pt-[16px] top-[57px] z-[10] border-b border-b-gray-300 pb-3 md:pb-5 border-dotted border-b-4">
                    <PlusSVG onClick={() =>{setShowAddCropModal(true)}} className="size-10 bg-white shadow-md p-2 rounded-md cursor-pointer"/>
                </div>

                {
                    showAddCropModal && <AddNewCropModal setShowAddCropModal={setShowAddCropModal} setCrops={setCrops}/>
                }
                {
                    cropIdToUpdate && <UpdateCropModal cropIdToUpdate={cropIdToUpdate} setCropIdToUpdate={setCropIdToUpdate} setCrops={setCrops}/>
                }

                <div className="flex flex-wrap justify-center gap-2 md:gap-5 pt-5">
                    {
                        !crops && isLoading && <div className="w-full flex justify-center items-center">
                            <Skeleton count={5} />
                        </div>
                    }
                    {crops?.map((crop: any, idx: number) => (
                        <CropItem
                        setCrops={setCrops}
                        key={idx}
                        crop={crop}
                        setCropIdToUpdate={setCropIdToUpdate}
                        />
                    ))}

                    {crops && crops.length === 0 && (
                        <div className="w-full flex flex-col items-center justify-center mt-10 text-center text-gray-600">
                        <img className="w-[200px] h-[110px] rounded-md max-w-full mb-2" src="https://www.harvestplus.org/wp-content/uploads/2021/10/Pakistan-homepage.jpg" alt="crop"/>
                        <p className="text-lg font-medium">No crops found</p>
                        <p className="text-sm text-gray-500 mt-1 mb-5">Start by adding your first crop entry.</p>
                            <PlusSVG onClick={() =>{setShowAddCropModal(true)}} className="size-10 bg-white shadow-md p-2 rounded-md cursor-pointer"/>
                        </div>
                    )}
                </div>

            </div>
        </Section>
    )
}


