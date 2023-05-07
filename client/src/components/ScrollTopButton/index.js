import { useState, useEffect } from 'react';
import { animateScroll } from 'react-scroll';
import './ScrollToTopButton.scss';
function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);
    const threshold = window.innerHeight * 0.9;
    useEffect(() => {
        function handleScroll() {
            const scrollTop = window.scrollY;
            if (scrollTop > threshold) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    function scrollToTop() {
        animateScroll.scrollToTop();
    }
    return (
        <>
            {isVisible && (
                <div className="scroll">
                    <button onClick={scrollToTop}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 15.75l7.5-7.5 7.5 7.5"
                            />
                        </svg>
                    </button>
                </div>
            )}
        </>
    );
}

export default ScrollToTopButton;
