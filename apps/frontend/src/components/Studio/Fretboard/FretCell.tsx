type Props = {
    audioUrl: string;
    noteIndex: number;
    keyToPress: string;
};

export const FretCell = ({ audioUrl, noteIndex, keyToPress }: Props) => {
    return (
        <div
            //                     shadow-[0_0_4px_rgba(74,222,128,0.35)]

            className="
                    h-full
                    flex
                    items-center
                    justify-center

                    bg-black
                    text-green-400
                    text-[11px]
                    uppercase
                    font-bold
                    tracking-widest
                    w-full
                    border
                    border-slate-600


                    cursor-pointer

                    hover:bg-slate-700
                    active:bg-green-500
                    active:text-black
                    transition-all
                "
        >
            {keyToPress}
        </div>
    );
};
