export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:4044';
export const API_URL = `${SERVER_URL}/api`

export const postAuthOtp = () => '/auth/otp'
export const postAuthVerifyOtp = () => '/auth/otp-verify'
export const postAuthOauth = () => `/auth/oauth`
export const postFinalizeOtp = () => `/auth/otp-finalize`
export const postAdminLogin = () => '/auth/admin-login'

export const getRestaurantList = () => `/restaurants/get-restaurants`
export const getTopRestaurants = () => `/restaurants/get-top-restaurants`
export const getRestaurantById = (id: string) => `/restaurants/get-restaurant/${id}`

export const actionsFavorite = () => `/favorites/actions-favorite`
export const getFavoriteRestaurants = () => `/favorites/get-all-favorites`

export const getUserInfo = () => `/users/get-user-info`
export const updateUserInfo = () => `/users/update-user-profile`
export const updateUserPhone = () => `/users/update-user-phone`
export const createUserAddress = () => `/users/create-user-address`
export const updateUserAddress = (id: string) => `/users/update-user-address/${id}`
export const deleteUserAddresses = (id: string) => `/users/delete-user-address/${id}`

export const getCategoryRestaurant = () => `/categories/get-all`
export const getTopCategoryRestaurant = () => `/categories/get-top`

export const getProductRestaurantCategory = (id: string) => `/products/get-product-restaurants-category/${id}`
export const getProductRestaurant = (id: string) => `/products/get-product-restaurants/${id}`
export const getOneProduct = (id: string) => `/products/get-product/${id}`

export const countProductBasket = () => `/basket/count`
export const actionsBasket = () => `/basket/actions-basket`
export const getBasketProducts = () => `/basket/product-basket`