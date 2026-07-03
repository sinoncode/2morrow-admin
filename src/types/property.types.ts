export type PropertyStatus =
    | "active"
    | "draft"
    | "sold"
    | "inactive"
    | "archived";

export type ListingType = "sale" | "rent";

export type FurnishingStatus =
    | "fully_furnished"
    | "semi_furnished"
    | "unfurnished";

export type FacingDirection =
    | "north"
    | "south"
    | "east"
    | "west"
    | "north_east"
    | "north_west"
    | "south_east"
    | "south_west";

export interface Property {
    id: number;

    // Basic information
    title: string;
    description: string | null;
    price: string;
    status: PropertyStatus;
    type: string | null;
    listing_type: ListingType | null;

    // Location
    address: string | null;
    city: string | null;
    state: string | null;
    zip_code: string | null;
    latitude: string | null;
    longitude: string | null;
    neighborhood_description: string | null;

    // Property details
    bedrooms: number | null;
    bathrooms: number | null;
    area: string | null;
    balconies: number | null;
    floor_number: number | null;
    total_floors: number | null;
    year_built: number | null;
    furnishing_status: FurnishingStatus | null;
    facing_direction: FacingDirection | null;

    // Parking
    covered_parking: boolean;
    open_parking: boolean;
    parking_slots: number | null;

    // Financial information
    tax_percentage: string | null;
    maintenance_charges: string | null;
    discount: string | null;

    // Features and amenities
    indoor_amenities: string[] | null;
    outdoor_features: string[] | null;
    smart_features: string[] | null;
    high_value_assets: string[] | null;

    // Media
    video_url: string | null;
    virtual_tour_url: string | null;

    // Documents
    title_deed: string | null;
    floor_plan: string | null;
    id_proof: string | null;
    legal_documents: string | null;

    // SEO / search
    keywords: string[] | null;

    // API timestamps
    created_at: string;
    updated_at: string;
}

export interface PropertyPayload {
    // Required by API
    title: string;
    listing_type: ListingType;
    price: string | number;

    // Basic information
    description?: string | null;
    status?: PropertyStatus;
    type?: string | null;

    // Location
    address?: string | null;
    city?: string | null;
    state?: string | null;
    zip_code?: string | null;
    latitude?: string | null;
    longitude?: string | null;
    neighborhood_description?: string | null;

    // Property details
    bedrooms?: number | null;
    bathrooms?: number | null;
    area?: string | number | null;
    balconies?: number | null;
    floor_number?: number | null;
    total_floors?: number | null;
    year_built?: number | null;
    furnishing_status?: FurnishingStatus | null;
    facing_direction?: FacingDirection | null;

    // Parking
    covered_parking?: boolean;
    open_parking?: boolean;
    parking_slots?: number | null;

    // Financial information
    tax_percentage?: string | number | null;
    maintenance_charges?: string | number | null;
    discount?: string | number | null;

    // Features and amenities
    indoor_amenities?: string[];
    outdoor_features?: string[];
    smart_features?: string[];
    high_value_assets?: string[];

    // Media
    video_url?: string | null;
    virtual_tour_url?: string | null;

    // Documents
    title_deed?: string | null;
    floor_plan?: string | null;
    id_proof?: string | null;
    legal_documents?: string | null;

    // SEO / search
    keywords?: string[];
}

export interface PropertyMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export interface PropertyListResponse {
    success: boolean;
    message: string;
    data: Property[];
    meta: PropertyMeta;
}

export interface PropertyResponse {
    success: boolean;
    message: string;
    data: Property;
}

export interface PropertyValidationErrors {
    title?: string[];
    listing_type?: string[];
    price?: string[];
    description?: string[];
    status?: string[];
    type?: string[];
    address?: string[];
    city?: string[];
    state?: string[];
    zip_code?: string[];
    bedrooms?: string[];
    bathrooms?: string[];
    area?: string[];
    [key: string]: string[] | undefined;
}

export interface PropertyErrorResponse {
    success: false;
    message: string;
    errors?: PropertyValidationErrors;
}

export const PROPERTY_STATUS_OPTIONS: {
    value: PropertyStatus;
    label: string;
}[] = [
        {
            value: "active",
            label: "Active",
        },
        {
            value: "draft",
            label: "Draft",
        },
        {
            value: "sold",
            label: "Sold",
        },
        {
            value: "inactive",
            label: "Inactive",
        },
        {
            value: "archived",
            label: "Archived",
        },
    ];

export const LISTING_TYPE_OPTIONS: {
    value: ListingType;
    label: string;
}[] = [
        {
            value: "sale",
            label: "For Sale",
        },
        {
            value: "rent",
            label: "For Rent",
        },
    ];

export const PROPERTY_TYPE_OPTIONS = [
    "Apartment",
    "Villa",
    "Penthouse",
    "Office",
    "House",
    "Studio",
    "Land",
    "Commercial",
    "Warehouse",
    "Shop",
];

export const FURNISHING_STATUS_OPTIONS: {
    value: FurnishingStatus;
    label: string;
}[] = [
        {
            value: "fully_furnished",
            label: "Fully Furnished",
        },
        {
            value: "semi_furnished",
            label: "Semi Furnished",
        },
        {
            value: "unfurnished",
            label: "Unfurnished",
        },
    ];

export const FACING_DIRECTION_OPTIONS: {
    value: FacingDirection;
    label: string;
}[] = [
        {
            value: "north",
            label: "North",
        },
        {
            value: "south",
            label: "South",
        },
        {
            value: "east",
            label: "East",
        },
        {
            value: "west",
            label: "West",
        },
        {
            value: "north_east",
            label: "North East",
        },
        {
            value: "north_west",
            label: "North West",
        },
        {
            value: "south_east",
            label: "South East",
        },
        {
            value: "south_west",
            label: "South West",
        },
    ];

export const DEFAULT_PROPERTY_FORM: PropertyPayload = {
    title: "",
    description: "",
    price: "",
    status: "draft",
    type: "",
    listing_type: "sale",

    address: "",
    city: "",
    state: "",
    zip_code: "",
    latitude: "",
    longitude: "",
    neighborhood_description: "",

    bedrooms: null,
    bathrooms: null,
    area: null,
    balconies: null,
    floor_number: null,
    total_floors: null,
    year_built: null,
    furnishing_status: null,
    facing_direction: null,

    covered_parking: false,
    open_parking: false,
    parking_slots: null,

    tax_percentage: null,
    maintenance_charges: null,
    discount: null,

    indoor_amenities: [],
    outdoor_features: [],
    smart_features: [],
    high_value_assets: [],

    video_url: "",
    virtual_tour_url: "",

    title_deed: "",
    floor_plan: "",
    id_proof: "",
    legal_documents: "",

    keywords: [],
};