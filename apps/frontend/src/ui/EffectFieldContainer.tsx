import type { ReactNode } from 'react';

export const EffectFieldContainer = ({ children }: { children: ReactNode }) => {
    return <div className="snap-start p-1.5">{children}</div>;
};
