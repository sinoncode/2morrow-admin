"use client"

import { useParams } from "react-router-dom"
import RequestWizard from "../components/create/RequestWizard"

export default function EditAgencyPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="mx-auto py-2">
      <RequestWizard mode="edit" agencyId={id} />
    </div>
  )
}
