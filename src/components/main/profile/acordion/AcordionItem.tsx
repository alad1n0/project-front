import React, { useState, ReactNode } from 'react';
import {ArrowSvg} from "@/assets";

interface AccordionItemProps {
    title: string;
    children: ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="accordion-item">
            <div className="accordion-header" onClick={toggle}>
                {title}
                <ArrowSvg className={`icon_arrow ${isOpen ? 'rotate' : ''}`}/>
            </div>
            <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
                {children}
            </div>
        </div>
    );
};

const Accordion = () => {
    return (
        <>
            <AccordionItem title="Як знайти потрібну страву чи заклад?">
                <p className="accordion_text">Ви можете скористатися пошуком на головній сторінці, вибрати категорію страв або скористатися фільтрами для швидкого пошуку.</p>
            </AccordionItem>
            <AccordionItem title="Як зробити замовлення?">
                <p className="accordion_text">Ви можете скористатися пошуком на головній сторінці, вибрати категорію страв або скористатися фільтрами для швидкого пошуку.</p>
            </AccordionItem>
            <AccordionItem title="Чи можна зробити передзамовлення?">
                <p className="accordion_text">Ви можете скористатися пошуком на головній сторінці, вибрати категорію страв або скористатися фільтрами для швидкого пошуку.</p>
            </AccordionItem>
        </>
    );
};

export default Accordion;