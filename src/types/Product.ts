export interface IProduct {
    id: number
    images: string[]
    price: number
    title: string
    description: string
    category: {
        name: string
    }
}