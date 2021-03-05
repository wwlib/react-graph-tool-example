import { useRef, useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import useInterval from './useInterval';

const allCircles = [1, 2, 3, 4, 5];
const getVisibleCircles = () => {
    const shuffled = allCircles.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
}

const AnimatedCircles = () => {
    const [visibleCircles, setVisibleCircles] = useState(
        getVisibleCircles()
    )
    useInterval(() => {
        setVisibleCircles(getVisibleCircles())
    }, 2000)
    return (
        <svg viewBox="0 0 100 20">
            {allCircles.map(d => (
                <AnimatedCircle
                    key={d}
                    index={d}
                    isShowing={visibleCircles.includes(d)}
                />
            ))}
        </svg>
    )
}
const AnimatedCircle = ({ index, isShowing }) => {
    const wasShowing = useRef(false)
    useEffect(() => {
        wasShowing.current = isShowing
    }, [isShowing])
    const style = useSpring({
        config: {
            duration: 1200,
        },
        r: isShowing ? 6 : 0,
        opacity: isShowing ? 1 : 0,
    })
    return (
        <animated.circle {...style}
            cx={index * 15 + 10}
            cy="10"
            fill={
                !isShowing ? "tomato" :
                    !wasShowing.current ? "cornflowerblue" :
                        "lightgrey"
            }
        />
    )
}

export {
    AnimatedCircles,
    AnimatedCircle
}