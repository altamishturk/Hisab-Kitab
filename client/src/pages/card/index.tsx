import Section from '../../components/Section';
import { EditCardModal } from './components/EditCardModal';
import { useCardLogic } from './hooks/useCardLogic';
import { AddCardModal } from './components/AddCardModal';
import { Search } from './components/Search';
import { CardItem } from './components/CardItem';


export function Card() {
    const {
        cards,
        setCards,
        editCard,
        setEditCard,
        showAddCardModal,
        setShowAddCardModal,
        searchTerm,
        setSearchTerm
    } = useCardLogic();




    return <Section >
        <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-2 md:gap-5 mb-4">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className="size-10 bg-white shadow-md p-2 rounded-md cursor-pointer"
                    onClick={() => setShowAddCardModal(true)}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <Search setSearchTerm={setSearchTerm}/>
            </div>

            {
                editCard && <EditCardModal editCard={editCard} setEditCard={setEditCard} setCards={setCards}/>
            }
            {
                showAddCardModal && <AddCardModal setShowAddCardModal={setShowAddCardModal} setCards={setCards}/>
            }
            <div className="flex flex-wrap items-start justify-center gap-2 md:gap-5 border-t border-t-4 mt-3 md:pt-5">
                {
                    (cards?.length === 0) && <div className='mt-10 text-gray-300'>
                        <div className='w-[50px] md:w-[100px] h-[50px] md:h-[100px] mx-auto'>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="#ccc" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                id="Captions--Streamline-Lucide"
                                className='mt-3'
                            >
                                <desc>{"\n    Captions Streamline Icon: https://streamlinehq.com\n  "}</desc>
                                <path d="M5 5h14s2 0 2 2v10s0 2 -2 2H5s-2 0 -2 -2V7s0 -2 2 -2" strokeWidth={2} />
                                <path d="M7 15h4m4 0h2M7 11h2m4 0h4" strokeWidth={2} />
                            </svg>
                        </div> 
                        <h1 className='text-xl md:text-5xl'>We couldn't find any cards</h1>
                    </div>
                }
                {
                    cards?.map((card:any,idx:number) => <CardItem card={card} idx={idx} setEditCard={setEditCard} searchTerm={searchTerm}/>)
                }
            </div>
        </div>
    </Section>
}



