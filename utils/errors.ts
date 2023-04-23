export const handleRegistrationError = (error: { errors: any[] }): string => {
  return error.errors.map((e: { message: string }) => e.message).join(".\n");
};
