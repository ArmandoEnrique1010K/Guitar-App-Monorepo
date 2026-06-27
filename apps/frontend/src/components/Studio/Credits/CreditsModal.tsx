import { usePreferences } from '@/hooks';
import {
    Badge,
    Button,
    Container,
    DataList,
    Dialog,
    Flex,
} from '@radix-ui/themes';

export const CreditsModal = () => {
    const { showCredits, setShowCredits } = usePreferences();

    // TODO: MEJORAR EL DISEÑO
    return (
        <Dialog.Root open={showCredits} onOpenChange={setShowCredits}>
            <Dialog.Content
                maxWidth="600px"
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
                }}
            >
                <Dialog.Title>Créditos</Dialog.Title>
                <Dialog.Description size="2" mb="6">
                    Esta aplicación ha sido construida con el objetivo de
                    aprender a usar React y explorar a fondo las funcionalidades
                    que ofrece la librería Tone.js. El diseño de la aplicación
                    esta basada en el conocido reproductor de Winamp. También se
                    implemento la librería React AI SDK para la integración de
                    una IA generativa. Agredecimiento al instructor Juan Pablo
                    de la Torre por su apoyo y enseñanzas.
                </Dialog.Description>
                <DataList.Root mb="4">
                    <DataList.Label>Tecnologias</DataList.Label>
                    <DataList.Value>
                        <Flex gap="2" wrap="wrap">
                            <Badge color="green">HTML</Badge>
                            <Badge color="green">CSS</Badge>
                            <Badge color="green">JavaScript</Badge>
                            <Badge color="green">TypeScript</Badge>
                            <Badge color="green">React 19</Badge>
                            <Badge color="green">Node.js</Badge>
                        </Flex>
                    </DataList.Value>
                </DataList.Root>
                <DataList.Root mb="4">
                    <DataList.Label>Librerias</DataList.Label>
                    <DataList.Value>
                        <Flex gap="2" wrap="wrap">
                            <Badge color="green">Tone.js</Badge>
                            <Badge color="green">React Icons</Badge>
                            <Badge color="green">React Markdown</Badge>
                            <Badge color="green">React FormKit</Badge>
                            <Badge color="green">RadixUI</Badge>
                            <Badge color="green">React Router</Badge>
                            <Badge color="green">React AI SDK</Badge>
                        </Flex>
                    </DataList.Value>
                </DataList.Root>
                <DataList.Root mb="4">
                    <DataList.Label>Fuentes</DataList.Label>
                    <DataList.Value>
                        <Flex gap="2" wrap="wrap">
                            <Badge color="green">Shockwave2</Badge>
                            <Badge color="green">Roboto</Badge>
                        </Flex>
                    </DataList.Value>
                </DataList.Root>
                <DataList.Root mb="4">
                    <DataList.Label>Loader de carga</DataList.Label>
                    <DataList.Value>
                        <Flex gap="2" wrap="wrap">
                            <Badge color="green">loading.io</Badge>
                        </Flex>
                    </DataList.Value>
                </DataList.Root>
                <DataList.Root mb="4">
                    <DataList.Label>Logo</DataList.Label>
                    <DataList.Value>
                        <Flex gap="2" wrap="wrap">
                            <Badge color="green">
                                <a href="https://es.wiktionary.org/wiki/Archivo:Emoji_u1f3b8.svg">
                                    Wikcionario
                                </a>
                            </Badge>
                        </Flex>
                    </DataList.Value>
                </DataList.Root>
                <DataList.Root mb="4">
                    <DataList.Label>Iconos</DataList.Label>
                    <DataList.Value>
                        <Flex gap="2" wrap="wrap">
                            <Badge color="green">React Icons</Badge>
                        </Flex>
                    </DataList.Value>
                </DataList.Root>

                <Container size="1" mt="6">
                    <Flex justify="center" align="center" gap="4">
                        <img src="react.svg" alt="React" width="80px" />
                        <img src="tone.png" alt="Tone" width="80px" />
                    </Flex>
                </Container>
                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button
                            color="orange"
                            style={{
                                cursor: 'pointer',
                                outline: 'none',
                            }}
                        >
                            Cerrar
                        </Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
};
