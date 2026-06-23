import { LogoGuitar } from '@/components/LogoGuitar';
import { BurgerMenuButton } from '@/components/Studio/Header/BurgerMenuButton';

export const HeaderView = () => {
    return (
        <>
            {/* bg-linear-to-r from-slate-600 to-slate-700 */}
            <div className="flex flex-row justify-between items-center bg-black sm:px-6 px-4 py-2 gap-4">
                <LogoGuitar size="small" />
                <div className="bg-amber-200 flex-1 sm:h-[4px] h-0 hidden sm:block" />
                <h1 className="sm:text-4xl text-3xl font-shockwave text-white whitespace-nowrap shrink-0">
                    Guitar App 2
                </h1>
                <div className="bg-amber-200 flex-1 sm:h-[4px] h-0 hidden sm:block" />
                <BurgerMenuButton />
            </div>
        </>
    );
};
