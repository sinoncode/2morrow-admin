import { Button } from "@/components/ui/button"

export default function PropertyWizardHeader() {
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

        <Button>
          Publish Property
        </Button>
      </div>
    </div>
  )
}