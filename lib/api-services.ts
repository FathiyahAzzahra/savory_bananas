// Base API URL - menggunakan relative URL untuk Next.js API routes
const API_BASE_URL = "/api"

// Generic fetch function with error handling
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("API request failed:", error)
    throw error
  }
}

// User API services
export const userService = {
  getAll: async () => {
    return fetchAPI<any[]>("/users")
  },
  getById: async (id: string) => {
    return fetchAPI<any>(`/users/${id}`)
  },
  delete: async (id: string) => {
    const res = await fetch(`/api/users/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete user")
  },
  update: async (id: string, userData: {
    name: string
    username: string
    role: string
  }) => {
    return fetchAPI<any>(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    })
  },
  create: async (userData: {
    name: string
    username: string
    password: string
    role: string
  }) => {
    return fetchAPI<any>("/users", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  },
}


// Order API services
export const orderService = {
  getAll: async () => {
    return fetchAPI<any[]>("/orders")
  },
  getById: async (id: string) => {
    return fetchAPI<any>(`/orders/${id}`)
  },
  getMonthlyOrders: async (year: string, month: string) => {
    return fetchAPI<any[]>(`/orders/monthly?year=${year}&month=${month}`)
  },
  create: async (orderData: any) => {
    return fetchAPI<any>("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    })
  },
  update: async (id: string, orderData: any) => {
    return fetchAPI<any>(`/orders/${id}`, {
      method: "PUT",
      body: JSON.stringify(orderData),
    })
  },
  delete: async (id: string) => {
    return fetchAPI<any>(`/orders/${id}`, {
      method: "DELETE",
    })
  },
  updateStatus: async (id: string, status: string) => {
    return fetchAPI<any>(`/orders/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    })
  },
  updatePaymentStatus: async (id: string, paymentStatus: string) => {
    return fetchAPI<any>(`/orders/${id}/payment-status`, {
      method: "PATCH",
      body: JSON.stringify({ paymentStatus }),
    })
  },
  updateReceiptUrl: async (id: string, receiptUrl: string) => {
    console.log("Updating receipt URL for order:", id, receiptUrl)
    return fetchAPI<any>(`/orders/${id}/receipt`, {
      method: "PATCH",
      body: JSON.stringify({ receiptUrl }),
    })
  },
}

// Stock API services
export const stockService = {
  getAll: async () => {
    return fetchAPI<any[]>("/stocks")
  },
  getById: async (id: string) => {
    return fetchAPI<any>(`/stocks/${id}`)
  },
  create: async (stockData: any) => {
    return fetchAPI<any>("/stocks", {
      method: "POST",
      body: JSON.stringify(stockData),
    })
  },
  update: async (id: string, stockData: any) => {
    return fetchAPI<any>(`/stocks/${id}`, {
      method: "PUT",
      body: JSON.stringify(stockData),
    })
  },
  updateQuantity: async (id: string, quantity: number) => {
    return fetchAPI<any>(`/stocks/${id}/quantity`, {
      method: "PATCH",
      body: JSON.stringify({ quantity }),
    })
  },
  delete: async (id: string) => {
    return fetchAPI<any>(`/stocks/${id}`, {
      method: "DELETE",
    })
  },
}

// Reports API services
export const reportService = {
  getMonthlySales: async (year: string) => {
    return fetchAPI<any[]>(`/reports/monthly?year=${year}`)
  },
}
