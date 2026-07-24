import { Menu } from '@ark-ui/react/menu';
import { Link } from 'react-router-dom';

type Props = {
    icon: React.ReactNode;
    options: {
        label: string;
        onClick?: () => void;
        to?: string;
    }[];
    width?: string;
};

// Componente reutilizable para mostrar las opciones del menú
export const ActionMenu = ({ icon, options, width = 'min-w-28' }: Props) => {
    return (
        <Menu.Root>
            <Menu.Trigger className="flex items-center justify-center cursor-pointer">
                {icon}
            </Menu.Trigger>

            <Menu.Positioner>
                <Menu.Content
                    className={`${width} z-30 border border-gray-200 bg-white shadow-xl outline-none 
                                focus:outline-none focus-visible:outline-none flex flex-col
                            
                                `}
                >
                    {options.map((option) =>
                        !option.to ? (
                            <Menu.Item
                                key={option.label}
                                value={option.label}
                                className="px-3 py-2 text-sm hover:bg-[#0000ff] hover:text-white cursor-pointer outline-none"
                                onClick={option.onClick}
                            >
                                {option.label}
                            </Menu.Item>
                        ) : (
                            // Si no es un botón, se tendra que renderizar un link
                            <Link
                                key={option.label}
                                to={option.to}
                                className="px-3 py-2 text-sm hover:bg-[#0000ff] hover:text-white cursor-pointer outline-none"
                            >
                                {option.label}
                            </Link>
                        ),
                    )}
                </Menu.Content>
            </Menu.Positioner>
        </Menu.Root>
    );
};
