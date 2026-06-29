type Props = {
    presetCount: number;
};

export const PresetsCounterText = ({ presetCount }: Props) => {
    const handleShowText = () => {
        if (presetCount !== 1) {
            return 'configuraciones';
        } else {
            return 'configuración';
        }
    };

    return (
        <span className="text-xs">
            {presetCount} {handleShowText()}
        </span>
    );
};
