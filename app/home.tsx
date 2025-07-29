import { Link, useFocusEffect } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, {
    FadeInUp,
    LinearTransition,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import JobCard from '../components/Card';
import { getJobs } from '../core/api';
import { Job } from '../core/interfaces';

const AnimatedJobCard = ({ item, index }: { item: Job; index: number }) => {
    return (
        <Animated.View
            entering={FadeInUp.delay(index * 100).duration(600).springify()}
            layout={LinearTransition.springify()}
        >
            <JobCard 
                title={item.title} 
                company={item.company} 
                status={item.status} 
                interviewType={item.interview_type} 
            />
        </Animated.View>
    );
};

export default function Home() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const headerOpacity = useSharedValue(0);
    const headerTranslateY = useSharedValue(-20);
    const addButtonOpacity = useSharedValue(0);
    const addButtonTranslateY = useSharedValue(20);

    const fetchJobs = async () => {
        try {
            const data = await getJobs();
            setJobs(data);
        } catch (e) {
            console.error('Error loading jobs:', e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRefresh = async () => {
        try {
            setRefreshing(true);
            const data = await getJobs();
            setJobs(data);
        } catch (e) {
            console.error('Error loading jobs:', e);
        } finally {
            setRefreshing(false);
        }
    };

    useEffect(() => {
        if (!isLoading) {
            headerOpacity.value = withTiming(1, { duration: 500 });
            headerTranslateY.value = withTiming(0, { duration: 500 });
            addButtonOpacity.value = withDelay(300, withTiming(1, { duration: 500 }));
            addButtonTranslateY.value = withDelay(300, withTiming(0, { duration: 500 }));
        }
    }, [isLoading, addButtonOpacity, addButtonTranslateY, headerOpacity, headerTranslateY]);

    useFocusEffect(() => {
        fetchJobs();
    });

    const headerAnimatedStyle = useAnimatedStyle(() => ({
        opacity: headerOpacity.value,
        transform: [{ translateY: headerTranslateY.value }],
    }));

    const addButtonAnimatedStyle = useAnimatedStyle(() => ({
        opacity: addButtonOpacity.value,
        transform: [{ translateY: addButtonTranslateY.value }],
    }));

    const renderItem = ({ item, index }: { item: Job; index: number }) => (
        <AnimatedJobCard item={item} index={index} />
    );

    return (
        <SafeAreaView style={styles.container}>
            <Animated.View style={headerAnimatedStyle}>
                <Text style={styles.title}>My Job Applications</Text>
            </Animated.View>

            <FlatList
                data={jobs}
                keyExtractor={(item) => item.id.toString()}
                refreshControl={
                    <RefreshControl 
                        refreshing={refreshing} 
                        onRefresh={handleRefresh}
                    />
                }
                ListEmptyComponent={
                    <Animated.View entering={FadeInUp.delay(200).duration(600)}>
                        <Text style={styles.empty}>No jobs yet</Text>
                    </Animated.View>
                }
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={jobs.length === 0 ? styles.emptyContainer : undefined}
            />

            <Link href="/addJob" asChild>
                <TouchableOpacity activeOpacity={0.8}>
                    <Animated.View style={[styles.addButton, addButtonAnimatedStyle]}>
                        <Text style={styles.addText}>+ Add Job</Text>
                    </Animated.View>
                </TouchableOpacity>
            </Link>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    empty: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#777',
    },
    emptyContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    addButton: {
        marginTop: 20,
        backgroundColor: '#0a84ff',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#0a84ff',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    addText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    }
});