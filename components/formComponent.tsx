"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from "axios"
import { toast } from "sonner"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PatientForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    service: "",
    cost: "",
  })

  const [loadSuccess,setLoadSuccess] = useState(false)

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true);
    try {
      const savePatients = await axios.post("/api/patients/save", formData)
      if(savePatients.data.status == true) {
        toast.success("Patient saved successfully")
        setLoadSuccess(true)
       
      }
    } catch (error) {
      toast.error("Failed to save patient")
    } finally {
      setIsSubmitting(false);
    }
  }

  const generateInvoice = () => {
    console.log("Generating invoice for:", formData)
  }

 


  return (
    <div className="min-h-screen w-full p-4 md:p-6 lg:p-8 flex flex-col">
      {/* Back Button */}
      {/* <Button
        variant="ghost"
        className="w-fit mb-4 flex items-center gap-2 text-muted-foreground"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button> */}

      <div className="flex-1 flex items-start justify-center">
        <div className="w-full max-w-2xl">

          {
            loadSuccess ? (
              <Card className="border border-border/40 shadow-xl rounded-xl overflow-hidden bg-card">
                <div className="p-8 flex flex-col items-center justify-center space-y-4">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <svg
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  
                  <div className="text-center">
                    <h1 className="text-2xl font-semibold text-primary mb-2">
                      Patient Saved Successfully!
                    </h1>
                    <p className="text-muted-foreground mb-6">
                      The patient information has been stored in the system.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      onClick={() => router.push('/view-patients')}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      View Patients
                    </Button>
                    <Button 
                      onClick={() => setLoadSuccess(false)}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Add Another Patient
                    </Button>
                  </div>
                </div>
              </Card>
            ) :  <Card className="border border-border/40 shadow-xl rounded-xl overflow-hidden bg-card">
            {/* Form Header */}
            <div className="border-b border-border/10 px-4 py-4 md:px-6">
              <h2 className="text-xl md:text-2xl font-semibold text-primary">Patient Information</h2>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                Enter patient details and service information
              </p>
            </div>

            <CardContent className="space-y-6 p-4 md:p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Details Section */}
                <div>
                  <Label className="text-sm font-medium mb-2 block text-foreground/80">
                    Contact Details
                  </Label>
                  <div className="space-y-3">
                    <Input
                      placeholder="Patient Name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="h-10 w-full"
                      required
                    />
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phoneNumber}
                      onChange={(e) => handleChange("phoneNumber", e.target.value)}
                      className="h-10 w-full"
                      required
                      pattern="[0-9]{10}"
                      title="Please enter a valid 10-digit phone number"
                    />
                  </div>
                </div>

                {/* Service Details Section */}
                <div>
                  <Label className="text-sm font-medium mb-2 block text-foreground/80">
                    Service Details
                  </Label>
                  <div className="space-y-3">
                    <Select 
                      value={formData.service} 
                      onValueChange={(value) => handleChange("service", value)}
                      required
                    >
                      <SelectTrigger className="w-full h-10">
                        <SelectValue placeholder="Select Service" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        <SelectItem value="consultation">General Consultation</SelectItem>
                        <SelectItem value="checkup">Regular Check-up</SelectItem>
                        <SelectItem value="treatment">Treatment</SelectItem>
                        <SelectItem value="procedure">Medical Procedure</SelectItem>
                        <SelectItem value="therapy">Therapy Session</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₹</span>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={formData.cost}
                        onChange={(e) => handleChange("cost", e.target.value)}
                        className="pl-7 h-10 w-full"
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>

                    {/* <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground">
                      All patient information is stored securely and confidentially.
                    </div> */}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-4 border-t border-border/10">
                  <Button 
                    type="button"
                    variant="outline" 
                    className="h-10 w-full sm:w-auto"
                    onClick={generateInvoice}
                    disabled={isSubmitting}
                  >
                    Generate Invoice
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground h-10 w-full sm:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Saving...
                      </span>
                    ) : (
                      'Save Information'
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          }
        
        </div>
      </div>
    </div>
  )
}
