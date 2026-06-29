type Props = {
    className?: string;
};

export const PlusIcon = ({ className = '' }: Props) => {
    return (
        <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
                <path d="M10 1H6V6L1 6V10H6V15H10V10H15V6L10 6V1Z"></path>{' '}
            </g>
        </svg>
    );
};
