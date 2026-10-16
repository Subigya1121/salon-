import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../navigation/Navbar'
import Footer from './Footer'
import MobileBar from './MobileBar'
import { BUSINESS } from '../../data/config'

export default function Layout() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-brand focus:px-4 focus:py-2 focus:text-black">Skip to content</a>
      {BUSINESS.demo && <div className="bg-brand px-4 py-2 text-center text-xs font-bold text-[color:var(--brand-ink)]">Demo website. Business information shown for demonstration purposes.</div>}
      <Navbar />
      <main id="main"><Outlet /></main>
      <Footer />
      <MobileBar />
    </>
  )
}
