import {NextResponse, NextRequest} from 'next/server';
import {getToken} from 'next-auth/jwt';
// import RoutesEnum from "./config/routesEnum";

// // Це приватні сторінки для неавторизований користувачів
// const privateRoutes = [
//     /^\/secure(\/.*)?$/,
//     /^\/admin(\/.*)?$/,
//     /^\/private(\/.*)?$/,
//     /^\/holidays(\/.*)?$/,
//     /^\/calculation-sheet(\/.*)?$/,
//     /^\/reference(\/.*)?$/,
//     /^\/admin-news(\/.*)?$/,
//     /^\/main(\/.*)?$/,
//     /^\/profspilka(\/.*)?$/,
//     /^\/ordering-products(\/.*)?$/,
//     /^\/food-menu(\/.*)?$/,
//     /^\/version-information(\/.*)?$/,
//     /^\/admin-profspilka(\/.*)?$/,
//     /^\/improve-together(\/.*)?$/,
//     /^\/profile-settings(\/.*)?$/,
//     /^\/admin-qr-manager(\/.*)?$/,
//     /^\/admin-qr-statistiс(\/.*)?$/,
// ]
//
// // А ці сторінки захищені, і лише адмін може зайти
// const adminRoutesRegex = [
//     /^\/admin-news(\/.*)?$/,
//     /^\/admin-profspilka(\/.*)?$/,
//     /^\/admin-qr-manager(\/.*)?$/,
//     /^\/admin-qr-statistiс(\/.*)?$/,
//     /^\/admin(\/.*)?$/,
//     /^\/secure(\/.*)?$/,
// ]
// const marketologRoutesRegex = [
//     /^\/admin-qr-manager(\/.*)?$/,
//     /^\/admin-qr-statistiс(\/.*)?$/,
// ]

export async function middleware(request: NextRequest) {
    // const token = await getToken({req: request, secret: process.env.JWT_SECRET})
    // const url = request.nextUrl.clone()
    // const {pathname} = request.nextUrl
    // const params = url.searchParams; // Отримуємо параметри запиту
    // const callbackUrl = params.get("callbackUrl"); // Витягає з params

    // // Перевіряє якщо користувач авторизований, але не верифікований, перекидає на сторінку верифікації
    // if (token && !token.verified && pathname !== RoutesEnum.AUTH_PHONE) {
    //     url.pathname = RoutesEnum.AUTH_PHONE
    //     if (callbackUrl) {
    //         const signInUrl = new URL(RoutesEnum.AUTH_PHONE, request.url,)
    //         signInUrl.searchParams.set('callbackUrl', callbackUrl)
    //         console.log({signInUrl: signInUrl.toString()})
    //         return NextResponse.redirect(signInUrl)
    //     }
    //     return NextResponse.redirect(url)
    // }
    // // Перевіряє чи користувач не авторизований і намагається потрапити на сторінку верифікації
    // if (!token && pathname === RoutesEnum.AUTH_PHONE) {
    //     url.pathname = RoutesEnum.AUTH
    //     return NextResponse.redirect(url)
    // }
    // // Перевіряє якщо користувач авторизований і верифікований, то перекидає його на головну
    // if (token && token.verified && (pathname === RoutesEnum.AUTH || pathname === RoutesEnum.AUTH_PHONE)) {
    //     const signInUrl = new URL(`/auth`, request.url,)
    //     signInUrl.searchParams.set('callbackUrl', pathname)
    //     url.pathname = RoutesEnum.MAIN
    //     return NextResponse.redirect(url)
    // }
    // // Якщо користувач не авторизований, перенаправляємо на сторінку логіну
    // if (!token && privateRoutes.some(value => value.test(pathname))) {
    //     url.pathname = RoutesEnum.AUTH;
    //     const signInUrl = new URL(`/auth`, request.url,)
    //     signInUrl.searchParams.set('callbackUrl', pathname)
    //     return NextResponse.redirect(signInUrl)
    // }
    //
    // // Якщо маршрут потребує адміністративних прав, перевіряємо роль користувача
    // // if (token && !token?.adminPermission && adminRoutesRegex.some(value => value.test(pathname))) {
    // //     url.pathname = RoutesEnum.PERMISSION;
    // //     return NextResponse.redirect(url)
    // // }
    //
    // // Перевіряєм чи присутній параметр callBackUrl
    // if (token?.verified && callbackUrl) {
    //     // Якщо параметр відсутній, можна виконати редирект
    //     return NextResponse.redirect(new URL(callbackUrl, request.url));
    // }
    //
    // const isAdminRoute = adminRoutesRegex.some((regex) => regex.test(pathname));
    // const isMarketologRoute = marketologRoutesRegex.some((regex) => regex.test(pathname));
    //
    // if (isAdminRoute || isMarketologRoute) {
    //     const hasAccess =
    //         (isAdminRoute && token?.adminPermission) ||
    //         (isMarketologRoute && token?.marketologPermission)
    //
    //     if (!hasAccess) {
    //         url.pathname = RoutesEnum.PERMISSION
    //         return NextResponse.redirect(url)
    //     }
    // }

    return NextResponse.next()
}

// // Конфігурація маршрутизації middleware
// export const config = {
//     matcher: [
//         '/((?!api|sitemap.xml|manifest.json|icon-192x192.png|icon-256x256.png|icon-384x384.png|icon-512x512.png|robots.txt|_next/static|_next/image|favicon.ico).*)'
//     ]
// };