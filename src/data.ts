import { CrimeType } from "./types";

export const data = {
  "crimes": [
    {
      "id": 1,
      "report_details": "A group of masked individuals were seen breaking into a store.",
      "crime_type": "Robbery",
      "report_date_time": "2025-03-08-14-30",
      "report_status": "Under Investigation",
      "latitude": 23.588,
      "longitude": 58.3829
    },
    {
      "id": 2,
      "report_details": "Loud screaming heard from an abandoned building.",
      "crime_type": "Assault",
      "report_date_time": "2025-03-08-18-45",
      "report_status": "Pending",
      "latitude": 23.5955,
      "longitude": 58.4096
    },
    {
      "id": 3,
      "report_details": "A person with a firearm spotted near a school.",
      "crime_type": "Homicide",
      "report_date_time": "2025-03-08-09-15",
      "report_status": "En Route",
      "latitude": 23.61,
      "longitude": 58.491
    },
    {
      "id": 4,
      "report_details": "A child was taken by an unknown individual near the park.",
      "crime_type": "Kidnapping",
      "report_date_time": "2025-03-08-22-10",
      "report_status": "On Scene",
      "latitude": 23.6205,
      "longitude": 58.4378
    },
    {
      "id": 5,
      "report_details": "Suspicious activity reported near a bank after closing hours.",
      "crime_type": "Robbery",
      "report_date_time": "2025-03-08-01-05",
      "report_status": "Resolved",
      "latitude": 23.5821,
      "longitude": 58.4617
    },
    {
      "id": 6,
      "report_details": "A vehicle was stolen from a parking lot.",
      "crime_type": "Theft",
      "report_date_time": "2025-03-07-23-30",
      "report_status": "Under Investigation",
      "latitude": 24.3643,
      "longitude": 56.7462
    },
    {
      "id": 7,
      "report_details": "A group of individuals forcefully entered a warehouse and stole equipment.",
      "crime_type": "Robbery",
      "report_date_time": "2025-03-07-19-15",
      "report_status": "Pending",
      "latitude": 24.3548,
      "longitude": 56.7044
    },
    {
      "id": 8,
      "report_details": "A person was attacked outside a shopping mall.",
      "crime_type": "Assault",
      "report_date_time": "2025-03-06-15-50",
      "report_status": "Under Investigation",
      "latitude": 17.0204,
      "longitude": 54.0897
    },
    {
      "id": 9,
      "report_details": "An altercation at a sports event resulted in serious injuries.",
      "crime_type": "Assault",
      "report_date_time": "2025-03-06-12-10",
      "report_status": "Pending",
      "latitude": 22.9333,
      "longitude": 57.5333
    },
    {
      "id": 10,
      "report_details": "A drive-by shooting was reported in a remote village.",
      "crime_type": "Homicide",
      "report_date_time": "2025-03-06-08-30",
      "report_status": "En Route",
      "latitude": 22.926,
      "longitude": 57.5301
    },
    {
      "id": 11,
      "report_details": "An armed robbery occurred at a jewelry store.",
      "crime_type": "Robbery",
      "report_date_time": "2025-03-05-21-45",
      "report_status": "Resolved",
      "latitude": 24.1781,
      "longitude": 56.3038
    },
    {
      "id": 12,
      "report_details": "A child was kidnapped from a playground.",
      "crime_type": "Kidnapping",
      "report_date_time": "2025-03-05-17-10",
      "report_status": "On Scene",
      "latitude": 23.6005,
      "longitude": 57.9231
    },
    {
      "id": 13,
      "report_details": "A man was fatally shot in a private residence.",
      "crime_type": "Homicide",
      "report_date_time": "2025-03-05-14-00",
      "report_status": "Under Investigation",
      "latitude": 23.5849,
      "longitude": 58.3874
    },
    {
      "id": 14,
      "report_details": "A violent altercation broke out at a marketplace.",
      "crime_type": "Assault",
      "report_date_time": "2025-03-04-20-20",
      "report_status": "Pending",
      "latitude": 23.5852,
      "longitude": 58.3906
    },
    {
      "id": 15,
      "report_details": "A luxury car was stolen from a hotel parking lot.",
      "crime_type": "Theft",
      "report_date_time": "2025-03-04-06-45",
      "report_status": "Resolved",
      "latitude": 22.5663,
      "longitude": 59.5289
    }
  ]
}


const checkLocalStorage = () => {
  // Check if localStorage is available
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    console.error('localStorage is not available');
    return false;
  }
  return true;
}

export const getCrimes = () => {
  if (!checkLocalStorage()) return [];

  // Check if the data is already in localStorage
  // If not, set it to the initial data
  localStorage.getItem('crimes') || localStorage.setItem('crimes', JSON.stringify(data.crimes));
  return JSON.parse(localStorage.getItem('crimes') || '{}') as CrimeType[];
}

export const setCrime = (crime: CrimeType) => {
  if (!checkLocalStorage()) return;
  const currentData = JSON.parse(localStorage.getItem('crimes') || '[]') as CrimeType[];
  const dateTime = new Date();
  const formattedDate = `${dateTime.getFullYear()}-${String(dateTime.getMonth() + 1).padStart(2, '0')}-${String(dateTime.getDate()).padStart(2, '0')}-${String(dateTime.getHours()).padStart(2, '0')}-${String(dateTime.getMinutes()).padStart(2, '0')}`;
  crime.report_date_time = formattedDate;
  crime.report_status = "Pending";
  currentData.push(crime);
  localStorage.setItem('crimes', JSON.stringify(currentData));
}

export const updateCrime = (id: number, updatedCrime: CrimeType) => {
  if (!checkLocalStorage()) return;
  const currentData = JSON.parse(localStorage.getItem('crimes') || '[]') as CrimeType[];
  const index = currentData.findIndex((crime: CrimeType) => crime.id === id);
  if (index !== -1) {
    currentData[index] = updatedCrime;
    localStorage.setItem('crimes', JSON.stringify(currentData));
  }
}
export const deleteCrime = (id: number) => {
  if (!checkLocalStorage()) return;
  const currentData = JSON.parse(localStorage.getItem('crimes') || '[]') as CrimeType[];
  const updatedData = currentData.filter((crime: CrimeType) => crime.id !== id);
  localStorage.setItem('crimes', JSON.stringify(updatedData));
}
export const getCrimeById = (id: number) => {
  if (!checkLocalStorage()) return;
  const currentData = JSON.parse(localStorage.getItem('crimes') || '[]') as CrimeType[];
  const crime = currentData.find((crime: CrimeType) => crime.id === id);
  if (crime) {
    return crime;
  } else {
    console.error('Crime not found');
    return null;
  }
}


export const clearLocalStorage = () => {
  if (checkLocalStorage()) {
    localStorage.removeItem('crimes');
    console.log('localStorage cleared');
  } else {
    console.error('localStorage is not available');
  }
}

export const searchCrimes = (query: string, searchType: "id" | "details" = "details" ) => {
  console.log("searching for: ", query);
  console.log("searchType: ", searchType);
  if (!checkLocalStorage()) return [];
  const currentData = JSON.parse(localStorage.getItem('crimes') || '[]') as CrimeType[];
  if (searchType === "id") {
    const filteredData = currentData.filter((crime: CrimeType) => {
      return crime.id === parseInt(query);
    });
    return filteredData;
  }
  const filteredData = currentData.filter((crime: CrimeType) => {
    return (
      crime.report_details.toLowerCase().includes(query.toLowerCase())
    );
  });
  return filteredData;
}

// Export crimes data as a JSON file
export const exportCrimesData = (): { success: boolean; data?: string; error?: string } => {
  try {
    if (!checkLocalStorage()) {
      throw new Error('LocalStorage is not available');
    }
    
    const crimes = getCrimes();
    const jsonData = JSON.stringify({ crimes }, null, 2);
    
    // Create a Blob containing the JSON data
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Create an anchor element and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = `shadow-watch-crimes-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    return { success: true, data: jsonData };
  } catch (error) {
    console.error('Error exporting crimes data:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred during export' 
    };
  }
};

// Import crimes data from JSON file
export const importCrimesData = async (file: File): Promise<{ 
  success: boolean; 
  message: string;
  importedCount?: number;
}> => {
  try {
    if (!checkLocalStorage()) {
      throw new Error('LocalStorage is not available');
    }
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          if (!event.target?.result) {
            throw new Error('Failed to read file');
          }
          
          const fileContent = event.target.result as string;
          const parsedData = JSON.parse(fileContent);
          
          // Validate the imported data structure
          if (!parsedData.crimes || !Array.isArray(parsedData.crimes)) {
            throw new Error('Invalid data format: Missing "crimes" array');
          }
          
          // Validate each crime object
          const validatedCrimes: CrimeType[] = [];
          const requiredFields = ['id', 'report_details', 'crime_type', 'report_date_time', 'report_status', 'latitude', 'longitude'];
          const validCrimeTypes = ['Assault', 'Robbery', 'Homicide', 'Kidnapping', 'Theft'];
          const validStatuses = ['Pending', 'En Route', 'On Scene', 'Under Investigation', 'Resolved'];
          
          for (const crime of parsedData.crimes) {
            // Check if all required fields are present
            for (const field of requiredFields) {
              if (!(field in crime)) {
                throw new Error(`Invalid crime object: Missing "${field}" field`);
              }
            }
            
            // Validate field types and values
            if (typeof crime.id !== 'number') {
              throw new Error(`Invalid crime ID: Must be a number`);
            }
            
            if (typeof crime.report_details !== 'string' || crime.report_details.trim() === '') {
              throw new Error(`Invalid report details for crime ID ${crime.id}: Must be a non-empty string`);
            }
            
            if (!validCrimeTypes.includes(crime.crime_type)) {
              throw new Error(`Invalid crime type for crime ID ${crime.id}: Must be one of ${validCrimeTypes.join(', ')}`);
            }
            
            if (!validStatuses.includes(crime.report_status)) {
              throw new Error(`Invalid report status for crime ID ${crime.id}: Must be one of ${validStatuses.join(', ')}`);
            }
            
            // Validate date format (YYYY-MM-DD-HH-MM)
            const datePattern = /^\d{4}-\d{2}-\d{2}-\d{2}-\d{2}$/;
            if (!datePattern.test(crime.report_date_time)) {
              throw new Error(`Invalid date format for crime ID ${crime.id}: Must be YYYY-MM-DD-HH-MM`);
            }
            
            // Validate coordinates
            if (typeof crime.latitude !== 'number' || crime.latitude < -90 || crime.latitude > 90) {
              throw new Error(`Invalid latitude for crime ID ${crime.id}: Must be between -90 and 90`);
            }
            
            if (typeof crime.longitude !== 'number' || crime.longitude < -180 || crime.longitude > 180) {
              throw new Error(`Invalid longitude for crime ID ${crime.id}: Must be between -180 and 180`);
            }
            
            // Add to validated crimes
            validatedCrimes.push(crime as CrimeType);
          }
          
          // Save to localStorage after validation
          localStorage.setItem('crimes', JSON.stringify(validatedCrimes));
          
          resolve({
            success: true,
            message: `Successfully imported ${validatedCrimes.length} crime reports`,
            importedCount: validatedCrimes.length
          });
        } catch (error) {
          console.error('Error parsing imported data:', error);
          reject({ 
            success: false, 
            message: error instanceof Error ? error.message : 'Failed to parse imported data'
          });
        }
      };
      
      reader.onerror = () => {
        reject({ 
          success: false, 
          message: 'Error reading file'
        });
      };
      
      reader.readAsText(file);
    });
  } catch (error) {
    console.error('Error importing crimes data:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Unknown error occurred during import'
    };
  }
};