import { ReactNode } from 'react'


interface ButtonProps {
    children: ReactNode,
    onClick: (e:React.MouseEvent<HTMLButtonElement>) => void
}

export function Button({children,onClick}:ButtonProps) {
  return (
    <button onClick={onClick} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none">
        {children}
    </button>
  )
}
