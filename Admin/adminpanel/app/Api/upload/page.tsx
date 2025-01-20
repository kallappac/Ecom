export async function UploadImage(url: string, body: FormData): Promise<any | null> {
    try {
      const response = await fetch(url, {
        method: "POST", // Use POST method
        body: body, // Pass FormData directly
      });
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data; // Return the fetched data
    } catch (error) {
      console.error("There was an error uploading the image:", error);
      return null; // Return null if there was an error
    }
  }
  