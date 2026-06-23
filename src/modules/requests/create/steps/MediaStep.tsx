import { useEffect, useRef, useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Upload,
  ImageIcon,
  FileText,
  Video,
  X,
  Star,
} from "lucide-react"

import { useRequestCreationStore } from "../store/requestCreationStore"

export default function MediaStep() {
  const { form, updateField } = useRequestCreationStore()

  const [galleryImages, setGalleryImages] = useState<string[]>(
    form.images || []
  )

  const [coverImage, setCoverImage] = useState<string>("")

  const coverInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)
  const floorPlanInputRef = useRef<HTMLInputElement>(null)
  const documentInputRef = useRef<HTMLInputElement>(null)

  const [floorPlans, setFloorPlans] = useState<string[]>([])
  const [documents, setDocuments] = useState<File[]>([])
  const [videoUrl, setVideoUrl] = useState("")
  const [virtualTourUrl, setVirtualTourUrl] = useState("")

  const createPreviews = (files: FileList | null) => {
    if (!files) return []

    return Array.from(files).map((file) =>
      URL.createObjectURL(file)
    )
  }

  const handleCoverUpload = (files: FileList | null) => {
    if (!files?.length) return

    const preview = URL.createObjectURL(files[0])

    setCoverImage(preview)
  }

  const handleGalleryUpload = (files: FileList | null) => {
    if (!files) return

    const previews = createPreviews(files)

    const updated = [...galleryImages, ...previews]

    setGalleryImages(updated)

    updateField("images", updated)
  }

  const handleFloorPlans = (files: FileList | null) => {
    if (!files) return

    const previews = createPreviews(files)

    setFloorPlans((prev) => [...prev, ...previews])
  }

  const handleDocuments = (files: FileList | null) => {
    if (!files) return

    setDocuments((prev) => [...prev, ...Array.from(files)])
  }

  useEffect(() => {
    return () => {
      galleryImages.forEach(URL.revokeObjectURL)
      floorPlans.forEach(URL.revokeObjectURL)
    }
  }, [])

  return (
    <div className="space-y-6">
      {/* Cover Image */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Cover Image
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div
            onClick={() =>
              coverInputRef.current?.click()
            }
            className="
              flex
              h-[300px]
              cursor-pointer
              items-center
              justify-center
              rounded-xl
              border-2
              border-dashed
              bg-muted/30
              transition-all
              hover:bg-muted/50
            "
          >
            {coverImage ? (
              <img
                src={coverImage}
                alt="Cover"
                className="
                  h-full
                  w-full
                  rounded-xl
                  object-cover
                "
              />
            ) : (
              <div className="text-center">
                <Upload className="mx-auto mb-3 h-8 w-8 text-primary" />

                <p className="font-medium">
                  Upload Cover Image
                </p>

                <p className="text-sm text-muted-foreground">
                  Recommended 1920 × 1080
                </p>
              </div>
            )}
          </div>

          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              handleCoverUpload(e.target.files)
            }
          />
        </CardContent>
      </Card>

      {/* Gallery */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-primary" />
            Request Gallery
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div
            onClick={() =>
              galleryInputRef.current?.click()
            }
            className="
              cursor-pointer
              rounded-xl
              border-2
              border-dashed
              p-10
              text-center
              hover:bg-muted/30
            "
          >
            <Upload className="mx-auto mb-2 h-7 w-7" />

            <p>Upload Request Images</p>

            <p className="text-sm text-muted-foreground">
              Drag & Drop Supported
            </p>
          </div>

          <input
            ref={galleryInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              handleGalleryUpload(e.target.files)
            }
          />

          {galleryImages.length > 0 && (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="group relative"
                >
                  <img
                    src={image}
                    alt=""
                    className="
                      aspect-square
                      w-full
                      rounded-xl
                      object-cover
                    "
                  />

                  <Button
                    size="icon"
                    variant="destructive"
                    className="
                      absolute
                      right-2
                      top-2
                      opacity-0
                      transition-opacity
                      group-hover:opacity-100
                    "
                    onClick={() =>
                      setGalleryImages((prev) =>
                        prev.filter(
                          (_, i) => i !== index
                        )
                      )
                    }
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Floor Plans */}

      <Card>
        <CardHeader>
          <CardTitle>
            Floor Plans
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div
            onClick={() =>
              floorPlanInputRef.current?.click()
            }
            className="
              cursor-pointer
              rounded-xl
              border-2
              border-dashed
              p-10
              text-center
            "
          >
            Upload Floor Plans
          </div>

          <input
            ref={floorPlanInputRef}
            type="file"
            multiple
            accept="image/*,.pdf"
            className="hidden"
            onChange={(e) =>
              handleFloorPlans(e.target.files)
            }
          />

          {floorPlans.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
              {floorPlans.map((plan, index) => (
                <img
                  key={index}
                  src={plan}
                  className="
                    aspect-square
                    rounded-lg
                    object-cover
                  "
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Documents */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Request Documents
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Button
            variant="outline"
            onClick={() =>
              documentInputRef.current?.click()
            }
          >
            Upload Documents
          </Button>

          <input
            ref={documentInputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) =>
              handleDocuments(e.target.files)
            }
          />

          <div className="mt-4 space-y-2">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="
                  flex
                  items-center
                  justify-between
                  rounded-lg
                  border
                  p-3
                "
              >
                <span>{doc.name}</span>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() =>
                    setDocuments((prev) =>
                      prev.filter(
                        (_, i) => i !== index
                      )
                    )
                  }
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Videos */}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5 text-primary" />
            Request Video
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Label>Video URL</Label>

          <Input
            placeholder="https://youtube.com/watch?v=..."
            value={videoUrl}
            onChange={(e) =>
              setVideoUrl(e.target.value)
            }
          />
        </CardContent>
      </Card>

      {/* Virtual Tour */}

      <Card>
        <CardHeader>
          <CardTitle>
            360° Virtual Tour
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Label>Virtual Tour URL</Label>

          <Input
            placeholder="https://matterport.com/..."
            value={virtualTourUrl}
            onChange={(e) =>
              setVirtualTourUrl(e.target.value)
            }
          />
        </CardContent>
      </Card>
    </div>
  )
}