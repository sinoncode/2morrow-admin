import {
  Card,
  CardContent,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Textarea } from "@/components/ui/textarea"

import { useRequestCreationStore } from "../store/requestCreationStore"
import { Button } from "@/components/ui/button"

export default function ContactStep() {
  const { form, updateField } = useRequestCreationStore()

  return (
    <div className="space-y-6">
      {/* PERSONAL & CONTACT INFORMATION */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <CardContent className="p-6">
          <h3 className="mb-5 text-sm font-semibold text-blue-600">
            Contact Information
          </h3>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* First Name */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                First Name
              </label>
              <Input 
                value={form.firstName || ""} 
                onChange={(e) => updateField("firstName", e.target.value)}
                placeholder="John" 
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Last Name
              </label>
              <Input 
                value={form.lastName || ""} 
                onChange={(e) => updateField("lastName", e.target.value)}
                placeholder="Doe" 
              />
            </div>

            {/* Phones */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Phones
              </label>
              <Input 
                value={form.phones || ""} 
                onChange={(e) => updateField("phones", e.target.value)}
                placeholder="+1 234 567 890" 
              />
            </div>

            {/* Emails */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Emails
              </label>
              <Input 
                type="email"
                value={form.emails || ""} 
                onChange={(e) => updateField("emails", e.target.value)}
                placeholder="john.doe@example.com" 
              />
            </div>

            {/* Language */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Language
              </label>
              <Select
                value={form.language || ""}
                onValueChange={(value) => updateField("language", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CLASSIFICATION & SEGMENTATION */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <CardContent className="p-6">
          <h3 className="mb-5 text-sm font-semibold text-blue-600">
            Classification
          </h3>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Status */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Status
              </label>
              <Select
                value={form.status || ""}
                onValueChange={(value) => updateField("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lead">Lead</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Category
              </label>
              <Select
                value={form.category || ""}
                onValueChange={(value) => updateField("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buyer">Buyer</SelectItem>
                  <SelectItem value="seller">Seller</SelectItem>
                  <SelectItem value="rentor">Rentor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Transaction */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Transaction
              </label>
              <RadioGroup
                value={form.transaction || ""}
                onValueChange={(value) => updateField("transaction", value)}
                className="flex gap-3 h-10 items-center"
              >
                <label className="flex items-center gap-2 rounded-lg border px-4 py-2 cursor-pointer text-sm">
                  <RadioGroupItem value="buy" />
                  Buy
                </label>
                <label className="flex items-center gap-2 rounded-lg border px-4 py-2 cursor-pointer text-sm">
                  <RadioGroupItem value="rent" />
                  Rent
                </label>
              </RadioGroup>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ADDITIONAL DETAILS & NOTES */}
      <Card className="border-0 shadow-sm rounded-2xl">
        <CardContent className="p-6">
          <h3 className="mb-5 text-sm font-semibold text-blue-600">
            Internal Details
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Memo */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Memo
              </label>
              <Input 
                value={form.memo || ""} 
                onChange={(e) => updateField("memo", e.target.value)}
                placeholder="Quick tag or pointer note" 
              />
            </div>

            {/* Notes */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">
                Notes
              </label>
              <Textarea
                rows={4}
                value={form.notes || ""}
                onChange={(e) => updateField("notes", e.target.value)}
                placeholder="Enter comprehensive background details..."
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-6 flex gap-3">
            <Button className="rounded-lg py-5 px-8">Save</Button>
            <button 
              type="button" 
              className="rounded-lg border border-red-500 px-8 py-2 text-red-500 hover:bg-red-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}