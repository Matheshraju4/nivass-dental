"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from "axios"
import { toast } from "sonner"

export default function PatientForm() {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    service: "",
    cost: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    const savePatients= await axios.post("/api/patients/save",formData)

    if(savePatients.status===200){
      toast.success("Patient saved successfully")
    }else{
      toast.error("Patient not saved")
    }
  }

  const generateInvoice = () => {
    console.log("Generating invoice for:", formData)
  }

  return (
    <div className="min-h-screen   flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <Card className="border border-border/40 shadow-xl rounded-xl overflow-hidden bg-card">
          <div className="border-b border-border/10  px-6 py-2">
            <h2 className="text-2xl font-semibold text-primary">Patient Information</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Enter patient details and service information
            </p>
          </div>

          <CardContent className="space-y-4 p-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-1.5 text-foreground/80">Contact Details</Label>
                <div className="space-y-2">
                

                  <div className="space-y-2">
                    <Input
                      placeholder="Patient Name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="h-10 w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phoneNumber}
                      onChange={(e) => handleChange("phoneNumber", e.target.value)}
                      className="h-10 w-full"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-1.5 text-foreground/80">Service Details</Label>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Select 
                      value={formData.service} 
                      onValueChange={(value) => handleChange("service", value)}
                    >
                      <SelectTrigger className="w-full h-10">
                        <SelectValue placeholder="Select Service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consultation">General Consultation</SelectItem>
                        <SelectItem value="checkup">Regular Check-up</SelectItem>
                        <SelectItem value="treatment">Treatment</SelectItem>
                        <SelectItem value="procedure">Medical Procedure</SelectItem>
                        <SelectItem value="therapy">Therapy Session</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₹</span>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={formData.cost}
                        onChange={(e) => handleChange("cost", e.target.value)}
                        className="pl-7 h-10 w-full"
                      />
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground">
                    All patient information is stored securely and confidentially.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t border-border/10">
              <Button 
                variant="ghost" 
                className="h-10"
                onClick={generateInvoice}
              >
                Generate Invoice
              </Button>
              <Button 
                type="submit"
                onClick={handleSubmit}
                className="bg-primary hover:bg-primary/90 text-primary-foreground h-10"
              >
                Save Information
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
