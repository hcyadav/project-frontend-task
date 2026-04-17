import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as employeeService from '../services/employees';
import type { CreateEmployeeInput, UpdateEmployeeInput } from '../types/employee';

export const useEmployees = () => {
  return useQuery({
    queryKey: ['employees'],
    queryFn: employeeService.getEmployees,
  });
};

export const useEmployee = (id: number) => {
  return useQuery({
    queryKey: ['employees', id],
    queryFn: () => employeeService.getEmployeeById(id),
    enabled: !!id,
  });
};

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateEmployeeInput) => employeeService.createEmployee(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateEmployeeInput }) =>
      employeeService.updateEmployee(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      queryClient.invalidateQueries({ queryKey: ['employees', data.id] });
    },
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => employeeService.deleteEmployee(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });
};
