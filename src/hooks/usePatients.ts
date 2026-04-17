import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { patientService, type PatientFormValues } from '@/services/patients';
import { useToast } from '@/hooks/use-toast';

export const PATIENTS_QUERY_KEY = ['patients'];

export function usePatients() {
  return useQuery({
    queryKey: PATIENTS_QUERY_KEY,
    queryFn: patientService.getPatients,
  });
}

export function usePatient(id: string | undefined) {
  return useQuery({
    queryKey: [...PATIENTS_QUERY_KEY, id],
    queryFn: () => patientService.getPatientById(id!),
    enabled: !!id,
  });
}

export function useCreatePatient() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: PatientFormValues) => patientService.createPatient(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PATIENTS_QUERY_KEY });
      toast({
        title: 'Success',
        description: 'Patient created successfully.',
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to create patient.',
      });
    },
  });
}

export function useUpdatePatient() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: PatientFormValues }) =>
      patientService.updatePatient(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: PATIENTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [...PATIENTS_QUERY_KEY, variables.id] });
      toast({
        title: 'Success',
        description: 'Patient updated successfully.',
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to update patient.',
      });
    },
  });
}

export function useDeletePatient() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => patientService.deletePatient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PATIENTS_QUERY_KEY });
      toast({
        title: 'Success',
        description: 'Patient deleted successfully.',
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to delete patient.',
      });
    },
  });
}
