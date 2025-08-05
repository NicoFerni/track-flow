import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { JobDTO } from '../core/interfaces';
import { formatDate } from '../helpers/formatDate';
import getInterviewStyle from '../helpers/getInterviewStyle';
import getStatusStyle from '../helpers/getStatusStyle';
import DetailRow from './detailRow';

export default function Card({ 
  title, 
  company, 
  status, 
  interviewType, 
  applicationDate,
  salary,
  location,
  description,
  requirements,
  notes,
}: JobDTO) {
  const [modalVisible, setModalVisible] = useState(false);



  return (
    <>
      <Pressable onPress={() => setModalVisible(true)}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.titleSection}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.company}>{company}</Text>
            </View>
            <Text style={styles.applicationDate}>{formatDate(applicationDate)}</Text>
          </View>

          <View style={styles.tagContainer}>
            <View style={[styles.statusTag, getStatusStyle(status)]}>
              <Text style={styles.statusText}>{status}</Text>
            </View>

            <View style={[styles.statusTag, getInterviewStyle(interviewType)]}>
              <Text style={styles.statusText}>{interviewType}</Text>
            </View>
          </View>
        </View>
      </Pressable>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{title}</Text>
                <Text style={styles.modalCompany}>{company}</Text>
              </View>

              <View style={styles.modalTagContainer}>
                <View style={[styles.statusTag, getStatusStyle(status)]}>
                  <Text style={styles.statusText}>{status}</Text>
                </View>
                <View style={[styles.statusTag, getInterviewStyle(interviewType)]}>
                  <Text style={styles.statusText}>{interviewType}</Text>
                </View>
              </View>

              <View style={styles.infoSection}>
                <DetailRow label="Application Date" value={formatDate(applicationDate)} />
                {location && <DetailRow label="Location" value={location} />}
                {salary && <DetailRow label="Salary" value={salary} />}
              </View>

              {description && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Job Description</Text>
                  <Text style={styles.sectionContent}>{description}</Text>
                </View>
              )}

              {requirements && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Requirements</Text>
                  <Text style={styles.sectionContent}>{requirements}</Text>
                </View>
              )}
              {notes && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Notes</Text>
                  <Text style={styles.sectionContent}>{notes}</Text>
                </View>
              )}
            </ScrollView>

            <Pressable 
              style={styles.closeButton} 
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleSection: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,
  },
  company: {
    fontSize: 14,
    color: '#555',
  },
  applicationDate: {
    fontSize: 12,
    color: '#888',
    fontWeight: '500',
    textAlign: 'right',
  },
  statusTag: {
    alignSelf: 'flex-start',
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
    margin: 3,
  },
  statusText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxHeight: '85%',
  },
  modalHeader: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  modalCompany: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  modalTagContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  infoSection: {
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  sectionContent: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
  },
  closeButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});