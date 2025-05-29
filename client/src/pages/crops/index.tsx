import { useEffect, useState } from "react";
import Section from "../../components/Section";
import { PlusSVG } from "../../components/SVGs/PlusSVG";
import { AddNewCropModal } from "./components/AddNewCropModal";
import { axiosInstance } from "../../utils";
import { CropItem } from "./components/CropItem";

export function Crops() {
    const {
        showAddCropModal,
        setShowAddCropModal,
        crops,
        setCrops,
    } = useCropLogic();
   

    

    return (
        <Section>
            <div className="p-2 md:p-5">
                <div className="bg-gray-200 flex justify-between gap-2 md:gap-5 sticky pt-[16px] top-[57px] z-[10] border-b border-b-gray-300 pb-3 md:pb-5 border-dotted border-b-4">
                    <PlusSVG onClick={() =>{setShowAddCropModal(true)}} className="size-10 bg-white shadow-md p-2 rounded-md cursor-pointer"/>
                </div>

                {
                    showAddCropModal && <AddNewCropModal setShowAddCropModal={setShowAddCropModal} setCrops={setCrops}/>
                }

                <div className="flex flex-wrap justify-center gap-2 md:gap-5 pt-5">
                    {
                        crops?.map((crop:any,idx:number) => <CropItem key={idx} crop={crop}/>)
                    }
                </div>
            </div>
        </Section>
    )
}


function useCropLogic(){
    const [crops, setCrops] = useState<any>(null);
    const [showAddCropModal, setShowAddCropModal] = useState<boolean>(false);
    const [cropId, setCropId] = useState<string | null>(null);


    useEffect(() => {
        (async () => {
            try {
                
                const response = await axiosInstance.get("/crops");

                if(response?.data?.crops){
                    setCrops(response?.data?.crops);
                }

            } catch (error) {
                console.log(error);
            }
        })()

    }, []);

    return {
        showAddCropModal,
        setShowAddCropModal,
        setCrops,
        crops,
        cropId,
        setCropId
    };
}