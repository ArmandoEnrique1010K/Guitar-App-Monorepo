type Props = {
    className?: string;
};

export const NextArrowIcon = ({ className = '' }: Props) => {
    return (
        <svg
            className={className}
            fill="currentColor"
            width="800px"
            height="800px"
            viewBox="0 0 24 24"
            id="next"
            data-name="Flat Color"
            xmlns="http://www.w3.org/2000/svg"
            // Si vienen atributos class o style, pueden ser eliminados segun el caso necesario
            // class="icon flat-color"
        >
            <path
                id="primary"
                d="M18.6,11.2l-12-9A1,1,0,0,0,5,3V21a1,1,0,0,0,.55.89,1,1,0,0,0,1-.09l12-9a1,1,0,0,0,0-1.6Z"
                // style="fill: rgb(0, 0, 0);"
            ></path>
        </svg>
    );
};
