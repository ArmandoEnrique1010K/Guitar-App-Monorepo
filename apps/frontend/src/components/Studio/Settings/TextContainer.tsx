import type { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    className?: string;
};

export const TextContainer = ({ children, className = '' }: Props) => {
    return (
        <div
            className={`
                    flex  bg-black text-green-500 flex-1
                            text-xs
            uppercase        font-bold
    p-1 border-2 border-t-slate-900 border-l-slate-900 border-r-slate-500
                border-b-slate-500
                items-center justify-center
                ${className}
    `}
        >
            {children}
        </div>
    );
};
