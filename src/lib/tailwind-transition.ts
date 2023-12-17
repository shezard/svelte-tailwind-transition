import {tv, type TV} from 'tailwind-variants';
import {twMerge} from 'tailwind-merge';

type TVOptions = Parameters<TV>[0];

type TTransitionOptions = TVOptions & {
    transitions: {
        [name: string]: {
            from: string,
            to: string;
            class: string,
        }
    };
};

export default function(options : TTransitionOptions) {

    if(options.transitions) {
        for (const [key, value] of Object.entries(options.transitions)) {
            if(options.variants[key]) {
                const transitionVariantName = `${value.from}-to-${value.to}`;

                options.variants[key][transitionVariantName] = twMerge(value.class, options.variants[key][value.to]);
            }
        };
    }

    type Args = {
        [x: string]: string;
    } | undefined

    const variants : (a : Args) => string = tv(options);

    let previousArgs : Args;
    return (args? : Args) => {

        let transitionVariants : Record<string, string> = {};
        if(previousArgs != undefined && args != undefined) {
            transitionVariants = variants.variantKeys.reduce((transitionVariants : Record<string, string>, variantKey : string) => {
                const transitionVariantName = `${previousArgs[variantKey]}-to-${args[variantKey]}`;

                // no change, no transition
                if(previousArgs[variantKey] === args[variantKey]) {
                    return transitionVariants;
                }

                // no transition configured in variants
                if(!variants.variants[variantKey][transitionVariantName]) {
                    return transitionVariants;
                }

                transitionVariants[variantKey] = transitionVariantName;
                return transitionVariants;
            }, transitionVariants);
        }

        previousArgs = args;
        return variants({...args, ...transitionVariants});
    }
}
