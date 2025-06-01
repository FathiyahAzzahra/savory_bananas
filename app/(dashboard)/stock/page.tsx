"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Plus, MoreHorizontal, Search, ImageIcon, AlertTriangle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { stockService } from "@/lib/api-services"
import { ProductImageUpload } from "@/components/product-image-upload"
import type { Stock } from "@/lib/types"
import { useSession } from "next-auth/react"

export default function StockPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { data: session } = useSession()
  const [stock, setStock] = useState<Stock[]>([])
  const [filteredStock, setFilteredStock] = useState<Stock[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0) // ✅ Added this line

  const [newStock, setNewStock] = useState({
    name: "",
    quantity: 0,
    unit: "",
    price: 0,
    imageUrl: "",
  })

  const [updateQuantity, setUpdateQuantity] = useState(0)

  useEffect(() => {
    const fetchStock = async () => {
      try {
        setIsLoading(true)
        const data = await stockService.getAll()
        setStock(data)
        setFilteredStock(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load stock items. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchStock()
  }, [toast])

  useEffect(() => {
    if (searchTerm) {
      const filtered = stock.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredStock(filtered)
    } else {
      setFilteredStock(stock)
    }
  }, [searchTerm, stock])

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)

  const resetNewStockForm = () => {
    setNewStock({
      name: "",
      quantity: 0,
      unit: "",
      price: 0,
      imageUrl: "",
    })
    setUploadProgress(0)
  }

  const handleAddStock = async () => {
    try {
      const response = await stockService.create(newStock)
      setStock([...stock, response])
      setIsAddDialogOpen(false)
      resetNewStockForm()
      toast({
        title: "Stock added",
        description: `${newStock.name} has been added to stock.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add stock item. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleUpdateStock = async () => {
    if (!selectedStock) return

    try {
      await stockService.updateQuantity(selectedStock._id, updateQuantity)
      const updatedStock = stock.map((item) =>
        item._id === selectedStock._id
          ? { ...item, quantity: updateQuantity }
          : item
      )
      setStock(updatedStock)
      setIsUpdateDialogOpen(false)
      setSelectedStock(null)
      setUpdateQuantity(0)
      toast({
        title: "Stock updated",
        description: `${selectedStock.name} quantity has been updated.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update stock quantity. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteStock = async (stockId: string) => {
    if (!confirm("Are you sure you want to delete this stock item?")) return
    try {
      await stockService.delete(stockId)
      setStock(stock.filter((item) => item._id !== stockId))
      toast({
        title: "Stock deleted",
        description: "Stock item has been deleted",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete stock item. Please try again.",
        variant: "destructive",
      })
    }
  }

  const openUpdateDialog = (item: Stock) => {
    setSelectedStock(item)
    setUpdateQuantity(item.quantity)
    setIsUpdateDialogOpen(true)
  }

  const isAdmin = session?.user?.role === "admin"

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Stock Management</h2>
          <p className="text-muted-foreground">Manage and track inventory levels</p>
        </div>
        {isAdmin && (
          <Dialog
            open={isAddDialogOpen}
            onOpenChange={(open) => {
              setIsAddDialogOpen(open)
              if (!open) resetNewStockForm()
            }}
          >
            <DialogTrigger asChild>
              <Button><Plus className="mr-2 h-4 w-4" /> Add Stock</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Stock</DialogTitle>
                <DialogDescription>Enter the details for the new stock item.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Item Name</Label>
                  <Input
                    id="name"
                    placeholder="Masukkan nama produk"
                    value={newStock.name}
                    onChange={(e) => setNewStock({ ...newStock, name: e.target.value })}
                  />
                </div>

                <ProductImageUpload
                  onUploadComplete={(imageUrl: string) => {
                    setNewStock({ ...newStock, imageUrl })
                    setIsUploadingImage(false)
                    setUploadProgress(100) // You can customize this if using actual progress
                  }}
                  onUploadStart={() => {
                    setIsUploadingImage(true)
                    setUploadProgress(0)
                  }}
                  onUploadError={() => {
                    setIsUploadingImage(false)
                    setUploadProgress(0)
                  }}
                  currentImageUrl={newStock.imageUrl}
                  onRemoveImage={() => setNewStock({ ...newStock, imageUrl: "" })}
                  disabled={isUploadingImage}
                />

                {isUploadingImage && (
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="0"
                      value={newStock.quantity}
                      onChange={(e) => setNewStock({ ...newStock, quantity: Number(e.target.value) })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Input
                      id="unit"
                      placeholder="pcs, kg, liter, dll"
                      value={newStock.unit}
                      onChange={(e) => setNewStock({ ...newStock, unit: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Price (per unit)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0"
                    value={newStock.price}
                    onChange={(e) => setNewStock({ ...newStock, price: Number(e.target.value) })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button
                  onClick={handleAddStock}
                  disabled={
                    isUploadingImage ||
                    !newStock.name.trim() ||
                    newStock.quantity < 0 ||
                    !newStock.unit.trim() ||
                    newStock.price < 0
                  }
                >
                  Add Stock
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search stock items..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Price (per unit)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStock.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name} className="h-12 w-12 object-cover rounded-md" />
                      ) : (
                        <div className="flex items-center justify-center h-12 w-12 bg-muted rounded-md">
                          <ImageIcon className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell>{formatPrice(item.price)}</TableCell>
                    <TableCell>
                      {item.quantity === 0 ? (
                        <span className="text-red-600 flex items-center gap-1">
                          <AlertTriangle className="h-4 w-4" /> Out of stock
                        </span>
                      ) : (
                        <span className="text-green-600">Available</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => openUpdateDialog(item)}>Edit Quantity</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleDeleteStock(item._id)} className="text-red-600">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Dialog for updating quantity */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Stock Quantity</DialogTitle>
            <DialogDescription>
              Update quantity for <strong>{selectedStock?.name}</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label htmlFor="update-quantity">Quantity</Label>
            <Input
              id="update-quantity"
              type="number"
              value={updateQuantity}
              onChange={(e) => setUpdateQuantity(Number(e.target.value))}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpdateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateStock}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div >
  )

}
