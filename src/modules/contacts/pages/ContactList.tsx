"use client"

import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"

import {
    Card,
    CardContent,
    CardHeader,
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
    Search,
    Eye,
    Pencil,
    Plus,
    MapPin,
    FileText,
    Banknote,
    Calendar,
} from "lucide-react"

import { useContactStore } from "@/modules/contacts/create/store/contact.store"

import type {
    ContactProfile,
} from "../types/contact.types"


/* -------------------------------------------------------
 * Helpers
 * ----------------------------------------------------- */

const formatValue = (
    value: string | number | null | undefined
): string => {
    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {
        return "—"
    }

    return String(value)
}


const formatLabel = (
    value: string | null | undefined
): string => {
    if (!value) {
        return "—"
    }

    return value
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())
}


const formatDate = (
    value: string | null | undefined
): string => {
    if (!value) {
        return "—"
    }

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
        return value
    }

    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    })
}


const getInitials = (
    value: string
): string => {
    if (!value || value === "—") {
        return "C"
    }

    return value
        .split(" ")
        .filter(Boolean)
        .map((part) => part.charAt(0))
        .join("")
        .slice(0, 2)
        .toUpperCase()
}


const formatArea = (
    contact: ContactProfile
): string => {
    const min = contact.search_criteria.min_living_area
    const max = contact.search_criteria.max_living_area

    if (min !== null && max !== null) {
        return `${min} - ${max}`
    }

    if (min !== null) {
        return `Min. ${min}`
    }

    if (max !== null) {
        return `Max. ${max}`
    }

    return "—"
}


const formatBudget = (
    contact: ContactProfile
): string => {
    const {
        budget_min,
        budget_max,
        budget_currency,
    } = contact.financial

    const currency = budget_currency
        ? `${budget_currency} `
        : ""

    if (
        budget_min !== null &&
        budget_max !== null
    ) {
        return `${currency}${budget_min.toLocaleString()} - ${budget_max.toLocaleString()}`
    }

    if (budget_min !== null) {
        return `${currency}${budget_min.toLocaleString()}`
    }

    if (budget_max !== null) {
        return `${currency}${budget_max.toLocaleString()}`
    }

    return "—"
}


const formatLocation = (
    contact: ContactProfile
): string => {
    const {
        cities,
        cantons,
        countries,
    } = contact.search_criteria

    const values = [
        ...(cities ?? []),
        ...(cantons ?? []),
        ...(countries ?? []),
    ].filter(Boolean)

    if (values.length === 0) {
        return "—"
    }

    return values.join(", ")
}


const stageClass = (
    stage: string | null
): string => {
    if (!stage) {
        return "bg-gray-100 text-gray-600 border-gray-300 dark:bg-gray-800/30 dark:text-gray-400"
    }

    const normalized = stage.toLowerCase()

    if (
        normalized.includes("complete") ||
        normalized.includes("closed")
    ) {
        return "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300"
    }

    if (
        normalized.includes("contract") ||
        normalized.includes("pending")
    ) {
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300"
    }

    if (
        normalized.includes("offer") ||
        normalized.includes("qualified")
    ) {
        return "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-300"
    }

    if (
        normalized.includes("notarial") ||
        normalized.includes("legal")
    ) {
        return "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300"
    }

    if (
        normalized.includes("hold") ||
        normalized.includes("cancel")
    ) {
        return "bg-red-50 text-red-600 border-red-200 dark:bg-red-900/30 dark:text-red-300"
    }

    if (
        normalized.includes("due") ||
        normalized.includes("review")
    ) {
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300"
    }

    return "bg-gray-100 text-gray-600 border-gray-300 dark:bg-gray-800/30 dark:text-gray-400"
}


const transactionClass = (
    transaction: string | null
): string => {
    if (!transaction) {
        return "bg-gray-50 text-gray-600 border-gray-200"
    }

    const normalized = transaction.toLowerCase()

    if (
        normalized.includes("purchase") ||
        normalized.includes("buy")
    ) {
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
    }

    if (
        normalized.includes("sale") ||
        normalized.includes("sell")
    ) {
        return "bg-rose-50 text-rose-700 border-rose-200"
    }

    if (
        normalized.includes("rent") ||
        normalized.includes("lease")
    ) {
        return "bg-sky-50 text-sky-700 border-sky-200"
    }

    return "bg-gray-50 text-gray-600 border-gray-200"
}


/* -------------------------------------------------------
 * Component
 * ----------------------------------------------------- */

export default function ContactListing() {

    const {
        contacts,
        meta,
        loading,
        error,
        fetchContacts,
    } = useContactStore()


    const [search, setSearch] = useState("")
    const [txFilter, setTxFilter] = useState("all")
    const [stageFilter, setStageFilter] = useState("all")
    const [page, setPage] = useState(1)


    /* ---------------------------------------------------
     * Load first page
     * ------------------------------------------------- */

    useEffect(() => {
        fetchContacts(1)
    }, [fetchContacts])


    /* ---------------------------------------------------
     * Search + filters
     *
     * These filters work on the currently loaded API page.
     * ------------------------------------------------- */

    const filtered = useMemo(() => {

        const query = search
            .trim()
            .toLowerCase()


        return contacts.filter(
            (contact) => {

                const transaction =
                    contact.search_criteria.transaction_type ?? ""

                const stage =
                    contact.classification.relationship_stage ?? ""

                const category =
                    contact.classification.client_category ?? ""

                const clientSubType =
                    contact.classification.client_sub_type ?? ""

                const location =
                    formatLocation(contact)

                const searchText = [
                    contact.id,
                    contact.person_id,
                    category,
                    clientSubType,
                    transaction,
                    stage,
                    location,
                    contact.relationships.assigned_agent_id,
                    contact.relationships.notary_partner_id,
                ]
                    .filter(
                        (value) =>
                            value !== null &&
                            value !== undefined
                    )
                    .join(" ")
                    .toLowerCase()


                const matchesSearch =
                    !query ||
                    searchText.includes(query)


                const matchesTransaction =
                    txFilter === "all" ||
                    transaction.toLowerCase() ===
                    txFilter.toLowerCase()


                const matchesStage =
                    stageFilter === "all" ||
                    stage.toLowerCase() ===
                    stageFilter.toLowerCase()


                return (
                    matchesSearch &&
                    matchesTransaction &&
                    matchesStage
                )
            }
        )

    }, [
        contacts,
        search,
        txFilter,
        stageFilter,
    ])


    /* ---------------------------------------------------
     * API pagination
     * ------------------------------------------------- */

    const currentPage =
        meta?.current_page ?? page

    const totalPages =
        Math.max(
            1,
            meta?.last_page ?? 1
        )

    const totalRecords =
        meta?.total ?? contacts.length

    const perPage =
        meta?.per_page ?? 15

    const from =
        meta?.from ??
        (
            totalRecords === 0
                ? 0
                : (currentPage - 1) * perPage + 1
        )

    const to =
        meta?.to ??
        Math.min(
            currentPage * perPage,
            totalRecords
        )


    /* ---------------------------------------------------
     * Dynamic filter options
     *
     * We keep your existing options and also add values
     * actually returned by the API.
     * ------------------------------------------------- */

    const transactionOptions =
        useMemo(() => {

            const values = contacts
                .map(
                    (contact) =>
                        contact.search_criteria.transaction_type
                )
                .filter(
                    (
                        value
                    ): value is string =>
                        Boolean(value)
                )

            return Array.from(
                new Set([
                    "Purchase",
                    "Sale",
                    "Rental",
                    ...values,
                ])
            )

        }, [contacts])


    const stageOptions =
        useMemo(() => {

            const values = contacts
                .map(
                    (contact) =>
                        contact.classification.relationship_stage
                )
                .filter(
                    (
                        value
                    ): value is string =>
                        Boolean(value)
                )

            return Array.from(
                new Set([
                    "Documentation",
                    "Due Diligence",
                    "Offer",
                    "Under Contract",
                    "Notarial",
                    "Completed",
                    "On Hold",
                    ...values,
                ])
            )

        }, [contacts])


    /* ---------------------------------------------------
     * Pagination handler
     * ------------------------------------------------- */

    const handlePageChange = async (
        newPage: number
    ) => {

        if (
            newPage < 1 ||
            newPage > totalPages ||
            loading
        ) {
            return
        }

        setPage(newPage)

        await fetchContacts(newPage)
    }


    /* ---------------------------------------------------
     * Filter handlers
     * ------------------------------------------------- */

    const handleTransactionChange = (
        value: string
    ) => {

        setTxFilter(value)
        setPage(1)

        if (currentPage !== 1) {
            fetchContacts(1)
        }
    }


    const handleStageChange = (
        value: string
    ) => {

        setStageFilter(value)
        setPage(1)

        if (currentPage !== 1) {
            fetchContacts(1)
        }
    }


    const handleSearchChange = (
        value: string
    ) => {

        setSearch(value)
        setPage(1)

        if (currentPage !== 1) {
            fetchContacts(1)
        }
    }


    return (
        <div className="space-y-5">

            <style>
                {`
                    @keyframes fadeUp {
                        from {
                            opacity: 0;
                            transform: translateY(6px);
                        }

                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    .row-in {
                        animation: fadeUp .25s ease both;
                    }
                `}
            </style>


            {/* ------------------------------------------------
             * Page Header
             * ------------------------------------------------ */}

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-2xl font-semibold tracking-tight">
                        Contacts
                    </h1>

                    <p className="text-sm text-muted-foreground mt-0.5">
                        Manage all real estate transaction files and documentation.
                    </p>

                </div>


                <Link to="/contacts/create">

                    <Button
                        size="sm"
                        className="gap-1.5 rounded-lg px-4 h-9"
                    >
                        <Plus className="h-4 w-4" />
                        New Contact
                    </Button>

                </Link>

            </div>


            {/* ------------------------------------------------
             * Main Card
             * ------------------------------------------------ */}

            <Card className="shadow-sm">

                <CardHeader className="flex flex-row flex-wrap items-center gap-3 border-b py-3 px-4">

                    {/* Transaction Filter */}

                    <Select
                        value={txFilter}
                        onValueChange={
                            handleTransactionChange
                        }
                    >

                        <SelectTrigger className="w-[130px] h-9 text-sm">

                            <SelectValue placeholder="Transaction" />

                        </SelectTrigger>


                        <SelectContent>

                            <SelectItem value="all">
                                All Types
                            </SelectItem>

                            {transactionOptions.map(
                                (transaction) => (

                                    <SelectItem
                                        key={transaction}
                                        value={transaction}
                                    >
                                        {formatLabel(transaction)}
                                    </SelectItem>

                                )
                            )}

                        </SelectContent>

                    </Select>


                    {/* Stage Filter */}

                    <Select
                        value={stageFilter}
                        onValueChange={
                            handleStageChange
                        }
                    >

                        <SelectTrigger className="w-[155px] h-9 text-sm">

                            <SelectValue placeholder="All Stages" />

                        </SelectTrigger>


                        <SelectContent>

                            <SelectItem value="all">
                                All Stages
                            </SelectItem>

                            {stageOptions.map(
                                (stage) => (

                                    <SelectItem
                                        key={stage}
                                        value={stage}
                                    >
                                        {formatLabel(stage)}
                                    </SelectItem>

                                )
                            )}

                        </SelectContent>

                    </Select>


                    {/* Search */}

                    <div className="relative w-[240px]">

                        <Search
                            className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
                        />

                        <Input
                            placeholder="Search contacts, client, agent…"
                            className="pl-8 h-9 text-sm"
                            value={search}
                            onChange={(event) =>
                                handleSearchChange(
                                    event.target.value
                                )
                            }
                        />

                    </div>


                    {/* Count */}

                    <div className="ml-auto text-xs text-muted-foreground">

                        {search ||
                            txFilter !== "all" ||
                            stageFilter !== "all"
                            ? `${filtered.length} on this page`
                            : `${totalRecords} contact${totalRecords !== 1 ? "s" : ""}`
                        }

                    </div>

                </CardHeader>


                {/* ------------------------------------------------
                 * Table
                 * ------------------------------------------------ */}

                <CardContent className="p-0">

                    <div className="overflow-x-auto">

                        <Table className="min-w-[1100px]">

                            <TableHeader>

                                <TableRow className="bg-muted/40 hover:bg-muted/40">

                                    {[
                                        "Contact ID",
                                        "Title & Client",
                                        "Type",
                                        "Transaction",
                                        "Location",
                                        "Area",
                                        "Price",
                                        "Notary",
                                        "Agent",
                                        "Closing Date",
                                        "Stage",
                                        "Action",
                                    ].map(
                                        (
                                            heading,
                                            index
                                        ) => (

                                            <TableHead
                                                key={heading}
                                                className={`
                                                    text-xs
                                                    font-semibold
                                                    uppercase
                                                    tracking-wide
                                                    ${index === 0 ? "pl-4" : ""}
                                                    ${index === 11 ? "text-right pr-4" : ""}
                                                `}
                                            >
                                                {heading}
                                            </TableHead>

                                        )
                                    )}

                                </TableRow>

                            </TableHeader>


                            <TableBody>

                                {/* Loading */}

                                {loading ? (

                                    <TableRow>

                                        <TableCell
                                            colSpan={12}
                                            className="py-16 text-center"
                                        >

                                            <div className="flex flex-col items-center gap-2">

                                                <div className="h-6 w-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />

                                                <span className="text-sm text-muted-foreground">
                                                    Loading contacts...
                                                </span>

                                            </div>

                                        </TableCell>

                                    </TableRow>

                                ) : error ? (

                                    /* Error */

                                    <TableRow>

                                        <TableCell
                                            colSpan={12}
                                            className="py-16 text-center"
                                        >

                                            <div className="flex flex-col items-center gap-3">

                                                <p className="text-sm text-red-500">
                                                    {error}
                                                </p>

                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        fetchContacts(
                                                            currentPage
                                                        )
                                                    }
                                                >
                                                    Try Again
                                                </Button>

                                            </div>

                                        </TableCell>

                                    </TableRow>

                                ) : filtered.length === 0 ? (

                                    /* Empty */

                                    <TableRow>

                                        <TableCell
                                            colSpan={12}
                                            className="py-16 text-center text-muted-foreground text-sm"
                                        >
                                            No contacts match your filters.
                                        </TableCell>

                                    </TableRow>

                                ) : (

                                    /* Contact Rows */

                                    filtered.map(
                                        (
                                            contact,
                                            index
                                        ) => {

                                            const transaction =
                                                contact.search_criteria
                                                    .transaction_type

                                            const stage =
                                                contact.classification
                                                    .relationship_stage

                                            const category =
                                                contact.classification
                                                    .client_category

                                            const title =
                                                category
                                                    ? formatLabel(category)
                                                    : `Contact Profile #${contact.id}`

                                            const client =
                                                `Person #${contact.person_id}`

                                            const agent =
                                                contact.relationships
                                                    .assigned_agent_id !== null
                                                    ? `Agent #${contact.relationships.assigned_agent_id}`
                                                    : "—"

                                            const notary =
                                                contact.relationships
                                                    .notary_partner_id !== null
                                                    ? `Partner #${contact.relationships.notary_partner_id}`
                                                    : "—"

                                            return (

                                                <TableRow
                                                    key={contact.id}
                                                    className="row-in border-b border-border/50 hover:bg-muted/30 transition-colors"
                                                    style={{
                                                        animationDelay:
                                                            `${index * 35}ms`,
                                                    }}
                                                >

                                                    {/* Contact ID */}

                                                    <TableCell className="pl-4 font-mono text-xs text-muted-foreground">

                                                        #{contact.id}

                                                    </TableCell>


                                                    {/* Title & Client */}

                                                    <TableCell className="min-w-[180px]">

                                                        <div className="flex items-start gap-1.5">

                                                            <FileText
                                                                className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0"
                                                            />

                                                            <div>

                                                                <div className="font-medium text-sm leading-snug">

                                                                    {title}

                                                                </div>

                                                                <div className="text-xs text-muted-foreground">

                                                                    {client}

                                                                </div>

                                                            </div>

                                                        </div>

                                                    </TableCell>


                                                    {/* Type */}

                                                    <TableCell className="text-xs text-muted-foreground">

                                                        {formatLabel(category)}

                                                    </TableCell>


                                                    {/* Transaction */}

                                                    <TableCell>

                                                        <Badge
                                                            variant="outline"
                                                            className={`
                                                                text-xs
                                                                px-2
                                                                py-0.5
                                                                font-medium
                                                                ${transactionClass(transaction)}
                                                            `}
                                                        >

                                                            {formatLabel(transaction)}

                                                        </Badge>

                                                    </TableCell>


                                                    {/* Location */}

                                                    <TableCell>

                                                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">

                                                            <MapPin className="h-3 w-3" />

                                                            {formatLocation(
                                                                contact
                                                            )}

                                                        </span>

                                                    </TableCell>


                                                    {/* Area */}

                                                    <TableCell className="text-xs text-muted-foreground">

                                                        {formatArea(
                                                            contact
                                                        )}

                                                    </TableCell>


                                                    {/* Price / Budget */}

                                                    <TableCell>

                                                        <span className="inline-flex items-center gap-1 text-xs font-semibold">

                                                            <Banknote className="h-3 w-3 text-muted-foreground" />

                                                            {formatBudget(
                                                                contact
                                                            )}

                                                        </span>

                                                    </TableCell>


                                                    {/* Notary */}

                                                    <TableCell className="text-xs text-muted-foreground">

                                                        {notary}

                                                    </TableCell>


                                                    {/* Agent */}

                                                    <TableCell>

                                                        <div className="flex items-center gap-2">

                                                            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-semibold text-primary">

                                                                {getInitials(
                                                                    agent
                                                                )}

                                                            </div>

                                                            <span className="text-sm">

                                                                {agent}

                                                            </span>

                                                        </div>

                                                    </TableCell>


                                                    {/* Closing Date */}

                                                    <TableCell>

                                                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">

                                                            <Calendar className="h-3 w-3" />

                                                            —
                                                        </span>

                                                    </TableCell>


                                                    {/* Stage */}

                                                    <TableCell>

                                                        <Badge
                                                            variant="outline"
                                                            className={`
                                                                text-xs
                                                                px-2.5
                                                                py-1
                                                                font-medium
                                                                ${stageClass(stage)}
                                                            `}
                                                        >

                                                            {formatLabel(
                                                                stage
                                                            )}

                                                        </Badge>

                                                    </TableCell>


                                                    {/* Actions */}

                                                    <TableCell className="text-right pr-4">

                                                        <DropdownMenu>

                                                            <DropdownMenuTrigger
                                                                asChild
                                                            >

                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-7 w-7 rounded-md"
                                                                >

                                                                    <MoreVertical className="h-4 w-4" />

                                                                </Button>

                                                            </DropdownMenuTrigger>


                                                            <DropdownMenuContent
                                                                align="end"
                                                                className="w-44"
                                                            >

                                                                <DropdownMenuItem
                                                                    className="text-sm gap-2 cursor-pointer"
                                                                >

                                                                    <Eye className="h-3.5 w-3.5" />

                                                                    View Contact

                                                                </DropdownMenuItem>


                                                                <Link
                                                                    to={`/contacts/details/${contact.id}`}
                                                                >

                                                                    <DropdownMenuItem
                                                                        className="text-sm gap-2 cursor-pointer"
                                                                    >

                                                                        <Pencil className="h-3.5 w-3.5" />

                                                                        Edit Contact

                                                                    </DropdownMenuItem>

                                                                </Link>


                                                                <DropdownMenuSeparator />


                                                                <DropdownMenuItem
                                                                    disabled
                                                                    className="text-sm gap-2 text-muted-foreground"
                                                                    title="Delete API endpoint has not been provided yet"
                                                                >

                                                                    Delete

                                                                </DropdownMenuItem>

                                                            </DropdownMenuContent>

                                                        </DropdownMenu>

                                                    </TableCell>

                                                </TableRow>

                                            )
                                        }
                                    )

                                )}

                            </TableBody>

                        </Table>

                    </div>


                    {/* ------------------------------------------------
                     * Pagination
                     * ------------------------------------------------ */}

                    <div className="flex items-center justify-between px-4 py-3 border-t border-border/50">

                        <p className="text-xs text-muted-foreground">

                            {totalRecords === 0
                                ? "No results"
                                : `Showing ${from}–${to} of ${totalRecords}`
                            }

                        </p>


                        <div className="flex items-center gap-1.5">

                            <Button
                                variant="outline"
                                size="sm"
                                className="h-8 px-3 text-xs"
                                onClick={() =>
                                    handlePageChange(
                                        currentPage - 1
                                    )
                                }
                                disabled={
                                    currentPage === 1 ||
                                    loading
                                }
                            >
                                Previous
                            </Button>


                            <span className="text-xs text-muted-foreground px-1">

                                {currentPage} / {totalPages}

                            </span>


                            <Button
                                variant="outline"
                                size="sm"
                                className="h-8 px-3 text-xs"
                                onClick={() =>
                                    handlePageChange(
                                        currentPage + 1
                                    )
                                }
                                disabled={
                                    currentPage === totalPages ||
                                    loading
                                }
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