/* Concatenate all validation errors into one string that can be displayed */
export const handleRegistrationError = (error: { errors: any[] }): string[] => {
  return error.errors.map((e) => {
    if (e.code == "too_small") {
      return <string>(
        e.message.replace(
          "String",
          e.path[0][0].toUpperCase() + e.path[0].slice(1)
        )
      );
    } else {
      return e.message;
    }
  });
};
