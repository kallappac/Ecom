export async function PostData(url: string, body: any): Promise<any | null> {
  try {
    const response = await fetch(url, {
      method: "POST", // Use POST method
      headers: {
        "Content-Type": "application/json", // Specify content type as JSON
      },
      body: JSON.stringify(body), // Stringify the body content
    });

    // if (!response.ok) {
    //   throw new Error("Network response was not ok");
    // }
    const data = await response.json();
    return data; // Return the fetched data
  } catch (error) {
    console.error("There was an error fetching the data:", error);
    return null; // Return null if there was an error
  }
}
