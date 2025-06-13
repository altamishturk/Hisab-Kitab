import { SetStateAction, useState } from "react";
import { DeleteSVG } from "../../../components/SVGs/DeleteSVG";
import { EditSVG } from "../../../components/SVGs/EditSVG";
import { capitalizeName } from "../../../utils/capitalizeName";
import { ConfirmDeleteModal } from "../../../components/ConfirmDeleteModal";
import { axiosInstance } from "../../../utils";
import { EditPersonModal } from "./EditPersonModal";
import { useNavigate } from "react-router";
import { Button } from "../../../components/Button";

type Person = {
  _id: string;
  name: string;
  email?: string;
  phoneNumber?: string;
};

interface Props {
  people: Person[];
  setPeople: React.Dispatch<SetStateAction<any[] | null>>
}

export const PersonList: React.FC<Props> = ({ people , setPeople}) => {
    const [idToDelete, setIdToDelete] = useState("");
    const [idToEdit, setIdToEdit] = useState("");

    const handleDeleteClick = (personId: string) => {
        setIdToDelete(personId);
    }

    const handleDeleteConfirm = async() => {
        try {
            
            const response = await axiosInstance.delete(`/people/${idToDelete}`)

            if (response.data) {
                setPeople(prev => {
                    if(!prev){
                        return prev;
                    }
                    return prev.filter(person => person._id !== idToDelete);
                });
                setIdToDelete("");
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = (personId: string) => {
        setIdToEdit(personId);
    }
    
    return (
        <div className="space-y-4 mt-4">
            {
                people.map((person,idx) => (<PersonCard handleDelete={handleDeleteClick} handleEdit={handleEdit} idx={idx} person={person}/>))
            }

            {
                idToEdit && <EditPersonModal idToEdit={idToEdit} setIdToEdit={setIdToEdit} setPeople={setPeople}/>
            }

            <ConfirmDeleteModal 
                isOpen={idToDelete? true:false}
                onClose={() => {setIdToDelete("")}}
                onConfirm={handleDeleteConfirm}
            />
        </div>
    );
};


interface PersonCardProps {
    person: Person;
    idx: number;
    handleDelete: (personId:string) => void;
    handleEdit: (personId:string) => void;
}

const PersonCard = ({person,idx,handleDelete,handleEdit}: PersonCardProps) => {
    const [showCrupButtons, setShowCrupButtons] = useState(false);
    const navigation = useNavigate();
    

    return <>
            <div key={person._id} className="cursor-pointer p-4 border rounded-md shadow-sm bg-white">
                <div className="flex items-center">
                    <div onClick={() => {setShowCrupButtons((p) => !p)}} className="bg-gray-400 w-[20px] h-[20px] rounded-full text-[10px] flex justify-center items-center text-white mr-2">
                        {idx+1}
                    </div>
                    <div className="flex items-center gap-3 flex-wrap flex-1">
                        <h2 className="text-lg font-semibold text-gray-900">{capitalizeName(person.name)}</h2>
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
                    <Button onClick={() => {navigation(`/person/${person._id}`)}}>View Detail</Button>
                    {
                        showCrupButtons && <>
                            <div className="ml-4">
                                <span className='flex gap-2 pr-2'>
                                    <EditSVG 
                                        onClick={() => {handleEdit(person._id)}}
                                    />
                                    <DeleteSVG 
                                        onClick={() => {handleDelete(person._id)}}
                                    />
                                </span>
                            </div>
                        </>
                    }
                </div> 
            </div>
    </>
}


