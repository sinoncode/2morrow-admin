import { create } from "zustand"
import type {
  ContactFormData,
  ContactStore,
} from "@/types/contact.types"

import {
  buildCreateContactPayload,
  createContact,
} from "../../services/contact-create.service"

interface ContactCreationStore extends ContactStore {
  creating: boolean
  createError: string | null
  createSuccess: boolean

  submitContact: () => Promise<boolean>
  clearCreateState: () => void
}

const initialState: ContactFormData = {
  title: "",
  leadType: "",
  listingType: "",
  description: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  secondaryPhone: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  latitude: "",
  longitude: "",
  area: "",
  bedrooms: undefined,
  bathrooms: undefined,
  balconies: undefined,
  floor: "",
  totalFloors: "",
  yearBuilt: "",
  furnishing: "",
  facing: "",
  coveredParking: false,
  openParking: false,
  parkingSlots: "",
  amenities: [],
  images: [],
  publicationStatus: "",
  keywords: [],
  country: "",
  community: "",
  subCommunity: "",
  buildingName: "",
  locationDescription: "",
  builtUpArea: "",
  plotArea: "",
  leadAge: "",
  floorNumber: "",
  elevators: "",
  ownershipType: "",
  visitorParking: "",
  price: "",
  pricePerSqft: "",
  maintenanceFee: "",
  securityDeposit: "",
  roi: "",
  rentalYield: "",
  marketValue: "",
  visibility: "",
  isFeatured: false,
  priority: "",
  assignedAgent: "",
  publishDate: "",
  expiryDate: "",
  isVerified: false,
  requiresApproval: false,
  seoTitle: "",
  metaDescription: "",
  seoKeywords: "",
  assignedAgentId: "",
  secondaryAgentId: "",
  referredById: "",
  spousePartnerId: "",
  familyMemberIds: [],
  legalRepresentativeId: "",
  notaryId: "",
  mortgageBrokerBankId: "",
  notes: "",

  budgetCurrency: "",
  budgetFlexibility: "",
  budgetMin: undefined,
  budgetMax: undefined,
  monthlyRentalBudget: undefined,
  investmentReturnTarget: undefined,
  financingMethod: "",
  equityAvailable: undefined,
  mortgageAmountRequired: undefined,
  mortgagePreApprovalStatus: "",
  mortgageAdvisorContactId: "",
  preApprovalBank: "",
  preApprovalAmount: undefined,
  preApprovalExpiryDate: "",
  netWorthIndication: "",
  sourceOfFunds: "",
  amlKycStatus: "",
  amlRiskRating: "",
  amlVerificationDate: "",
  amlVerificationMethod: "",
  isPepDeclared: false,
  pepDetails: "",
  idDocumentType: "",
  idDocumentNumber: "",
  idExpiryDate: "",

  transactionTypeSought: "",
  propertyCategories: [],
  propertySubTypes: [],
  preferredCountries: [],
  preferredCantons: [],
  preferredCities: [],
  preferredNeighbourhoods: [],
  referenceLocation: "",
  radiusKm: undefined,
  minLivingArea: undefined,
  maxLivingArea: undefined,
  minLandArea: undefined,
  minRooms: "",
  minBedrooms: "",
  minBathrooms: "",
  parkingRequirement: "",
  minParkingSpaces: undefined,
  gardenRequirement: "",
  terraceBalconyRequirement: "",
  viewPreference: "",
  orientationPreference: "",
  floorPreference: "",
  furnished: "",
  minYearBuilt: undefined,
  maxYearBuilt: undefined,
  maxRenovationNeeded: "",
  minEnergyClass: "",
  heatingSystemPreference: "",
  evChargingRequired: "",
  homeOfficeRequired: "",
  elevatorRequired: "",
  maxMonthlyCharges: undefined,
  desiredMoveInDate: "",
  matchingAlertActive: false,
  alertFrequency: "",
  alertDeliveryChannels: [],

  isOwnerVendor: false,
  linkedPropertyIds: [],
  estimatedValueProperty: undefined,
  agencyValuation: undefined,
  valuationDate: "",
  mandateTypeSought: "",
  reasonForSellingRenting: "",
  urgencyToSellRent: "",
  competingAgencies: "",
  reasonOtherDetails: "",
  hasMortgageOutstanding: false,
  mortgageOutstandingAmount: undefined,
  minimumNetPriceConfidential: undefined,
  renovationPlannedBeforeSale: false,
  renovationBudget: undefined,

  linkedPropertiesBuyerTenant: [],
  linkedPropertiesSellerLandlord: [],
  linkedTransactionsDossierIds: [],
  linkedOfferIds: [],
  linkedViewingIds: [],
  linkedInvoiceCommissionIds: [],

  totalEmailsSentReceived: undefined,
  totalAlertsSent: undefined,
  newsletterCampaignsSent: undefined,
  eventsAttended: [],
  socialMediaNotes: "",

  clientRoles: [],
  clientSubtype: "private_individual",
  clientCategory: "standard",
  relationshipStage: "prospect",
  priorityLevel: "normal",

  isReferred: false,
  referredByContactId: "",

  exclusivityWithAgency: false,
  signedAgencyAgreement: false,
  agencyAgreementDate: "",
  agencyAgreementFile: null,

  hasPowerOfAttorney: false,
  poaHolderName: "",
  poaDocumentFile: null,

  companyName: "",
  companyRegistrationNo: "",
  vatUidNumber: "",
  legalRepresentativeName: "",
  legalRepresentativeContactId: "",
  fiscalDomicileCountry: "",
  isResidentInSwitzerland: false,
  swissResidencePermitType: "none",
  lexKollerRestriction: false,
}

export const useLeadCreationStore =
  create<ContactCreationStore>((set, get) => ({
    form: initialState,

    creating: false,
    createError: null,
    createSuccess: false,

    updateField: (key, value) =>
      set((state) => ({
        form: {
          ...state.form,
          [key]: value,
        },
      })),

    setForm: (data) =>
      set((state) => ({
        form: {
          ...state.form,
          ...data,
        },
      })),

    submitContact: async () => {
      set({
        creating: true,
        createError: null,
        createSuccess: false,
      })

      try {
        const { form } = get()

        // Convert the wizard form data
        // into the API request payload.
        const payload = buildCreateContactPayload(form)

        console.log(
          "Creating contact with payload:",
          payload
        )

        await createContact(payload)

        set({
          creating: false,
          createError: null,
          createSuccess: true,
        })

        return true
      } catch (error) {
        console.error(
          "Failed to create contact:",
          error
        )

        set({
          creating: false,
          createError:
            "Failed to create contact. Please try again.",
          createSuccess: false,
        })

        return false
      }
    },

    clearCreateState: () =>
      set({
        createError: null,
        createSuccess: false,
      }),

    reset: () =>
      set({
        form: {
          ...initialState,
        },
        creating: false,
        createError: null,
        createSuccess: false,
      }),
  }))

export const useContactCreationStore =
  useLeadCreationStore