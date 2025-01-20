export function  formatDate(dateString:string) {
    const date = new Date(dateString);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = date.getDate();
    const month = monthNames[date.getMonth()]; // Get the month's abbreviation
    const year = date.getFullYear();

    const formattedDate = `${String(day).padStart(2, '0')}-${month}-${year}`;
    return formattedDate;
  }
  
  