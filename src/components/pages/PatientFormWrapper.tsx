import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Loader2, CalendarIcon, ArrowLeft } from 'lucide-react';

import {
  type PatientFormValues,
  patientSchema,
} from '@/services/patients';
import {
  usePatient,
  useCreatePatient,
  useUpdatePatient,
} from '@/hooks/usePatients';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

interface PatientFormWrapperProps {
  context: 'create' | 'edit';
}

export default function PatientFormWrapper({ context }: PatientFormWrapperProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Fetch data if editing
  const { data: patient, isLoading: isFetching } = usePatient(context === 'edit' ? id : undefined);

  // Mutations
  const createMutation = useCreatePatient();
  const updateMutation = useUpdatePatient();

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      dob: '',
      gender: undefined,
      address: '',
      medicalHistory: '',
      allergies: '',
      currentMedications: '',
      phone: '',
      email: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
    },
  });

  // Pre-fill form when data arrives
  useEffect(() => {
    if (context === 'edit' && patient) {
      form.reset({
        firstName: patient.firstName,
        lastName: patient.lastName,
        dob: patient.dob,
        gender: patient.gender,
        address: patient.address,
        medicalHistory: patient.medicalHistory,
        allergies: patient.allergies,
        currentMedications: patient.currentMedications,
        phone: patient.phone,
        email: patient.email,
        emergencyContactName: patient.emergencyContactName,
        emergencyContactPhone: patient.emergencyContactPhone,
      });
    }
  }, [context, patient, form]);

  const onSubmit = (data: PatientFormValues) => {
    if (context === 'create') {
      createMutation.mutate(data, {
        onSuccess: () => navigate('/patients'),
      });
    } else if (context === 'edit' && id) {
      updateMutation.mutate(
        { id, data },
        { onSuccess: () => navigate('/patients') }
      );
    }
  };

  if (context === 'edit' && isFetching) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl space-y-6">
      <div className="flex items-center gap-4 border-b pb-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/patients')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-primary">
            {context === 'create' ? 'Create Patient' : 'Edit Patient'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {context === 'create'
              ? 'Fill in the details below to add a new patient record.'
              : 'Update the existing patient details below.'}
          </p>
        </div>
      </div>

      <div className="bg-card shadow-sm border rounded-lg p-6 sm:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* ROW 1: Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Enter First name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* ROW 2: Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="mb-2">Date of Birth <span className="text-destructive">*</span></FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(new Date(field.value), 'PPP')
                            ) : (
                              <span>Select date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date) => field.onChange(date ? format(date, 'yyyy-MM-dd') : '')}
                          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender <span className="text-destructive">*</span></FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* ROW 3: Address (Full width) */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Enter address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ROW 4: Medical History (Full width) */}
            <FormField
              control={form.control}
              name="medicalHistory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medical History <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter medical history" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ROW 5: Allergies (Full width) */}
            <FormField
              control={form.control}
              name="allergies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Allergies <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter allergies" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ROW 6: Current Medications (Full width) */}
            <FormField
              control={form.control}
              name="currentMedications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Medications <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter current medications" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ROW 7: Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                          +91
                        </span>
                        <Input className="pl-10" placeholder="Enter phone number" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* ROW 8: Emergency Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="emergencyContactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emergency Contact Name <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Emergency contact name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emergencyContactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emergency Contact Phone <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                          +91
                        </span>
                        <Input className="pl-10" placeholder="Enter emergency contact number" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit */}
            <div className="pt-4">
              <Button type="submit" className="w-full h-12 text-lg" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                {context === 'create' ? 'Create Patient' : 'Update Patient'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
