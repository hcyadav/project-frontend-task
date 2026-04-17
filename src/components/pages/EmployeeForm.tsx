import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Loader2,
  ArrowLeft,
  Save,
  User,
  Mail,
  Briefcase,
  MapPin,
  TrendingUp,
  Settings
} from 'lucide-react';
import {
  useEmployee,
  useCreateEmployee,
  useUpdateEmployee
} from '@/hooks/useEmployees';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';

const employeeSchema = z.object({
  firstName: z.string().min(2, 'First name is too short'),
  lastName: z.string().min(2, 'Last name is too short'),
  email: z.string().email('Invalid email address'),
  department: z.string().min(1, 'Department is required'),
  position: z.string().min(1, 'Position is required'),
  salary: z.coerce.number().min(0, 'Salary must be positive'),
  age: z.coerce.number().min(18, 'Must be at least 18'),
  location: z.string().min(1, 'Location is required'),
  performanceRating: z.coerce.number().min(0).max(5),
  projectsCompleted: z.coerce.number().min(0),
  isActive: z.boolean().default(true),
  manager: z.string().optional().nullable(),
  skills: z.string().transform(val => val.split(',').map(s => s.trim()).filter(Boolean)),
});

type EmployeeFormValues = z.infer<typeof employeeSchema>;

export default function EmployeeForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const employeeId = id ? parseInt(id) : null;

  const { data: employee, isLoading: isLoadingEmployee } = useEmployee(employeeId!);
  const createMutation = useCreateEmployee();
  const updateMutation = useUpdateEmployee();

  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      department: '',
      position: '',
      salary: 0,
      age: 20,
      location: '',
      performanceRating: 0,
      projectsCompleted: 0,
      isActive: true,
      manager: '',
      skills: '' as any, // Will be transformed
    },
  });

  useEffect(() => {
    if (employee) {
      form.reset({
        ...employee,
        skills: employee.skills.join(', ') as any,
        manager: employee.manager || '',
      });
    }
  }, [employee, form]);

  const onSubmit = (data: any) => {
    if (isEdit && employeeId) {
      updateMutation.mutate({ id: employeeId, data }, {
        onSuccess: () => {
          toast({ title: 'Success', description: 'Employee updated successfully' });
          navigate('/employee');
        },
        onError: (error: any) => {
          toast({ variant: 'destructive', title: 'Error', description: error.message || 'Failed to update employee' });
        }
      });
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          toast({ title: 'Success', description: 'Employee created successfully' });
          navigate('/employee');
        },
        onError: (error: any) => {
          toast({ variant: 'destructive', title: 'Error', description: error.message || 'Failed to create employee' });
        }
      });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  if (isEdit && isLoadingEmployee) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-10 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/employee')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            {isEdit ? 'Edit Employee' : 'Add New Employee'}
          </h1>
          <p className="text-muted-foreground">
            {isEdit ? `Updating profile for ${employee?.firstName} ${employee?.lastName}` : 'Fill in the information below to register a new member.'}
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Details */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <User className="h-5 w-5 text-primary" />
                  Personal Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
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
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Smith" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-9" placeholder="john.smith@company.com" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-9" placeholder="New York" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Employment Details */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Employment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Engineering">Engineering</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Sales">Sales</SelectItem>
                          <SelectItem value="HR">HR</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Design">Design</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Input placeholder="Senior Developer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary (Annual)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type="number" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="manager"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Manager</FormLabel>
                      <FormControl>
                        <Input placeholder="Manager Name" {...field} value={field.value || ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Performance & Skills */}
            <Card className="shadow-sm md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Performance & Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="performanceRating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Performance Rating (0-5)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" min="0" max="5" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="projectsCompleted"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Projects Completed</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Active Status</FormLabel>
                          <FormDescription>Current employment status</FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skills (Comma separated)</FormLabel>
                      <FormControl>
                        <Input placeholder="React, TypeScript, Node.js" {...field} />
                      </FormControl>
                      <FormDescription>Enter skills separated by commas.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/employee')}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" className="px-8 shadow-md" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {isEdit ? 'Update Employee' : 'Create Employee'}
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
