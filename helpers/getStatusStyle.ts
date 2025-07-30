import { ViewStyle } from "react-native";


export default function getStatusStyle(status: string): ViewStyle {
  switch (status) {
    case 'Applied':
      return { backgroundColor: '#007bff' };
    case 'Interview':
      return { backgroundColor: '#f0ad4e' };
    case 'Rejected':
      return { backgroundColor: '#d9534f' };
    case 'Offer':
      return { backgroundColor: '#08c26e' };
    default:
      return { backgroundColor: '#ccc' };
  }
}