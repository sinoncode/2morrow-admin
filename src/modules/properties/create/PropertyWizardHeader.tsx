import { useState } from "react"
import { Button } from "@/components/ui/button"
import { usePropertyCreationStore } from "./store/propertyCreationStore"
import { usePropertyStore } from "@/store/propertyStore"
import { toast } from "@/lib/toast"
import type { PropertyPayload } from "@/types/property.types"

export default function PropertyWizardHeader() {
  const { form } = usePropertyCreationStore()
  const { createProperty } = usePropertyStore()
  const [isPublishing, setIsPublishing] = useState(false)

  const handlePublish = async () => {
    try {
      setIsPublishing(true)
      
      const payload: PropertyPayload = {
        title: form.title || "Untitled Property",
        listing_type: (form.listingType as any) || "sale",
        price: form.price || "0",
        
        description: form.description || null,
        status: (form.publicationStatus as any) || "draft",
        type: form.propertyType || null,
        
        address: form.address || null,
        city: form.city || null,
        state: form.state || null,
        zip_code: form.zipCode || null,
        latitude: form.latitude || null,
        longitude: form.longitude || null,
        neighborhood_description: form.locationDescription || null,
        
        bedrooms: form.bedrooms || 0,
        bathrooms: form.bathrooms || 0,
        area: form.builtUpArea || form.area || 0,
        balconies: form.balconies || 0,
        floor_number: Number(form.floorNumber) || 0,
        total_floors: Number(form.totalFloors) || 0,
        year_built: Number(form.yearBuilt) || 0,
        furnishing_status: (form.furnishing as any) || null,
        facing_direction: (form.facing as any) || null,
        
        covered_parking: Boolean(form.coveredParking),
        open_parking: Boolean(form.openParking),
        parking_slots: Number(form.parkingSlots) || 0,
        
        tax_percentage: form.taxPercentage || null,
        maintenance_charges: form.maintenanceFee || "0",
        discount: form.discount || null,
        
        indoor_amenities: form.amenities || [],
        outdoor_features: [],
        smart_features: [],
        high_value_assets: [],
        
        video_url: null,
        virtual_tour_url: null,
        title_deed: null,
        floor_plan: null,
        id_proof: null,
        legal_documents: null,
        keywords: form.keywords || [],
      }

      const success = await createProperty(payload)
      if (success) {
        // toast is already handled in createProperty
      }
    } catch (error) {
      toast.error("An unexpected error occurred.")
    } finally {
      setIsPublishing(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold">
          Create Property
        </h1>

        <p className="text-muted-foreground">
          Add a new property listing to the CRM
        </p>
      </div>

      <div className="flex gap-2">
        <Button variant="outline">
          Save Draft
        </Button>

        <Button onClick={handlePublish} disabled={isPublishing}>
          {isPublishing ? "Publishing..." : "Publish Property"}
        </Button>
      </div>
    </div>
  )
}