import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { setCrime, getCrimes } from "@/data";
import { CrimeType } from "@/types";

// Define the form schema with Zod
const formSchema = z.object({
  report_details: z.string().min(10, "Please provide at least 10 characters of detail"),
  crime_type: z.enum(["Assault", "Robbery", "Homicide", "Kidnapping", "Theft"], {
    required_error: "Please select a crime type",
  }),
  national_id: z.string().regex(/^\d+$/, "National ID must contain only numbers"),
  latitude: z.string().refine(
    val => !isNaN(Number(val)) && Number(val) >= -90 && Number(val) <= 90, 
    "Latitude must be between -90 and 90"
  ),
  longitude: z.string().refine(
    val => !isNaN(Number(val)) && Number(val) >= -180 && Number(val) <= 180, 
    "Longitude must be between -180 and 180"
  ),
});

type FormValues = z.infer<typeof formSchema>;

const ReportCrime = () => {
  const [submitted, setSubmitted] = useState(false);
  
  // Initialize the form with react-hook-form and shadcn's form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      report_details: "",
      crime_type: undefined,
      national_id: "",
      latitude: "",
      longitude: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    // Format the date as YYYY-MM-DD-HH-MM
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}`;
    
    // Get existing crimes to determine the next ID
    const crimes = getCrimes();
    const newId = crimes.length > 0 ? Math.max(...crimes.map(c => c.id)) + 1 : 1;

    const newCrime: CrimeType = {
      id: newId,
      report_details: values.report_details,
      crime_type: values.crime_type,
      report_date_time: formattedDate,
      report_status: "Pending",
      latitude: Number(values.latitude),
      longitude: Number(values.longitude)
    };

    // Save the crime report
    setCrime(newCrime);
    setSubmitted(true);

    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  if (submitted) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Report Submitted</CardTitle>
          <CardDescription>Thank you for your report. Authorities have been notified.</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={() => setSubmitted(false)}>Submit Another Report</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Report a Crime</CardTitle>
          <CardDescription>
            Fill out the form below to report a crime to the authorities.
          </CardDescription>
        </CardHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {/* Report Details */}
              <FormField
                control={form.control}
                name="report_details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Report Details</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please provide details about the incident" 
                        rows={4}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Crime Type */}
              <FormField
                control={form.control}
                name="crime_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Crime Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select crime type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {["Assault", "Robbery", "Homicide", "Kidnapping", "Theft"].map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* National ID */}
              <FormField
                control={form.control}
                name="national_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>National ID</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your national ID number"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                {/* Latitude */}
                <FormField
                  control={form.control}
                  name="latitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Latitude</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g. 23.5880"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Longitude */}
                <FormField
                  control={form.control}
                  name="longitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Longitude</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g. 58.3829"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            
            <CardFooter>
              <Button
                className="w-full my-2" 
                type="submit" 
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Submitting..." : "Submit Report"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default ReportCrime;
