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
interface Request {
  id: number
  contact: string
  transactionCategory: string
  city: string
  budget: string
  agent: string
  status: "Pending" | "In Progress" | "Completed" | "Cancelled"
}

const requests: Request[] = [
  {
    id: 1,
    contact: "Rahul Sharma",
    transactionCategory: "Buy",
    city: "Noida",
    budget: "₹85 Lakh",
    agent: "Aarav Sharma",
    status: "Pending",
  },
  {
    id: 2,
    contact: "Priya Verma",
    transactionCategory: "Rent",
    city: "Delhi",
    budget: "₹35,000 / Month",
    agent: "Neha Kapoor",
    status: "Completed",
  },
  {
    id: 3,
    contact: "Amit Singh",
    transactionCategory: "Sell",
    city: "Gurugram",
    budget: "₹1.4 Cr",
    agent: "Rohit Mehra",
    status: "In Progress",
  },
  {
    id: 4,
    contact: "Sneha Gupta",
    transactionCategory: "Buy",
    city: "Greater Noida",
    budget: "₹65 Lakh",
    agent: "Vikram Singh",
    status: "Cancelled",
  },
  {
    id: 5,
    contact: "Mohit Jain",
    transactionCategory: "Rent",
    city: "Noida Extension",
    budget: "₹25,000 / Month",
    agent: "Aditya Jain",
    status: "Pending",
  },
]


const statusVariant = (status: string) => {
  switch (status) {
    case "Completed":
      return "w-[100px] flex justify-center py-3 rounded-lg bg-green-100 text-green-700 border-green-300"

    case "Pending":
      return "w-[100px] flex justify-center py-3 rounded-lg bg-yellow-100 text-yellow-700 border-yellow-300"

    case "In Progress":
      return "w-[100px] flex justify-center py-3 rounded-lg bg-blue-100 text-blue-700 border-blue-300"

    case "Cancelled":
      return "w-[100px] flex justify-center py-3 rounded-lg bg-red-100 text-red-700 border-red-300"

    default:
      return ""
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
  const [requestsData, setRequestsData] = useState<Request[]>(requests)

  const PAGE_SIZE = 5

  // 🔍 Search filter
  const filteredRequests = useMemo(() => {
    return requestsData.filter((request) =>
      `${request.contact}
     ${request.city}
     ${request.agent}
     ${request.transactionCategory}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  }, [search, requestsData])

  // Calculation for safe pagination without useEffect
  const totalPages = Math.max(1, Math.ceil(filteredRequests.length / PAGE_SIZE))
  const currentPage = Math.min(pageState, totalPages)

  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  // ☑️ Checkbox logic
  const toggleAll = (checked: boolean) => {
    setSelected(checked ? paginatedRequests.map(p => p.id) : [])
  }

  const toggleOne = (id: number) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }



  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Requests</h1>
        <p className="text-lg">Manage and monitor all requests listings.</p>
      </div>


      {/* PRODUCT LIST */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-b py-4 flex-wrap gap-3">
          <div className="flex gap-3 flex-wrap">
            {/* <Input type="date" className="w-[160px]" /> */}

            <Select>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Transaction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buy">Buy</SelectItem>
                <SelectItem value="sell">Sell</SelectItem>
                <SelectItem value="rent">Rent</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            {/* Search */}
            <div className="relative mb-0 max-w-lg w-[280px] rounded-2xl">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder=" Search contact, city or agent..."
                className="pl-9"
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearch(e.target.value)
                  setPageState(1)
                }}
              />
            </div>
          </div>
          <div className="">

            <Link to="#">
              <Button className="rounded-3xl text-base px-5 py-5" size="sm">
                <Plus className="mr-1 h-5 w-5" />
                Add Request
              </Button>
            </Link>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 p-6">


          {/* TABLE */}
          <div className="relative w-full overflow-x-auto">
            <Table className="min-w-[900px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Contact</TableHead>
                  <TableHead>Transaction Category</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Agent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">
                      {request.contact}
                    </TableCell>

                    <TableCell>
                      {request.transactionCategory}
                    </TableCell>

                    <TableCell>
                      {request.city}
                    </TableCell>

                    <TableCell>
                      {request.budget}
                    </TableCell>

                    <TableCell>
                      {request.agent}
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="outline"
                        className={statusVariant(request.status)}
                      >
                        {request.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">

                          <DropdownMenuItem>
                            <UserIcon className="mr-2 h-4 w-4" />
                            View Request
                          </DropdownMenuItem>

                          <Link to="/requests/edit-requests" className="flex items-center"> <DropdownMenuItem>

                            <SettingsIcon className="mr-2 h-4 w-4" />
                            Edit Request

                          </DropdownMenuItem></Link>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() =>
                              setRequestsData((prev) =>
                                prev.filter((r) => r.id !== request.id)
                              )
                            }
                          >
                            <LogOutIcon className="mr-2 h-4 w-4" />
                            Delete Request
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
              {filteredRequests.length === 0
                ? "Showing 0 of 0"
                : `Showing ${(currentPage - 1) * PAGE_SIZE + 1} - ${Math.min(currentPage * PAGE_SIZE, filteredRequests.length)} of ${filteredRequests.length}`}
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