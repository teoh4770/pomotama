import { cva, type VariantProps } from 'class-variance-authority';
import type { ClassProp } from 'class-variance-authority/types';
import { twMerge } from 'tailwind-merge';

const buttonStyles = cva(
    [
        'space-x-1 py-1 px-3 text-center capitalize rounded-md',
        'focus-visible:outline focus-visible:outline-4 focus-visible:outline-black',
        'disabled:cursor-not-allowed disabled:opacity-50',
    ],
    {
        variants: {
            intent: {
                primary: [
                    'text-primary bg-white -translate-y-[0.25rem] shadow-[#ebebeb] shadow-[0_4px_0px_0px]',
                    'active:translate-y-0 active:shadow-none',
                ],
                secondary: [
                    // i feel like confirm button is just secondary color with different background
                    'text-white bg-white/20 opacity-90',
                    'hover:opacity-100',
                    'focus-visible:opacity-100',
                    'active:translate-y-[0.125rem]',
                ], // focus state, tabs, header buttons, transparent
                naked: [
                    'bg-transparent',
                    'hover:opacity-95', // hover state, focus state
                    'focus-visible:opacity-70',
                    'active:translate-y-[0.125rem]',
                ],
                confirm: [
                    'text-white bg-black opacity-90', // font size can add later
                    'hover:opacity-100',
                    'focus-visible:opacity-100',
                    'active:font-bold active:translate-y-[0.125rem]',
                ],
            },
            size: {
                small: 'text-sm px-3 py-1',
                medium: 'px-6 py-2 text-base',
                large: 'px-16 py-4 text-[1.375rem]',
            },
        },
        compoundVariants: [
            {
                intent: 'primary',
                size: 'large',
                className: 'uppercase font-bold',
            },
        ],
        defaultVariants: {
            intent: 'primary',
            size: 'medium',
        },
    }
);

export type ButtonStylesProps = VariantProps<typeof buttonStyles>;

export function getButtonStyles(opts: ButtonStylesProps & ClassProp): string {
    return twMerge(buttonStyles(opts));
}
