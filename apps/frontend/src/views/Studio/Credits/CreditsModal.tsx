import { Modal } from '@/components';
import { useCredits } from '@/hooks';
import { CrossIcon } from '@/icons';
import { Button } from '@/ui';
const sections = [
    {
        title: 'Tecnologías',
        items: [
            'HTML',
            'CSS',
            'TypeScript',
            'React 19',
            'Node.js',
            'Express.js',
        ],
    },
    {
        title: 'Librerías',
        items: [
            'Tone.js 15',
            'React Icons',
            'React Markdown',
            'React FormKit',
            'RadixUI',
            'React Router',
            'React AI SDK',
        ],
    },
    {
        title: 'Fuentes',
        items: ['Shockwave2', 'Roboto'],
    },
    {
        title: 'Loaders',
        items: ['loading.io'],
    },
    {
        title: 'Logo',
        items: ['Wikcionario'],
    },
    {
        title: 'Iconos',
        items: ['React Icons'],
    },
];

export const CreditsModal = () => {
    const { showCredits, toggleCreditsModal } = useCredits();

    return (
        <Modal
            title="Creditos"
            open={showCredits}
            onOpenChange={toggleCreditsModal}
            children={
                <div className="flex flex-col gap-8 text-sm">
                    <div>
                        Esta aplicación ha sido construida con el objetivo de
                        aprender a usar React y explorar a fondo las
                        funcionalidades que ofrece la librería Tone.js. El
                        diseño de la aplicación esta basada en el conocido
                        reproductor de Winamp. También se implemento la librería
                        React AI SDK para la integración de una IA generativa.
                        Agredecimiento a los instructores Juan Pablo de la Torre
                        y Fernando Herrera por sus enseñanzas en Udemy.
                    </div>

                    <div className="flex flex-col gap-4">
                        {sections.map((section) => (
                            <div key={section.title} className="flex">
                                <div className="min-w-28 font-bold">
                                    {section.title}
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {section.items.map((item) => (
                                        <div
                                            key={item}
                                            className="bg-green-200 px-2 text-green-600"
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-row gap-6 justify-center">
                        <img src="react.svg" alt="React" width="80px" />
                        <img src="tone.png" alt="Tone" width="80px" />
                    </div>

                    <div className="flex justify-end">
                        <Button
                            onClick={toggleCreditsModal}
                            icon={<CrossIcon className="size-6" />}
                            text="Cerrar"
                        />
                    </div>
                </div>
            }
        />
    );
};
