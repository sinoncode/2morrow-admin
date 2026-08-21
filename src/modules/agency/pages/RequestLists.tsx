"use client"

import { useMemo, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
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
  Building2,
  Search,
  Pencil,
  Trash2,
  Plus,
  MoreVertical,
  MapPin,
  Mail,
  Phone,
  Globe,
  ShieldCheck,
  Users,
  RefreshCw,
} from "lucide-react"
import { useAgencyStore } from "@/store/useAgencyStore"
import type { AgencyProfileItem } from "@/types/agency.types"

const statusBadgeStyles: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300",
  pending: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300",
  suspended: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-300",
  terminated: "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400",
}

const typeBadgeStyles: Record<string, string> = {
  independent: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300",
  franchise: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-300",
  network: "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/30 dark:text-cyan-300",
  boutique: "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950/30 dark:text-pink-300",
  corporate: "bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-200",
}

const PAGE_SIZE = 8

export default function AgencyListing() {
  const navigate = useNavigate()
  const { agencies, loading, fetchAgencies, deleteAgencyProfile } = useAgencyStore()

  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchAgencies()
  }, [fetchAgencies])

  const filtered = useMemo(() => {
    return (agencies || []).filter((agency) => {
      const legalName = agency.company_identity?.agency_legal_name || (agency as any).agency_legal_name || ""
      const tradingName = agency.company_identity?.trading_name_brand || (agency as any).trading_name_brand || ""
      const city = agency.address_contact?.registered_address?.city || (agency as any).city || ""
      const email = agency.address_contact?.general_email || (agency as any).email || ""
      const phone = agency.address_contact?.general_phone || (agency as any).phone || ""
      const type = (agency.company_identity?.agency_type || (agency as any).agency_type || "independent").toLowerCase()
      const status = (agency.partnership?.status || (agency as any).status || "active").toLowerCase()

      const query = `${legalName} ${tradingName} ${city} ${email} ${phone}`.toLowerCase()
      const matchesSearch = !search || query.includes(search.toLowerCase())
      const matchesType = typeFilter === "all" || type === typeFilter.toLowerCase()
      const matchesStatus = statusFilter === "all" || status === statusFilter.toLowerCase()

      return matchesSearch && matchesType && matchesStatus
    })
  }, [agencies, search, typeFilter, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const curPage = Math.min(page, totalPages)
  const paginated = filtered.slice((curPage - 1) * PAGE_SIZE, curPage * PAGE_SIZE)

  const handleDelete = async (id: string | number) => {
    if (window.confirm("Are you sure you want to delete this agency profile?")) {
      await deleteAgencyProfile(id)
    }
  }

  return (
    <div className="space-y-6 max-w-full mx-auto py-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-600 rounded-xl shadow-md shadow-blue-600/20">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Agencies & Partners
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Manage your network of verified real estate partner agencies, portals, and franchise brokers.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchAgencies()}
            disabled={loading}
            className="h-10 rounded-xl gap-1.5"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>

          <Link to="/agency/create">
            <Button size="sm" className="h-10 rounded-xl px-4 gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20">
              <Plus className="h-4 w-4" />
              New Agency
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter Toolbar */}
      <Card className="border border-gray-200/80 dark:border-gray-800 shadow-sm rounded-2xl overflow-hidden bg-card">
        <CardHeader className="flex flex-row flex-wrap items-center gap-3 border-b border-border/50 py-3.5 px-4 sm:px-6">
          <div className="relative flex-1 min-w-[220px] max-w-md">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by legal name, brand, city, email..."
              className="pl-10 h-10 text-sm rounded-xl"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
            />
          </div>

          <Select
            value={typeFilter}
            onValueChange={(v) => {
              setTypeFilter(v)
              setPage(1)
            }}
          >
            <SelectTrigger className="w-[150px] h-10 text-sm rounded-xl">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="independent">Independent</SelectItem>
              <SelectItem value="franchise">Franchise</SelectItem>
              <SelectItem value="network">Network Member</SelectItem>
              <SelectItem value="boutique">Boutique</SelectItem>
              <SelectItem value="corporate">Corporate</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={statusFilter}
            onValueChange={(v) => {
              setStatusFilter(v)
              setPage(1)
            }}
          >
            <SelectTrigger className="w-[150px] h-10 text-sm rounded-xl">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="terminated">Terminated</SelectItem>
            </SelectContent>
          </Select>

          <div className="ml-auto text-xs font-semibold text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "agency" : "agencies"}
          </div>
        </CardHeader>

        {/* Table Body */}
        <CardContent className="p-0">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-3">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-muted-foreground font-medium">Loading agency directories...</p>
            </div>
          ) : paginated.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center px-4">
              <div className="w-14 h-14 rounded-2xl bg-muted/40 flex items-center justify-center mb-3">
                <Building2 className="w-7 h-7 text-muted-foreground" />
              </div>
              <h3 className="text-base font-semibold text-foreground">No Agencies Found</h3>
              <p className="text-xs text-muted-foreground max-w-sm mt-1 mb-4">
                {search || typeFilter !== "all" || statusFilter !== "all"
                  ? "No agency records match your filter criteria. Try resetting the filters."
                  : "Get started by adding your first real estate partner agency profile to the CRM."}
              </p>
              <Link to="/agency/create">
                <Button size="sm" className="rounded-xl bg-blue-600 text-white gap-2">
                  <Plus className="w-4 h-4" />
                  Create Agency Profile
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table className="min-w-[980px]">
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead className="text-xs font-bold uppercase tracking-wider pl-6">Agency & Brand</TableHead>
                    <TableHead className="text-xs font-bold uppercase tracking-wider">Type</TableHead>
                    <TableHead className="text-xs font-bold uppercase tracking-wider">Location</TableHead>
                    <TableHead className="text-xs font-bold uppercase tracking-wider">Primary Contact</TableHead>
                    <TableHead className="text-xs font-bold uppercase tracking-wider">Staff / Offices</TableHead>
                    <TableHead className="text-xs font-bold uppercase tracking-wider">Status</TableHead>
                    <TableHead className="text-xs font-bold uppercase tracking-wider text-right pr-6">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginated.map((agency: AgencyProfileItem, index) => {
                    const id = agency.id ?? index + 1
                    const identity = agency.company_identity || (agency as any)
                    const contact = agency.address_contact || (agency as any)
                    const partnership = agency.partnership || (agency as any)
                    const legalName = identity.agency_legal_name || "Unnamed Agency"
                    const brand = identity.trading_name_brand
                    const type = (identity.agency_type || "independent").toLowerCase()
                    const status = (partnership.status || "active").toLowerCase()
                    const city = contact.registered_address?.city || (contact as any)?.city || "Geneva"
                    const country = contact.registered_address?.country || (contact as any)?.country || "Switzerland"
                    const phone = contact.general_phone || (contact as any)?.phone || ""
                    const email = contact.general_email || (contact as any)?.email || ""
                    const agentsCount = identity.total_agents || identity.staff_size_bracket || "1-10"
                    const officesCount = identity.offices_count || 1

                    return (
                      <TableRow
                        key={id}
                        className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                      >
                        {/* Legal Name & Brand */}
                        <TableCell className="pl-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm">
                              {legalName.substring(0, 2).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <Link
                                to={`/agency/edit/${id}`}
                                className="font-semibold text-sm text-foreground hover:text-blue-600 transition-colors block truncate"
                              >
                                {legalName}
                              </Link>
                              {brand && (
                                <p className="text-xs text-muted-foreground truncate">{brand}</p>
                              )}
                            </div>
                          </div>
                        </TableCell>

                        {/* Agency Type */}
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`text-xs px-2.5 py-0.5 font-medium capitalize ${
                              typeBadgeStyles[type] || typeBadgeStyles.independent
                            }`}
                          >
                            {type}
                          </Badge>
                        </TableCell>

                        {/* Location */}
                        <TableCell>
                          <div className="flex items-center gap-1.5 text-sm text-foreground">
                            <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                            <span>{city}</span>
                            <span className="text-xs text-muted-foreground">({country})</span>
                          </div>
                        </TableCell>

                        {/* Contact details */}
                        <TableCell>
                          <div className="space-y-0.5">
                            {email && (
                              <div className="flex items-center gap-1.5 text-xs text-foreground truncate max-w-[200px]">
                                <Mail className="w-3 h-3 text-muted-foreground shrink-0" />
                                <span className="truncate">{email}</span>
                              </div>
                            )}
                            {phone && (
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Phone className="w-3 h-3 text-muted-foreground shrink-0" />
                                <span>{phone}</span>
                              </div>
                            )}
                          </div>
                        </TableCell>

                        {/* Staff / Offices */}
                        <TableCell>
                          <div className="text-xs text-foreground font-medium flex items-center gap-2">
                            <span className="flex items-center gap-1">
                              <Users className="w-3.5 h-3.5 text-muted-foreground" />
                              {agentsCount} agents
                            </span>
                            <span className="text-muted-foreground">•</span>
                            <span>{officesCount} office{officesCount !== 1 ? "s" : ""}</span>
                          </div>
                        </TableCell>

                        {/* Status */}
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`text-xs px-2.5 py-0.5 font-medium capitalize ${
                              statusBadgeStyles[status] || statusBadgeStyles.active
                            }`}
                          >
                            {status}
                          </Badge>
                        </TableCell>

                        {/* Actions */}
                        <TableCell className="text-right pr-6">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-44 rounded-xl">
                              <DropdownMenuItem
                                onClick={() => navigate(`/agency/edit/${id}`)}
                                className="gap-2 cursor-pointer text-sm"
                              >
                                <Pencil className="h-3.5 w-3.5" />
                                View & Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleDelete(id)}
                                className="gap-2 cursor-pointer text-sm text-red-600 focus:text-red-600"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                Delete Agency
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Pagination Footer */}
          {!loading && filtered.length > 0 && (
            <div className="flex items-center justify-between px-6 py-3.5 border-t border-border/50">
              <p className="text-xs text-muted-foreground">
                Showing {(curPage - 1) * PAGE_SIZE + 1}–{Math.min(curPage * PAGE_SIZE, filtered.length)} of{" "}
                {filtered.length} agencies
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 text-xs rounded-lg"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={curPage === 1}
                >
                  Previous
                </Button>
                <span className="text-xs text-muted-foreground px-1">
                  {curPage} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 text-xs rounded-lg"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={curPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}