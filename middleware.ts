import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Handle audio file requests
  if (request.nextUrl.pathname.startsWith('/uploads/')) {
    const response = NextResponse.next()
    
    // Add CORS headers for audio files
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Range, Content-Type')
    response.headers.set('Accept-Ranges', 'bytes')
    
    // Set proper content type for audio files
    const pathname = request.nextUrl.pathname
    if (pathname.endsWith('.mp3')) {
      response.headers.set('Content-Type', 'audio/mpeg')
    } else if (pathname.endsWith('.wav')) {
      response.headers.set('Content-Type', 'audio/wav')
    } else if (pathname.endsWith('.ogg')) {
      response.headers.set('Content-Type', 'audio/ogg')
    }
    
    return response
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/uploads/:path*',
  ],
}