import { create } from 'zustand';
import api from '@/api/axios'; // Importing your configured Axios instance
import { AgencyPayload } from '@/types/agency.types';

const initialFormData: AgencyPayload = {
  person_id: 0,
  company_identity: {
    agency_legal_name: '',
    trading_name_brand: '',
    agency_type: '',
    franchise_name: '',
    company_registration_no: '',
    vat_number: '',
    incorporation_date: new Date().toISOString(),
    founding_year: 2026,
    staff_size_bracket: '',
    total_agents: 0,
    offices_count: 0,
    countries_of_operation: [],
    cantons_of_operation: [],
    primary_market: '',
    specialisation: [],
    portals_used: [],
    agency_website: '',
    social_media: {
      instagram: '',
      facebook: '',
      linkedin: '',
    },
  },
  address_contact: {
    registered_address: { line_1: '', line_2: '', zip_code: '', city: '', country: '' },
    office_address: { line_1: '', line_2: '', zip_code: '', city: '', country: '' },
    general_phone: '',
    general_email: '',
    primary_contact_person_id: 0,
    secondary_contact_person_id: 0,
    director_owner_name: '',
    director_owner_email: '',
    director_owner_phone: '',
    after_hours_emergency_contact: '',
  },
  partnership: {
    type: '',
    status: '',
    agreement_signed: false,
    start_date: new Date().toISOString(),
    end_date: new Date().toISOString(),
    agreement_file: '',
    exclusivity: '',
    exclusive_geographic_zones: [],
    commission_structure_sale: '',
    commission_structure_rental: '',
    commission_split: '',
    commission_split_method: '',
    who_bears_advertising_costs: '',
    nda_signed: false,
    nda_file: '',
    data_sharing_agreement_gdpr: false,
    data_sharing_agreement_date: new Date().toISOString(),
    iban: '',
    bank_name: '',
    payment_terms: '',
    dispute_resolution_clause: '',
    notice_period_terminate: '',
  },
  portal_access: {
    granted: false,
    login_email: '',
    permission_level: '',
    listings_they_can_publish: '',
    can_view_our_listings: '',
    can_see_client_data: '',
    can_access_reports: false,
    max_active_listings: 0,
    activation_date: new Date().toISOString(),
    last_login_at: new Date().toISOString(),
    api_integration: false,
    api_key: '',
    listing_feed_format: '',
    auto_sync_frequency: '',
    mls_access: [],
  },
  activity: {
    comandated_properties_active: 0,
    referrals_sent_to_us: 0,
    referrals_we_sent: 0,
    transactions_closed_together: 0,
    total_cotransaction_volume: '',
    total_commission_paid: '',
    total_commission_received: '',
    last_joint_transaction_date: new Date().toISOString(),
    relationship_score: '',
    relationship_notes: '',
    issues_complaints_log: [],
    annual_review_date: new Date().toISOString(),
  },
};

interface AgencyStore {
  formData: AgencyPayload;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
  
  // Dynamic State Modifiers
  setFormData: (data: Partial<AgencyPayload>) => void;
  updateNestedField: (section: keyof AgencyPayload, field: string, value: any) => void;
  updateSubNestedField: (section: keyof AgencyPayload, subSection: string, field: string, value: any) => void;
  toggleArrayItem: (section: keyof AgencyPayload, arrayField: string, item: string) => void;
  resetForm: () => void;

  // API Actions
  fetchAgencyProfile: (id: number | string) => Promise<void>;
  submitAgencyProfile: () => Promise<void>;
  updateAgencyProfile: (id: number | string) => Promise<void>;
}

export const useAgencyStore = create<AgencyStore>((set, get) => ({
  formData: initialFormData,
  loading: false,
  error: null,
  successMessage: null,

  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),

  // Updates single-level nested properties
  updateNestedField: (section, field, value) => {
    set((state) => ({
      formData: {
        ...state.formData,
        [section]: {
          ...(state.formData[section] as object),
          [field]: value,
        },
      },
    }));
  },

  // Updates double-nested properties (e.g., company_identity -> social_media -> instagram)
  updateSubNestedField: (section, subSection, field, value) => {
    set((state) => {
      const sectionData = state.formData[section] as any;
      return {
        formData: {
          ...state.formData,
          [section]: {
            ...sectionData,
            [subSection]: {
              ...sectionData[subSection],
              [field]: value,
            },
          },
        },
      };
    });
  },

  // Toggles string items in array fields
  toggleArrayItem: (section, arrayField, item) => {
    set((state) => {
      const sectionObj = state.formData[section] as any;
      const currentList: string[] = sectionObj[arrayField] || [];
      const updatedList = currentList.includes(item)
        ? currentList.filter((i) => i !== item)
        : [...currentList, item];

      return {
        formData: {
          ...state.formData,
          [section]: {
            ...sectionObj,
            [arrayField]: updatedList,
          },
        },
      };
    });
  },

  resetForm: () => set({ formData: initialFormData, error: null, successMessage: null }),

  // GET: Fetch existing agency profile
  fetchAgencyProfile: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`/agency-profiles/${id}`);
      if (response.data?.data) {
        set({ formData: response.data.data, loading: false });
      }
    } catch (err: any) {
      set({
        loading: false,
        error: err.response?.data?.message || 'Failed to fetch agency profile.',
      });
    }
  },

  // POST: Create a new agency profile
  submitAgencyProfile: async () => {
    set({ loading: true, error: null, successMessage: null });
    try {
      const { formData } = get();
      const response = await api.post('/agency-profiles', formData);
      
      set({
        loading: false,
        successMessage: response.data?.message || 'Agency profile created successfully!',
      });
    } catch (err: any) {
      set({
        loading: false,
        error: err.response?.data?.message || 'Failed to submit agency profile.',
      });
    }
  },

  // PUT/PATCH: Update existing agency profile
  updateAgencyProfile: async (id) => {
    set({ loading: true, error: null, successMessage: null });
    try {
      const { formData } = get();
      const response = await api.put(`/agency-profiles/${id}`, formData);

      set({
        loading: false,
        successMessage: response.data?.message || 'Agency profile updated successfully!',
      });
    } catch (err: any) {
      set({
        loading: false,
        error: err.response?.data?.message || 'Failed to update agency profile.',
      });
    }
  },
}));