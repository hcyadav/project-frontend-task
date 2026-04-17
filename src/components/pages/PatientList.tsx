import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Plus, Search, Edit, Trash2 } from 'lucide-react';
import { usePatients, useDeletePatient } from '@/hooks/usePatients';


import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

const PAGE_SIZE = 10;

export default function PatientList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: patients = [], isLoading, isError } = usePatients();
  const deleteMutation = useDeletePatient();

  // Search filtering
  const filteredPatients = useMemo(() => {
    if (!searchQuery.trim()) return patients;
    const query = searchQuery.toLowerCase();
    return patients.filter(
      (p) =>
        p.firstName.toLowerCase().includes(query) ||
        p.lastName.toLowerCase().includes(query)
    );
  }, [patients, searchQuery]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPatients.length / PAGE_SIZE);
  const paginatedPatients = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredPatients.slice(start, start + PAGE_SIZE);
  }, [filteredPatients, currentPage]);

  const handleDelete = () => {
    if (deleteId) {
      deleteMutation.mutate(deleteId, {
        onSuccess: () => setDeleteId(null),
      });
    }
  };

  if (isError) {
    return (
      <div className="p-8 text-center text-destructive">
        Error loading patients. Please refresh the page.
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Patient Management</h1>
          {/* <p className="text-muted-foreground mt-1">View, search, and manage all your patients.</p> */}
        </div>
        <div className="flex gap-4">
          {/* <Button variant="outline" onClick={() => logout()}>Logout</Button> */}
          <Button onClick={() => navigate('/patients/new')}>
            <Plus className="mr-2 h-4 w-4" /> Add New Patient
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2 max-w-sm">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset page on new search
            }}
          />
        </div>
      </div>

      <div className="border rounded-md bg-card shadow-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[100px] whitespace-nowrap">Patient ID</TableHead>
              <TableHead className="whitespace-nowrap">First Name</TableHead>
              <TableHead className="whitespace-nowrap">Last Name</TableHead>
              <TableHead className="whitespace-nowrap">DOB</TableHead>
              <TableHead className="whitespace-nowrap">Gender</TableHead>
              <TableHead className="whitespace-nowrap">Phone</TableHead>
              <TableHead className="text-left whitespace-nowrap">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10">
                  <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />
                </TableCell>
              </TableRow>
            ) : paginatedPatients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                  No patients found
                </TableCell>
              </TableRow>
            ) : (
              paginatedPatients.map((patient, index) => (
                <TableRow key={patient.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium whitespace-nowrap">
                    {(currentPage - 1) * PAGE_SIZE + index + 1}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{patient.firstName}</TableCell>
                  <TableCell className="whitespace-nowrap">{patient.lastName}</TableCell>
                  <TableCell className="whitespace-nowrap">{patient.dob}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Badge variant={patient.gender === 'Female' ? 'outline' : 'default'} className="font-normal w-[70px] justify-center">
                      {patient.gender}
                    </Badge>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    <span className="mr-1">+91</span>
                    <span className="text-foreground">{patient.phone}</span>
                  </TableCell>
                  <TableCell className="p-0 text-left whitespace-nowrap">
                    <div className="flex justify-start ">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(`/patients/${patient.id}/edit`)}
                        title="Edit Patient"
                      >
                        <Edit className="h-4 w-4 text-blue-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteId(patient.id)}
                        title="Delete Patient"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {filteredPatients.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * PAGE_SIZE) + 1}-{Math.min(currentPage * PAGE_SIZE, filteredPatients.length)} of {filteredPatients.length} records
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentPage(i + 1)}
                className="hidden sm:inline-flex"
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Patient</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this patient? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
