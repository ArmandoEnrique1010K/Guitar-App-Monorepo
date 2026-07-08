type Props = {
    className?: string;
};

// Se define un componente para mostrar un icono en formato SVG
// SVGRepo (https://www.svgrepo.com/) contiene una variedad de iconos en formato SVG

// Al copiar y pegar contenido svg en React, debes reemplazar los atributos escritos en sintaxis:
// stroke-width a strokeWidth, puedes ver los errores que se tienen en consola para corregir los nombres
export const BackwardIcon = ({ className = '' }: Props) => {
    return (
        <svg
            // currentColor hereda el color del elemento padre, por ejemplo, el
            // color del texto del elemento que va a contener este elemento

            // Su finalidad es cambiar el color del icono
            fill="currentColor"
            height="200px"
            width="200px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 512.053 512.053"
            xmlSpace="preserve"
            // Aplica clases de Tailwind CSS, lo cual es necesario para ajustar el tamaño del icono
            className={className}
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
                <g>
                    <g>
                        <path d="M496.197,343.5C461.595,226.721,356.4,145.057,234.672,139.34V53.793c0-8.619-5.184-16.405-13.163-19.712 c-7.979-3.328-17.152-1.472-23.253,4.629l-192,192c-8.341,8.341-8.341,21.824,0,30.165l192,192 c6.101,6.101,15.275,7.957,23.253,4.629c7.979-3.285,13.163-11.093,13.163-19.712v-109.78 c41.429-4.203,153.195,0.043,237.675,142.037c3.755,6.336,10.453,9.557,17.536,9.557c2.155,0,4.309-0.299,6.464-0.875 c9.237-2.539,15.68-11.947,15.68-21.547C512.475,418.636,507.141,380.385,496.197,343.5z"></path>{' '}
                    </g>
                </g>
            </g>
        </svg>
    );
};
