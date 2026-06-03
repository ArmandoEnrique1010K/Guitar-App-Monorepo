type Props = {
    title?: string;
    icon: React.ReactNode;
    disabled?: boolean;
    onClick: () => void;
};

export const LongButton = ({ title, icon, disabled, onClick }: Props) => {
    return (
        <button
            className={`
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                flex items-center sm:gap-2 gap-1
                sm:px-2 sm:py-1 px-1 py-0.5
                border-2
                uppercase
                font-bold
                tracking-wide
                select-none
                bg-linear-to-b from-gray-300 to-gray-400
                border-t-gray-200
                border-l-gray-200
                border-r-gray-800
                border-b-gray-800
                shadow-inner

                active:from-gray-400
                active:to-gray-500
                active:border-t-gray-800
                active:border-l-gray-800
                active:border-r-gray-200
                active:border-b-gray-200


                text-slate-600 
                active:text-slate-800  
                active:drop-shadow(0 0 4px #4ade80) flex-1
            `}
            onClick={onClick}
            title={title}
            disabled={disabled}
        >
            {icon}
        </button>
    );
};
