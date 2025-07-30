import { JSX } from "react";
import Animated, { FadeInUp, LinearTransition } from "react-native-reanimated";
import { Job } from "../core/interfaces";
import Card from "./Card";

export const AnimatedCard = ({ item, index }: { item: Job; index: number }): JSX.Element => {
    return (
        <Animated.View
            entering={FadeInUp.delay(index * 100).duration(600).springify()}
            layout={LinearTransition.springify()}
        >
            <Card 
                title={item.title} 
                company={item.company} 
                status={item.status} 
                interviewType={item.interview_type} 
            />
        </Animated.View>
    );
};
