import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from './providers'
import Link from 'next/link'
import ThemeSwitcher from './components/ThemeSwitcher'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Đặt vé xem phim',
  description: 'Đặt vé xem phim'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <header className='py-6'>
            <nav className='container flex items-center justify-between'>
              <ul className='flex gap-8 font-medium'>
                <li>
                  <Link href='/'>Trang chủ</Link>
                </li>
                <li>
                  <Link href='/login'>Đăng nhập</Link>
                </li>
                <li>
                  <Link href='/register'>Đăng ký</Link>
                </li>
                <li>
                  |
                </li>
                <li>
                  <Link href='/admin/insertmovie'>Thêm phim mới</Link>
                </li>
                
                <li>
                  <Link href='/admin/addshowtime'>Thêm lịch chiếu</Link>
                </li>

                <li>
                  <Link href='/admin/addcategory'>Thêm loại phim</Link>
                </li>
                
              </ul>
              <ThemeSwitcher />
            </nav>
          </header>
          <main>{children}</main>
          <footer></footer>
        </Providers>
      </body>
    </html>
  )
}
