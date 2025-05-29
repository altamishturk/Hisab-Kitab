import { PlusSVG } from "../../../components/SVGs/PlusSVG";

interface AddButtonProps {
    label: string;
    onClick: any;
}

export function AddButton({label,onClick}:AddButtonProps){

    return <>
        <button onClick={onClick} className='flex items-center gap-1 border p-2 rounded-md'>
            <PlusSVG className='size-4 border rounded-full'/>
            {label} 
        </button>
    </>
}