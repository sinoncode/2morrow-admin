export interface ContactClassification {
    client_roles: string[] | null
    client_sub_type: string | null
    client_category: string | null
    relationship_stage: string | null
    priority_level: string | null

    is_referred_client: boolean
    exclusivity_with_agency: boolean
    signed_agency_agreement: boolean
    signed_agency_agreement_date: string | null
    signed_agency_agreement_file: string | null

    has_power_of_attorney: boolean
    power_of_attorney_holder: string | null
    power_of_attorney_file: string | null

    legal_entity_name: string | null
    company_registration_number: string | null
    vat_uid_number: string | null
    legal_representative_name: string | null
    legal_representative_partner_id: number | null

    fiscal_domicile_country: string | null
    resident_in_switzerland: boolean | null
    swiss_residence_permit_type: string | null
    lex_koller_restricted: boolean | null
}

export interface ContactFinancial {
    budget_min: number | null
    budget_max: number | null
    budget_currency: string | null
    budget_flexibility: string | null

    financing_method: string | null
    mortgage_preapproval_status: string | null
    mortgage_preapproval_bank: string | null
    mortgage_preapproval_amount: number | null
    mortgage_preapproval_expiry: string | null

    mortgage_advisor_name: string | null
    mortgage_advisor_partner_id: number | null

    equity_available: number | null
    mortgage_amount_required: number | null
    monthly_rental_budget: number | null

    investment_return_target_pct: number | null
    net_worth_bracket: string | null
    source_of_funds: string | null
}

export interface ContactAmlKyc {
    status: string | null
    verified_at: string | null
    method: string | null
    risk_rating: string | null
}

export interface ContactPepStatus {
    pep_declared: boolean
    pep_details: string | null
}

export interface ContactIdDocument {
    type: string | null
    number: string | null
    expiry_date: string | null
    document_path: string | null
}

export interface ContactSearchCriteria {
    transaction_type: string | null
    property_categories: string[] | null
    property_subtypes: string[] | null

    countries: string[] | null
    cantons: string[] | null
    cities: string[] | null
    neighbourhoods: string[] | null

    radius_km: number | null
    reference_location: string | null

    min_living_area: number | null
    max_living_area: number | null
    min_land_area: number | null

    min_rooms: number | null
    min_bedrooms: number | null
    min_bathrooms: number | null

    garage_required: boolean | null
    garage_min_spaces: number | null
    garden_required: boolean | null
    terrace_balcony_required: boolean | null
    swimming_pool: boolean | null

    view_preference: string | null
    orientation_preference: string | null
    floor_preference: string | null

    elevator_required: boolean | null
    disability_access_required: boolean | null
    pets_allowed_required: boolean | null
    furnished: boolean | null

    min_year_construction: number | null
    max_year_construction: number | null

    max_renovation_needed: number | null
    min_energy_class: string | null
    heating_preference: string | null

    ev_charging_required: boolean | null
    home_office_required: boolean | null

    max_monthly_charges: number | null
    desired_movein_date: string | null
}

export interface ContactAlerts {
    active: boolean
    frequency: string | null
    delivery: string | null
}

export interface ContactSellerProfile {
    is_owner_vendor: boolean

    estimated_value_owner: number | null
    agency_valuation: number | null
    valuation_date: string | null

    mandate_type_sought: string | null
    reason_for_selling: string | null
    urgency_to_sell: string | null
    competing_agencies: string | null

    mortgage_outstanding: boolean
    mortgage_outstanding_amount: number | null

    minimum_net_price: number | null

    renovation_planned_before_sale: string | null
    renovation_planned_budget: number | null
}

export interface ContactCommunicationSummary {
    total_emails_sent: number | null
    total_calls_made: number | null
    total_meetings_held: number | null
    total_viewings_attended: number | null
    total_offers_made: number | null
    total_dossiers_sent: number | null
    total_alerts_sent: number | null

    last_email_at: string | null
    last_call_at: string | null
    last_meeting_at: string | null
    last_viewing_at: string | null

    event_attendance: string | null
    social_media_notes: string | null
}

export interface ContactRelationships {
    assigned_agent_id: number | null
    secondary_agent_id: number | null
    spouse_contact_id: number | null
    notary_partner_id: number | null
    mortgage_broker_partner_id: number | null
    lawyer_partner_id: number | null
}

export interface ContactAudit {
    created_by: number | null
    created_at: string | null
    last_modified_by: number | null
    last_modified_at: string | null
}

export interface ContactProfile {
    id: number
    person_id: number

    classification: ContactClassification
    financial: ContactFinancial
    aml_kyc: ContactAmlKyc
    pep_status: ContactPepStatus
    id_document: ContactIdDocument
    search_criteria: ContactSearchCriteria
    alerts: ContactAlerts
    seller_profile: ContactSellerProfile
    communication_summary: ContactCommunicationSummary
    relationships: ContactRelationships
    audit: ContactAudit
}

export interface ContactPaginationLink {
    url: string | null
    label: string
    page: number | null
    active: boolean
}

export interface ContactLinks {
    first: string | null
    last: string | null
    prev: string | null
    next: string | null
}

export interface ContactListMeta {
    current_page: number
    from: number | null
    last_page: number
    links: ContactPaginationLink[]
    path: string
    per_page: number
    to: number | null
    total: number
}

export interface ContactListResponse {
    data: ContactProfile[]
    links: ContactLinks
    meta: ContactListMeta
}