import { useEffect, useState } from "react";
import { axiosInstance } from "../../../utils/axiosInstance";


export function useCardLogic() {
    const [cards, setCards] = useState<any>(null);
    const [editCard, setEditCard] = useState<any>(null);
    const [showAddCardModal, setShowAddCardModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // useEffect(() => {
    //         (async () => {  
    //             try {
    //                 const response = await axiosInstance.get(`/cards`);
    //                 if(response?.data?.cards){
    //                     setCards(response?.data?.cards);
    //                 }
                    
    //             } catch (error) {
    //                 console.log(error);
    //             }
    //         })()
    // }, []);


    useEffect(() => {
        const timeout = setTimeout(() => {
            (async () => {  
                if(searchTerm){
                    try {
                        const response = await axiosInstance.get(`/cards?searchTerm=${searchTerm}`);
                        if (response?.data?.cards) {
                        setCards(response.data.cards);
                        }
                    } catch (error) {
                        console.error("Error fetching cards:", error);
                    }
                }
            })();
        }, 1000); // 1 second delay

        return () => clearTimeout(timeout); // Cleanup to avoid multiple calls
    }, [searchTerm]);
    

    return {
        cards,
        setCards,
        editCard,
        setEditCard,
        showAddCardModal,
        setShowAddCardModal,
        searchTerm,
        setSearchTerm
    };
}
