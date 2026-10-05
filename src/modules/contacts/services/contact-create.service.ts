import api from "@/api/axios"
import type { ContactFormData } from "@/types/contact.types"

export interface CreateContactPayload {
    person_id: number

    client_roles: string[]
    client_sub_type: string
    client_category: string
    relationship_stage: string
    priority_level: string
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

    aml_kyc_status: string | null
    aml_kyc_verified_at: string | null
    aml_kyc_method: string | null
    aml_risk_rating: string | null

    pep_declared: boolean
    pep_details: string | null

    id_document_type: string | null
    id_document_number: string | null
    id_expiry_date: string | null
    id_document_path: string | null

    search_transaction_type: string | null
    search_property_categories: string[]
    search_property_subtypes: string[]
    search_countries: string[]
    search_cantons: string[]
    search_cities: string[]
    search_neighbourhoods: string | null
    search_radius_km: number | null
    search_reference_location: string | null
    search_min_living_area: number | null
    search_max_living_area: number | null
    search_min_land_area: number | null
    search_min_rooms: number | null
    search_min_bedrooms: number | null
    search_min_bathrooms: number | null
    search_garage_required: string | null
    search_garage_min_spaces: number | null
    search_garden_required: string | null
    search_terrace_balcony_required: string | null
    search_swimming_pool: string | null
    search_view_preference: string | null
    search_orientation_preference: string | null
    search_floor_preference: string | null
    search_elevator_required: string | null
    search_disability_access_required: boolean | null
    search_pets_allowed_required: string | null
    search_furnished: string | null
    search_min_year_construction: number | null
    search_max_year_construction: number | null
    search_max_renovation_needed: string | null
    search_min_energy_class: string | null
    search_heating_preference: string | null
    search_ev_charging_required: string | null
    search_home_office_required: string | null
    search_max_monthly_charges: number | null
    search_desired_movein_date: string | null

    matching_alert_active: boolean
    alert_frequency: string | null
    alert_delivery: string[]

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
    renovation_planned_before_sale: boolean
    renovation_planned_budget: number | null

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
    event_attendance: string[]
    social_media_notes: string | null

    assigned_agent_id: number | null
    secondary_agent_id: number | null
    spouse_contact_id: number | null
    notary_partner_id: number | null
    mortgage_broker_partner_id: number | null
    lawyer_partner_id: number | null
}

export interface CreateContactResponse {
    data?: unknown
    message?: string
    [key: string]: unknown
}

/**
 * Convert an empty string / undefined value to null.
 */
const nullableString = (
    value: string | undefined | null
): string | null => {
    if (value === undefined || value === null || value === "") {
        return null
    }

    return value
}

/**
 * Convert a form value to a number.
 * Empty values become null.
 */
const nullableNumber = (
    value: number | string | undefined | null
): number | null => {
    if (value === undefined || value === null || value === "") {
        return null
    }

    const numberValue = Number(value)

    return Number.isNaN(numberValue) ? null : numberValue
}

/**
 * Convert an ID stored as a string in the UI to a number.
 */
const nullableId = (
    value: string | number | undefined | null
): number | null => {
    if (value === undefined || value === null || value === "") {
        return null
    }

    const id = Number(value)

    return Number.isNaN(id) ? null : id
}

/**
 * Convert a date field to an API-friendly ISO string.
 */
const nullableDate = (
    value: string | undefined | null
): string | null => {
    if (!value) {
        return null
    }

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
        return null
    }

    return date.toISOString()
}

/**
 * Convert yes/no/indifferent style fields into the API's
 * string-based values.
 *
 * The create API explicitly accepts strings for these fields,
 * so we preserve the form value instead of converting it to
 * boolean.
 */
const nullableChoice = (
    value: string | undefined | null
): string | null => {
    return nullableString(value)
}

/**
 * Build the flat request body expected by:
 *
 * POST /v1/contact-profiles
 */
export const buildCreateContactPayload = (
    form: ContactFormData
): CreateContactPayload => {
    return {
        person_id: 0,

        // Client classification
        client_roles: form.clientRoles || [],
        client_sub_type: form.clientSubtype,
        client_category: form.clientCategory,
        relationship_stage: form.relationshipStage,
        priority_level: form.priorityLevel,
        is_referred_client: form.isReferred,
        exclusivity_with_agency: form.exclusivityWithAgency,
        signed_agency_agreement: form.signedAgencyAgreement,
        signed_agency_agreement_date: nullableDate(
            form.agencyAgreementDate
        ),
        signed_agency_agreement_file: null,
        has_power_of_attorney: form.hasPowerOfAttorney,
        power_of_attorney_holder: nullableString(
            form.poaHolderName
        ),
        power_of_attorney_file: null,
        legal_entity_name: nullableString(form.companyName),
        company_registration_number: nullableString(
            form.companyRegistrationNo
        ),
        vat_uid_number: nullableString(form.vatUidNumber),
        legal_representative_name: nullableString(
            form.legalRepresentativeName
        ),
        legal_representative_partner_id: nullableId(
            form.legalRepresentativeContactId
        ),
        fiscal_domicile_country: nullableString(
            form.fiscalDomicileCountry
        ),
        resident_in_switzerland:
            form.isResidentInSwitzerland ?? null,
        swiss_residence_permit_type: nullableString(
            form.swissResidencePermitType
        ),
        lex_koller_restricted:
            form.lexKollerRestriction ?? null,

        // Financial profile
        budget_min: nullableNumber(form.budgetMin),
        budget_max: nullableNumber(form.budgetMax),
        budget_currency: nullableString(form.budgetCurrency),
        budget_flexibility: nullableString(
            form.budgetFlexibility
        ),
        financing_method: nullableString(form.financingMethod),
        mortgage_preapproval_status: nullableString(
            form.mortgagePreApprovalStatus
        ),
        mortgage_preapproval_bank: nullableString(
            form.preApprovalBank
        ),
        mortgage_preapproval_amount: nullableNumber(
            form.preApprovalAmount
        ),
        mortgage_preapproval_expiry: nullableDate(
            form.preApprovalExpiryDate
        ),
        mortgage_advisor_name: nullableString(
            form.mortgageAdvisorContactId
        ),
        mortgage_advisor_partner_id: null,
        equity_available: nullableNumber(
            form.equityAvailable
        ),
        mortgage_amount_required: nullableNumber(
            form.mortgageAmountRequired
        ),
        monthly_rental_budget: nullableNumber(
            form.monthlyRentalBudget
        ),
        investment_return_target_pct: nullableNumber(
            form.investmentReturnTarget
        ),
        net_worth_bracket: nullableString(
            form.netWorthIndication
        ),
        source_of_funds: nullableString(form.sourceOfFunds),

        // AML / KYC
        aml_kyc_status: nullableString(form.amlKycStatus),
        aml_kyc_verified_at: nullableDate(
            form.amlVerificationDate
        ),
        aml_kyc_method: nullableString(
            form.amlVerificationMethod
        ),
        aml_risk_rating: nullableString(form.amlRiskRating),

        // PEP
        pep_declared: form.isPepDeclared,
        pep_details: nullableString(form.pepDetails),

        // Identity document
        id_document_type: nullableString(
            form.idDocumentType
        ),
        id_document_number: nullableString(
            form.idDocumentNumber
        ),
        id_expiry_date: nullableDate(form.idExpiryDate),
        id_document_path: null,

        // Property search criteria
        search_transaction_type: nullableString(
            form.transactionTypeSought
        ),
        search_property_categories:
            form.propertyCategories || [],
        search_property_subtypes:
            form.propertySubTypes || [],
        search_countries:
            form.preferredCountries || [],
        search_cantons:
            form.preferredCantons || [],
        search_cities:
            form.preferredCities || [],
        search_neighbourhoods: nullableString(
            form.preferredNeighbourhoods?.join(", ")
        ),
        search_radius_km: nullableNumber(form.radiusKm),
        search_reference_location: nullableString(
            form.referenceLocation
        ),
        search_min_living_area: nullableNumber(
            form.minLivingArea
        ),
        search_max_living_area: nullableNumber(
            form.maxLivingArea
        ),
        search_min_land_area: nullableNumber(
            form.minLandArea
        ),
        search_min_rooms: nullableNumber(form.minRooms),
        search_min_bedrooms: nullableNumber(
            form.minBedrooms
        ),
        search_min_bathrooms: nullableNumber(
            form.minBathrooms
        ),
        search_garage_required: nullableChoice(
            form.parkingRequirement
        ),
        search_garage_min_spaces: nullableNumber(
            form.minParkingSpaces
        ),
        search_garden_required: nullableChoice(
            form.gardenRequirement
        ),
        search_terrace_balcony_required: nullableChoice(
            form.terraceBalconyRequirement
        ),
        search_swimming_pool: null,
        search_view_preference: nullableString(
            form.viewPreference
        ),
        search_orientation_preference: nullableString(
            form.orientationPreference
        ),
        search_floor_preference: nullableString(
            form.floorPreference
        ),
        search_elevator_required: nullableChoice(
            form.elevatorRequired
        ),
        search_disability_access_required: null,
        search_pets_allowed_required: null,
        search_furnished: nullableChoice(form.furnished),
        search_min_year_construction: nullableNumber(
            form.minYearBuilt
        ),
        search_max_year_construction: nullableNumber(
            form.maxYearBuilt
        ),
        search_max_renovation_needed: nullableString(
            form.maxRenovationNeeded
        ),
        search_min_energy_class: nullableString(
            form.minEnergyClass
        ),
        search_heating_preference: nullableString(
            form.heatingSystemPreference
        ),
        search_ev_charging_required: nullableChoice(
            form.evChargingRequired
        ),
        search_home_office_required: nullableChoice(
            form.homeOfficeRequired
        ),
        search_max_monthly_charges: nullableNumber(
            form.maxMonthlyCharges
        ),
        search_desired_movein_date: nullableString(
            form.desiredMoveInDate
        ),

        // Matching alerts
        matching_alert_active: form.matchingAlertActive,
        alert_frequency: nullableString(
            form.alertFrequency
        ),
        alert_delivery:
            form.alertDeliveryChannels || [],

        // Seller profile
        is_owner_vendor: form.isOwnerVendor,
        estimated_value_owner: nullableNumber(
            form.estimatedValueProperty
        ),
        agency_valuation: nullableNumber(
            form.agencyValuation
        ),
        valuation_date: nullableDate(form.valuationDate),
        mandate_type_sought: nullableString(
            form.mandateTypeSought
        ),
        reason_for_selling: nullableString(
            form.reasonForSellingRenting
        ),
        urgency_to_sell: nullableString(
            form.urgencyToSellRent
        ),
        competing_agencies: nullableString(
            form.competingAgencies
        ),
        mortgage_outstanding:
            form.hasMortgageOutstanding,
        mortgage_outstanding_amount: nullableNumber(
            form.mortgageOutstandingAmount
        ),
        minimum_net_price: nullableNumber(
            form.minimumNetPriceConfidential
        ),
        renovation_planned_before_sale:
            form.renovationPlannedBeforeSale,
        renovation_planned_budget: nullableNumber(
            form.renovationBudget
        ),

        // Communication summary
        total_emails_sent: nullableNumber(
            form.totalEmailsSentReceived
        ),
        total_calls_made: null,
        total_meetings_held: null,
        total_viewings_attended: null,
        total_offers_made: null,
        total_dossiers_sent: null,
        total_alerts_sent: nullableNumber(
            form.totalAlertsSent
        ),
        last_email_at: null,
        last_call_at: null,
        last_meeting_at: null,
        last_viewing_at: null,
        event_attendance: form.eventsAttended || [],
        social_media_notes: nullableString(
            form.socialMediaNotes
        ),

        // Relationships
        assigned_agent_id: nullableId(
            form.assignedAgentId
        ),
        secondary_agent_id: nullableId(
            form.secondaryAgentId
        ),
        spouse_contact_id: nullableId(
            form.spousePartnerId
        ),
        notary_partner_id: nullableId(form.notaryId),
        mortgage_broker_partner_id: nullableId(
            form.mortgageBrokerBankId
        ),
        lawyer_partner_id: nullableId(
            form.legalRepresentativeId
        ),
    }
}

/**
 * Create a contact profile.
 */
export const createContact = async (
    payload: CreateContactPayload
): Promise<CreateContactResponse> => {
    const response = await api.post<CreateContactResponse>(
        "/contact-profiles",
        payload
    )

    return response.data
}