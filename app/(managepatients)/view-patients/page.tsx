"use client"

import PatientTable from '@/components/PatientTable';
import { Suspense, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';






export default function ViewPatientsPage() {

    const [patients,setPatients]=useState([])

    useEffect(()=>{
        async function getPatients() {
            const res = await axios.get("/api/patients/get")
            
            if (!res.data) {
              toast.error("Failed to fetch patients")
            }
            
            setPatients(res.data)
          }

          getPatients()
    },[])


  return (
    <div className="max-w-7xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 px-10">View Patients</h1>
      <Suspense fallback={<div>Loading patients...</div>}>
        <PatientTable patients={patients} />
      </Suspense>
    </div>
  );
}