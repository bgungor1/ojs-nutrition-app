export interface ProductDetail {
    id: number
    name: string
    image: string
    description: string
    shortDescription: string
    reviewCount: number
    rating: number
    price: number
    originalPrice?: number
    discountPercentage?: number


    category: string
    brand: string
    weight: string
    servingSize: string
    servingsPerContainer: number
    pricePerServing: number


    flavors: FlavorOption[]
    sizes: SizeOption[]
    selectedFlavor: string
    selectedSize: string


    tags: string[]
    isVegetarian: boolean
    isGlutenFree: boolean
    isNew: boolean
    isBestSeller: boolean
    isFeatured: boolean


    inStock: boolean
    stockQuantity: number
    expirationDate: string


    features: string[]
    nutritionalInfo: NutritionalInfo
    usageInstructions: string
    ingredients: string[]


    images: string[]
}

export interface FlavorOption {
    id: string
    name: string
    color: string
    isAvailable: boolean
}

export interface SizeOption {
    id: string
    name: string
    weight: string
    servings: number
    price: number
    originalPrice?: number
    discountPercentage?: number
    isAvailable: boolean
}

export interface NutritionalInfo {
    calories: number
    protein: number
    carbohydrates: number
    fat: number
    fiber: number
    sugar: number
    sodium: number
    cholesterol: number
    vitamins: VitaminInfo[]
    minerals: MineralInfo[]
}

export interface VitaminInfo {
    name: string
    amount: number
    unit: string
    dailyValue: number
}

export interface MineralInfo {
    name: string
    amount: number
    unit: string
    dailyValue: number
}

export interface ProductReview {
    id: number
    reviewerName: string
    rating: number
    reviewDate: string
    reviewTitle: string
    reviewText: string
    isVerified: boolean
    helpfulCount: number
    images?: string[]
}

export interface RelatedProduct {
    id: number
    name: string
    image: string
    price: number
    originalPrice?: number
    rating: number
    reviewCount: number
    discountPercentage?: number
}
