import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router'
import { axiosInstance } from '../../utils';
import { toast } from 'react-toastify';
import Section from '../../components/Section';
import { Button } from '../../components/Button';
import { capitalizeName } from '../../utils/capitalizeName';
import { YouGaveModal } from './components/YouGaveModal';
import { YouGotModal } from './components/YouGotModal';
import { TransactionCard } from './components/TransactionCard';
import { ConfirmDeleteModal } from '../../components/ConfirmDeleteModal';
import { EditTransectionModal } from './components/EditTransectionModal';
import { sumByKey } from '../../utils/sumByKey';

export function Person() {
    const {
        person,
        isLoading,
        borrowTransacctions,
        setBorrowTransacctions,
        idToDelete,
        setIdToDelete,
        handleConfirmDelete,
        idToEdit,
        setIdToEdit,
        amountIOwe
    } = useLogic();
    const [youGotModalOpen, setYouGotModalOpen] = useState(false);
    const [youGaveModalOpen, setYouGaveModalOpen] = useState(false);
    

  return (
        <Section>
            <>
                <div className="mb-4"></div>
                <NavLink to={"/persons"}>{"<"} Back</NavLink>
                <div className="mb-4"></div>
                {
                    isLoading && <div className='text-center'>Loading...</div>
                }
                {
                    person && <>
                        <div className="mt-4 bg-white shadow-sm rounded-md p-2 flex items-center gap-3 flex-wrap flex-1">
                            <h2 className="text-lg font-semibold text-gray-900 w-full flex justify-between p-2">
                                <span>{capitalizeName(person.name)}</span>
                                {
                                    amountIOwe === 0 && <span>Settled Up</span>
                                }
                                {
                                    amountIOwe > 0 && <span>You will give: ₹ {amountIOwe}</span>
                                }
                                {
                                    amountIOwe < 0 && <span>You will get: ₹ {Math.abs(amountIOwe)}</span>
                                }
                            </h2>
                            {person.email && (
                                <p className="text-sm text-gray-600">
                                📧 <span className="ml-1">{person.email}</span>
                                </p>
                            )}
                            {person.phoneNumber && (
                                <p className="text-sm text-gray-600">
                                📞 <span className="ml-1">{person.phoneNumber}</span>
                                </p>
                            )}
                        </div>
                        <div className="mt-4 flex justify-between bg-white p-2 rounded-md shadow-sm">
                            <Button onClick={() => {setYouGaveModalOpen(true)}}>You Gave</Button>
                            <Button onClick={() => {setYouGotModalOpen(true)}}>You Got</Button>
                        </div>
                        <div className='h-4'/>
                        {
                            borrowTransacctions && borrowTransacctions.map((tran:any,idx:number) => <>
                                <TransactionCard tran={tran} idx={idx} setIdToDelete={setIdToDelete} setIdToEdit={setIdToEdit}/>
                            </>)
                        }
                    </>
                }
                {
                    youGotModalOpen && <YouGotModal setBorrowTransacctions={setBorrowTransacctions} setYouGotModalOpen={setYouGotModalOpen} person={person}/>
                }
                {
                    youGaveModalOpen && <YouGaveModal setBorrowTransacctions={setBorrowTransacctions} setYouGaveModalOpen={setYouGaveModalOpen} person={person}/>
                }
                {
                    idToEdit && <EditTransectionModal setBorrowTransacctions={setBorrowTransacctions} idToEdit={idToEdit} setIdToEdit={setIdToEdit}/>
                }

                <ConfirmDeleteModal
                        isOpen={idToDelete? true:false}
                        onClose={() => {setIdToDelete("")}}
                        onConfirm={handleConfirmDelete}
                />
            </>
        </Section>
  )
};



function useLogic(){
    const {personId} = useParams();
    const [person, setPerson] = useState<null|any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [borrowTransacctions, setBorrowTransacctions] = useState<any[] | null>(null);
    const [idToDelete, setIdToDelete] = useState("");
    const [idToEdit, setIdToEdit] = useState("");
    const [amountIOwe, setAmountIOwe] = useState(0);

    const handleConfirmDelete = async () => {

        try {
            const response = await axiosInstance.delete(`/borrow-transactions/${idToDelete}`);

            if(response.data){
                setBorrowTransacctions((p:any) => {
                    if(!p){
                        return [];
                    }
                    return p.filter((tran:any) => tran._id !== idToDelete);
                });
                setIdToDelete("");
            }

        } catch (error) {
            toast.error("Server Error!");
        }
    }

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const response = await axiosInstance.get(`/people/${personId}`);
                setIsLoading(false);
                
                if(response.data){
                    setPerson(response.data)
                }
                
            } catch (error) {
                console.log(error);
                setIsLoading(false);
                toast.error("Server Error!")
            }
        })()
    }, [personId]);
    
    useEffect(() => {
        (async () => {
            if(person){
                try {
                    
                    const response = await axiosInstance.get(`/borrow-transactions/user/${person._id}`);

                    if(response.data){
                        setBorrowTransacctions(response.data);
                    }
                    
                } catch (error) {
                    console.log(error);
                    toast.error("Server Error!");
                }
            }
        })()
    }, [person]);


    useEffect(() => {
        if(borrowTransacctions){
            const iGot = sumByKey(borrowTransacctions.filter(tran => tran.from),"amount");
            const iGave = sumByKey(borrowTransacctions.filter(tran => tran.to),"amount");
            const remaning = iGot-iGave;
            setAmountIOwe(remaning);
        }
    }, [borrowTransacctions]);

    return {
        person,
        isLoading,
        borrowTransacctions,
        setBorrowTransacctions,
        idToDelete,
        setIdToDelete,
        handleConfirmDelete,
        idToEdit,
        setIdToEdit,
        amountIOwe
    }
}


