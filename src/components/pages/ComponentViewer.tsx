import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Mail, AlertCircle, CheckCircle2, Info, Loader2 } from 'lucide-react';

export default function ComponentViewer() {
  return (
    <div className="container mx-auto py-10 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary">UI Component Viewer</h1>
        <p className="text-muted-foreground">Standardized reusable components for Patient Management UI.</p>
      </div>

      {/* Buttons */}
      <section className="space-y-4 border p-6 rounded-lg bg-card">
        <h2 className="text-2xl font-semibold border-b pb-2">1. Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button disabled>Disabled</Button>
          <Button>
            <Mail className="mr-2 h-4 w-4" /> With Icon
          </Button>
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading
          </Button>
        </div>
      </section>

      {/* Text Fields */}
      <section className="space-y-4 border p-6 rounded-lg bg-card">
        <h2 className="text-2xl font-semibold border-b pb-2">2. Text Fields</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Default Input</label>
            <Input placeholder="Enter text..." />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Disabled Input</label>
            <Input disabled placeholder="Cannot type here" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-destructive">Error State</label>
            <Input className="border-destructive" placeholder="Invalid input" />
            <p className="text-sm text-destructive">This field is required.</p>
          </div>
        </div>
      </section>

      {/* Checkboxes & Radio */}
      <section className="space-y-4 border p-6 rounded-lg bg-card">
        <h2 className="text-2xl font-semibold border-b pb-2">3. Selection Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-medium">Checkboxes</h3>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label htmlFor="terms" className="text-sm font-medium leading-none">Accept terms and conditions</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="disabled-check" disabled />
              <label htmlFor="disabled-check" className="text-sm font-medium leading-none text-muted-foreground">Disabled option</label>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Radio Buttons</h3>
            <RadioGroup defaultValue="option-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-1" id="option-1" />
                <label htmlFor="option-1" className="text-sm">Option 1</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-2" id="option-2" />
                <label htmlFor="option-2" className="text-sm">Option 2</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-3" id="option-3" disabled />
                <label htmlFor="option-3" className="text-sm text-muted-foreground">Disabled Option</label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </section>

      {/* Dropdown */}
      <section className="space-y-4 border p-6 rounded-lg bg-card">
        <h2 className="text-2xl font-semibold border-b pb-2">4. Dropdowns</h2>
        <div className="w-[280px]">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a generic option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* Badges */}
      <section className="space-y-4 border p-6 rounded-lg bg-card">
        <h2 className="text-2xl font-semibold border-b pb-2">5. Badges</h2>
        <div className="flex flex-wrap gap-4">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive / Danger</Badge>
          <Badge className="bg-emerald-500 hover:bg-emerald-600">Success</Badge>
          <Badge className="bg-amber-500 hover:bg-amber-600">Warning</Badge>
        </div>
      </section>

      {/* Alerts */}
      <section className="space-y-4 border p-6 rounded-lg bg-card">
        <h2 className="text-2xl font-semibold border-b pb-2">6. Alerts</h2>
        <div className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>You can add components to your app using the cli.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
          </Alert>
          <Alert className="border-emerald-500 text-emerald-600">
            <CheckCircle2 className="h-4 w-4" color="#10b981" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Action completed successfully.</AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Cards */}
      <section className="space-y-4 border p-6 rounded-lg bg-card">
        <h2 className="text-2xl font-semibold border-b pb-2">7. Cards</h2>
        <div className="max-w-sm">
          <Card>
            <CardHeader>
              <CardTitle>Create Patient</CardTitle>
              <CardDescription>Fill in the required information.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Card content goes here...</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

    </div>
  );
}
