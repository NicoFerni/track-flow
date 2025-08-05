import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { InterviewType, JobFormProps, Status } from '../core/interfaces';


export default function JobForm({ onSubmit, onValidationError, isLoading = false }: JobFormProps) {
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [status, setStatus] = useState<Status | 'none'>('none');
    const [interviewType, setInterviewType] = useState<InterviewType | 'none'>('none');

    const handleSubmit = () => {
        if (!title.trim()) {
            onValidationError('Job title is required');
            return;
        }
        
        if (!company.trim()) {
            onValidationError('Company name is required');
            return;
        }
        
        if (status === 'none') {
            onValidationError('Please select a status');
            return;
        }
        
        if (interviewType === 'none') {
            onValidationError('Please select an interview type');
            return;
        }

        onSubmit({
            title: title.trim(),
            company: company.trim(),
            status: status as Status,
            interviewType: interviewType as InterviewType
        });
    };

    // const resetForm = () => {
    //     setTitle('');
    //     setCompany('');
    //     setStatus('none');
    //     setInterviewType('none');
    // };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Job Title"
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                editable={!isLoading}
            />
            
            <TextInput
                placeholder="Company"
                style={styles.input}
                value={company}
                onChangeText={setCompany}
                editable={!isLoading}
            />
            
            <View style={styles.inputPicker}>
                <Picker
                    selectedValue={status}
                    onValueChange={(itemValue) => setStatus(itemValue as Status)}
                    enabled={!isLoading}
                >
                    <Picker.Item label="Status" value="none" enabled={false} />
                    <Picker.Item label="Applied" value="Applied" />
                    <Picker.Item label="Interview" value="Interview" />
                    <Picker.Item label="Rejected" value="Rejected" />
                    <Picker.Item label="Offer" value="Offer" />
                </Picker>
            </View>
            
            <View style={styles.inputPicker}>
                <Picker
                    selectedValue={interviewType}
                    onValueChange={(itemValue) => setInterviewType(itemValue as InterviewType)}
                    enabled={!isLoading}
                >
                    <Picker.Item label="Interview Type" value="none" enabled={false} />
                    <Picker.Item label="Screening" value="Screening" />
                    <Picker.Item label="Behavioral" value="Behavioral" />
                    <Picker.Item label="Live coding" value="Live coding" />
                    <Picker.Item label="Takehome" value="Takehome" />
                </Picker>
            </View>

            <TouchableOpacity 
                style={[styles.button, isLoading && styles.buttonDisabled]} 
                onPress={handleSubmit}
                disabled={isLoading}
            >
                <Text style={styles.buttonText}>
                    {isLoading ? 'Saving...' : 'Save Job'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 14,
        marginBottom: 16,
        borderRadius: 10,
    },
    inputPicker: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 5,
        marginBottom: 16,
        borderRadius: 10,
    },
    button: {
        backgroundColor: '#0a84ff',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});