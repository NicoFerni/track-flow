import { ViewStyle } from 'react-native';

export default function getInterviewStyle(interview: string): ViewStyle {
  switch (interview) {
    case 'Behavioral':
      return { backgroundColor: '#4dc9c9ff' };
    case 'Takehome':
      return { backgroundColor: '#f0ad4e' };
    case 'Screening':
      return { backgroundColor: '#d9534f' };
    case 'Live coding':
      return { backgroundColor: '#08c26e' };
    default:
      return { backgroundColor: '#ccc' };
  }
}