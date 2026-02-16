import type { ApiProductDetail } from '@/types/api'
import type { FlavorOption, ProductDetail, SizeOption } from '@/types/product'
import type { ProductVariant } from '../hooks/useProductVariants'

export const transformApiProductToProductDetail = (apiProduct: ApiProductDetail): ProductDetail => {
    const uniqueAromas = [...new Set(apiProduct.variants.map(v => v.aroma))]
    const flavors: FlavorOption[] = uniqueAromas.map(aroma => ({
        id: aroma.toLowerCase().replace(/\s+/g, '-'),
        name: aroma,
        color: getFlavorColor(aroma),
        isAvailable: apiProduct.variants.some(v => v.aroma === aroma && v.is_available)
    }))

    const sizes: SizeOption[] = apiProduct.variants
        .filter(v => v.is_available)
        .map(variant => ({
            id: variant.id,
            name: `${variant.size.gram}g`,
            weight: `${variant.size.gram}g`,
            servings: variant.size.total_services,
            price: variant.price.total_price,
            originalPrice: variant.price.discounted_price || undefined,
            discountPercentage: variant.price.discount_percentage || undefined,
            isAvailable: variant.is_available
        }))

    const nutritionFacts = apiProduct.explanation.nutritional_content.nutrition_facts.ingredients
    const proteinInfo = nutritionFacts.find(n => n.name === 'Protein')
    const caloriesInfo = nutritionFacts.find(n => n.name === 'Enerji')
    const carbInfo = nutritionFacts.find(n => n.name === 'Karbonhidrat')
    const fatInfo = nutritionFacts.find(n => n.name === 'Yağ')

    return {
        id: parseInt(apiProduct.id),
        name: apiProduct.name,
        image: apiProduct.variants[0]?.photo_src ? `https://fe1111.projects.academy.onlyjs.com${apiProduct.variants[0].photo_src}` : '/src/assets/whey-protein.jpg',
        description: apiProduct.explanation.description,
        shortDescription: apiProduct.short_explanation,
        reviewCount: apiProduct.comment_count,
        rating: apiProduct.average_star,
        price: sizes[0]?.price || 0,
        originalPrice: sizes[0]?.originalPrice,
        discountPercentage: sizes[0]?.discountPercentage,

        category: 'Protein',
        brand: 'OJS Nutrition',
        weight: `${sizes[0]?.weight || '400g'}`,
        servingSize: '25g',
        servingsPerContainer: sizes[0]?.servings || 16,
        pricePerServing: sizes[0]?.price ? Math.round(sizes[0].price / sizes[0].servings * 100) / 100 : 0,

        flavors,
        sizes,
        selectedFlavor: flavors[0]?.id || '',
        selectedSize: sizes[0]?.id || '',

        tags: apiProduct.tags,
        isVegetarian: apiProduct.tags.includes('VEJETARYEN'),
        isGlutenFree: apiProduct.tags.includes('GLUTENSİZ'),
        isNew: false,
        isBestSeller: false,
        isFeatured: false,

        inStock: true,
        stockQuantity: 100,
        expirationDate: '2025-12-31',

        features: apiProduct.explanation.features.split('\n').filter(f => f.trim()),
        nutritionalInfo: {
            calories: extractNumber(caloriesInfo?.amounts[0]) || 0,
            protein: extractNumber(proteinInfo?.amounts[0]) || 0,
            carbohydrates: extractNumber(carbInfo?.amounts[0]) || 0,
            fat: extractNumber(fatInfo?.amounts[0]) || 0,
            fiber: 0,
            sugar: 0,
            sodium: 0,
            cholesterol: 0,
            vitamins: [],
            minerals: []
        },
        usageInstructions: apiProduct.explanation.usage,
        ingredients: apiProduct.explanation.nutritional_content.ingredients.map(ing => ing.value),
        images: apiProduct.variants.map(v => v.photo_src ? `https://fe1111.projects.academy.onlyjs.com${v.photo_src}` : '/src/assets/whey-protein.jpg')
    }
}


const getFlavorColor = (aroma: string): string => {
    const colorMap: { [key: string]: string } = {
        'Bisküvi': '#8B4513',
        'Çikolata': '#4A2C2A',
        'Muz': '#FFD700',
        'Salted Caramel': '#D2691E',
        'Choco Nut': '#8B4513',
        'Hindistan Cevizi': '#F5DEB3',
        'Raspberry Cheesecake': '#DC143C',
        'Çilek': '#FF69B4'
    }
    return colorMap[aroma] || '#8B4513'
}

const extractNumber = (text: string | undefined): number => {
    if (!text) return 0
    const match = text.match(/(\d+(?:\.\d+)?)/)
    return match ? parseFloat(match[1]) : 0
}

export const transformApiVariantsToProductVariants = (apiProduct: ApiProductDetail): ProductVariant[] => {
    return apiProduct.variants.map(variant => ({
        id: variant.id,
        aroma: variant.aroma,
        size: {
            id: variant.id,
            name: `${variant.size.gram}g`,
            gram: variant.size.gram,
            pieces: variant.size.pieces,
            totalServices: variant.size.total_services
        },
        price: variant.price.total_price,
        originalPrice: variant.price.discounted_price || undefined,
        discountPercentage: variant.price.discount_percentage || undefined,
        isAvailable: variant.is_available,
        image: variant.photo_src ? `https://fe1111.projects.academy.onlyjs.com${variant.photo_src}` : undefined
    }))
}