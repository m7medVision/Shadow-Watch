export interface CrimeType {
  id: number;
  national_id: string;
  report_details: string;
  crime_type: string;
  report_date_time: string;
  report_status: CrimeStatus;
  latitude: number;
  longitude: number;
}


export type CrimeStatus = "Pending" | "In Progress" | "Resolved" | "Closed";