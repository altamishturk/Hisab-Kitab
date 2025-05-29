import { useEffect, useState } from "react";
import { axiosInstance } from "../../../utils/axiosInstance";


export function useCardLogic() {
    const [cards, setCards] = useState<any>(null);
    const [cardToEdit, setCardToEdit] = useState<any>(null);
    const [cardToAddMoney, setCardToAddMoney] = useState<any>(null);
    const [showAddCardModal, setShowAddCardModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
            (async () => {  
                try {
                    setIsLoading(true);
                    const response = await axiosInstance.get(`/cards`);
                    if(response?.data?.cards){
                        setCards(response?.data?.cards);
                    }
                    
                } catch (error) {
                    console.log(error);
                }
                finally {
                    setIsLoading(false);
                }
            })()
    }, []);


    useEffect(() => {
        const timeout = setTimeout(() => {
            (async () => {  
                if(searchTerm){
                    try {
                        setIsLoading(true);
                        const response = await axiosInstance.get(`/cards?searchTerm=${searchTerm}`);
                        if (response?.data?.cards) {
                            setCards(response.data.cards);
                        }
                    } catch (error) {
                        console.error("Error fetching cards:", error);
                    }
                    finally {
                        setIsLoading(false);
                    }
                }
                else {
                    setCards(null);
                }
            })();
        }, 1000); // 1 second delay

        return () => clearTimeout(timeout); // Cleanup to avoid multiple calls
    }, [searchTerm]);
    

    return {
        cards,
        setCards,
        cardToEdit,
        setCardToEdit,
        showAddCardModal,
        setShowAddCardModal,
        searchTerm,
        setSearchTerm,
        isCardsLoading: isLoading,
        cardToAddMoney,
        setCardToAddMoney
    };
}
