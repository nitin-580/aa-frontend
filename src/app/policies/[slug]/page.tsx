import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ShieldCheck, Truck, RotateCcw, HelpCircle, FileText, BadgePercent } from "lucide-react";

interface PolicyContent {
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const policies: Record<string, PolicyContent> = {
    return: {
      title: "Return & Cancellation Policy",
      icon: <RotateCcw className="h-8 w-8 text-red-900" />,
      content: (
        <div className="space-y-6 text-sm text-gray-650 leading-relaxed font-sans">
          <p className="font-semibold text-black">
            The SVNIT Alumni Association Store performs strict quality checks on all products at various stages of production.
          </p>
          <p>
            In the event that a defective or damaged product reaches you, please contact us immediately to rectify the situation.
          </p>
          <div className="bg-red-50/50 p-5 rounded-xl border border-red-900/10 space-y-3">
            <h4 className="font-bold text-red-900">How to request a return/rectification:</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Take clear photos of the defective item.</li>
              <li>Email the photos and description along with your Order ID to <strong className="text-red-900 font-semibold">mail@svnitalumni.com</strong> as soon as possible.</li>
              <li>Or contact our support team at <strong className="text-black font-semibold">+91 635 331 2523</strong> (available 10:00 AM to 6:00 PM IST, Monday to Saturday).</li>
            </ul>
          </div>
          <p>
            Please note that since our merchandise is customized and curated specifically for SVNIT Alumni, we do not accept returns or cancellations for non-defective items once the order is in production.
          </p>
        </div>
      ),
    },
    shipping: {
      title: "Shipping & Delivery Policy",
      icon: <Truck className="h-8 w-8 text-red-900" />,
      content: (
        <div className="space-y-6 text-sm text-gray-650 leading-relaxed font-sans">
          <div className="bg-red-900/10 text-red-900 font-semibold p-4 rounded-lg border border-red-900/20 text-center">
            ⚠️ DOMESTIC SHIPMENTS ONLY. WE DO NOT FULFILL INTERNATIONAL DELIVERIES.
          </div>
          <p>
            We process shipments via standard domestic courier partners. Delivery times range from 7 to 10 working days from the completion of the production stage.
          </p>
          <h4 className="font-bold text-black text-base">Standard Shipping Rates:</h4>
          <table className="min-w-full border-collapse border border-gray-200 text-xs">
            <thead>
              <tr className="bg-gray-50 text-black font-bold">
                <th className="border p-3 text-left">Quantity Bracket</th>
                <th className="border p-3 text-left">Shipping Fee (INR)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-3">1 to 3 Products</td>
                <td className="border p-3">₹150</td>
              </tr>
              <tr className="bg-gray-50/50">
                <td className="border p-3">4 to 6 Products</td>
                <td className="border p-3">₹300</td>
              </tr>
              <tr>
                <td className="border p-3">7 to 9 Products</td>
                <td className="border p-3">₹450</td>
              </tr>
              <tr className="bg-gray-50/50">
                <td className="border p-3">10+ Products (Bulk)</td>
                <td className="border p-3 text-red-900 font-semibold">Contact support for custom rates</td>
              </tr>
            </tbody>
          </table>
          <div className="bg-red-50 p-4 rounded-lg border border-red-100 text-red-950">
            <strong>💡 Smart Shipping Tip:</strong> Since shipping fees are bracket-based (e.g. ₹150 for up to 3 items), adding 2 more items to a single-item order will cost you <strong>no extra shipping</strong>!
          </div>
        </div>
      ),
    },
    discount: {
      title: "Discount Policy",
      icon: <BadgePercent className="h-8 w-8 text-red-900" />,
      content: (
        <div className="space-y-6 text-sm text-gray-650 leading-relaxed font-sans">
          <p>
            The SVNIT Alumni Association Store is a non-profit initiative dedicated to keeping SVNITians connected and supporting alumni projects. We maintain high quality standard manufacturing, and our prices are curated to be as accessible as possible.
          </p>
          <p>
            As a general rule, we do not operate as a discount store. However, specialized coupon codes may be issued during specific SVNIT reunion programs, batch jubilees, or official alumni conventions.
          </p>
          <p>
            For bulk orders (e.g. customized batch t-shirts or souvenirs), special pricing is available. Please reach out to us via our <a href="/contact" className="text-red-900 font-bold hover:underline">Contact Us Form</a> with your specifications.
          </p>
        </div>
      ),
    },
    privacy: {
      title: "Privacy Policy",
      icon: <ShieldCheck className="h-8 w-8 text-red-900" />,
      content: (
        <div className="space-y-6 text-sm text-gray-650 leading-relaxed font-sans">
          <p>
            The SVNIT Alumni Association Store is committed to protecting your privacy. This policy outlines our practices regarding data handling:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Analytics & Logs:</strong> We collect anonymous browser statistics (such as IP addresses, referring pages, and timestamps) to monitor website performance and improve user experience.</li>
            <li><strong>Cookies:</strong> We use cookies to enable persistence of your shopping cart items, account sessions, and secure navigation.</li>
            <li><strong>Data Sharing:</strong> We do not sell or lease your personal information. Order and address details are shared strictly with our verified delivery partners and production contractors for fulfillment purposes.</li>
            <li><strong>Security:</strong> All transaction references (such as UTR numbers) and payment intimations are processed through secure admin channels and verified manually by our accounting department.</li>
          </ul>
        </div>
      ),
    },
    website: {
      title: "Website Policy",
      icon: <FileText className="h-8 w-8 text-red-900" />,
      content: (
        <div className="space-y-6 text-sm text-gray-650 leading-relaxed font-sans">
          <p>
            This portal is owned, designed, and operated by the SVNIT Alumni Association, Surat.
          </p>
          <ul className="list-disc pl-5 space-y-3">
            <li><strong>Accuracy:</strong> While we endeavor to keep product descriptions, sizes, colors, and stock information as accurate as possible, minor variations may occur during production. We do not provide warranty for absolute visual matching of material textures.</li>
            <li><strong>Liability:</strong> SVNIT Alumni Association is not liable for any direct or indirect damages arising out of the use of this portal or the inability to place orders.</li>
            <li><strong>Jurisdiction:</strong> All terms, conditions, and transactions are governed by the Laws of India. Any disputes arising out of the store operations shall be subject to the exclusive jurisdiction of the courts of Surat, Gujarat, India.</li>
          </ul>
        </div>
      ),
    },
    copyright: {
      title: "Copyright Policy",
      icon: <FileText className="h-8 w-8 text-red-900" />,
      content: (
        <div className="space-y-6 text-sm text-gray-650 leading-relaxed font-sans">
          <p>
            All material on this portal, including but not limited to text, images, logos, graphics, interface design, and product concepts, is protected under Indian Copyright and Intellectual Property Laws.
          </p>
          <p>
            The official SVNIT Crest and the SVNIT Alumni Association Seal are trademarks of the institute and the association.
          </p>
          <p>
            Reproduction, modification, or distribution of any digital material from this website without prior written permission from the SVNIT Alumni Association Executive Committee is strictly prohibited. For permission requests, write to <strong className="text-black font-semibold">mail@svnitalumni.com</strong>.
          </p>
        </div>
      ),
    },
  };

  const currentPolicy = policies[slug.toLowerCase()] || {
    title: "Policy Not Found",
    icon: <HelpCircle className="h-8 w-8 text-red-900" />,
    content: (
      <p className="text-gray-500 font-sans text-sm">
        The requested policy page could not be located. Please check the links in the footer or contact support.
      </p>
    ),
  };

  return (
    <div className="bg-[#F4F6F9] min-h-screen flex flex-col font-sans">
      <Navbar />
      <div className="flex-grow max-w-4xl w-full mx-auto px-6 py-12 md:py-16">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100 space-y-8">
          <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
            <div className="p-3 bg-red-900/10 rounded-xl">
              {currentPolicy.icon}
            </div>
            <h1 className="text-3xl font-extrabold text-[#0F1E36] tracking-tight">
              {currentPolicy.title}
            </h1>
          </div>
          {currentPolicy.content}
        </div>
      </div>
      <Footer />
    </div>
  );
}
