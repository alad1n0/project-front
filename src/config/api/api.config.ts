export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:4044';
export const API_URL = `${SERVER_URL}/api`

export const postAuthOtp = () => '/auth/otp'
export const postAuthVerifyOtp = () => '/auth/otp-verify'
export const postAuthOauth = () => `/auth/oauth`
export const postAdminLogin = () => `/auth/admin-login`