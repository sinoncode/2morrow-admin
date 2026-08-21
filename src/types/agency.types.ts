export interface CompanyIdentity {
  agency_legal_name: string;
  trading_name_brand: string;
  agency_type: string;
  franchise_name: string;
  company_registration_no: string;
  vat_number: string;
  incorporation_date: string;
  founding_year: number;
  staff_size_bracket: string;
  total_agents: number;
  offices_count: number;
  countries_of_operation: string[];
  cantons_of_operation: string[];
  primary_market: string;
  specialisation: string[];
  portals_used: string[];
  agency_website: string;
  social_media: {
    instagram: string;
    facebook: string;
    linkedin: string;
  };
}

export interface Address {
  line_1: string;
  line_2: string;
  zip_code: string;
  city: string;
  country: string;
}

export interface AddressContact {
  registered_address: Address;
  office_address: Address;
  general_phone: string;
  general_email: string;
  primary_contact_person_id: number;
  secondary_contact_person_id: number;
  director_owner_name: string;
  director_owner_email: string;
  director_owner_phone: string;
  after_hours_emergency_contact: string;
}

export interface Partnership {
  type: string;
  status: string;
  agreement_signed: boolean;
  start_date: string;
  end_date: string;
  agreement_file: string;
  exclusivity: string;
  exclusive_geographic_zones: string[];
  commission_structure_sale: string;
  commission_structure_rental: string;
  commission_split: string;
  commission_split_method: string;
  who_bears_advertising_costs: string;
  nda_signed: boolean;
  nda_file: string;
  data_sharing_agreement_gdpr: boolean;
  data_sharing_agreement_date: string;
  iban: string;
  bank_name: string;
  payment_terms: string;
  dispute_resolution_clause: string;
  notice_period_terminate: string;
}

export interface PortalAccess {
  granted: boolean;
  login_email: string;
  permission_level: string;
  listings_they_can_publish: string;
  can_view_our_listings: string;
  can_see_client_data: string;
  can_access_reports: boolean;
  max_active_listings: number;
  activation_date: string;
  last_login_at: string;
  api_integration: boolean;
  api_key: string;
  listing_feed_format: string;
  auto_sync_frequency: string;
  mls_access: string[];
}

export interface Activity {
  comandated_properties_active: number;
  referrals_sent_to_us: number;
  referrals_we_sent: number;
  transactions_closed_together: number;
  total_cotransaction_volume: string;
  total_commission_paid: string;
  total_commission_received: string;
  last_joint_transaction_date: string;
  relationship_score: string;
  relationship_notes: string;
  issues_complaints_log: string[];
  annual_review_date: string;
}

export interface AgencyPayload {
  person_id: number;
  company_identity: CompanyIdentity;
  address_contact: AddressContact;
  partnership: Partnership;
  portal_access: PortalAccess;
  activity: Activity;
}

export type AgencyRequestPayload = Omit<AgencyPayload, 'portal_access'> & {
  portal_access: boolean;
};

export interface AgencyProfileItem extends AgencyPayload {
  id: number | string;
  created_at?: string;
  updated_at?: string;
}

export interface AgencyListParams {
  page?: number;
  per_page?: number;
  search?: string;
  agency_type?: string;
  status?: string;
}

export interface AgencyResponse {
  success?: boolean;
  message?: string;
  data: AgencyPayload | AgencyProfileItem;
}

export interface AgencyListResponse {
  success?: boolean;
  message?: string;
  data: AgencyProfileItem[];
  total?: number;
  page?: number;
  per_page?: number;
}