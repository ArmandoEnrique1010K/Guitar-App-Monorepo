type Props = {
    children: React.ReactNode;
    className?: string;
};

export const EffectControlsContainer = ({ children, className }: Props) => {
    return (
        <div
            className={`
                flex-1

                border-2
            bg-slate-900
                bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)]
        bg-size-[4px_4px]
                border-t-slate-900
                border-l-slate-900
                border-r-slate-500
                border-b-slate-500

                overflow-y-auto

                        scrollbar
        scrollbar-track-black
        scrollbar-thumb-green-600

                                    snap-y
                    snap-mandatory
${className}
            `}
        >
            {children}
        </div>
    );
};
