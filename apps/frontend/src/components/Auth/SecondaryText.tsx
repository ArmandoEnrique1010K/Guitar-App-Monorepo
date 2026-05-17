import { Link } from 'react-router-dom';

type Props = {
    text: string;
    linkText: string;
    link: string;
};

export const SecondaryText = ({ text, linkText, link }: Props) => {
    return (
        <p className="text-sm text-center text-gray-500">
            {text}{' '}
            <Link to={link} className="text-green-500 hover:underline">
                {linkText}
            </Link>
        </p>
    );
};
