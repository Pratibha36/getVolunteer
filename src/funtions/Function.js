export function isoToDate(isoString) {
    const date = new Date(isoString);
    
    // Extract day, month, and year components
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    
    // Create the formatted date string
    const formattedDate = `${day}-${month}-${year}`;
    
    return formattedDate;
}