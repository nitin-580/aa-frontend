"use client";
import HeroBanner2 from '@/components/home/HeroBanner2'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import ProductGrid from '@/components/product/ProductGrid'
import Quote from '@/components/quote/quote'
import Exclusive from '@/components/product/Exclusive'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter()
  const [showAdminPrompt, setShowAdminPrompt] = useState(false)
  const [passcode, setPasscode] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === "#admin") {
        setShowAdminPrompt(true)
      } else {
        setShowAdminPrompt(false)
      }
    }

    // Check on initial load
    checkHash()

    // Listen to hash changes
    window.addEventListener("hashchange", checkHash)
    return () => window.removeEventListener("hashchange", checkHash)
  }, [])

  const handleAdminVerify = (e: React.FormEvent) => {
    e.preventDefault()
    if (passcode === "aa-website-998430") {
      localStorage.setItem("svn_admin_role", "superadmin");
      setShowAdminPrompt(false)
      window.location.hash = "" // Clear hash
      router.push("/admin/dashboard/orders")
    } else if (passcode === "aa-website-contractor-998430") {
      localStorage.setItem("svn_admin_role", "contractor");
      setShowAdminPrompt(false)
      window.location.hash = "" // Clear hash
      router.push("/admin/dashboard/orders")
    } else {
      setErrorMsg("Incorrect admin passcode. Access denied.")
    }
  }

  const handleClosePrompt = () => {
    setShowAdminPrompt(false)
    window.location.hash = "" // Clear hash
  }

  return (
    <main>
      <div className='bg-[#F4F6F9] min-h-screen relative'>
        <Navbar/>
        <HeroBanner2 />
        <Quote />
        <Exclusive />
        <ProductGrid/>
        <Footer />

        {/* Admin Passcode Modal Overlay */}
        {showAdminPrompt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md border border-[#0F1E36]/10 text-[#0F1E36]">
              <h3 className="text-xl font-bold mb-2">Admin Panel Authentication</h3>
              <p className="text-sm text-gray-500 mb-4">Please enter the security authorization key to access administrative panels.</p>
              
              <form onSubmit={handleAdminVerify} className="space-y-4">
                <div>
                  <input
                    type="password"
                    value={passcode}
                    onChange={(e) => {
                      setPasscode(e.target.value)
                      setErrorMsg("")
                    }}
                    placeholder="Enter authentication key"
                    className="w-full border px-3 py-2.5 rounded-lg text-sm text-black outline-none focus:ring-2 focus:ring-[#0F1E36]"
                  />
                  {errorMsg && <p className="text-xs text-red-500 mt-1 font-semibold">{errorMsg}</p>}
                </div>

                <div className="flex gap-3 justify-end pt-2">
                  <button
                    type="button"
                    onClick={handleClosePrompt}
                    className="px-4 py-2 border rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-red-900 text-white hover:bg-red-950 rounded-lg text-sm font-bold transition shadow"
                  >
                    Authenticate
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default Page