import { NextResponse } from 'next/server'

export async function middleware(request) {
  const url = request.nextUrl

  if (url.pathname.startsWith('/rewrites/to-blog')) {
    const slug = url.pathname.split('/').pop()
    url.pathname = `/rewrites/fallback-true-blog/${slug}`
    return NextResponse.rewrite(url)
  }

  if (url.pathname === '/rewrites/rewrite-to-ab-test') {
    let bucket = request.cookies.bucket
    if (!bucket) {
      bucket = Math.random() >= 0.5 ? 'a' : 'b'
      url.pathname = `/rewrites/${bucket}`
      const response = NextResponse.rewrite(url)
      response.cookie('bucket', bucket, { maxAge: 10000 })
      return response
    }

    url.pathname = `/rewrites/${bucket}`
    return NextResponse.rewrite(url)
  }

  if (url.pathname === '/rewrites/rewrite-me-to-about') {
    url.pathname = '/rewrites/about'
    return NextResponse.rewrite(url)
  }

  if (url.pathname === '/rewrites/rewrite-me-to-vercel') {
    return NextResponse.rewrite('https://vercel.com')
  }

  if (url.pathname === '/rewrites/rewrite-me-without-hard-navigation') {
    url.searchParams.set('middleware', 'foo')
    url.pathname =
      request.cookies['about-bypass'] === '1'
        ? '/rewrites/about-bypass'
        : '/rewrites/about'

    const response = NextResponse.rewrite(url)
    response.headers.set('x-middleware-cache', 'no-cache')
    return response
  }
}
