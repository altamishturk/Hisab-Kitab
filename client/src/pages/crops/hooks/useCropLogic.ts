import { useEffect, useState } from "react";
import { axiosInstance } from "../../../utils";

export function useCropLogic(){
    const [crops, setCrops] = useState<any>(null);
    const [showAddCropModal, setShowAddCropModal] = useState<boolean>(false);
    const [cropIdToUpdate, setCropIdToUpdate] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const response = await axiosInstance.get("/crops");

                if(response?.data?.crops){
                    setCrops(response?.data?.crops);
                    setIsLoading(false);
                }

            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        })()

    }, []);

    return {
        showAddCropModal,
        setShowAddCropModal,
        setCrops,
        crops,
        cropIdToUpdate,
        setCropIdToUpdate,
        isLoading
    };
}