import { LOCAL_HOST_URL } from "@/utils/constants";

export const redirectUrl = LOCAL_HOST_URL;

//  Convert a "dd/mm/yyyy" string into a Date object
export function convertToDate(dateString: string) {
  const dateParts = dateString.split("-");
  const dateObject = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
  return dateObject;
}
