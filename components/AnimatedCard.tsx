import { JSX } from "react";
import Animated, { FadeInUp, LinearTransition } from "react-native-reanimated";
import { JobDTO } from "../core/interfaces";
import Card from "./Card";

export const AnimatedCard = ({ item, index }: { item: JobDTO; index: number }): JSX.Element => {
    return (
        <Animated.View
            entering={FadeInUp.delay(index * 100).duration(600).springify()}
            layout={LinearTransition.springify()}
        >
            <Card 
                title={item.title} 
                company={item.company} 
                status={item.status} 
                interviewType={item.interviewType} 
                applicationDate={item.applicationDate}
                salary={item.salary}
                location={item.location}
                description={item.description}
                requirements={item.requirements}
                notes={item.notes}
            />
        </Animated.View>
    );
};
