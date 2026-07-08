type Props = {
    className?: string;
};
export const PaperPlaneIcon = ({ className = '' }: Props) => {
    return (
        <svg
            viewBox="0 0 16 16"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            fill="#000000"
            className={className}
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
                <path
                    // En este caso aqui se define currentColor
                    fill="currentColor"
                    d="M0 8l4.9 1.4h0.1v-0.1l7.1-5.3-1.1 1.2-6.2 6.6 0.2 3.2 2.9-3.2 2.1 4.2 6-16z"
                ></path>
            </g>
        </svg>
    );
};
