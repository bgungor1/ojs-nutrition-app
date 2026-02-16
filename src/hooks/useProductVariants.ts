import { useState } from "react";


export interface ProductVariant {
    id: string;
    aroma: string;
    size: ProductVariantSize;
    price: number;
    originalPrice?: number;
    discountPercentage?: number;
    isAvailable: boolean;
    image?: string;
}


export interface ProductVariantSize {
    id: string;
    name: string;
    gram: number;
    pieces: number;
    totalServices: number;
}


function isSameSize(size1: ProductVariantSize, size2: ProductVariantSize): boolean {
    return size1.gram === size2.gram && size1.pieces === size2.pieces;
}

export function useProductVariants(productVariants: ProductVariant[]) {
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
        () => productVariants[0]
    );


    const productVariantsByAroma = productVariants.reduce(
        (previousValue, currentValue) => {
            if (previousValue[currentValue.aroma]) {
                previousValue[currentValue.aroma].push(currentValue);
            } else {
                previousValue[currentValue.aroma] = [currentValue];
            }
            return previousValue;
        },
        {} as Record<string, ProductVariant[]>
    );


    const productSizes = productVariants.reduce(
        (previousValue, currentValue) => {
            if (
                !previousValue.find((size) =>
                    isSameSize(size, currentValue.size)
                )
            ) {
                previousValue.push(currentValue.size);
            }
            return previousValue;
        },
        [] as ProductVariantSize[]
    );


    const productAromas = Object.keys(productVariantsByAroma);

    function getAromaSizes(aroma: string) {
        return productVariantsByAroma[aroma].map((variant) => variant.size);
    }


    function isSizeAvailable(size: ProductVariantSize) {
        return getAromaSizes(selectedVariant.aroma).find((aromaSize) =>
            isSameSize(aromaSize, size)
        ) !== undefined;
    }


    function isSelectedAroma(aroma: string) {
        return selectedVariant.aroma === aroma;
    }

    function isSelectedSize(size: ProductVariantSize) {
        return isSameSize(selectedVariant.size, size);
    }


    function selectAroma(aroma: string) {
        const variantsForAroma = productVariantsByAroma[aroma];
        if (variantsForAroma && variantsForAroma.length > 0) {
            // Aynı boyutta variant varsa onu seç, yoksa ilkini seç
            const sameSizeVariant = variantsForAroma.find(variant =>
                isSameSize(variant.size, selectedVariant.size)
            );
            setSelectedVariant(sameSizeVariant || variantsForAroma[0]);
        }
    }


    function selectSize(size: ProductVariantSize) {
        const variantsForSize = productVariants.filter(variant =>
            isSameSize(variant.size, size) && variant.aroma === selectedVariant.aroma
        );
        if (variantsForSize.length > 0) {
            setSelectedVariant(variantsForSize[0]);
        }
    }


    function getVariantByAromaAndSize(aroma: string, size: ProductVariantSize): ProductVariant | undefined {
        return productVariants.find(variant =>
            variant.aroma === aroma && isSameSize(variant.size, size)
        );
    }

    return {
        selectedVariant,
        setSelectedVariant,
        productVariantsByAroma,
        productSizes,
        productAromas,
        getAromaSizes,
        isSizeAvailable,
        isSelectedAroma,
        isSelectedSize,
        selectAroma,
        selectSize,
        getVariantByAromaAndSize
    };
}