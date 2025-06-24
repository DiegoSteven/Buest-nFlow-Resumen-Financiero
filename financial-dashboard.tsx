"use client"

import { useState } from "react"
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Bell,
  Calendar,
  ChevronDown,
  DollarSign,
  Filter,
  Menu,
  PieChart,
  TrendingDown,
  TrendingUp,
  Wallet,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Datos simulados
const metricsData = {
  totalIncome: 125000,
  totalExpenses: 87500,
  netProfit: 37500,
  cashFlow: 15000,
}

const alertsData = [
  {
    id: 1,
    type: "debt",
    title: "Deuda próxima a vencer",
    description: "Pago a proveedor ABC - Vence en 3 días",
    amount: 15000,
    severity: "high",
  },
  {
    id: 2,
    type: "overdue",
    title: "Factura vencida",
    description: "Cliente XYZ - Vencida hace 5 días",
    amount: 8500,
    severity: "critical",
  },
  {
    id: 3,
    type: "expense",
    title: "Gasto inesperado",
    description: "Mantenimiento de equipos",
    amount: 3200,
    severity: "medium",
  },
]

const productData = [
  { name: "Producto A", profit: 25000, margin: 35 },
  { name: "Producto B", profit: 18000, margin: 28 },
  { name: "Producto C", profit: 12000, margin: 22 },
  { name: "Producto D", profit: 8000, margin: 15 },
  { name: "Producto E", profit: -2000, margin: -5 },
]

const recentMovements = [
  {
    id: 1,
    type: "income",
    description: "Venta Cliente ABC",
    amount: 5500,
    date: "2024-01-15",
    category: "Ventas",
  },
  {
    id: 2,
    type: "expense",
    description: "Compra Materia Prima",
    amount: -3200,
    date: "2024-01-14",
    category: "Compras",
  },
  {
    id: 3,
    type: "income",
    description: "Venta Cliente XYZ",
    amount: 7800,
    date: "2024-01-14",
    category: "Ventas",
  },
  {
    id: 4,
    type: "expense",
    description: "Pago Servicios",
    amount: -1200,
    date: "2024-01-13",
    category: "Servicios",
  },
  {
    id: 5,
    type: "expense",
    description: "Nómina Empleados",
    amount: -25000,
    date: "2024-01-12",
    category: "Nómina",
  },
]

export default function FinancialDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("all")

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(amount)
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "critical":
        return "border-l-black bg-gray-100"
      case "high":
        return "border-l-gray-800 bg-gray-50"
      case "medium":
        return "border-l-gray-600 bg-gray-50"
      default:
        return "border-l-gray-400 bg-gray-50"
    }
  }

  const filteredMovements = recentMovements.filter((movement) => {
    if (selectedFilter === "all") return true
    return movement.type === selectedFilter
  })

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-black border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-gray-800"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-white">BuestánFlow</h1>
              <p className="text-sm text-gray-300">Resumen Financiero</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="text-sm border-gray-600 text-gray-300 hover:bg-gray-800">
              <Calendar className="h-4 w-4 mr-2" />
              Enero 2024
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Métricas Principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-white border border-gray-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Ingresos Totales</CardTitle>
                <TrendingUp className="h-4 w-4 text-gray-700" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-semibold text-black">{formatCurrency(metricsData.totalIncome)}</div>
                <p className="text-xs text-gray-700 flex items-center mt-1">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  +12.5%
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Egresos Totales</CardTitle>
                <TrendingDown className="h-4 w-4 text-gray-700" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-semibold text-black">{formatCurrency(metricsData.totalExpenses)}</div>
                <p className="text-xs text-gray-700 flex items-center mt-1">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  +8.2%
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Ganancias Netas</CardTitle>
                <DollarSign className="h-4 w-4 text-gray-700" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-semibold text-black">{formatCurrency(metricsData.netProfit)}</div>
                <p className="text-xs text-gray-700 flex items-center mt-1">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  +18.7%
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Flujo de Caja</CardTitle>
                <Wallet className="h-4 w-4 text-gray-700" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-semibold text-black">{formatCurrency(metricsData.cashFlow)}</div>
                <p className="text-xs text-gray-500 mt-1">Disponible</p>
              </CardContent>
            </Card>
          </div>

          {/* Alertas Destacadas */}
          <Card className="bg-white border border-gray-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-black">
                <AlertTriangle className="h-5 w-5 text-gray-700" />
                Alertas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {alertsData.map((alert) => (
                <div key={alert.id} className={`p-4 border-l-4 ${getSeverityColor(alert.severity)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-black">{alert.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-black">{formatCurrency(alert.amount)}</p>
                      <Badge variant="outline" className="mt-1 text-xs border-gray-400">
                        {alert.type === "debt" ? "Deuda" : alert.type === "overdue" ? "Vencida" : "Gasto"}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Gráfico de Productos */}
          <Card className="bg-white border border-gray-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-black">
                <PieChart className="h-5 w-5 text-gray-700" />
                Rentabilidad por Producto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {productData.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-black">{product.name}</h4>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-gray-600">Margen: {product.margin}%</span>
                        <div className="flex-1 bg-gray-300 rounded-full h-2 max-w-24">
                          <div
                            className={`h-2 rounded-full ${product.margin > 0 ? "bg-gray-700" : "bg-black"}`}
                            style={{ width: `${Math.abs(product.margin) * 2}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-2">
                      <p className={`font-semibold ${product.profit > 0 ? "text-gray-700" : "text-black"}`}>
                        {formatCurrency(product.profit)}
                      </p>
                      {product.profit > 0 ? (
                        <TrendingUp className="h-4 w-4 text-gray-700" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-black" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>

        {/* Panel Lateral */}
        <aside
          className={`
            ${sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
            fixed lg:static inset-y-0 right-0 z-50 w-80 bg-gray-50 border-l border-gray-400
            transform transition-transform duration-300 ease-in-out lg:transform-none
          `}
        >
          <div className="p-4 border-b border-gray-400 bg-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-black">Movimientos Recientes</h3>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-gray-300"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="text-sm border-gray-500 hover:bg-gray-300">
                    <Filter className="h-4 w-4 mr-2" />
                    {selectedFilter === "all" ? "Todos" : selectedFilter === "income" ? "Ingresos" : "Egresos"}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSelectedFilter("all")}>Todos</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedFilter("income")}>Ingresos</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedFilter("expense")}>Egresos</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="p-4 space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
            {filteredMovements.map((movement) => (
              <div key={movement.id} className="p-3 bg-white border border-gray-300 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {movement.type === "income" ? (
                        <ArrowUp className="h-4 w-4 text-gray-700" />
                      ) : (
                        <ArrowDown className="h-4 w-4 text-black" />
                      )}
                      <h4 className="font-medium text-sm text-black">{movement.description}</h4>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs border-gray-400">
                        {movement.category}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {new Date(movement.date).toLocaleDateString("es-ES")}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold text-sm ${movement.type === "income" ? "text-gray-700" : "text-black"}`}
                    >
                      {formatCurrency(Math.abs(movement.amount))}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* Overlay para móvil */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
