import { JSX } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { JobDTO } from '../core/interfaces';
import getInterviewStyle from '../helpers/getInterviewStyle';
import getStatusStyle from '../helpers/getStatusStyle';

export default function Card({ title, company, status, interviewType }: JobDTO): JSX.Element {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.company}>{company}</Text>
      <View style={styles.tagContainer}>
        <View style={[styles.statusTag, getStatusStyle(status)]}>
          <Text style={styles.statusText}>{status}</Text>
        </View>

        <View style={[styles.statusTag, getInterviewStyle(interviewType)]}>
          <Text style={styles.statusText}>{interviewType}</Text>
        </View>

      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  company: {
    fontSize: 14,
    color: '#555',
  },
  statusTag: {
    marginTop: 8,
    alignSelf: 'flex-start',
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
    margin: 3
  },
  statusText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  tagContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 5
  }
});
