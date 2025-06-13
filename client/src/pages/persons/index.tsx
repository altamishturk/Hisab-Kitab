import React, { useEffect, useState } from 'react'
import Section from '../../components/Section'
import { PlusSVG } from '../../components/SVGs/PlusSVG'
import { AddPersonModal } from './components/AddPersonModal';
import { axiosInstance } from '../../utils';
import { PersonList } from './components/PersonList';

export function Persons() {
  const {
    showAddPersonModal,
    setShowAddPersonModal,
    isLoading,
    people,
    setPeople
  } = usePersonsLogic();
  

  return (
    <Section>
        <div className="bg-gray-200 flex justify-between gap-2 md:gap-5 sticky pt-[16px] top-[57px] z-[10] border-b border-b-gray-300 pb-3 md:pb-5 border-dotted border-b-4">
            <PlusSVG onClick={() =>{setShowAddPersonModal(true)}} className="size-10 bg-white shadow-md p-2 rounded-md cursor-pointer"/>
        </div>

        {
          isLoading && <div className='text-center'>Loading..</div>
        }

        {
          people && <PersonList people={people} setPeople={setPeople}/>
        }

        {
          showAddPersonModal && <AddPersonModal setShowAddPersonModal={setShowAddPersonModal} setPeople={setPeople}/>
        }
    </Section>
  )
}


function usePersonsLogic(){
  const [showAddPersonModal, setShowAddPersonModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<null | any[]>(null);


   useEffect(() => {
          (async () => {
              try {
                  setIsLoading(true);
                  const response = await axiosInstance.get("/people");
  
                  if(response?.data?.people){
                      setPeople(response?.data?.people);
                      setIsLoading(false);
                  }
  
              } catch (error) {
                  console.log(error);
                  setIsLoading(false);
              }
          })()
  
   }, []);


  return {
    showAddPersonModal,
    setShowAddPersonModal,
    people,
    isLoading,
    setPeople
  }
}





