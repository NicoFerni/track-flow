import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import JobForm from '../components/AddJobForm';
import { addJob } from '../core/api';

export default function AddJob() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleJobSubmit = async (jobData: {
        title: string;
        company: string;
        status: any;
        interview_type: any;
    }) => {
        setIsLoading(true);
        
        try {
            await addJob(jobData);
            router.replace('/home');
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to add job');
        } finally {
            setIsLoading(false);
        }
    };

    const handleValidationError = (message: string) => {
        Alert.alert('Validation Error', message);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Add Job Application</Text>
            <JobForm
                onSubmit={handleJobSubmit}
                onValidationError={handleValidationError}
                isLoading={isLoading}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 24,
    },
});