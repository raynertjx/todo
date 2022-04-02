import { format } from "date-fns";

function todayDate() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();
  return yyyy + '-' + mm + '-' + dd
}

function formatDate(date) {
  return format(new Date(date),"EEE, d MMM")
}

export { todayDate, formatDate }