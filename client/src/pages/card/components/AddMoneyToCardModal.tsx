import { useForm } from "react-hook-form";
import { axiosInstance } from "../../../utils/axiosInstance";
import { Modal } from "./Modal";

interface AddMoneyToCardModalProps {
    cardToAddMoney: any;
    setCardToAddMoney: any;
    setCards: any;
}

export function AddMoneyToCardModal({cardToAddMoney,setCardToAddMoney,setCards}:AddMoneyToCardModalProps){
    const moneyReceivedForm = useForm();
    const moneyGaveForm = useForm();

    const handleSubmitMoneyReveived = async (data:any) => {
        const value = Number(data.reveivedMoney);
        const spouseName = data.spouseName;
        
        try {
            const response = await axiosInstance.post(`/cards/add/receive/${cardToAddMoney._id}`,{amount: value,spouseName});
            
            setCards((prev:any) => {
                return prev.map((card:any) => card._id === response.data.card._id? response.data.card:card)
            })
            setCardToAddMoney(null);
        } 
        catch (error:any) {
            console.error(error?.response?.data?.message || error?.message);
        }
    }

    const handleSubmitMoneyGave = async (data:any) => {
        const value = Number(data.reveivedGave);
        const spouseName = data.spouseName;

        try {
            const response = await axiosInstance.post(`/cards/add/gave/${cardToAddMoney._id}`,{amount: value,spouseName});
            // console.log(response);
            setCards((prev:any) => {
                return prev.map((card:any) => card._id === response.data.card._id? response.data.card:card)
            })
            setCardToAddMoney(null);
        } 
        catch (error:any) {
            console.error(error?.response?.data?.message || error?.message);
        }
    }

    
    return <Modal title="New Transaction" onClose={() => {setCardToAddMoney(null)}}>
                <div className="flex items-center gap-10">
                    <h2 className='text-xl font-bold text-gray-700'>{cardToAddMoney?.name}</h2>
                    <div className="flex-1 h-[1px] bg-gray-200 w-full"/>
                    <h2 className='text-xl font-bold text-gray-700'>{cardToAddMoney?.giftGiverInfo?.name}</h2>
                </div>
                <div className="flex mt-4 gap-2 items-end">
                                    <div className="flex-1">
                                        <input placeholder='Spouse Name...' id='spouseName' type='text' {...moneyReceivedForm.register('spouseName')} className='w-full border p-2 rounded-md'/>
                                    </div>
                </div>
                <div className="flex mt-4 gap-2 items-end">
                                    <div className="flex-1">
                                        <label htmlFor="reveivedMoney" className='text-gray-400'>Reveived Money</label>
                                        <input id='reveivedMoney' type='number' {...moneyReceivedForm.register('reveivedMoney')} className='w-full border p-2 rounded-md'/>
                                    </div>
                                    <button onClick={moneyReceivedForm.handleSubmit((data) => handleSubmitMoneyReveived(data))} className='w-[200px] bg-blue-600 text-white p-2 rounded-md'>Add</button>
                </div>
                <div className="flex mt-4 gap-2 items-end">
                                    <div className="flex-1">
                                        <label htmlFor="reveivedGave" className='text-gray-400'>Gave Money</label>
                                        <input id='reveivedGave' type='number' {...moneyGaveForm.register('reveivedGave')} className='w-full border p-2 rounded-md'/>
                                    </div>
                                    <button onClick={moneyGaveForm.handleSubmit((data) => handleSubmitMoneyGave(data))} className='w-[200px] bg-blue-600 text-white p-2 rounded-md'>Add</button>
                </div>
           </Modal>        
}