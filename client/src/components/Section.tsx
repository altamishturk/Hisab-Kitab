import { ReactNode } from 'react';


interface SectionProps {
    children: ReactNode;
    XYCenter?: boolean;
}

function Section({XYCenter=false,children}:SectionProps) {
  return (
    <section className={`min-h-[90.6vh] ${XYCenter? "flex justify-center items-center":""}`}>
        {children}
    </section>
  )
}

export default Section