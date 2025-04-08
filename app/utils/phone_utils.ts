/**
 * Format phone number to E.164 format.
 * Assumes input is a 10-digit number for India (+91).
 * @param {string} phone - The phone number to format
 * @returns {string|null} - Formatted phone number or null if invalid
 */
function formatPhoneNumber(phone: string): string | null{
    // Remove all non-numeric characters
    const cleanedPhone = phone.replace(/\D/g, '');
  
    // Check if the phone number is valid (10 digits for India, adjust for other countries)
    if (cleanedPhone.length === 10) {
      // Prepend the country code (e.g., +91 for India)
      return `+91${cleanedPhone}`;
    }
  
    return null; // Invalid phone number
  }

  export default formatPhoneNumber;
  