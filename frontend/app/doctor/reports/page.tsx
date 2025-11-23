"use client";

import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Link from "next/link";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

interface MonthlyVisit {
  month: string;
  count: number;
}

interface MonthlyLabTest {
  month: string;
  count: number;
}

interface CommonDisease {
  diagnosis_description: string;
  count: number;
}

interface MedicineResponse {
  medicines: CommonMedicine[];
}

interface CommonMedicine {
  medication__name: string;
  prescription_count: number;
}

export default function ReportDashboard() {
  const [isClient, setIsClient] = useState(false);
  const [patientVisitsData, setPatientVisitsData] = useState<MonthlyVisit[]>([]);
  const [labTestsData, setLabTestsData] = useState<MonthlyLabTest[]>([]);
  const [commonDiseases, setCommonDiseases] = useState<CommonDisease[]>([]);
  const [loadingVisits, setLoadingVisits] = useState(true);
  const [loadingLabTests, setLoadingLabTests] = useState(true);
  const [loadingDiseases, setLoadingDiseases] = useState(true);
  const [commonMedicines, setCommonMedicines] = useState<CommonMedicine[]>([]);
  const [count, setCount] = useState<number>(0);
  const [loadingPatients, setLoadingPatients] = useState(true);
  const [loadingMedicines, setLoadingMedicines] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simple Skeleton component (tailwind-based)
  const SkeletonCard = ({ className = "" }: { className?: string }) => (
    <div className={`animate-pulse rounded-lg bg-white p-6 shadow-sm ${className}`}>
      <div className="h-4 w-1/3 bg-gray-200 mb-4 rounded" />
      <div className="h-8 w-2/3 bg-gray-200 rounded" />
    </div>
  );

  useEffect(() => {
    async function fetchPatients() {
      setLoadingPatients(true);
      setError(null);

      const accessToken = localStorage.getItem("access");
      try {
        const response = await axios.get<{ patients: unknown; count: number }>(
          `${process.env.NEXT_PUBLIC_API_BASE}/patient/reports/total-patients/`,
          {
            headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
          }
        );
        setCount(response.data.count);
      } catch (err) {
        const axiosError = err as AxiosError<{ error: string }>;
        setError(axiosError.response?.data?.error || "Failed to load patients");
      } finally {
        setLoadingPatients(false);
      }
    }

    fetchPatients();
  }, []);

  useEffect(() => {
    setIsClient(true);

    const fetchAllData = async () => {
      const accessToken = localStorage.getItem("access");

      if (!accessToken) {
        console.error("Access token not found in localStorage.");
        // still set loaders to false so skeletons stop if desired
        setLoadingVisits(false);
        setLoadingLabTests(false);
        setLoadingDiseases(false);
        setLoadingMedicines(false);
        return;
      }

      try {
        const [visitsRes, labRes, diseaseRes, medRes] = await Promise.all([
          axios.get<MonthlyVisit[]>(
            `${process.env.NEXT_PUBLIC_API_BASE}/patient/reports/monthly-visits/`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
          ),
          axios.get<MonthlyLabTest[]>(
            `${process.env.NEXT_PUBLIC_API_BASE}/patient/reports/monthly-lab-results/`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
          ),
          axios.get<CommonDisease[]>(
            `${process.env.NEXT_PUBLIC_API_BASE}/patient/reports/common-diseases/`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
          ),
          axios.get<MedicineResponse>( // Use the new interface
            `${process.env.NEXT_PUBLIC_API_BASE}/patient/reports/frequent-medicines`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
          ),
        ]);

        setPatientVisitsData(visitsRes.data);
        setLabTestsData(labRes.data);
        setCommonDiseases(diseaseRes.data);
        setCommonMedicines(medRes.data.medicines || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoadingVisits(false);
        setLoadingLabTests(false);
        setLoadingDiseases(false);
        setLoadingMedicines(false);
      }
    };

    fetchAllData();
  }, []);

  const capitalizeWords = (text: string): string =>
    text.replace(/\b\w/g, (char) => char.toUpperCase());

  if (!isClient) return null;

  // total visits across all months (fallback)
  const totalVisits = patientVisitsData.reduce((sum, entry) => sum + (entry.count || 0), 0);
  const totalLabTests = labTestsData.reduce((sum, entry) => sum + (entry.count || 0), 0);

  // Active medicine counts:
  // - distinct medicines (how many unique medicines are prescribed)
  // - total prescriptions (sum of prescription_count)
  const distinctMedicineCount = commonMedicines.length;
  const totalMedicinesPrescribed = commonMedicines.reduce(
    (sum, m) => sum + (Number(m.prescription_count) || 0),
    0
  );

  // Helper to robustly parse common month strings. Returns Date or null.
  const monthStringToDate = (monthStr: string | undefined): Date | null => {
    if (!monthStr) return null;

    // Try ISO year-month formats first (YYYY-MM or YYYY-MM-DD)
    if (/^\d{4}-\d{2}(-\d{2})?$/.test(monthStr)) {
      const d = new Date(monthStr);
      return isNaN(d.getTime()) ? null : d;
    }

    // Try parseable by Date
    const parsed = new Date(monthStr);
    if (!isNaN(parsed.getTime())) return parsed;

    // Try common "MMM YYYY" or "MMMM YYYY" formats by appending day and parsing
    const tryAppend = new Date(`${monthStr} 01`);
    if (!isNaN(tryAppend.getTime())) return tryAppend;

    // Try matching short month names (Jan, Feb, ...) optionally with year
    const monthNamesShort = [
      "jan", "feb", "mar", "apr", "may", "jun",
      "jul", "aug", "sep", "oct", "nov", "dec",
    ];
    const parts = monthStr.trim().toLowerCase().split(/\s+/);
    if (parts.length >= 1) {
      const mIndex = monthNamesShort.indexOf(parts[0].slice(0, 3));
      if (mIndex >= 0) {
        const year = parts.length >= 2 && /^\d{4}$/.test(parts[1]) ? Number(parts[1]) : new Date().getFullYear();
        const d = new Date(year, mIndex, 1);
        return isNaN(d.getTime()) ? null : d;
      }
    }

    return null;
  };

  // Count patients added (visits) in the current month
  const now = new Date();
  const patientsThisMonth = patientVisitsData.reduce((sum, entry) => {
    const d = monthStringToDate(entry.month);
    if (!d) return sum;
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      ? sum + (entry.count || 0)
      : sum;
  }, 0);

  // If no monthly entry exists, fallback to 0
  const patientsThisMonthDisplay = loadingVisits ? "Loading..." : patientsThisMonth;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-800">Medical Reports Dashboard</h1>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {loadingPatients ? (
          <SkeletonCard />
        ) : (
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-gray-500">Total Patients</h3>
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <p className="text-3xl font-bold">{count.toLocaleString()}</p>
            )}
          </div>
        )}

        {/* Monthly Visits — show total visits and patients added this month */}
        {loadingVisits ? (
          <SkeletonCard />
        ) : (
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-gray-500">Monthly Visits (Total)</h3>
            <p className="text-3xl font-bold">{patientsThisMonthDisplay}</p>
          </div>
        )}

        {/* Lab Tests */}
        {loadingLabTests ? (
          <SkeletonCard />
        ) : (
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-gray-500">Lab Tests (Total)</h3>
            <p className="text-3xl font-bold">{totalLabTests}</p>
          </div>
        )}

        {/* Active Medicines: show total prescriptions and distinct medicines */}
        {loadingMedicines ? (
          <SkeletonCard />
        ) : (
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="text-gray-500">Prescribed Medicines</h3>
            <p className="text-3xl font-bold">{distinctMedicineCount}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="mb-4 text-xl font-semibold">Monthly Patient Visits</h2>
            {loadingVisits ? (
              <div className="animate-pulse space-y-3">
                <div className="h-56 bg-gray-100 rounded" />
              </div>
            ) : (
              <BarChart width={500} height={300} data={patientVisitsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            )}
          </div>
          <div className="mt-4 text-right">
            <Link href="/doctor/patient-visits-view-all" className="text-sm text-blue-600 hover:underline">
              View All
            </Link>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="mb-4 text-xl font-semibold">Laboratory Tests</h2>
            {loadingLabTests ? (
              <div className="animate-pulse space-y-3">
                <div className="h-56 bg-gray-100 rounded" />
              </div>
            ) : (
              <BarChart width={500} height={300} data={labTestsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            )}
          </div>
          <div className="mt-4 text-right">
            <Link href="/doctor/laboratory-test-view-all" className="text-sm text-blue-600 hover:underline">
              View All
            </Link>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="mb-4 text-xl font-semibold">Common Diseases</h2>
            {loadingDiseases ? (
              <p className="text-gray-500">Loading common diseases...</p>
            ) : (
              <PieChart width={500} height={300}>
                <Pie
                  data={commonDiseases}
                  cx={250}
                  cy={150}
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="diagnosis_descriptions"
                  label={({ name }: { name: string }) => capitalizeWords(name)}
                >
                  {commonDiseases.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number, name: string) => [
                    value,
                    capitalizeWords(name),
                  ]}
                />
              </PieChart>
            )}
          </div>
          <div className="mt-4 text-right">
            <Link href="/doctor/common-diseases-view-all" className="text-sm text-blue-600 hover:underline">
              View All
            </Link>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="mb-4 text-xl font-semibold">Frequent Medications</h2>
            {loadingMedicines ? (
              <div className="animate-pulse space-y-3">
                <div className="h-48 bg-gray-100 rounded" />
              </div>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="space-y-3">
                {/* Show only top 5 medicines */}
                {commonMedicines.slice(0, 5).map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded bg-gray-50 p-3"
                  >
                    <span className="font-medium">{item.medication__name}</span>
                    <span className="rounded-full bg-blue-500 px-3 py-1 text-white">
                      {item.prescription_count}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mt-4 text-right">
            <Link
              href="/doctor/frequent-medicines-view-all"
              className="text-sm text-blue-600 hover:underline"
            >
              View All
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="mb-4 text-xl font-semibold">Patient Demographics</h2>
            <div className="text-gray-500">Age/Gender distribution chart placeholder</div>
          </div>
          <div className="mt-4 text-right">
            <Link href="/reports/visits" className="text-sm text-blue-600 hover:underline">
              View All
            </Link>
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="mb-4 text-xl font-semibold">Doctors Treatments</h2>
            <div className="text-gray-500">See Doctors Treatments</div>
          </div>
          <div className="mt-4 text-right">
            <Link href="/doctor/treatment-reports" className="text-sm text-blue-600 hover:underline">
              View All
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
