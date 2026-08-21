"use client";
import React, { useState } from "react";
import { X, CheckCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number | string;
    name: string;
    price: string;
    image: string;
  } | null;
  selectedSize?: string;
  selectedColor?: string;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, product, selectedSize, selectedColor }) => {
  const { cartItems, cartCount, clearCart } = useCart();

  const [step, setStep] = useState(1); // 1: Details Form, 2: UPI QR Payment, 3: Success Pending Verification
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [batch, setBatch] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [utr, setUtr] = useState("");

  if (!isOpen) return null;

  // Calculate Shipping fee based on number of products ordered
  const getShippingFee = (qty: number) => {
    if (qty <= 0) return 0;
    if (qty <= 3) return 150;
    if (qty <= 6) return 300;
    if (qty <= 9) return 450;
    return 0; // Bulk order requires contacting C-7 Council
  };

  // Pricing calculations
  let subtotal = 0;
  let shipping = 0;
  let total = 0;
  let productsSummary = "";

  if (product) {
    const productPrice = parseInt(product.price) || 0;
    subtotal = productPrice * quantity;
    shipping = getShippingFee(quantity);
    total = subtotal + shipping;
    
    const sizeText = selectedSize ? `, Size: ${selectedSize}` : "";
    const colorText = selectedColor ? `, Color: ${selectedColor}` : "";
    productsSummary = `${product.name}${sizeText}${colorText} × ${quantity}`;
  } else {
    subtotal = cartItems.reduce((acc, item) => acc + (parseFloat(item.price) || 0) * item.quantity, 0);
    shipping = getShippingFee(cartCount);
    total = subtotal + shipping;
    productsSummary = cartItems.map(item => {
      const sizeText = item.size ? `, Size: ${item.size}` : "";
      const colorText = item.color ? `, Color: ${item.color}` : "";
      return `${item.name}${sizeText}${colorText} × ${item.quantity}`;
    }).join(" | ");
  }

  const handleNextToPayment = () => {
    if (!name || !email || !phone || !batch || !address || !pincode) {
      alert("Please fill in all the details first! All fields are compulsory.");
      return;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address!");
      return;
    }
    // Phone validation
    const phoneClean = phone.replace(/\D/g, "");
    if (phoneClean.length < 10) {
      alert("Please enter a valid 10-digit phone number!");
      return;
    }
    if (pincode.length !== 6) {
      alert("Please enter a valid 6-digit pincode!");
      return;
    }
    setStep(2);
  };

  const handlePaymentSubmit = async () => {
    if (!utr) {
      alert("Please enter the UTR / Transaction reference number to submit your payment verification request!");
      return;
    }

    const orderId = "SVN-" + Math.floor(Math.random() * 900000 + 100000);

    const newOrder = {
      id: orderId,
      name,
      email,
      phone,
      batch,
      address: `${address}, Pincode: ${pincode}`,
      products: productsSummary,
      subtotal,
      shipping,
      total,
      utr,
      paymentStatus: "PENDING_VERIFICATION",
      orderStatus: "PENDING_PAYMENT",
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    };

    try {
      // Save order to Neon PostgreSQL database via API
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });

      if (!res.ok) {
        throw new Error("Failed to submit order to database");
      }

      // Clear shopping cart if this was a cart-checkout
      if (!product) {
        await clearCart();
      }

      // Also save locally for UI fallback persistence
      const existingOrders = JSON.parse(localStorage.getItem("svn_orders") || "[]");
      existingOrders.unshift(newOrder);
      localStorage.setItem("svn_orders", JSON.stringify(existingOrders));

      setStep(3);
    } catch (e: any) {
      console.error("Order submission error:", e);
      alert(e.message || "Something went wrong while submitting the order. Please try again.");
    }
  };

  const handleClose = () => {
    setStep(1);
    setName("");
    setEmail("");
    setPhone("");
    setBatch("");
    setAddress("");
    setPincode("");
    setQuantity(1);
    setUtr("");
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
        onClick={handleClose}
      ></div>

      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-3 sm:p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[95vh] overflow-y-auto p-4 sm:p-6 relative border border-red-900/10 text-[#0F1E36]">
          
          {/* Close Icon Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-900 transition text-2xl"
          >
            ✕
          </button>

          {step === 1 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 font-sans border-b pb-2 text-[#0F1E36]">
                Checkout details
              </h2>

              {/* Summary card or Cart items */}
              {product ? (
                <div className="flex gap-4 mb-6 bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-bold text-sm text-[#0F1E36] line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">Price: ₹{product.price}</p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <label className="text-xs font-semibold text-gray-600">Qty:</label>
                      <select
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="border border-gray-300 rounded px-1.5 py-0.5 text-xs text-black bg-white"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((q) => (
                          <option key={q} value={q}>{q}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-6 bg-gray-50 p-3 rounded-lg border border-gray-100 max-h-40 overflow-y-auto space-y-2">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Order Items ({cartCount})</p>
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-xs border-b border-gray-250/20 pb-1.5 last:border-b-0">
                      <span className="font-medium text-[#0F1E36] truncate max-w-[260px]">
                        {item.name} {item.size ? `(${item.size})` : ""} × {item.quantity}
                      </span>
                      <span className="font-bold text-gray-800">₹{parseFloat(item.price) * item.quantity}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Fields */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Eg: Nitin Kumar"
                      className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm text-black focus:ring-2 focus:ring-red-900 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Email ID *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Eg: nitin@gmail.com"
                      className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm text-black focus:ring-2 focus:ring-red-900 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Phone Number *</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit number"
                      className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm text-black focus:ring-2 focus:ring-red-900 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Batch (Year of Passing) *</label>
                    <input
                      type="text"
                      value={batch}
                      onChange={(e) => setBatch(e.target.value)}
                      placeholder="Eg: B.Tech CSE '2024"
                      className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm text-black focus:ring-2 focus:ring-red-900 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Shipping Address *</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street, Landmark, Apartment"
                    rows={2}
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm text-black focus:ring-2 focus:ring-red-900 outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Pincode *</label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="6-digit pincode"
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg text-sm text-black focus:ring-2 focus:ring-red-900 outline-none"
                  />
                </div>
              </div>

              {/* Tally */}
              <div className="mt-5 border-t border-dashed pt-3 text-sm text-gray-650 space-y-1">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-black font-semibold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping charges:</span>
                  {(product ? quantity : cartCount) > 9 ? (
                    <span className="text-red-900 font-semibold text-xs">Contact C-7 Council for Bulk rates</span>
                  ) : (
                    <span className="text-black font-semibold">₹{shipping}</span>
                  )}
                </div>
                {((product ? quantity : cartCount) > 0 && (product ? quantity : cartCount) < 9 && ((product ? quantity : cartCount) % 3 !== 0)) && (
                  <div className="bg-red-50 border border-red-100 text-red-900 rounded-lg p-2.5 text-[11px] font-medium leading-normal mt-1">
                    💡 You can add <strong>{3 - ((product ? quantity : cartCount) % 3)} more product{3 - ((product ? quantity : cartCount) % 3) > 1 ? "s" : ""}</strong> at the same shipping price of ₹{shipping}!
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-red-900 pt-2 border-t mt-1">
                  <span>Total Amount:</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <button
                onClick={handleNextToPayment}
                className="mt-6 w-full py-3 bg-red-900 text-white hover:bg-red-950 rounded-lg font-bold text-sm transition duration-300 shadow-md"
              >
                Proceed to Payment (₹{total})
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4 font-sans text-center text-[#0F1E36]">
                Complete Your Payment
              </h2>
              <p className="text-sm text-gray-500 mb-5">
                Scan the QR code using your preferred UPI app (GPay, PhonePe, Paytm) to transfer the amount.
              </p>

              {/* UPI QR Display */}
              <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl border border-gray-100 mb-6">
                <img 
                  src="/images/qrcode.png" 
                  alt="SBI Payments QR Code" 
                  className="h-64 w-auto object-contain mb-4 bg-white p-2 rounded shadow"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className="text-[#0F1E36] text-center space-y-1">
                  <p className="text-xs font-semibold text-gray-500">MERCHANT NAME:</p>
                  <p className="font-bold text-sm text-black">SVNIT ALUMNI ASSOCIATION</p>
                  <p className="text-xs font-semibold text-gray-500 mt-1">UPI ID:</p>
                  <p className="font-bold text-xs bg-white border px-3 py-1 rounded text-black font-mono select-all">
                    SARDARVALLABHPATELALUMNIASSOCIATION@SBI
                  </p>
                  <p className="text-xs font-semibold text-gray-500 mt-2">Amount to transfer:</p>
                  <p className="text-3xl font-extrabold text-red-900">₹{total}</p>
                </div>
              </div>

              {/* Direct Bank Transfer Option */}
              <div className="mb-6 bg-[#0F1E36] text-white text-left p-6 rounded-xl border border-white/10 shadow-lg space-y-3 font-sans">
                <h3 className="font-bold text-sm text-red-400 uppercase tracking-wider border-b border-white/10 pb-2">
                  Direct Bank Transfer Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-gray-400 font-medium">BANK NAME:</span>
                    <p className="font-bold text-white">STATE BANK OF INDIA</p>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium">BRANCH:</span>
                    <p className="font-bold text-white">SVNIT, ICHCHHANATH, SURAT</p>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium">AC. NAME:</span>
                    <p className="font-bold text-white">SVNIT ALUMNI ASSOCIATION</p>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium">AC. NO.:</span>
                    <p className="font-bold text-white font-mono select-all">33004840179</p>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium">IFS CODE:</span>
                    <p className="font-bold text-white font-mono select-all">SBIN0003320</p>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium">SWIFT CODE:</span>
                    <p className="font-bold text-white font-mono select-all">SBININBB260</p>
                  </div>
                </div>
                <div className="text-[10px] text-gray-300 pt-2 border-t border-white/10">
                  ⚠️ Send transaction intimation / screenshot to: <strong className="text-red-300">mail@svnitalumni.com</strong>
                </div>
              </div>

              {/* UTR Input Form */}
              <div className="text-left space-y-3">
                <label className="block text-sm font-bold text-gray-700">
                  Already completed the payment?
                </label>
                <input
                  type="text"
                  value={utr}
                  onChange={(e) => setUtr(e.target.value)}
                  placeholder="Enter 12-digit UPI UTR / Transaction ID"
                  className="w-full border border-gray-300 px-3 py-3 rounded-lg text-sm text-black font-mono focus:ring-2 focus:ring-red-900 outline-none"
                />
                <p className="text-xs text-gray-500 leading-relaxed font-quicksand">
                  Please double-check the UTR ID before submitting. The order status remains pending until our administrators verify your transaction.
                </p>
              </div>

              <button
                onClick={handlePaymentSubmit}
                className="mt-6 w-full py-3.5 bg-red-900 text-white hover:bg-red-955 rounded-lg font-bold text-sm transition duration-300 shadow-md"
              >
                Submit Payment Reference
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4 animate-bounce" />
              <h2 className="text-2xl font-bold mb-3 font-sans text-green-600">
                Payment submitted for verification
              </h2>
              <p className="text-sm text-gray-650 leading-relaxed max-w-sm mx-auto mb-8 font-quicksand">
                Thank you! We&apos;ve received your UTR reference: <strong className="font-mono text-black">{utr}</strong>. Our administrators will review the payment and confirm the shipment shortly.
              </p>

              <button
                onClick={handleClose}
                className="w-full py-3 border-2 border-red-900 text-red-900 font-bold hover:bg-red-50 rounded-lg text-sm transition duration-200"
              >
                Close & Keep Shopping
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default CheckoutModal;
