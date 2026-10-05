import { Button } from "@/components/ui/button"

interface Props {
  onSaveDraft?: () => void
  onSaveContact?: () => void
  isSubmitting?: boolean
}

export default function ContactWizardHeader({
  onSaveDraft,
  onSaveContact,
  isSubmitting = false,
}: Props) {
  return (
    <div className="flex flex-col gap-4 border-b border-border pb-5 mb-6 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Create Contact
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Add a new client, buyer, seller, or partner structure to the CRM
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          type="button"
          onClick={onSaveContact}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Saving Contact..."
            : "Save Contact"}
        </Button>
      </div>
    </div>
  )
}