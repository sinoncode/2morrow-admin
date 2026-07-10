import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePropertyStore } from "@/store/propertyStore";
import { motion, AnimatePresence } from "framer-motion";
import {
    IconMapPin,
    IconBed,
    IconBath,
    IconRuler,
    IconBuilding,
    IconParking,
    IconLeaf,
    IconStar,
    IconVideo,
    IconFile,
    IconChevronLeft,
    IconChevronRight,
    IconShare,
    IconHeart,
    IconEdit,
    IconCompass,
    IconCalendar,
    IconCurrencyDollar,
    IconShield,
    IconBulb,
    IconDeviceLaptop,
    IconDiamond,
    IconCheck,
    IconExternalLink,
    Icon,
    IconArmchair,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";


// Placeholder images
const IMAGES = [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=90",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1400&q=90",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=90",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1400&q=90",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1400&q=90",
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const formatPrice = (price: string) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(Number(price));

const formatDate = (iso: string) =>
    new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(new Date(iso));

const STATUS_MAP: Record<string, { label: string; className: string }> = {
    active: {
        label: "Active",
        className:
            "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    },
    draft: {
        label: "Draft",
        className:
            "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20",
    },
    sold: {
        label: "Sold",
        className:
            "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20",
    },
    inactive: {
        label: "Inactive",
        className:
            "bg-zinc-500/15 text-zinc-600 dark:text-zinc-400 border-zinc-500/20",
    },
    archived: {
        label: "Archived",
        className:
            "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/20",
    },
};

const FACING_LABELS: Record<string, string> = {
    north: "North",
    south: "South",
    east: "East",
    west: "West",
    north_east: "North East",
    north_west: "North West",
    south_east: "South East",
    south_west: "South West",
};

const FURNISHING_LABELS: Record<string, string> = {
    fully_furnished: "Fully Furnished",
    semi_furnished: "Semi Furnished",
    unfurnished: "Unfurnished",
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function AmenityTag({ label }: { label: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-sm font-medium text-foreground/80"
        >
            <IconCheck size={13} className="text-primary shrink-0" />
            {label}
        </motion.div>
    );
}

function StatCard({
    icon: Icon,
    label,
    value,
    sub,
}: {
    icon: React.ElementType;
    label: string;
    value: string | number;
    sub?: string;
}) {
    return (
        <div className="flex flex-col gap-1 p-4 rounded-2xl bg-muted/50 border border-border/60 hover:border-primary/30 hover:bg-muted/80 transition-all duration-200">
            <div className="flex items-center gap-2 text-muted-foreground mb-0.5">
                <Icon size={15} />
                <span className="text-xs font-medium uppercase tracking-wider">
                    {label}
                </span>
            </div>
            <span className="text-xl font-semibold text-foreground leading-none">
                {value}
            </span>
            {sub && (
                <span className="text-xs text-muted-foreground">{sub}</span>
            )}
        </div>
    );
}

function DocumentCard({
    label,
    href,
}: {
    label: string;
    href: string | null;
}) {
    return (
        <div
            className={cn(
                "group flex items-center justify-between p-4 rounded-xl border transition-all duration-200",
                href
                    ? "border-border/60 bg-muted/30 hover:border-primary/40 hover:bg-muted/60 cursor-pointer"
                    : "border-border/30 bg-muted/10 opacity-50"
            )}
        >
            <div className="flex items-center gap-3">
                <div
                    className={cn(
                        "p-2 rounded-lg",
                        href
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                    )}
                >
                    <IconFile size={16} />
                </div>
                <div>
                    <p className="text-sm font-medium text-foreground">
                        {label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {href ? "Available" : "Not uploaded"}
                    </p>
                </div>
            </div>
            {href && (
                <IconExternalLink
                    size={15}
                    className="text-muted-foreground group-hover:text-primary transition-colors"
                />
            )}
        </div>
    );
}

// ─── Gallery ─────────────────────────────────────────────────────────────────
function Gallery({ images }: { images: string[] }) {
    const [active, setActive] = useState(0);

    const prev = () => setActive((i) => (i - 1 + images.length) % images.length);
    const next = () => setActive((i) => (i + 1) % images.length);

    return (
        <div className="w-full space-y-3">
            {/* Main image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-muted">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={active}
                        src={images[active]}
                        alt={`Property view ${active + 1}`}
                        className="absolute inset-0 h-full w-full object-cover"
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                    />
                </AnimatePresence>

                {/* Nav arrows */}
                <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-all"
                >
                    <IconChevronLeft size={18} />
                </button>
                <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-all"
                >
                    <IconChevronRight size={18} />
                </button>

                {/* Counter */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium">
                    {active + 1} / {images.length}
                </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {images.map((src, i) => (
                    <button
                        key={i}
                        onClick={() => setActive(i)}
                        className={cn(
                            "relative shrink-0 h-16 w-24 rounded-xl overflow-hidden border-2 transition-all duration-200",
                            i === active
                                ? "border-primary scale-[1.03]"
                                : "border-transparent opacity-60 hover:opacity-90"
                        )}
                    >
                        <img
                            src={src}
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({
    title,
    children,
    className,
}: {
    title: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={cn("space-y-4", className)}>
            <h2 className="text-base font-semibold text-foreground tracking-tight">
                {title}
            </h2>
            {children}
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PropertyViewPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { fetchPropertyById, selectedProperty: p, detailsLoading } = usePropertyStore();

    useEffect(() => {
        if (id) {
            fetchPropertyById(id);
        }
    }, [id, fetchPropertyById]);

    if (detailsLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-muted-foreground gap-4">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm font-medium">Loading property details...</p>
            </div>
        );
    }

    if (!p) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-muted-foreground gap-4">
                <p className="text-sm font-medium">Property not found.</p>
                <Button onClick={() => navigate("/properties/list")} variant="outline">
                    Back to Properties
                </Button>
            </div>
        );
    }

    const status = p.status && STATUS_MAP[p.status] ? STATUS_MAP[p.status] : STATUS_MAP["draft"];
    const originalPrice = Number(p.price || 0);
    const discount = p.discount ? Number(p.discount) : 0;
    const finalPrice = originalPrice - discount;

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

                {/* ── Header bar ── */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap items-start justify-between gap-4"
                >
                    <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                            <Badge
                                variant="outline"
                                className={cn(
                                    "text-xs font-semibold px-2.5 py-0.5 rounded-full border",
                                    status.className
                                )}
                            >
                                {status.label}
                            </Badge>
                            <Badge
                                variant="outline"
                                className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/8 border-primary/20 text-primary"
                            >
                                {p.listing_type === "sale"
                                    ? "For Sale"
                                    : "For Rent"}
                            </Badge>
                            {p.type && (
                                <Badge
                                    variant="outline"
                                    className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-muted border-border/60 text-muted-foreground"
                                >
                                    {p.type}
                                </Badge>
                            )}
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                            {p.title}
                        </h1>
                        <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                            <IconMapPin size={14} className="text-primary shrink-0" />
                            <span>
                                {[p.address, p.city, p.state, p.zip_code]
                                    .filter(Boolean)
                                    .join(", ")}
                            </span>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                        {/* <Button variant="outline" size="sm" className="gap-1.5 rounded-full">
                            <IconShare size={15} />
                            Share
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1.5 rounded-full">
                            <IconHeart size={15} />
                            Save
                        </Button> */}
                        <Button onClick={() => navigate(`/properties/edit/${p.id}`)} size="sm" className="gap-1.5 rounded-full">
                            <IconEdit size={15} />
                            Edit
                        </Button>
                    </div>
                </motion.div>

                {/* ── Main grid ── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* ── Left column (2/3) ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className="lg:col-span-2 space-y-8"
                    >
                        {/* Gallery */}
                        <Gallery images={IMAGES} />

                        {/* Quick stats bar */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <StatCard
                                icon={IconBed}
                                label="Bedrooms"
                                value={p.bedrooms ?? "—"}
                            />
                            <StatCard
                                icon={IconBath}
                                label="Bathrooms"
                                value={p.bathrooms ?? "—"}
                            />
                            <StatCard
                                icon={IconRuler}
                                label="Area"
                                value={p.area ? `${Number(p.area).toLocaleString()} ft²` : "—"}
                            />
                            <StatCard
                                icon={IconBuilding}
                                label="Floor"
                                value={
                                    p.floor_number && p.total_floors
                                        ? `${p.floor_number} / ${p.total_floors}`
                                        : "—"
                                }
                            />
                        </div>

                        {/* Tabs */}
                        <Tabs defaultValue="details" className="w-full">
                            <TabsList className="h-10 p-1 rounded-xl bg-muted/60 border border-border/50 w-full sm:w-auto">
                                {[
                                    { value: "details", label: "Details" },
                                    { value: "amenities", label: "Amenities" },
                                    { value: "documents", label: "Documents" },
                                    { value: "financial", label: "Financial" },
                                ].map((tab) => (
                                    <TabsTrigger
                                        key={tab.value}
                                        value={tab.value}
                                        className="rounded-lg text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm"
                                    >
                                        {tab.label}
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            {/* ── Details ── */}
                            <TabsContent value="details" className="mt-6 space-y-6">
                                <Section title="About this property">
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {p.description}
                                    </p>
                                </Section>

                                <Separator />

                                <Section title="Property specifications">
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {[
                                            {
                                                icon: IconArmchair,
                                                label: "Furnishing",
                                                value: FURNISHING_LABELS[
                                                    p.furnishing_status ?? ""
                                                ] ?? "—",
                                            },
                                            {
                                                icon: IconCompass,
                                                label: "Facing",
                                                value: FACING_LABELS[
                                                    p.facing_direction ?? ""
                                                ] ?? "—",
                                            },
                                            {
                                                icon: IconCalendar,
                                                label: "Year Built",
                                                value: p.year_built ?? "—",
                                            },
                                            {
                                                icon: IconCalendar,
                                                label: "Balconies",
                                                value: p.balconies ?? "—",
                                            },
                                            {
                                                icon: IconParking,
                                                label: "Parking Slots",
                                                value: p.parking_slots ?? "—",
                                            },
                                            {
                                                icon: IconBuilding,
                                                label: "Property Type",
                                                value: p.type ?? "—",
                                            },
                                        ].map(({ icon: Icon, label, value }) => (
                                            <div
                                                key={label}
                                                className="flex items-start gap-3 p-3 rounded-xl bg-muted/40 border border-border/50"
                                            >
                                                <div className="p-1.5 rounded-lg bg-primary/10 text-primary mt-0.5 shrink-0">
                                                    <Icon size={14} />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                                        {label}
                                                    </p>
                                                    <p className="text-sm font-medium text-foreground mt-0.5">
                                                        {String(value)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Section>

                                <Separator />

                                <Section title="Parking">
                                    <div className="flex flex-wrap gap-3">
                                        <div
                                            className={cn(
                                                "flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium",
                                                p.covered_parking
                                                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                                                    : "bg-muted/40 border-border/40 text-muted-foreground"
                                            )}
                                        >
                                            <IconParking size={15} />
                                            Covered Parking
                                            {p.covered_parking ? (
                                                <IconCheck size={13} />
                                            ) : null}
                                        </div>
                                        <div
                                            className={cn(
                                                "flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium",
                                                p.open_parking
                                                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                                                    : "bg-muted/40 border-border/40 text-muted-foreground"
                                            )}
                                        >
                                            <IconParking size={15} />
                                            Open Parking
                                            {p.open_parking ? (
                                                <IconCheck size={13} />
                                            ) : null}
                                        </div>
                                    </div>
                                </Section>

                                <Separator />

                                <Section title="Neighborhood">
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {p.neighborhood_description}
                                    </p>
                                    {p.latitude && p.longitude && (
                                        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                                            <IconMapPin size={13} className="text-primary" />
                                            <span>
                                                {p.latitude}, {p.longitude}
                                            </span>
                                        </div>
                                    )}
                                </Section>

                                {p.keywords && p.keywords.length > 0 && (
                                    <>
                                        <Separator />
                                        <Section title="Tags">
                                            <div className="flex flex-wrap gap-2">
                                                {p.keywords.map((kw) => (
                                                    <span
                                                        key={kw}
                                                        className="px-2.5 py-1 rounded-full bg-muted border border-border/60 text-xs text-muted-foreground capitalize"
                                                    >
                                                        #{kw}
                                                    </span>
                                                ))}
                                            </div>
                                        </Section>
                                    </>
                                )}
                            </TabsContent>

                            {/* ── Amenities ── */}
                            <TabsContent value="amenities" className="mt-6 space-y-6">
                                {[
                                    {
                                        title: "Indoor amenities",
                                        icon: IconBulb,
                                        items: p.indoor_amenities ?? [],
                                        color: "text-violet-500",
                                    },
                                    {
                                        title: "Outdoor features",
                                        icon: IconLeaf,
                                        items: p.outdoor_features ?? [],
                                        color: "text-emerald-500",
                                    },
                                    {
                                        title: "Smart features",
                                        icon: IconDeviceLaptop,
                                        items: p.smart_features ?? [],
                                        color: "text-blue-500",
                                    },
                                    {
                                        title: "High-value assets",
                                        icon: IconDiamond,
                                        items: p.high_value_assets ?? [],
                                        color: "text-amber-500",
                                    },
                                ].map(
                                    ({ title, icon: Icon, items, color }) =>
                                        items.length > 0 && (
                                            <Section key={title} title="">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <Icon
                                                        size={16}
                                                        className={color}
                                                    />
                                                    <h3 className="text-sm font-semibold text-foreground">
                                                        {title}
                                                    </h3>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {items.map((item) => (
                                                        <AmenityTag
                                                            key={item}
                                                            label={item}
                                                        />
                                                    ))}
                                                </div>
                                            </Section>
                                        )
                                )}

                                {/* Media links */}
                                <Separator />
                                <Section title="Media">
                                    <div className="flex flex-wrap gap-3">
                                        {p.video_url && (
                                            <a
                                                href={p.video_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border/60 bg-muted/40 hover:border-primary/40 hover:bg-muted/60 text-sm font-medium text-foreground transition-all"
                                            >
                                                <IconVideo
                                                    size={15}
                                                    className="text-red-500"
                                                />
                                                Watch Video Tour
                                                <IconExternalLink
                                                    size={12}
                                                    className="text-muted-foreground"
                                                />
                                            </a>
                                        )}
                                        {p.virtual_tour_url && (
                                            <a
                                                href={p.virtual_tour_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border/60 bg-muted/40 hover:border-primary/40 hover:bg-muted/60 text-sm font-medium text-foreground transition-all"
                                            >
                                                <IconStar
                                                    size={15}
                                                    className="text-amber-500"
                                                />
                                                Virtual 3D Tour
                                                <IconExternalLink
                                                    size={12}
                                                    className="text-muted-foreground"
                                                />
                                            </a>
                                        )}
                                    </div>
                                </Section>
                            </TabsContent>

                            {/* ── Documents ── */}
                            <TabsContent value="documents" className="mt-6">
                                <Section title="Property documents">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <DocumentCard
                                            label="Title Deed"
                                            href={p.title_deed}
                                        />
                                        <DocumentCard
                                            label="Floor Plan"
                                            href={p.floor_plan}
                                        />
                                        <DocumentCard
                                            label="ID Proof"
                                            href={p.id_proof}
                                        />
                                        <DocumentCard
                                            label="Legal Documents"
                                            href={p.legal_documents}
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1.5">
                                        <IconShield size={13} className="text-emerald-500" />
                                        All documents are securely stored and
                                        encrypted.
                                    </p>
                                </Section>
                            </TabsContent>

                            {/* ── Financial ── */}
                            <TabsContent value="financial" className="mt-6 space-y-6">
                                <Section title="Pricing breakdown">
                                    <div className="rounded-2xl border border-border/60 overflow-hidden divide-y divide-border/50">
                                        {[
                                            {
                                                label: "Listed price",
                                                value: formatPrice(p.price),
                                                highlight: false,
                                            },
                                            {
                                                label: "Discount",
                                                value: discount
                                                    ? `− ${formatPrice(String(discount))}`
                                                    : "None",
                                                highlight: false,
                                                accent: "text-emerald-500",
                                            },
                                            {
                                                label: "Final price",
                                                value: formatPrice(
                                                    String(finalPrice)
                                                ),
                                                highlight: true,
                                            },
                                        ].map(
                                            ({
                                                label,
                                                value,
                                                highlight,
                                                accent,
                                            }) => (
                                                <div
                                                    key={label}
                                                    className={cn(
                                                        "flex items-center justify-between px-5 py-4",
                                                        highlight
                                                            ? "bg-primary/5"
                                                            : "bg-background/50"
                                                    )}
                                                >
                                                    <span
                                                        className={cn(
                                                            "text-sm",
                                                            highlight
                                                                ? "font-semibold text-foreground"
                                                                : "text-muted-foreground"
                                                        )}
                                                    >
                                                        {label}
                                                    </span>
                                                    <span
                                                        className={cn(
                                                            "text-sm font-semibold",
                                                            accent ??
                                                            (highlight
                                                                ? "text-primary"
                                                                : "text-foreground")
                                                        )}
                                                    >
                                                        {value}
                                                    </span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </Section>

                                <Separator />

                                <Section title="Recurring charges">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div className="p-4 rounded-xl bg-muted/40 border border-border/50 space-y-1">
                                            <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                                Property Tax
                                            </p>
                                            <p className="text-lg font-semibold text-foreground">
                                                {p.tax_percentage
                                                    ? `${p.tax_percentage}%`
                                                    : "—"}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Annually
                                            </p>
                                        </div>
                                        <div className="p-4 rounded-xl bg-muted/40 border border-border/50 space-y-1">
                                            <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                                Maintenance
                                            </p>
                                            <p className="text-lg font-semibold text-foreground">
                                                {p.maintenance_charges
                                                    ? formatPrice(
                                                        p.maintenance_charges
                                                    )
                                                    : "—"}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Per month
                                            </p>
                                        </div>
                                    </div>
                                </Section>
                            </TabsContent>
                        </Tabs>
                    </motion.div>

                    {/* ── Right column (sticky sidebar) ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-1"
                    >
                        <div className="sticky top-6 space-y-4">
                            {/* Price card */}
                            <div className="rounded-2xl border border-border/60 bg-card p-5 space-y-4">
                                <div>
                                    {discount > 0 && (
                                        <p className="text-sm text-muted-foreground line-through mb-0.5">
                                            {formatPrice(p.price)}
                                        </p>
                                    )}
                                    <div className="flex items-end gap-2">
                                        <span className="text-3xl font-bold text-foreground tracking-tight">
                                            {formatPrice(String(finalPrice))}
                                        </span>
                                    </div>
                                    {discount > 0 && (
                                        <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-emerald-500/12 text-emerald-600 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                                            Save{" "}
                                            {formatPrice(String(discount))}
                                        </span>
                                    )}
                                </div>

                                <Separator />

                                {/* <div className="space-y-2">
                                    <Button className="w-full rounded-xl h-10 font-semibold">
                                        <IconCurrencyDollar size={16} />
                                        Make an Offer
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full rounded-xl h-10"
                                    >
                                        Schedule Viewing
                                    </Button>
                                </div> */}
                            </div>

                            {/* Property summary card */}
                            <div className="rounded-2xl border border-border/60 bg-card p-5 space-y-3">
                                <h3 className="text-sm font-semibold text-foreground">
                                    At a glance
                                </h3>
                                {[
                                    {
                                        label: "Type",
                                        value: p.type ?? "—",
                                    },
                                    {
                                        label: "Bedrooms",
                                        value: `${p.bedrooms} beds`,
                                    },
                                    {
                                        label: "Bathrooms",
                                        value: `${p.bathrooms} baths`,
                                    },
                                    {
                                        label: "Area",
                                        value: `${Number(p.area).toLocaleString()} ft²`,
                                    },
                                    {
                                        label: "Floor",
                                        value: `${p.floor_number} of ${p.total_floors}`,
                                    },
                                    {
                                        label: "Balconies",
                                        value: `${p.balconies}`,
                                    },
                                    {
                                        label: "Year Built",
                                        value: `${p.year_built}`,
                                    },
                                    {
                                        label: "Furnishing",
                                        value: FURNISHING_LABELS[
                                            p.furnishing_status ?? ""
                                        ] ?? "—",
                                    },
                                    {
                                        label: "Facing",
                                        value: FACING_LABELS[
                                            p.facing_direction ?? ""
                                        ] ?? "—",
                                    },
                                ].map(({ label, value }) => (
                                    <div
                                        key={label}
                                        className="flex items-center justify-between"
                                    >
                                        <span className="text-xs text-muted-foreground">
                                            {label}
                                        </span>
                                        <span className="text-xs font-medium text-foreground">
                                            {value}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Timestamps */}
                            <div className="rounded-2xl border border-border/60 bg-card p-5 space-y-2">
                                <h3 className="text-sm font-semibold text-foreground mb-3">
                                    Listing info
                                </h3>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-muted-foreground">
                                            Listed on
                                        </span>
                                        <span className="text-xs font-medium text-foreground">
                                            {formatDate(p.created_at)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-muted-foreground">
                                            Last updated
                                        </span>
                                        <span className="text-xs font-medium text-foreground">
                                            {formatDate(p.updated_at)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-muted-foreground">
                                            Property ID
                                        </span>
                                        <span className="text-xs font-medium text-foreground font-mono">
                                            #{p.id}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}