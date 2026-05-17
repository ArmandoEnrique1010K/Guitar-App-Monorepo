type Props = {
    text: string;
    type: 'submit' | 'button';
};

export const FormButton = ({ text, type }: Props) => {
    return (
        <button
            type={type}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-orange-500 transition-allduration-500"
        >
            {text}
        </button>
    );
};
