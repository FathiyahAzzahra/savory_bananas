"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Plus, Minus, ShoppingCart, Search, Percent, DollarSign, X, ImageIcon } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { stockService, orderService } from "@/lib/api-services"
import { PaymentProofUpload } from "@/components/payment-proof-upload"
import { ReceiptGenerator } from "@/components/receipt-generator"
import type { Stock, CartItem } from "@/lib/types"

export default function CashierPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { data: session } = useSession()
  const [stock, setStock] = useState<Stock[]>([])
  const [filteredStock, setFilteredStock] = useState<Stock[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [cart, setCart] = useState<CartItem[]>([])
  const [customerName, setCustomerName] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  // Checkout states
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<string>("")
  const [cashReceived, setCashReceived] = useState<number>(0)
  const [paymentProofUrl, setPaymentProofUrl] = useState<string>("")
  const [isUploadingProof, setIsUploadingProof] = useState(false)
  const [discount, setDiscount] = useState<{
    type: "nominal" | "percentage"
    value: number
    amount: number
  } | null>(null)
  const [isDiscountOpen, setIsDiscountOpen] = useState(false)
  const [discountType, setDiscountType] = useState<"nominal" | "percentage">("percentage")
  const [discountValue, setDiscountValue] = useState<number>(0)

  // Receipt states
  const [isReceiptOpen, setIsReceiptOpen] = useState(false)
  const [currentReceipt, setCurrentReceipt] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchStock()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = stock.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredStock(filtered)
    } else {
      setFilteredStock(stock)
    }
  }, [searchTerm, stock])

  const fetchStock = async () => {
    try {
      setIsLoading(true)
      const data = await stockService.getAll()
      setStock(data)
      setFilteredStock(data)
    } catch (error) {
      console.error("Failed to fetch stock:", error)
      toast({
        title: "Error",
        description: "Failed to load stock items. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const addToCart = (product: Stock) => {
    const existingItem = cart.find((item) => item.productId === product._id)

    if (existingItem) {
      if (existingItem.quantity >= product.quantity) {
        toast({
          title: "Stock tidak cukup",
          description: `Stok ${product.name} hanya tersisa ${product.quantity}`,
          variant: "destructive",
        })
        return
      }
      setCart(cart.map((item) => (item.productId === product._id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      if (product.quantity === 0) {
        toast({
          title: "Stok habis",
          description: `${product.name} sedang tidak tersedia`,
          variant: "destructive",
        })
        return
      }
      setCart([
        ...cart,
        {
          productId: product._id,
          name: product.name,
          price: product.price,
          quantity: 1,
          stock: product.quantity,
          imageUrl: product.imageUrl,
        },
      ])
    }
  }

  const updateCartQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart(cart.filter((item) => item.productId !== productId))
      return
    }

    const item = cart.find((item) => item.productId === productId)
    if (item && newQuantity > item.stock) {
      toast({
        title: "Stock tidak cukup",
        description: `Stok ${item.name} hanya tersisa ${item.stock}`,
        variant: "destructive",
      })
      return
    }

    setCart(cart.map((item) => (item.productId === productId ? { ...item, quantity: newQuantity } : item)))
  }

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.productId !== productId))
  }

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const calculateDiscount = () => {
    if (!discount) return 0
    return discount.amount
  }

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount()
  }

  const calculateChange = () => {
    if (paymentMethod !== "cash") return 0
    return Math.max(0, cashReceived - calculateTotal())
  }

  const applyDiscount = () => {
    if (discountValue <= 0) {
      setDiscount(null)
      setIsDiscountOpen(false)
      return
    }

    const subtotal = calculateSubtotal()
    let discountAmount = 0

    if (discountType === "percentage") {
      if (discountValue > 100) {
        toast({
          title: "Error",
          description: "Diskon persentase tidak boleh lebih dari 100%",
          variant: "destructive",
        })
        return
      }
      discountAmount = (subtotal * discountValue) / 100
    } else {
      if (discountValue > subtotal) {
        toast({
          title: "Error",
          description: "Diskon nominal tidak boleh lebih dari subtotal",
          variant: "destructive",
        })
        return
      }
      discountAmount = discountValue
    }

    setDiscount({
      type: discountType,
      value: discountValue,
      amount: discountAmount,
    })
    setIsDiscountOpen(false)
  }

  const generateReceiptId = () => {
    const now = new Date()
    const year = now.getFullYear().toString().slice(-2)
    const month = (now.getMonth() + 1).toString().padStart(2, "0")
    const day = now.getDate().toString().padStart(2, "0")
    const random = Math.random().toString(36).substr(2, 4).toUpperCase()
    return `INV${year}${month}${day}${random}`
  }

  const resetCheckoutForm = () => {
    setPaymentMethod("")
    setCashReceived(0)
    setPaymentProofUrl("")
    setIsUploadingProof(false)
  }

  const processCheckout = async () => {
    if (!customerName.trim()) {
      toast({
        title: "Error",
        description: "Nama pelanggan harus diisi",
        variant: "destructive",
      })
      return
    }

    if (cart.length === 0) {
      toast({
        title: "Error",
        description: "Keranjang masih kosong",
        variant: "destructive",
      })
      return
    }

    if (!paymentMethod) {
      toast({
        title: "Error",
        description: "Pilih metode pembayaran",
        variant: "destructive",
      })
      return
    }

    // Validation for cash payment
    if (paymentMethod === "cash" && cashReceived < calculateTotal()) {
      toast({
        title: "Error",
        description: "Uang yang diterima kurang dari total tagihan",
        variant: "destructive",
      })
      return
    }

    // Validation for transfer payment
    if (paymentMethod === "transfer" && !paymentProofUrl) {
      toast({
        title: "Error",
        description: "Upload bukti pembayaran terlebih dahulu",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const receiptId = generateReceiptId()

      // Determine payment status based on method
      let paymentStatus = "Paid"
      if (paymentMethod === "debt") {
        paymentStatus = "Debt"
      } else if (paymentMethod === "transfer") {
        paymentStatus = "Pending Verification"
      }

      const orderData = {
        customerName,
        products: cart.map((item) => ({
          productId: item.productId,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        totalPrice: calculateTotal(),
        status: "Not Yet Processed",
        paymentStatus,
        paymentMethod,
        paymentProofUrl: paymentMethod === "transfer" ? paymentProofUrl : undefined,
        discount,
        cashReceived: paymentMethod === "cash" ? cashReceived : undefined,
        change: paymentMethod === "cash" ? calculateChange() : undefined,
        receiptId: paymentMethod === "cash" ? receiptId : undefined,
      }

      const order = await orderService.create(orderData)

      if (paymentMethod === "cash") {
        // Create receipt for cash payment
        const receipt = {
          _id: order._id,
          receiptId,
          orderId: order._id,
          customerName,
          products: cart.map((item) => ({
            productId: item.productId,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
          subtotal: calculateSubtotal(),
          discount,
          total: calculateTotal(),
          paymentMethod,
          cashReceived,
          change: calculateChange(),
          cashier: session?.user?.name || session?.user?.username || "Unknown",
          createdAt: new Date().toISOString(),
        }

        setCurrentReceipt(receipt)
        setIsReceiptOpen(true)
      } else {
        // For non-cash payment, show success message
        const statusMessage =
          paymentMethod === "debt"
            ? "Order telah dibuat dengan status hutang"
            : "Order telah dibuat dan menunggu verifikasi pembayaran"

        toast({
          title: "Transaksi berhasil",
          description: statusMessage,
        })
      }

      setIsCheckoutOpen(false)

      // Reset form
      setCart([])
      setCustomerName("")
      setDiscount(null)
      setDiscountValue(0)
      resetCheckoutForm()
    } catch (error) {
      console.error("Failed to process checkout:", error)
      toast({
        title: "Error",
        description: "Gagal memproses transaksi. Silakan coba lagi.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReceiptGenerated = async (receiptUrl: string) => {
    if (currentReceipt) {
      try {
        // Update order with receipt URL
        await orderService.updateReceiptUrl(currentReceipt.orderId, receiptUrl)
        toast({
          title: "Receipt uploaded",
          description: "Receipt has been saved successfully",
        })
      } catch (error) {
        console.error("Failed to update receipt URL:", error)
      }
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const suggestedCashAmounts = [5000, 10000, 20000, 50000, 100000]

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case "cash":
        return "Tunai"
      case "transfer":
        return "Transfer Bank"
      case "debt":
        return "Hutang"
      default:
        return method
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Kasir</h2>
          <p className="text-muted-foreground">Sistem Point of Sale</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Grid */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Produk</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari produk..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredStock.map((product) => (
                  <Card
                    key={product._id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => addToCart(product)}
                  >
                    <CardContent className="p-4">
                      <div className="aspect-square bg-muted rounded-lg mb-3 overflow-hidden flex items-center justify-center">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <ImageIcon className="h-8 w-8 mb-1" />
                            <span className="text-xs">No Image</span>
                          </div>
                        )}
                      </div>
                      <h3 className="font-medium text-sm mb-1 line-clamp-2">{product.name}</h3>
                      <p className="text-primary font-bold text-sm">{formatPrice(product.price)}</p>
                      <p className="text-xs text-muted-foreground">
                        Stok: {product.quantity} {product.unit}
                      </p>
                      {product.quantity === 0 && (
                        <Badge variant="destructive" className="mt-1 text-xs">
                          Habis
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cart */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Keranjang ({cart.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="customerName">Nama Pelanggan</Label>
                <Input
                  id="customerName"
                  placeholder="Masukkan nama pelanggan"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {cart.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">Keranjang kosong</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.productId} className="flex items-center gap-3 p-3 border rounded">
                      <div className="w-12 h-12 rounded bg-muted overflow-hidden flex items-center justify-center flex-shrink-0">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="h-6 w-6 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{formatPrice(item.price)}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button size="sm" variant="ghost" onClick={() => removeFromCart(item.productId)}>
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))
                )}
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatPrice(calculateSubtotal())}</span>
                </div>
                {discount && (
                  <div className="flex justify-between text-red-600">
                    <span>Diskon ({discount.type === "percentage" ? `${discount.value}%` : "Nominal"}):</span>
                    <span>-{formatPrice(discount.amount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>{formatPrice(calculateTotal())}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsDiscountOpen(true)}
                  disabled={cart.length === 0}
                >
                  <Percent className="mr-2 h-4 w-4" />
                  {discount ? "Ubah Diskon" : "Tambah Diskon"}
                </Button>
                <Button
                  className="w-full"
                  onClick={() => setIsCheckoutOpen(true)}
                  disabled={cart.length === 0 || !customerName.trim()}
                >
                  Checkout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Discount Dialog */}
      <Dialog open={isDiscountOpen} onOpenChange={setIsDiscountOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Diskon Transaksi</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Tabs value={discountType} onValueChange={(value) => setDiscountType(value as any)}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="nominal">Diskon Nominal</TabsTrigger>
                <TabsTrigger value="percentage">Diskon Persen</TabsTrigger>
              </TabsList>
              <TabsContent value="nominal" className="space-y-4">
                <div>
                  <Label>Masukkan jumlah:</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                  />
                </div>
              </TabsContent>
              <TabsContent value="percentage" className="space-y-4">
                <div>
                  <Label>Masukkan jumlah:</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="0"
                      value={discountValue}
                      onChange={(e) => setDiscountValue(Number(e.target.value))}
                    />
                    <span className="absolute right-3 top-2.5 text-muted-foreground">%</span>
                  </div>
                </div>
                <div>
                  <Label>Saran:</Label>
                  <div className="flex gap-2 flex-wrap mt-2">
                    {[5, 10, 30, 50, 100].map((percent) => (
                      <Button key={percent} variant="outline" size="sm" onClick={() => setDiscountValue(percent)}>
                        {percent}%
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDiscountOpen(false)}>
              Batal
            </Button>
            <Button onClick={applyDiscount}>Terapkan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Checkout Dialog */}
      <Dialog
        open={isCheckoutOpen}
        onOpenChange={(open) => {
          setIsCheckoutOpen(open)
          if (!open) {
            resetCheckoutForm()
          }
        }}
      >
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Checkout Pembayaran</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="space-y-2">
              <h4 className="font-medium">Ringkasan Pesanan</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatPrice(calculateSubtotal())}</span>
                </div>
                {discount && (
                  <div className="flex justify-between text-red-600">
                    <span>Diskon:</span>
                    <span>-{formatPrice(discount.amount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>{formatPrice(calculateTotal())}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Payment Method */}
            <div className="space-y-4">
              <Label>Metode Pembayaran</Label>
              <RadioGroup
                value={paymentMethod}
                onValueChange={(value) => {
                  setPaymentMethod(value)
                  if (value !== "cash") {
                    setCashReceived(0)
                  }
                  if (value !== "transfer") {
                    setPaymentProofUrl("")
                  }
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash" className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Tunai
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="transfer" id="transfer" />
                  <Label htmlFor="transfer">Transfer Bank</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="debt" id="debt" />
                  <Label htmlFor="debt">Hutang</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Cash Payment Details */}
            {paymentMethod === "cash" && (
              <div className="space-y-3">
                <div>
                  <Label>Uang yang diterima:</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={cashReceived}
                    onChange={(e) => setCashReceived(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Saran:</Label>
                  <div className="flex gap-2 flex-wrap mt-2">
                    <Button variant="outline" size="sm" onClick={() => setCashReceived(calculateTotal())}>
                      Uang Pas
                    </Button>
                    {suggestedCashAmounts
                      .filter((amount) => amount >= calculateTotal())
                      .slice(0, 4)
                      .map((amount) => (
                        <Button key={amount} variant="outline" size="sm" onClick={() => setCashReceived(amount)}>
                          {formatPrice(amount)}
                        </Button>
                      ))}
                  </div>
                </div>
                {cashReceived > 0 && (
                  <div className="p-3 bg-muted rounded">
                    <div className="flex justify-between">
                      <span>Total:</span>
                      <span>{formatPrice(calculateTotal())}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Diterima:</span>
                      <span>{formatPrice(cashReceived)}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Kembalian:</span>
                      <span>{formatPrice(calculateChange())}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Payment Proof Upload for Transfer */}
            {paymentMethod === "transfer" && (
              <div className="space-y-3">
                <PaymentProofUpload
                  onUploadComplete={(imageUrl) => {
                    console.log("Upload completed, URL:", imageUrl)
                    setPaymentProofUrl(imageUrl)
                    setIsUploadingProof(false)
                  }}
                  onUploadStart={() => setIsUploadingProof(true)}
                  onUploadError={() => {
                    setIsUploadingProof(false)
                    setPaymentProofUrl("")
                  }}
                  disabled={isSubmitting}
                />
                <div className="text-sm text-muted-foreground">
                  <p>Upload bukti pembayaran untuk metode Transfer Bank</p>
                  <p>Transaksi akan menunggu verifikasi setelah upload bukti pembayaran</p>
                </div>
              </div>
            )}

            {/* Debt Payment Info */}
            {paymentMethod === "debt" && (
              <div className="p-3 bg-orange-50 border border-orange-200 rounded">
                <p className="text-sm text-orange-800">
                  <strong>Pembayaran Hutang:</strong> Order akan dibuat dengan status hutang. Pembayaran dapat dilakukan
                  kemudian.
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCheckoutOpen(false)} disabled={isSubmitting}>
              Batal
            </Button>
            <Button
              onClick={processCheckout}
              disabled={
                isSubmitting ||
                isUploadingProof ||
                !paymentMethod ||
                (paymentMethod === "cash" && cashReceived < calculateTotal()) ||
                (paymentMethod === "transfer" && !paymentProofUrl)
              }
            >
              {isSubmitting
                ? "Memproses..."
                : paymentMethod === "cash"
                  ? "Bayar"
                  : paymentMethod === "debt"
                    ? "Buat Hutang"
                    : "Konfirmasi Pembayaran"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Receipt Dialog - Only for Cash Payment */}
      <Dialog open={isReceiptOpen} onOpenChange={setIsReceiptOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Transaksi Sukses</DialogTitle>
          </DialogHeader>
          {currentReceipt && (
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <h3 className="font-bold text-lg">SavoryBananas</h3>
                <p className="text-xs text-muted-foreground">
                  Jl. Way Besay No.34a, RT.4/RW.1, Tj. Duren Sel.,
                  <br />
                  Kec. Grogol petamburan, Kota Jakarta Barat,
                  <br />
                  Daerah Khusus Ibukota Jakarta 11470, Indonesia
                </p>
                <p className="text-sm">{new Date(currentReceipt.createdAt).toLocaleString("id-ID")}</p>
              </div>

              <Separator />

              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>ID Trans.</span>
                  <span className="font-mono">{currentReceipt.receiptId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Kasir</span>
                  <span>{currentReceipt.cashier}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                {currentReceipt.products.map((product: any, index: number) => (
                  <div key={index} className="space-y-1">
                    <div className="font-medium text-sm">{product.name}</div>
                    <div className="flex justify-between text-sm">
                      <span>
                        {product.quantity} x {formatPrice(product.price)}
                      </span>
                      <span>{formatPrice(product.price * product.quantity)}</span>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>
                    Total QTY : {currentReceipt.products.reduce((sum: number, p: any) => sum + p.quantity, 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(currentReceipt.subtotal)}</span>
                </div>
                {currentReceipt.discount && (
                  <div className="flex justify-between text-red-600">
                    <span>Total Diskon</span>
                    <span>({formatPrice(currentReceipt.discount.amount)})</span>
                  </div>
                )}
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{formatPrice(currentReceipt.total)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Uang Diterima</span>
                  <span>{formatPrice(currentReceipt.cashReceived)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Kembalian</span>
                  <span>{formatPrice(currentReceipt.change)}</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="flex-col space-y-2">
            <ReceiptGenerator receipt={currentReceipt} onReceiptGenerated={handleReceiptGenerated} />
            <div className="flex gap-2 w-full">
              <Button
                variant="outline"
                onClick={() => {
                  setIsReceiptOpen(false);
                  router.push("/orders");  // navigasi ke halaman order
                }}
                className="flex-1"
              >
                Tutup
              </Button>
              <Button
                onClick={() => {
                  setIsReceiptOpen(false)
                  setCurrentReceipt(null)
                }}
                className="flex-1"
              >
                Transaksi Baru
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
