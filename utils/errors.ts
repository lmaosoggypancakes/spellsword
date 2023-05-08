/* Concatenate all validation errors into one string that can be displayed */
export const handleRegistrationError = (error: { errors: any[] }): string => {
  return error.errors.map((e: { message: string }) => e.message).join(".\n");
};
