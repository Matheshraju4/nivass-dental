'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Eye, Loader2 } from "lucide-react";
import Link from 'next/link';
interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
}

export default function PatientTable({ patients }: { patients: Patient[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  const handleViewPatient = async (id: string) => {
    setIsLoading(true);
    try {
      window.location.href = `/patients/${id}`;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 px-10">
      {/* Search Bar */}
      <div className="flex justify-between items-center gap-2 w-full ">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        <Button variant={"default"} asChild>
            <Link href={"/"}>
                Add Patient
            </Link>
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Phone</TableHead>
              <TableHead className="font-semibold">Registration Date</TableHead>
              <TableHead className="font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <p className="text-sm">No patients found</p>
                    {searchTerm && (
                      <p className="text-xs mt-1">
                        Try adjusting your search term
                      </p>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredPatients.map((patient) => (
                <TableRow 
                  key={patient.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell>{patient.phone}</TableCell>
                  <TableCell>
                    {new Date(patient.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewPatient(patient.id)}
                      disabled={isLoading}
                      className="hover:bg-blue-50 text-blue-600 hover:text-blue-700"
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Eye className="h-4 w-4 mr-1" />
                      )}
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Table Footer */}
      <div className="flex items-center justify-between px-2 py-4">
        <p className="text-sm text-gray-500">
          Showing {filteredPatients.length} of {patients.length} patients
        </p>
      </div>
    </div>
  );
} 

