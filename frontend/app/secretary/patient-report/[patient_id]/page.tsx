'use client'

import React, { useRef, useState, useEffect } from 'react'
import { useParams } from "next/navigation"
import { Calendar, Download, User, Phone, Mail, MapPin, FileText, Clipboard, ExternalLink } from 'lucide-react'

interface Patient {
  patient_id: string
  first_name: string
  middle_name?: string
  last_name: string
  email?: string
  phone_number?: string
  date_of_birth?: string
  street_address?: string
  barangay?: string
  municipal_city?: string
  gender?: string
}

interface VitalSigns {
  blood_pressure?: string
  temperature?: string
  heart_rate?: string
  respiratory_rate?: string
  pulse_rate?: string
  pain_scale?: string
  pain_location?: string
  allergies?: string
  medical_history?: string
  symptoms?: string
  current_medications?: string
  smoking_status?: string
  alcohol_use?: string
  assessment?: string
}

interface Diagnosis {
  id: number
  diagnosis_code?: string
  diagnosis_date?: string
  diagnosis_description?: string
}

interface Medication {
  id: number
  dosage?: string
  frequency?: string
  start_date?: string
  end_date?: string
  medication?: {
    id: number
    name: string
  }
  quantity?: number
}

interface LabResult {
  id: string
  image_url: string
  uploaded_at: string
  submitted_by?: {
    first_name?: string
    last_name?: string
    role?: string
  }
}

interface RecentTreatment {
  id?: number
  treatment_notes?: string
  created_at?: string
  updated_at?: string
  doctor_info?: {
    id?: string
    name?: string
    specialization?: string
  }
  prescriptions?: Medication[]
  diagnoses?: Diagnosis[]
}

interface ReportData {
  patient: Patient
  preliminary_assessment?: VitalSigns
  recent_treatment?: RecentTreatment
  all_diagnoses?: Diagnosis[]
  laboratories?: LabResult[]
  all_treatment_notes?: string[]
  complaint?: string[] | string
}

// UI Components
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
    {children}
  </div>
)

const CardHeader = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`border-b border-gray-200 px-6 py-4 ${className}`}>
    {children}
  </div>
)

const CardTitle = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <h3 className={`text-lg font-semibold ${className}`}>
    {children}
  </h3>
)

const CardContent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
)

const Button = ({ children, onClick, variant = 'default', className = '', disabled = false, ...props }: any) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
      variant === 'outline' 
        ? 'border border-gray-300 bg-white hover:bg-gray-50' 
        : 'bg-blue-600 text-white hover:bg-blue-700'
    } ${className}`}
    {...props}
  >
    {children}
  </button>
)

export default function PatientMedicalRecord() {
  const { patient_id } = useParams()
  const formRef = useRef<HTMLDivElement>(null)
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isExporting, setIsExporting] = useState(false)

  const calculateAge = (dob?: string) => {
    if (!dob) return 'N/A'
    const birthDate = new Date(dob)
    if (Number.isNaN(birthDate.getTime())) return 'N/A'
    const diff = Date.now() - birthDate.getTime()
    const ageDate = new Date(diff)
    return Math.abs(ageDate.getUTCFullYear() - 1970).toString()
  }

  const safeText = (v?: any, fallback = 'N/A') => {
    if (v === undefined || v === null) return fallback
    if (typeof v === 'string') {
      const t = v.trim()
      if (t.toLowerCase() === 'null' || t === '') return fallback
      return t
    }
    return String(v)
  }

  const getFileNameFromUrl = (url: string) => {
    try {
      const parsed = new URL(url)
      return decodeURIComponent(parsed.pathname.split('/').pop() || 'lab-result.pdf')
    } catch {
      const parts = url.split('/')
      return decodeURIComponent(parts[parts.length - 1] || 'lab-result.pdf')
    }
  }

  const downloadFile = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  // Fetch patient data
  useEffect(() => {
    if (!patient_id) {
      setError('Patient ID is missing')
      setLoading(false)
      return
    }

    const accessToken = localStorage.getItem('access')
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/patient/patient-report/${patient_id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
      credentials: 'include',
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        return await res.json()
      })
      .then((data: ReportData) => {
        if (!data || !data.patient) throw new Error('Invalid patient data structure')
        if (data.complaint && !Array.isArray(data.complaint)) {
          data.complaint = [String(data.complaint)]
        }
        data.all_diagnoses = data.all_diagnoses || []
        data.laboratories = data.laboratories || []
        data.all_treatment_notes = data.all_treatment_notes || []
        setReportData(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Fetch error:', err)
        setError(err.message || 'Failed to load patient data')
        setLoading(false)
      })
  }, [patient_id])

  const exportToPDF = async () => {
    if (isExporting) return
    
    setIsExporting(true)
    try {
      const jsPDF = (await import('jspdf')).default
      const html2canvas = (await import('html2canvas')).default

      const element = document.getElementById('pdf-content')
      if (!element) {
        throw new Error('PDF content element not found')
      }

      // Create canvas from HTML element
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        windowHeight: element.scrollHeight,
        windowWidth: element.scrollWidth,
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = pdfWidth
      const imgHeight = (canvas.height * pdfWidth) / canvas.width
      
      let heightLeft = imgHeight
      let position = 0

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pdfHeight

      // Add additional pages if content is longer
      while (heightLeft > 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pdfHeight
      }

      const filename = `medical-record-${reportData?.patient.last_name || 'patient'}-${Date.now()}.pdf`
      pdf.save(filename)
      
    } catch (error) {
      console.error("Error exporting to PDF:", error)
      alert("Failed to export PDF. Please try again.")
    } finally {
      setIsExporting(false)
    }
  }

  if (loading) return <div className="p-4">Loading patient data...</div>
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>
  if (!reportData) return <div className="p-4">No patient data found</div>

  const { patient, preliminary_assessment = {}, recent_treatment, all_diagnoses = [], laboratories = [], all_treatment_notes = [], complaint = [] } = reportData

  const visitDate = recent_treatment?.created_at ? new Date(recent_treatment.created_at) : new Date()
  const displayVisitDate = visitDate.toLocaleDateString()
  const displayVisitTime = visitDate.toLocaleTimeString()

  return (
    <div className="container mx-auto max-w-6xl p-4">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex gap-3">
          <Button
            onClick={exportToPDF} 
            variant="outline"
            disabled={isExporting}
            className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            <Download className="h-4 w-4" />
            {isExporting ? 'Exporting...' : 'Export PDF'}
          </Button>

          <Button
            className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
          >
            <Mail className="h-4 w-4" />
            Refer via Email
          </Button>
        </div>
      </div>
      <div id="pdf-content" ref={formRef} className="rounded-lg bg-white p-8 shadow-sm">
        {/* Clinic Header */}
        <div className="mb-8 text-center">
          <h2 className="text-xl font-bold uppercase tracking-wide">
            Malibiran Medical Clinic with Diagnostic and Laboratory Services
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            130 OLD SAMSON RD. BRGY APOLONIO SAMSON QC
          </p>
        </div>

        {/* Visit Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Date and Time of Visit
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <div className="p-2 bg-gray-50 rounded border border-gray-200">
                {displayVisitDate}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <div className="p-2 bg-gray-50 rounded border border-gray-200">
                {displayVisitTime}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Health Record Number</label>
              <div className="p-2 bg-gray-50 rounded border border-gray-200">
                {safeText(patient.patient_id, 'N/A')}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold uppercase tracking-wide">
            OPD Record
          </h3>
        </div>

        {/* Patient Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <div className="p-2 bg-gray-50 rounded border border-gray-200">
                  {safeText(patient.last_name, 'N/A')}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <div className="p-2 bg-gray-50 rounded border border-gray-200">
                  {safeText(patient.first_name, 'N/A')}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                <div className="p-2 bg-gray-50 rounded border border-gray-200">
                  {safeText(patient.middle_name, 'N/A')}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <div className="p-2 bg-gray-50 rounded border border-gray-200">
                  {safeText(patient.street_address, '')}{patient.street_address ? ', ' : ''}{safeText(patient.barangay, '')}{patient.barangay ? ', ' : ''}{safeText(patient.municipal_city, '')}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <div className="p-2 bg-gray-50 rounded border border-gray-200">
                  {patient.date_of_birth ? new Date(patient.date_of_birth).toLocaleDateString() : 'N/A'}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <div className="p-2 bg-gray-50 rounded border border-gray-200">
                  {calculateAge(patient.date_of_birth)}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <div className="p-2 bg-gray-50 rounded border border-gray-200">
                  {safeText(undefined, 'N/A')}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sex</label>
                <div className="p-2 bg-gray-50 rounded border border-gray-200">
                  {safeText(patient.gender, 'N/A')}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                <div className="p-2 bg-gray-50 rounded border border-gray-200">
                  {safeText(undefined, 'N/A')}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                <div className="p-2 bg-gray-50 rounded border border-gray-200">
                  {safeText(undefined, 'N/A')}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <div className="p-2 bg-gray-50 rounded border border-gray-200">
                  {safeText(patient.phone_number, 'N/A')}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medical Information */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Allergies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-3 bg-gray-50 rounded border border-gray-200 min-h-[100px]">
                {safeText(preliminary_assessment.allergies, 'No known allergies')}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vital Signs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pulse Rate</label>
                <div className="p-2 bg-gray-50 rounded border border-gray-200">
                  {safeText(preliminary_assessment.pulse_rate, 'N/A')}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blood Pressure</label>
                <div className="p-2 bg-gray-50 rounded border border-gray-200">
                  {safeText(preliminary_assessment.blood_pressure, 'N/A')}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Temperature</label>
                <div className="p-2 bg-gray-50 rounded border border-gray-200">
                  {safeText(preliminary_assessment.temperature, 'N/A')}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Respiratory Rate</label>
                <div className="p-2 bg-gray-50 rounded border border-gray-200">
                  {safeText(preliminary_assessment.respiratory_rate, 'N/A')}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chief Complaint */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Chief Complaint</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-3 bg-gray-50 rounded border border-gray-200 min-h-[80px]">
              {Array.isArray(complaint) && complaint.length > 0
                ? complaint.join('; ')
                : typeof complaint === 'string' && complaint.trim() !== ''
                ? complaint
                : (all_treatment_notes[0] || 'No chief complaint recorded')}
            </div>
          </CardContent>
        </Card>

        {/* Physical Exam */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Physical Exam</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-3 bg-gray-50 rounded border border-gray-200 min-h-[100px]">
              {safeText(preliminary_assessment.assessment, 'No physical exam notes recorded')}
            </div>
          </CardContent>
        </Card>

        {/* Laboratory Results */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Laboratory Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lab Result</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded By</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Uploaded</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {laboratories.map((lab) => (
                    <tr key={lab.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a
                          href={lab.image_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center gap-1"
                        >
                          {getFileNameFromUrl(lab.image_url)}
                          <ExternalLink size={14} />
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {safeText(lab.submitted_by?.first_name, '')} {safeText(lab.submitted_by?.last_name, '')} {lab.submitted_by?.role ? `(${lab.submitted_by.role})` : ''}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {lab.uploaded_at ? new Date(lab.uploaded_at).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button onClick={() => downloadFile(lab.image_url)} variant="outline" className="text-sm">
                          Download
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {laboratories.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                        No laboratory results available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Diagnosis */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Diagnosis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {all_diagnoses.map((diagnosis) => (
                <div key={diagnosis.id} className="p-3 bg-gray-50 rounded border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {safeText(diagnosis.diagnosis_code, '')}{diagnosis.diagnosis_code ? ' - ' : ''}{safeText(diagnosis.diagnosis_description, 'No description')}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Diagnosed: {diagnosis.diagnosis_date ? new Date(diagnosis.diagnosis_date).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {all_diagnoses.length === 0 && (
                <div className="p-3 bg-gray-50 rounded border border-gray-200 text-gray-500">
                  No diagnoses recorded
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Medications */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              
              Recent Medications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recent_treatment?.prescriptions && recent_treatment.prescriptions.length > 0 ? (
                recent_treatment.prescriptions.map((prescription) => (
                  <div key={prescription.id} className="p-3 bg-gray-50 rounded border border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">{safeText(prescription.medication?.name, 'Unknown Medication')}</h4>
                        <p className="text-sm text-gray-600">
                          {safeText(prescription.dosage, 'N/A')} • {safeText(prescription.frequency, 'N/A')}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {prescription.start_date ? new Date(prescription.start_date).toLocaleDateString() : 'N/A'} - {prescription.end_date ? new Date(prescription.end_date).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                      <div className="text-sm text-gray-700">{prescription.quantity ?? ''}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-3 bg-gray-50 rounded border border-gray-200 text-gray-500">
                  No recent medications
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Treatment Notes */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              
              Treatment Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {all_treatment_notes.length > 0 ? (
                all_treatment_notes.map((note, index) => {
                  const noteDate = index === 0 && recent_treatment?.created_at ? new Date(recent_treatment.created_at).toLocaleDateString() : 'Unknown date'
                  return (
                    <div key={index} className="p-4 bg-gray-50 rounded border border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-2 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">
                            {noteDate}
                          </span>
                        </div>
                        <div className="text-sm font-medium text-gray-700">
                          {recent_treatment?.doctor_info?.name || 'Unknown Doctor'}
                        </div>
                      </div>
                      <p className="text-gray-700">{note}</p>
                    </div>
                  )
                })
              ) : (
                <div className="p-4 bg-gray-50 rounded border border-gray-200 text-gray-500">
                  No treatment notes available
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Physician Signature */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-end">
              <div className="text-right">
                <div className="w-48 border-t border-gray-400 mb-2"></div>
                <p className="text-sm text-gray-600">Physician's Signature</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}