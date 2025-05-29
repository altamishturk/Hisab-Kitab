import Section from '../../components/Section';
import { AddMoneyToCardModal } from './components/AddMoneyToCardModal';
import { useCardLogic } from './hooks/useCardLogic';
import { AddCardModal } from './components/AddCardModal';
import { Search } from './components/Search';
import { CardItem } from './components/CardItem';
import { CardSVG } from '../../components/SVGs/CardSVG';
import { EditCardModal } from './components/EditCardModal';



export function Cards() {
    const {
        cards,
        setCards,
        cardToEdit,
        setCardToEdit,
        showAddCardModal,
        setShowAddCardModal,
        searchTerm,
        setSearchTerm,
        isCardsLoading,
        cardToAddMoney,
        setCardToAddMoney
    } = useCardLogic();




    return <Section >
        <div className="flex flex-col gap-4">
            <div className="bg-gray-200 flex justify-between gap-2 md:gap-5 sticky pt-[16px] top-[57px] z-[10] border-b border-b-gray-300 pb-3 md:pb-5 border-dotted border-b-4">
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
                cardToAddMoney && <AddMoneyToCardModal cardToAddMoney={cardToAddMoney} setCardToAddMoney={setCardToAddMoney} setCards={setCards}/>
            }

            {
                cardToEdit && <EditCardModal cardToEdit={cardToEdit} setCardToEdit={setCardToEdit} setCards={setCards}/>
            }

            {
                showAddCardModal && <AddCardModal setShowAddCardModal={setShowAddCardModal} setCards={setCards}/>
            }
            
            <div className="flex flex-wrap items-start justify-center gap-2 md:gap-5">
                {
                    (cards?.length === 0) && <div className='mt-10 text-gray-300'>
                        <div className='w-[50px] md:w-[100px] h-[50px] md:h-[100px] mx-auto mb-2 md:mb-10 mt-3'>
                            <CardSVG/>
                        </div> 
                        <h1 className='text-xl md:text-5xl'>We couldn't find any cards</h1>
                    </div>
                }
                {
                    isCardsLoading && (cards?.length !== 0) && <div className='mt-10 text-gray-300'>
                        <div className='w-[50px] md:w-[100px] h-[50px] md:h-[100px] mx-auto mb-2 md:mb-10'>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                id="Loading-Circle--Streamline-Ultimate"
                            >
                                <desc>{"\n    Loading Circle Streamline Icon: https://streamlinehq.com\n  "}</desc>
                                <path stroke="#ccc" strokeLinecap="round" strokeLinejoin="round" d="m5.81403 4.25293 1.764 2.427" strokeWidth={1.5} />
                                <path stroke="#ccc" strokeLinecap="round" strokeLinejoin="round" d="m2 9.50293 2.853 0.92697" strokeWidth={1.5} />
                                <path stroke="#ccc" strokeLinecap="round" strokeLinejoin="round" d="m2 15.9919 2.853 -0.927" strokeWidth={1.5} />
                                <path stroke="#ccc" strokeLinecap="round" strokeLinejoin="round" d="m5.81403 21.2419 1.764 -2.427" strokeWidth={1.5} />
                                <path stroke="#000000" strokeLinecap="round" strokeLinejoin="round" d="M11.986 23.2471v-3" strokeWidth={1.5} />
                                <path stroke="#000000" strokeLinecap="round" strokeLinejoin="round" d="m18.158 21.2419 -1.764 -2.427" strokeWidth={1.5} />
                                <path stroke="#000000" strokeLinecap="round" strokeLinejoin="round" d="m21.972 15.9919 -2.853 -0.927" strokeWidth={1.5} />
                                <path stroke="#000000" strokeLinecap="round" strokeLinejoin="round" d="m21.972 9.50293 -2.853 0.92697" strokeWidth={1.5} />
                                <path stroke="#000000" strokeLinecap="round" strokeLinejoin="round" d="m18.158 4.25293 -1.764 2.427" strokeWidth={1.5} />
                                <path stroke="#000000" strokeLinecap="round" strokeLinejoin="round" d="M11.986 0.74707v6" strokeWidth={1.5} />
                            </svg>
                        </div> 
                        <h1 className='text-xl md:text-5xl'>Loading.. Please Wait.</h1>
                    </div>
                }
                {
                    cards === null && !isCardsLoading && <div className='mt-10 text-gray-300'>
                        <div className='w-[50px] md:w-[100px] h-[50px] md:h-[100px] mx-auto mb-2 md:mb-10'>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                id="Network-Search--Streamline-Ultimate" 
                            >
                                <desc>{"\n    Network Search Streamline Icon: https://streamlinehq.com\n  "}</desc>
                                <path stroke="#ccc" strokeLinecap="round" strokeLinejoin="round" d="M10.5 15.75c0 1.3924 0.5531 2.7277 1.5377 3.7123C13.0223 20.4469 14.3576 21 15.75 21c1.3924 0 2.7277 -0.5531 3.7123 -1.5377C20.4469 18.4777 21 17.1424 21 15.75c0 -1.3924 -0.5531 -2.7277 -1.5377 -3.7123 -0.9846 -0.9846 -2.3199 -1.5377 -3.7123 -1.5377 -1.3924 0 -2.7277 0.5531 -3.7123 1.5377 -0.9846 0.9846 -1.5377 2.3199 -1.5377 3.7123Z" strokeWidth={1.5} />
                                <path stroke="#ccc" strokeLinecap="round" strokeLinejoin="round" d="m23.25 23.25 -3.788 -3.788" strokeWidth={1.5} />
                                <path stroke="#ccc" strokeLinecap="round" strokeLinejoin="round" d="M12 23.25c-2.22503 0 -4.40011 -0.6598 -6.25016 -1.896 -1.85005 -1.2361 -3.29199 -2.9931 -4.14348 -5.0488C0.754874 14.2495 0.532087 11.9875 0.966171 9.80524 1.40025 7.62295 2.47171 5.61839 4.04505 4.04505c1.57334 -1.57334 3.5779 -2.6448 5.76019 -3.078879C11.9875 0.532087 14.2495 0.754874 16.3052 1.60636c2.0557 0.85149 3.8127 2.29343 5.0488 4.14348C22.5902 7.59989 23.25 9.77497 23.25 12" strokeWidth={1.5} />
                                <path stroke="#ccc" strokeLinecap="round" strokeLinejoin="round" d="M9.289 22.921C7.768 20.689 6.75 16.633 6.75 12c0 -4.63302 1.018 -8.68802 2.539 -10.92102" strokeWidth={1.5} />
                                <path stroke="#ccc" strokeLinecap="round" strokeLinejoin="round" d="M0.774994 11.25H8.99999" strokeWidth={1.5} />
                                <path stroke="#ccc" strokeLinecap="round" strokeLinejoin="round" d="M2.99899 5.25H21" strokeWidth={1.5} />
                                <path stroke="#ccc" strokeLinecap="round" strokeLinejoin="round" d="M2.048 17.25h5.166" strokeWidth={1.5} />
                                <path stroke="#ccc" strokeLinecap="round" strokeLinejoin="round" d="M14.711 1.07898c1.1783 1.95926 1.9281 4.14595 2.2 6.416" strokeWidth={1.5} />
                            </svg>
                        </div> 
                        <h1 className='text-xl md:text-5xl text-center'>Use the search above to find cards.</h1>
                        <p className='text-yellow-700/70 text-center mt-2 md:mt-4 test-xs md:text-md'>Type {"{all}"} in the search bar to view all cards.</p>
                    </div>
                }
                {
                    !isCardsLoading && cards?.map((card:any,idx:number) => <CardItem card={card} idx={idx} setCardToEdit={setCardToEdit} setCardToAddMoney={setCardToAddMoney} searchTerm={searchTerm}/>)
                }
            </div>
        </div>
    </Section>
}



