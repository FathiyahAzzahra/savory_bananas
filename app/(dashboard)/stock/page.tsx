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
import { Plus, MoreHorizontal, Search, AlertTriangle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { stockService } from "@/lib/api-services"
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

  // Form state for new stock
  const [newStock, setNewStock] = useState({
    name: "",
    quantity: 0,
    unit: "",
    price: 0,
  })

  // Form state for updating stock quantity
  const [updateQuantity, setUpdateQuantity] = useState(0)

  useEffect(() => {
    // Fetch stock
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

    fetchStock()
  }, [toast])

  useEffect(() => {
    // Filter stock based on search term
    if (searchTerm) {
      const filtered = stock.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredStock(filtered)
    } else {
      setFilteredStock(stock)
    }
  }, [searchTerm, stock])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleAddStock = async () => {
    try {
      const response = await stockService.create(newStock)

      // Update local state
      setStock([...stock, response])
      setIsAddDialogOpen(false)
      setNewStock({
        name: "",
        quantity: 0,
        unit: "",
        price: 0,
      })

      toast({
        title: "Stock added",
        description: `${newStock.name} has been added to stock.`,
      })
    } catch (error) {
      console.error("Failed to add stock:", error)
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

      // Update local state
      const updatedStock = stock.map((item) => {
        if (item._id === selectedStock._id) {
          return {
            ...item,
            quantity: updateQuantity,
          }
        }
        return item
      })

      setStock(updatedStock)
      setIsUpdateDialogOpen(false)
      setSelectedStock(null)
      setUpdateQuantity(0)

      toast({
        title: "Stock updated",
        description: `${selectedStock.name} quantity has been updated.`,
      })
    } catch (error) {
      console.error("Failed to update stock:", error)
      toast({
        title: "Error",
        description: "Failed to update stock quantity. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteStock = async (stockId: string) => {
    if (!confirm("Are you sure you want to delete this stock item?")) {
      return
    }

    try {
      await stockService.delete(stockId)

      // Update local state
      const updatedStock = stock.filter((item) => item._id !== stockId)
      setStock(updatedStock)

      toast({
        title: "Stock deleted",
        description: "Stock item has been deleted",
      })
    } catch (error) {
      console.error("Failed to delete stock:", error)
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
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Stock
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Stock</DialogTitle>
                <DialogDescription>Enter the details for the new stock item.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Item Name</Label>
                  <Input
                    id="name"
                    value={newStock.name}
                    onChange={(e) => setNewStock({ ...newStock, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={newStock.quantity}
                      onChange={(e) => setNewStock({ ...newStock, quantity: Number(e.target.value) })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Input
                      id="unit"
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
                    value={newStock.price}
                    onChange={(e) => setNewStock({ ...newStock, price: Number(e.target.value) })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddStock}>Add Stock</Button>
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
                  <TableHead>Item Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Price (per unit)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      Loading stock items...
                    </TableCell>
                  </TableRow>
                ) : filteredStock.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      No stock items found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStock.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell>{formatPrice(item.price)}</TableCell>
                      <TableCell>
                        {item.quantity < 10 ? (
                          <div className="flex items-center text-amber-600">
                            <AlertTriangle className="mr-1 h-4 w-4" />
                            Low Stock
                          </div>
                        ) : (
                          <div className="text-green-600">In Stock</div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => openUpdateDialog(item)}>Update Quantity</DropdownMenuItem>
                            {isAdmin && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteStock(item._id)}>
                                  Delete Item
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Update Stock Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Stock Quantity</DialogTitle>
            <DialogDescription>Update the quantity for {selectedStock?.name}.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={updateQuantity}
                onChange={(e) => setUpdateQuantity(Number(e.target.value))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpdateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateStock}>Update Stock</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
