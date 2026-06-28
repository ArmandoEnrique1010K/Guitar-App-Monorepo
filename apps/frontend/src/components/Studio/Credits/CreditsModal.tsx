import { usePreferences } from '@/hooks';
import { CrossIcon } from '@/icons';
import { Button } from '@/ui';
import { Dialog } from '@radix-ui/themes';
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
    // TODO: FALTA IMPLEMENTAR ESTAS LIBRERIAS
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
    const { showCredits, setShowCredits } = usePreferences();

    return (
        <Dialog.Root open={showCredits} onOpenChange={setShowCredits}>
            <Dialog.Content
                maxWidth="600px"
                minWidth="250px"
                maxHeight="400px"
                className="
                scrollbar
        scrollbar-track-black
        scrollbar-thumb-green-600
        text-green-500
        border-2
        border-[#4f5d75]
        transition-none

        
"
                style={{
                    // Algunas propiedades CSS se definen dentro de style
                    borderRadius: 0,
                    backgroundColor: '#0f1117',
                    transition: 'none',
                    padding: '16px',
                }}
            >
                <Dialog.Title size={'6'}>Créditos</Dialog.Title>
                <Dialog.Description>
                    <div className="flex flex-col gap-8 text-sm">
                        <div>
                            Esta aplicación ha sido construida con el objetivo
                            de aprender a usar React y explorar a fondo las
                            funcionalidades que ofrece la librería Tone.js. El
                            diseño de la aplicación esta basada en el conocido
                            reproductor de Winamp. También se implemento la
                            librería React AI SDK para la integración de una IA
                            generativa. Agredecimiento al instructor Juan Pablo
                            de la Torre por su apoyo y enseñanzas.
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
                                onClick={() => setShowCredits(false)}
                                icon={<CrossIcon className="size-6" />}
                                text="Cerrar"
                            />
                        </div>
                    </div>
                </Dialog.Description>
            </Dialog.Content>
        </Dialog.Root>
    );
};

// <DataList.Root mb="4">
//     <DataList.Label>Logo</DataList.Label>
//     <DataList.Value>
//         <Flex gap="2" wrap="wrap">
//             <Badge color="green">
//                 <a href="https://es.wiktionary.org/wiki/Archivo:Emoji_u1f3b8.svg">
//                     Wikcionario
//                 </a>
//             </Badge>
//         </Flex>
//     </DataList.Value>
// </DataList.Root>
// <DataList.Root mb="4">
//     <DataList.Label>Iconos</DataList.Label>
//     <DataList.Value>
//         <Flex gap="2" wrap="wrap">
//             <Badge color="green">React Icons</Badge>
//         </Flex>
//     </DataList.Value>
// </DataList.Root>

// <Container size="1" mt="6">
//     <Flex justify="center" align="center" gap="4">
//         <img src="react.svg" alt="React" width="80px" />
//         <img src="tone.png" alt="Tone" width="80px" />
//     </Flex>
// </Container>
// <Flex gap="3" mt="4" justify="end">
//     <Dialog.Close>
//         <Button
//             color="orange"
//             style={{
//                 cursor: 'pointer',
//                 outline: 'none',
//             }}
//         >
//             Cerrar
//         </Button>
//     </Dialog.Close>
// </Flex>
