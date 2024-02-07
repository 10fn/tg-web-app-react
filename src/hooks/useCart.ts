import { useEffect, useState } from 'react'

import { ICartItem } from '../types/Cart'
import { IProduct } from '../types/Product'

export function useCart() {
	const [cart, setCart] = useState<ICartItem[]>([])
	const [price, setPrice] = useState<number>(() => {
		return cart.reduce((total, item) => total + item.price, 0)
	})
	const [itemsCount, setItemsCount] = useState<number>(0)

	useEffect(() => {
		const newPrice = cart.reduce((total, item) => total + item.price * item.count, 0)
		setPrice(newPrice)
		setItemsCount(cart.length)
        console.log(cart)
	}, [cart])

	const addToCart = (product: IProduct) => {
		const newItem: Partial<ICartItem> = {
            id: product.id,
            name: product.title,
            price: product.price,
            image: product.images[0],
            count: 1
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
		setCart([...cart, newItem])
	}

	const removeFromCart = (id: number ) => {
        const updatedCart = cart.filter(item => item.id !== id)
        setCart(updatedCart)
	}

	const increaseItemCount = (id: number) => {
		const updatedCart = cart.map(item =>
			item.id === id ? { ...item, count: item.count + 1 } : item
		)
		setCart(updatedCart)
	}

	const decreaseItemCount = (id: number) => {
		const item = cart.find(item => item.id === id)

		if (item!.count > 1) {
			const updatedCart = cart.map(item =>
				item.id === id ? { ...item, count: item.count - 1 } : item
			)
			setCart(updatedCart)
		}
	}

	const setItemCount = (id: number, newCount: number) => {
		if (newCount < 1) return

		const updatedCart = cart.map(item =>
			item.id === id ? { ...item, count: newCount } : item
		)

		setCart(updatedCart)
	}

	const clearCart = () => {
		setCart([])
	}

	return {
		cart,
		price,
		itemsCount,
		addToCart,
		removeFromCart,
		increaseItemCount,
		decreaseItemCount,
		setItemCount,
		clearCart
	}
}