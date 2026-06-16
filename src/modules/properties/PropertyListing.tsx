"use client"

import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  MoreVertical,
  Plus,
  ShoppingBag,
  Wallet,
  Users,
  Box,
  ArrowUpRight,
  ArrowDownRight,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
  Search,
} from "lucide-react"

// Define a proper interface for the product
interface Property {
  id: number
  name: string
  listingType: string
  price: string
  agent: string
  address: string
}

const properties = [
  {
    id: 1,
    name: "Palm Residency Tower A - 1204",
    listingType: "For Sale",
    price: "₹1.75 Cr",
    agent: "Aarav Sharma",
    address: "Groov Street Avenue Sector 150, Noida",
  },
  {
    id: 2,
    name: "Skyline Heights Villa 08",
    listingType: "For Sale",
    price: "₹3.20 Cr",
    agent: "Priya Verma",
    address: "Gurugram, Haryana",
  },
  {
    id: 3,
    name: "Urban Nest Apartment B-907",
    listingType: "For Rent",
    price: "₹42,000 / Month",
    agent: "Rohit Mehra",
    address: "Noida Extension",
  },
  {
    id: 4,
    name: "Green Valley Residency C-602",
    listingType: "For Sale",
    price: "₹98 Lakh",
    agent: "Neha Kapoor",
    address: "Greater Noida West",
  },
  {
    id: 5,
    name: "2Morrow Greens Villa 12",
    listingType: "For Sale",
    price: "₹2.85 Cr",
    agent: "Vikram Singh",
    address: "Yamuna Expressway",
  },
  {
    id: 6,
    name: "Elite Business Hub Office 304",
    listingType: "Commercial",
    price: "₹65,000 / Month",
    agent: "Aditya Jain",
    address: "Sector 62, Noida",
  },
]


const statusVariant = (status: string) => {
  switch (status) {
    case "Published":
      return "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400 border-green-500/30"
    case "Draft":
      return "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400 border-yellow-500/30"
    case "Inactive":
      return "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400 border-red-500/30"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export default function PropertyListing() {
const iconGradients = [
  "bg-gradient-to-tr from-[#ee0979] to-[#ff6a00]", // pink-orange
  "bg-gradient-to-tr from-[#00c6fb] to-[#005bea]", // blue
  "bg-gradient-to-tr from-[#17ad37] to-[#98ec2d]", // green
  "bg-gradient-to-tr from-[#7928ca] to-[#ff0080]", // purple-pink
]


   const [search, setSearch] = useState("")
   const [pageState, setPageState] = useState(1)
   const [selected, setSelected] = useState<number[]>([])
   const [propertiesData, setPropertiesData] = useState<Property[]>(properties)

   const PAGE_SIZE = 5

    // 🔍 Search filter
  const filteredProperties = useMemo(() => {
    return propertiesData.filter((property) =>
      `${property.name} ${property.address} ${property.agent}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  }, [search, propertiesData])

  // Calculation for safe pagination without useEffect
  const totalPages = Math.max(1, Math.ceil(filteredProperties.length / PAGE_SIZE))
  const currentPage = Math.min(pageState, totalPages)

  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * PAGE_SIZE, 
    currentPage * PAGE_SIZE
  )

  // ☑️ Checkbox logic
  const toggleAll = (checked: boolean) => {
    setSelected(checked ? paginatedProperties.map(p => p.id) : [])
  }
  
  const toggleOne = (id: number) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  // 📤 Export to CSV
  const exportToCSV = (rows: Property[]) => {
    const headers = ["Name", "Transaction Type", "Price", "Agent", "Address"]

    const csvContent = [
      headers.join(","),
      ...rows.map(row =>
        [
          row.name,
          row.listingType,
          row.price,
          row.agent,
          row.address,
        ].join(",")
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = "properties.csv"
    link.click()

    URL.revokeObjectURL(url)
  }

    
  return (
    <div className="space-y-6">
<div>
    <h1 className="text-3xl font-bold">Properties</h1>
    <p className="text-lg">Manage and monitor all property listings.</p>
</div>
      {/* KPI CARDS */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
  <StatCard
  title="Total Properties"
  value="1,248"
  icon={<Box />}
  gradient="text-[#999999]"
/>

<StatCard
  title="For Sale"
  value="685"
  icon={<ShoppingBag />}
  gradient="text-[#2A6BDB]"
/>

<StatCard
  title="For Rent"
  value="342"
  icon={<Users />}
  gradient="text-[#02B51C]"
/>

<StatCard
  title="Sold Properties"
  value="221"
  icon={<Wallet />}
  gradient="text-[#C60CF7]"
/>
</div>

      {/* PRODUCT LIST */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-b py-4 flex-wrap gap-3">
          <div className="flex gap-3 flex-wrap">
          {/* <Input type="date" className="w-[160px]" /> */}

              <Select>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                 <SelectItem value="available">Available</SelectItem>
<SelectItem value="reserved">Reserved</SelectItem>
<SelectItem value="sold">Sold</SelectItem>
<SelectItem value="occupied">Occupied</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                 <SelectItem value="apartment">Apartment</SelectItem>
<SelectItem value="villa">Villa</SelectItem>
<SelectItem value="penthouse">Penthouse</SelectItem>
<SelectItem value="commercial">Commercial</SelectItem>
<SelectItem value="plot">Plot</SelectItem>
                </SelectContent>
              </Select>
            
          {/* Search */}
          <div className="relative mb-0 max-w-lg w-[280px] rounded-2xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
             placeholder=" Search property, project, location or agent..."
              className="pl-9"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPageState(1) 
              }}
            />
          </div>
          </div>
          <div className="">
             
            <Link to="/properties/add-property">
              <Button className="rounded-3xl text-base px-5 py-5" size="sm">
                <Plus className="mr-1 h-5 w-5" />
                Add Property
              </Button>
            </Link>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 p-6">
          {/* {selected.length > 0 && (
            <div className="mb-4 flex items-center justify-between rounded-lg border bg-muted/40 px-4 py-2">
              <p className="text-sm text-muted-foreground">
                {selected.length} selected
              </p>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const selectedRows = propertiesData.filter(p =>
                      selected.includes(p.id)
                    )
                    exportToCSV(selectedRows)
                  }}
                >
                  Export
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    setPropertiesData(prev =>
                      prev.filter(property => !selected.includes(property.id))
                    )
                    setSelected([])
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          )} */}

          {/* FILTERS */}
          {/* <div className="flex flex-wrap gap-3 justify-between items-center">
            

          </div> */}

          {/* TABLE */}
          <div className="relative w-full overflow-x-auto">
            <Table className="min-w-[900px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Property Details</TableHead>
                  <TableHead>Transaction Type</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Agent</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedProperties.map((property) => (
                  <TableRow key={property.id}>

                    <TableCell>{property.name}</TableCell>

<TableCell>{property.listingType}</TableCell>

<TableCell>{property.price}</TableCell>

<TableCell>{property.agent}</TableCell>

<TableCell>{property.address}</TableCell>

                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full border-gray-300 dark:border-gray-700"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              console.log("View property", property.id)
                            }}
                          >
                            <UserIcon className="mr-2 h-4 w-4" />
                            View Property
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() => {
                              console.log("Edit property", property.id)
                            }}
                          >
                            <SettingsIcon className="mr-2 h-4 w-4" />
                       Edit Property
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            className="text-red-600 focus:text-red-600"
                            onClick={() => {
                              setPropertiesData(prev =>
                                prev.filter(p => p.id !== property.id)
                              )
                              setSelected(prev =>
                                prev.filter(id => id !== property.id)
                              )
                            }}
                          >
                            <LogOutIcon className="mr-2 h-4 w-4" />
                            Delete Property
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* Pagination controls */}
          <div className="flex items-center justify-between px-2 py-2">
            <div className="text-sm text-muted-foreground">
              {filteredProperties.length === 0
                ? "Showing 0 of 0"
                : `Showing ${ (currentPage - 1) * PAGE_SIZE + 1 } - ${ Math.min(currentPage * PAGE_SIZE, filteredProperties.length) } of ${ filteredProperties.length }`}
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={() => setPageState((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Prev
              </Button>

              <span className="text-sm">Page {currentPage} of {totalPages}</span>

              <Button
                onClick={() => setPageState((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

/* KPI CARD */
function StatCard({
  title,
  value,
  icon,
  gradient,
}: {
  title: string
  value: string
  icon: React.ReactNode
  gradient: string
}) {
  return (
    <Card>
      <CardContent className="flex justify-between items-center p-6">
        <div>
          <p className="text-md text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-medium">{value}</h3>

        </div>

        {/* ✅ Gradient Icon */}
        <div className={` text-3xl text-white ${gradient}`}>
          {icon}
        </div>
      </CardContent>
    </Card>
  )
}