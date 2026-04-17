import { useState, useMemo, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import type {
  ColDef,
  GridReadyEvent,
  ICellRendererParams
} from 'ag-grid-community';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Loader2,
  UserPlus,
  RefreshCw
} from 'lucide-react';
import { useEmployees, useDeleteEmployee } from '@/hooks/useEmployees';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

export default function EmployeeList() {
  const navigate = useNavigate();
  const gridRef = useRef<AgGridReact>(null);
  const [quickFilterText, setQuickFilterText] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data: employees = [], isLoading, isError, refetch } = useEmployees();
  const deleteMutation = useDeleteEmployee();

  const columnDefs = useMemo<ColDef[]>(() => [
    {
      headerName: 'Name',
      valueGetter: (params) => `${params.data.firstName} ${params.data.lastName}`,
      filter: 'agTextColumnFilter',
      flex: 1,
      minWidth: 150
    },
    { field: 'email', filter: 'agTextColumnFilter', flex: 1.2, minWidth: 200 },
    { field: 'department', filter: 'agTextColumnFilter', width: 140 },
    { field: 'position', filter: 'agTextColumnFilter', width: 150 },
    {
      field: 'salary',
      valueFormatter: (params) => `${params.value?.toLocaleString()}`,
      filter: 'agNumberColumnFilter',
      width: 120
    },
    { field: 'performanceRating', headerName: 'Rating', width: 100, filter: 'agNumberColumnFilter' },
    { field: 'projectsCompleted', headerName: 'Projects', width: 110, filter: 'agNumberColumnFilter' },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 110,
      cellRenderer: (params: ICellRendererParams) => (
        <Badge variant={params.value ? 'default' : 'secondary'} className="mt-2">
          {params.value ? 'Active' : 'Inactive'}
        </Badge>
      )
    },
    { field: 'location', width: 130 },
    {
      headerName: 'Actions',
      width: 110,
      pinned: 'right',
      cellRenderer: (params: ICellRendererParams) => (
        <div className="flex items-center gap-1 h-full">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(`/employee/${params.data.id}/edit`)}
            className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDeleteId(params.data.id)}
            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ], [navigate]);

  const defaultColDef = useMemo<ColDef>(() => ({
    sortable: true,
    filter: true,
    resizable: true,
  }), []);

  const handleDelete = useCallback(() => {
    if (deleteId !== null) {
      deleteMutation.mutate(deleteId, {
        onSuccess: () => {
          toast({ title: 'Success', description: 'Employee deleted successfully' });
          setDeleteId(null);
        },
        onError: () => {
          toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete employee' });
        }
      });
    }
  }, [deleteId, deleteMutation]);

  const onGridReady = (params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
  };

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center h-[60vh]">
        <div className="bg-destructive/10 p-4 rounded-full mb-4">
          <Trash2 className="h-8 w-8 text-destructive" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Error loading employees</h2>
        <p className="text-muted-foreground mb-6">There was a problem fetching the employee data. Please try again.</p>
        <Button onClick={() => refetch()} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" /> Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full space-y-4 p-6 bg-background">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Employee Management</h1>

        </div>
        <Button onClick={() => navigate('/employee/new')} className="shadow-sm">
          <UserPlus className="mr-2 h-4 w-4" /> Add Employee
        </Button>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            className="pl-8 bg-card"
            value={quickFilterText}
            onChange={(e) => setQuickFilterText(e.target.value)}
          />
        </div>
        <div className="text-sm text-muted-foreground font-medium">
          Total Employees: {employees.length}
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-[500px] border rounded-xl overflow-hidden shadow-sm bg-card">
        {isLoading ? (
          <div className="h-full flex flex-col items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground font-medium">Loading employee records...</p>
          </div>
        ) : (
          <div className="ag-theme-quartz flex-1 w-full h-full">
            <AgGridReact
              ref={gridRef}
              rowData={employees}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              animateRows={true}
              pagination={true}
              paginationPageSize={10}
              paginationPageSizeSelector={[10, 20, 50]}
              onGridReady={onGridReady}
              quickFilterText={quickFilterText}
              rowHeight={50}
              headerHeight={50}
            />
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this employee? This action cannot be undone and will remove all associated data.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete Employee
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
