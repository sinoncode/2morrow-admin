import { create } from 'zustand';
import { AgencyService } from '@/services/agency.service';
import { toast } from '@/lib/toast';
import type {
  AgencyPayload,
  AgencyProfileItem,
  AgencyListParams,
  CompanyIdentity,
  AddressContact,
  Address,
  Partnership,
  PortalAccess,
  Activity,
  AgencyRequestPayload,
} from '@/types/agency.types';

export const initialFormData: AgencyPayload = {
  person_id: 0,
  company_identity: {
    agency_legal_name: '',
    trading_name_brand: '',
    agency_type: 'independent',
    franchise_name: '',
    company_registration_no: '',
    vat_number: '',
    incorporation_date: '',
    founding_year: new Date().getFullYear(),
    staff_size_bracket: '1-10',
    total_agents: 1,
    offices_count: 1,
    countries_of_operation: ['Switzerland'],
    cantons_of_operation: [],
    primary_market: 'residential',
    specialisation: ['Residential'],
    portals_used: [],
    agency_website: '',
    social_media: {
      instagram: '',
      facebook: '',
      linkedin: '',
    },
  },
  address_contact: {
    registered_address: { line_1: '', line_2: '', zip_code: '', city: '', country: 'Switzerland' },
    office_address: { line_1: '', line_2: '', zip_code: '', city: '', country: 'Switzerland' },
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
    type: 'franchise',
    status: 'active',
    agreement_signed: false,
    start_date: '',
    end_date: '',
    agreement_file: '',
    exclusivity: 'exclusive',
    exclusive_geographic_zones: [],
    commission_structure_sale: '',
    commission_structure_rental: '',
    commission_split: '80/20',
    commission_split_method: 'Fixed Percentage',
    who_bears_advertising_costs: 'Agency',
    nda_signed: false,
    nda_file: '',
    data_sharing_agreement_gdpr: false,
    data_sharing_agreement_date: '',
    iban: '',
    bank_name: '',
    payment_terms: 'net-30',
    dispute_resolution_clause: '',
    notice_period_terminate: '3 months',
  },
  portal_access: {
    granted: true,
    login_email: '',
    permission_level: 'agent',
    listings_they_can_publish: 'all',
    can_view_our_listings: 'full_access',
    can_see_client_data: 'full',
    can_access_reports: false,
    max_active_listings: 50,
    activation_date: '',
    last_login_at: '',
    api_integration: false,
    api_key: '',
    listing_feed_format: 'JSON',
    auto_sync_frequency: 'Daily',
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
    last_joint_transaction_date: '',
    relationship_score: '5',
    relationship_notes: '',
    issues_complaints_log: [],
    annual_review_date: '',
  },
};

interface AgencyStore {
  formData: AgencyPayload;
  agencies: AgencyProfileItem[];
  selectedAgency: AgencyProfileItem | null;
  loading: boolean;
  saving: boolean;
  deleting: boolean;
  error: string | null;
  successMessage: string | null;

  // Dynamic State Modifiers
  setFormData: (data: Partial<AgencyPayload> | ((prev: AgencyPayload) => AgencyPayload)) => void;
  updateCompanyIdentity: <K extends keyof CompanyIdentity>(field: K, value: CompanyIdentity[K]) => void;
  updateAddressContact: <K extends keyof AddressContact>(field: K, value: AddressContact[K]) => void;
  updateAddress: (type: 'registered_address' | 'office_address', field: keyof Address, value: any) => void;
  updatePartnership: <K extends keyof Partnership>(field: K, value: Partnership[K]) => void;
  updatePortalAccess: <K extends keyof PortalAccess>(field: K, value: PortalAccess[K]) => void;
  updateActivity: <K extends keyof Activity>(field: K, value: Activity[K]) => void;

  updateNestedField: (section: keyof AgencyPayload, field: string, value: any) => void;
  updateSubNestedField: (section: keyof AgencyPayload, subSection: string, field: string, value: any) => void;
  toggleArrayItem: (section: keyof AgencyPayload, arrayField: string, item: string) => void;
  setArrayField: (section: keyof AgencyPayload, arrayField: string, items: string[]) => void;
  resetForm: () => void;

  // API Actions
  fetchAgencies: (params?: AgencyListParams) => Promise<AgencyProfileItem[]>;
  fetchAgencyProfile: (id: number | string) => Promise<AgencyPayload | null>;
  submitAgencyProfile: () => Promise<boolean>;
  updateAgencyProfile: (id: number | string) => Promise<boolean>;
  deleteAgencyProfile: (id: number | string) => Promise<boolean>;
}

const extractErrorMessage = (err: any, fallback: string): string => {
  if (err.response?.data?.errors) {
    const firstError = Object.values(err.response.data.errors).flat()[0];
    if (typeof firstError === 'string') return firstError;
  }
  return err.response?.data?.message || err.message || fallback;
};

const toAgencyRequestPayload = (formData: AgencyPayload): AgencyRequestPayload => {
  const { portal_access, ...payload } = formData;

  return {
    ...payload,
    portal_access: portal_access.granted === true,
  };
};

export const useAgencyStore = create<AgencyStore>((set, get) => ({
  formData: JSON.parse(JSON.stringify(initialFormData)),
  agencies: [],
  selectedAgency: null,
  loading: false,
  saving: false,
  deleting: false,
  error: null,
  successMessage: null,

  setFormData: (data) =>
    set((state) => ({
      formData: typeof data === 'function' ? data(state.formData) : { ...state.formData, ...data },
    })),

  updateCompanyIdentity: (field, value) => {
    set((state) => ({
      formData: {
        ...state.formData,
        company_identity: {
          ...state.formData.company_identity,
          [field]: value,
        },
      },
    }));
  },

  updateAddressContact: (field, value) => {
    set((state) => ({
      formData: {
        ...state.formData,
        address_contact: {
          ...state.formData.address_contact,
          [field]: value,
        },
      },
    }));
  },

  updateAddress: (type, field, value) => {
    set((state) => ({
      formData: {
        ...state.formData,
        address_contact: {
          ...state.formData.address_contact,
          [type]: {
            ...state.formData.address_contact[type],
            [field]: value,
          },
        },
      },
    }));
  },

  updatePartnership: (field, value) => {
    set((state) => ({
      formData: {
        ...state.formData,
        partnership: {
          ...state.formData.partnership,
          [field]: value,
        },
      },
    }));
  },

  updatePortalAccess: (field, value) => {
    set((state) => ({
      formData: {
        ...state.formData,
        portal_access: {
          ...state.formData.portal_access,
          [field]: value,
        },
      },
    }));
  },

  updateActivity: (field, value) => {
    set((state) => ({
      formData: {
        ...state.formData,
        activity: {
          ...state.formData.activity,
          [field]: value,
        },
      },
    }));
  },

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

  setArrayField: (section, arrayField, items) => {
    set((state) => {
      const sectionObj = state.formData[section] as any;
      return {
        formData: {
          ...state.formData,
          [section]: {
            ...sectionObj,
            [arrayField]: items,
          },
        },
      };
    });
  },

  resetForm: () =>
    set({
      formData: JSON.parse(JSON.stringify(initialFormData)),
      error: null,
      successMessage: null,
      selectedAgency: null,
    }),

  // GET: Fetch all agencies
  fetchAgencies: async (params) => {
    set({ loading: true, error: null });
    try {
      const response = await AgencyService.getAll(params);
      const list = Array.isArray(response.data)
        ? response.data
        : (response.data as any)?.data || [];
      set({ agencies: list, loading: false });
      return list;
    } catch (err: any) {
      const errorMsg = extractErrorMessage(err, 'Failed to fetch agencies.');
      set({ loading: false, error: errorMsg });
      toast.error(errorMsg);
      return [];
    }
  },

  // GET: Fetch existing agency profile by ID
  fetchAgencyProfile: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await AgencyService.getById(id);
      const data = (response.data as any)?.data ?? response.data;
      if (data) {
        // Deep merge with initial form data structure to avoid missing nested keys
        const mergedData: AgencyPayload = {
          person_id: data.person_id ?? initialFormData.person_id,
          company_identity: { ...initialFormData.company_identity, ...(data.company_identity || {}) },
          address_contact: {
            ...initialFormData.address_contact,
            ...(data.address_contact || {}),
            registered_address: {
              ...initialFormData.address_contact.registered_address,
              ...(data.address_contact?.registered_address || {}),
            },
            office_address: {
              ...initialFormData.address_contact.office_address,
              ...(data.address_contact?.office_address || {}),
            },
          },
          partnership: { ...initialFormData.partnership, ...(data.partnership || {}) },
          portal_access:
            typeof data.portal_access === 'boolean'
              ? { ...initialFormData.portal_access, granted: data.portal_access }
              : { ...initialFormData.portal_access, ...(data.portal_access || {}) },
          activity: { ...initialFormData.activity, ...(data.activity || {}) },
        };
        set({ formData: mergedData, selectedAgency: data, loading: false });
        return mergedData;
      }
      set({ loading: false });
      return null;
    } catch (err: any) {
      const errorMsg = extractErrorMessage(err, 'Failed to fetch agency profile.');
      set({ loading: false, error: errorMsg });
      toast.error(errorMsg);
      return null;
    }
  },

  // POST: Create a new agency profile
  submitAgencyProfile: async () => {
    set({ saving: true, error: null, successMessage: null });
    try {
      const { formData } = get();
      const response = await AgencyService.create(toAgencyRequestPayload(formData));
      const msg = response.data?.message || 'Agency profile created successfully!';

      set({
        saving: false,
        successMessage: msg,
      });
      toast.success(msg);
      return true;
    } catch (err: any) {
      const errorMsg = extractErrorMessage(err, 'Failed to submit agency profile.');
      set({
        saving: false,
        error: errorMsg,
      });
      toast.error(errorMsg);
      return false;
    }
  },

  // PUT: Update existing agency profile
  updateAgencyProfile: async (id) => {
    set({ saving: true, error: null, successMessage: null });
    try {
      const { formData } = get();
      const response = await AgencyService.update(id, toAgencyRequestPayload(formData));
      const msg = response.data?.message || 'Agency profile updated successfully!';

      set({
        saving: false,
        successMessage: msg,
      });
      toast.success(msg);
      return true;
    } catch (err: any) {
      const errorMsg = extractErrorMessage(err, 'Failed to update agency profile.');
      set({
        saving: false,
        error: errorMsg,
      });
      toast.error(errorMsg);
      return false;
    }
  },

  // DELETE: Delete an agency profile
  deleteAgencyProfile: async (id) => {
    set({ deleting: true, error: null });
    try {
      const response = await AgencyService.delete(id);
      const msg = response.data?.message || 'Agency profile deleted successfully!';

      set((state) => ({
        deleting: false,
        agencies: state.agencies.filter((agency) => String(agency.id) !== String(id)),
      }));
      toast.success(msg);
      return true;
    } catch (err: any) {
      const errorMsg = extractErrorMessage(err, 'Failed to delete agency profile.');
      set({ deleting: false, error: errorMsg });
      toast.error(errorMsg);
      return false;
    }
  },
}));