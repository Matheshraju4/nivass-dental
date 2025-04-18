"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Calendar, IndianRupee, User, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface Patient {
    name: string;
    id: string;
    phone: string;
    appointments: {
        service: string;
        id: string;
        price: string;
    }[];
}

const PatientDetailsPage = () => {
    const params = useParams()
    const id = params.id
    const [patient, setPatient] = useState<Patient | null>(null)
    const [loading, setLoading] = useState(true)
    const [generatingInvoice, setGeneratingInvoice] = useState<string | null>(null)

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const response = await axios.get(`/api/patients/single-patient/${id}`)
                setPatient(response.data.patient)
            } catch (error) {
                console.error("Error fetching patient:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchPatient()
    }, [id])

    const generateInvoice = async (appointment: Patient['appointments'][0]) => {
        setGeneratingInvoice(appointment.id)
        try {
            const response = await axios.post('/api/invoice/generate', {
                patientName: patient?.name,
                patientPhone: patient?.phone,
                appointmentId: appointment.id,
                service: appointment.service,
                amount: appointment.price,
                date: new Date().toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                })
            }, {
                responseType: 'blob',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            // Create blob and download
            const blob = new Blob([response.data], { type: 'application/pdf' })
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `invoice-${appointment.id}.pdf`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)

            toast.success('Invoice downloaded successfully!')
        } catch (error) {
            console.error('Invoice generation error:', error)
            toast.error('Failed to generate invoice')
        } finally {
            setGeneratingInvoice(null)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (!patient) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Card className="p-6 text-center">
                    <h2 className="text-xl font-semibold text-red-500">Patient not found</h2>
                    <p className="text-muted-foreground mt-2">The requested patient information is not available.</p>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen p-6 bg-background">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Patient Info Card */}
                <Card className="p-6 shadow-lg">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-primary">{patient.name}</h1>
                            <div className="flex items-center gap-2 text-muted-foreground mt-1">
                                <Phone className="h-4 w-4" />
                                <span>{patient.phone}</span>
                            </div>
                        </div>
                        <Badge variant="outline" className="ml-auto">
                            ID: {patient.id}
                        </Badge>
                    </div>

                    {/* Appointments Section */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-primary" />
                            Appointment History
                        </h2>
                        
                        <div className="grid gap-4">
                            {patient.appointments.length > 0 ? (
                                patient.appointments.map((appointment) => (
                                    <div 
                                        key={appointment.id}
                                        className="bg-card/50 border border-border/50 rounded-lg p-4"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-medium text-foreground">
                                                    {appointment.service}
                                                </h3>
                                                <div className="flex items-center gap-1 text-green-600 font-medium mt-1">
                                                    <IndianRupee className="h-4 w-4" />
                                                    {appointment.price}
                                                </div>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => generateInvoice(appointment)}
                                                className="flex items-center gap-2"
                                                disabled={generatingInvoice === appointment.id}
                                            >
                                                {generatingInvoice === appointment.id ? (
                                                    <>
                                                        <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                                        Generating...
                                                    </>
                                                ) : (
                                                    <>
                                                        <FileText className="h-4 w-4" />
                                                        Invoice
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-muted-foreground bg-card/50 rounded-lg">
                                    No appointments found for this patient.
                                </div>
                            )}
                        </div>
                    </div>
                </Card>

                {/* Summary Card */}
                <Card className="p-6 bg-primary/5">
                    <h2 className="font-semibold mb-3">Summary</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-background rounded-lg p-4">
                            <p className="text-sm text-muted-foreground">Total Appointments</p>
                            <p className="text-2xl font-bold text-primary mt-1">
                                {patient.appointments.length}
                            </p>
                        </div>
                        <div className="bg-background rounded-lg p-4">
                            <p className="text-sm text-muted-foreground">Total Spent</p>
                            <p className="text-2xl font-bold text-primary mt-1">
                                ₹{patient.appointments.reduce((sum, app) => sum + Number(app.price), 0)}
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default PatientDetailsPage