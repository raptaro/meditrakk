"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Pill,
  ChevronLeft,
  ChevronRight,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock,
  Package,
  Download,
  MoreHorizontal,
  Edit,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Medicine {
  id: number;
  name: string;
  dosage_form: string;
  strength: string;
  stocks: number;
  expiration_date: string;
}

export default function MedicineList() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [stockFilter, setStockFilter] = useState("all");
  const [sortField, setSortField] = useState<keyof Medicine>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;

  useEffect(() => {
    const token = localStorage.getItem("access");

    setIsLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/medicine/medicines`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch medicines");
        }
        return response.json();
      })
      .then((data) => {
        setMedicines(data);
        setFilteredMedicines(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching medicines:", error);
        setError("Failed to load medicines. Please try again later.");
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    let results = medicines.filter((medicine) =>
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply stock filter
    if (stockFilter === "low") {
      results = results.filter((medicine) => medicine.stocks < 50);
    } else if (stockFilter === "out") {
      results = results.filter((medicine) => medicine.stocks === 0);
    } else if (stockFilter === "expiring") {
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
      results = results.filter((medicine) => {
        const expDate = new Date(medicine.expiration_date);
        return expDate <= thirtyDaysFromNow && expDate >= new Date();
      });
    }

    // Apply sorting
    results.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === "expiration_date") {
        aValue = new Date(aValue as string).getTime();
        bValue = new Date(bValue as string).getTime();
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredMedicines(results);
    setCurrentPage(1);
  }, [searchTerm, stockFilter, medicines, sortField, sortDirection]);

  const handleSort = (field: keyof Medicine) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredMedicines.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedMedicines = filteredMedicines.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getStockStatus = (stocks: number) => {
    if (stocks === 0) {
      return { label: "Out of Stock", color: "destructive" };
    } else if (stocks < 20) {
      return { label: "Critical", color: "destructive" };
    } else if (stocks < 50) {
      return { label: "Low Stock", color: "warning" };
    } else {
      return { label: "In Stock", color: "success" };
    }
  };

  const isExpiringSoon = (expirationDate: string) => {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    const expDate = new Date(expirationDate);
    return expDate <= thirtyDaysFromNow && expDate >= new Date();
  };

  const isExpired = (expirationDate: string) => {
    return new Date(expirationDate) < new Date();
  };

  const SortIcon = ({ field }: { field: keyof Medicine }) => {
    if (sortField !== field) return null;
    return (
      <span className="ml-1">
        {sortDirection === "asc" ? "↑" : "↓"}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex h-64 items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
              <p className="text-slate-600">Loading medicines...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
        <div className="container mx-auto px-4">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <p className="text-red-700">{error}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Medicine Inventory
              </h1>
              <p className="mt-2 text-slate-600">
                Comprehensive overview of all medicines in stock
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" asChild>
                <Link href="/secretary/manage-medicines">
                  <Package className="mr-2 h-4 w-4" />
                  Prescribed Medicines
                </Link>
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Medicine
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-800">
                  {medicines.length}
                </p>
                <p className="text-sm text-slate-600">Total Medicines</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {medicines.filter(m => m.stocks >= 50).length}
                </p>
                <p className="text-sm text-slate-600">Good Stock</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">
                  {medicines.filter(m => m.stocks < 50 && m.stocks > 0).length}
                </p>
                <p className="text-sm text-slate-600">Low Stock</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">
                  {medicines.filter(m => m.stocks === 0).length}
                </p>
                <p className="text-sm text-slate-600">Out of Stock</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Search medicines..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full md:w-64">
                <Select value={stockFilter} onValueChange={setStockFilter}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4" />
                    <SelectValue placeholder="Stock Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Medicines</SelectItem>
                    <SelectItem value="low">Low Stock (&lt;50)</SelectItem>
                    <SelectItem value="out">Out of Stock</SelectItem>
                    <SelectItem value="expiring">Expiring Soon</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Info */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-slate-600">
            Showing <span className="font-semibold">{startIndex + 1}</span> to{" "}
            <span className="font-semibold">
              {Math.min(startIndex + rowsPerPage, filteredMedicines.length)}
            </span>{" "}
            of <span className="font-semibold">{filteredMedicines.length}</span>{" "}
            medicines
          </p>
        </div>

        {/* Medicines Table */}
        {filteredMedicines.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="mx-auto h-12 w-12 text-slate-400" />
              <h3 className="mt-4 text-lg font-semibold text-slate-800">
                No medicines found
              </h3>
              <p className="mt-2 text-slate-600">
                Try adjusting your search or filter criteria
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead 
                        className="cursor-pointer hover:bg-slate-50"
                        onClick={() => handleSort("name")}
                      >
                        <div className="flex items-center">
                          Medicine Name
                          <SortIcon field="name" />
                        </div>
                      </TableHead>
                      <TableHead>Strength & Form</TableHead>
                      <TableHead 
                        className="cursor-pointer hover:bg-slate-50"
                        onClick={() => handleSort("stocks")}
                      >
                        <div className="flex items-center">
                          Stock
                          <SortIcon field="stocks" />
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer hover:bg-slate-50"
                        onClick={() => handleSort("expiration_date")}
                      >
                        <div className="flex items-center">
                          Expiration
                          <SortIcon field="expiration_date" />
                        </div>
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[80px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedMedicines.map((medicine) => {
                      const stockStatus = getStockStatus(medicine.stocks);
                      const isExpiring = isExpiringSoon(medicine.expiration_date);
                      const expired = isExpired(medicine.expiration_date);

                      return (
                        <TableRow key={medicine.id} className="hover:bg-slate-50">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                                <Pill className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <div className="font-medium text-slate-800">
                                  {medicine.name}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-sm font-medium text-slate-800">
                                {medicine.strength}
                              </div>
                              <div className="text-sm text-slate-600">
                                {medicine.dosage_form}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-2">
                              <div className="text-sm font-semibold text-slate-800">
                                {medicine.stocks} units
                              </div>
                              <div className="h-2 w-24 rounded-full bg-slate-200">
                                <div
                                  className={`h-full rounded-full ${
                                    medicine.stocks === 0
                                      ? "bg-red-500"
                                      : medicine.stocks < 20
                                      ? "bg-red-400"
                                      : medicine.stocks < 50
                                      ? "bg-orange-400"
                                      : "bg-green-500"
                                  }`}
                                  style={{
                                    width: `${Math.min(medicine.stocks, 100)}%`,
                                  }}
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className={`text-sm font-medium ${
                                expired
                                  ? "text-red-600"
                                  : isExpiring
                                  ? "text-orange-600"
                                  : "text-slate-800"
                              }`}>
                                {new Date(medicine.expiration_date).toLocaleDateString()}
                              </div>
                              {(expired || isExpiring) && (
                                <Badge
                                  variant={expired ? "destructive" : "outline"}
                                  className={expired ? "" : "bg-yellow-500 text-white"}
                                >
                                  {expired ? "Expired" : "Expiring Soon"}
                                </Badge>

                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={stockStatus.color as any}>
                              {stockStatus.label}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Pagination */}
            {totalPages > 1 && (
              <Card className="mt-6">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-600">
                      Page <span className="font-semibold">{currentPage}</span> of{" "}
                      <span className="font-semibold">{totalPages}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}