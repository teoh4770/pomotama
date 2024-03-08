import { cva, type VariantProps } from "class-variance-authority";
import type { ClassProp } from "class-variance-authority/types";
import { twMerge } from "tailwind-merge";

const buttonStyles = cva(
    [
        "rounded-lg px-5 py-2 text-sm font-semibold transition border-[#22565b] border relative",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tbrand",
        "disabled:cursor-not-allowed disabled:after:hidden",
        "after:absolute after:bg-black after:top-0 after:left-0 after:-z-10 after:rounded-lg after:w-full after:h-full", // "solid shadow" shape
        "after:translate-x-0.75 after:translate-y-0.75", // "solid shadow" positioning
    ],
    {
        variants: {
            intent: {
                primary:
                    "bg-tbrand text-white hover:bg-[#3f9098] disabled:hover:bg-tbrand active:bg-[#214b4f]",
                secondary:
                    "bg-white text-tbrand hover:bg-[#ebebeb] disabled:hover:bg-white active:bg-[#d9d9d9]",
            },
        },
        defaultVariants: {
            intent: "primary",
        },
    }
);

export type ButtonStylesProps = VariantProps<typeof buttonStyles>;

export function getButtonStyles(opts: ButtonStylesProps & ClassProp): string {
    return twMerge(buttonStyles(opts));
}