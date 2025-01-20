export async function UpadateData(url: string, body: any): Promise<any | null> {
    try {
      const response = await fetch(url, {
        method: "PUT", // Use POST method
        headers: {
          "Content-Type": "application/json", // Specify content type as JSON
        },
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data; // Return the fetched data
    } catch (error) {
      console.error("There was an error fetching the data:", error);
      return null; // Return null if there was an error
    }
  }
  