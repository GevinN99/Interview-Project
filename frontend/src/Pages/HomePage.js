import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import '../App.css';
import TopNavbar from "../Components/Navbar/Navbar";

export default function HomePage() {
    const particlesInit = useCallback(async (engine) => {
        console.log(engine);
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        await console.log(container);
    }, []);

    return (
        <>
            <TopNavbar style={{zIndex:'1'}}/>
            <div className="home-container position-relative">
                <div className="particles-container">
                    <Particles
                        id="tsparticles"
                        init={particlesInit}
                        loaded={particlesLoaded}
                        options={{
                            background: {
                                value: "transparent",
                            },
                            fpsLimit: 120,
                            interactivity: {
                                events: {
                                    onClick: {
                                        enable: true,
                                        mode: "push",
                                    },
                                    onHover: {
                                        enable: true,
                                        mode: "repulse",
                                    },
                                    resize: true,
                                },
                                modes: {
                                    push: {
                                        quantity: 4,
                                    },
                                    repulse: {
                                        distance: 200,
                                        duration: 0.4,
                                    },
                                },
                            },
                            particles: {
                                color: {
                                    value: "#ff3a93",
                                },
                                links: {
                                    color: "#000000",
                                    distance: 150,
                                    enable: true,
                                    opacity: 0.3,
                                    width: 0.5,
                                },
                                move: {
                                    direction: "none",
                                    enable: true,
                                    outModes: {
                                        default: "bounce",
                                    },
                                    random: false,
                                    speed: 4,
                                    straight: false,
                                },
                                number: {
                                    density: {
                                        enable: true,
                                        area: 800,
                                    },
                                    value: 80,
                                },
                                opacity: {
                                    value: 0.5,
                                },
                                shape: {
                                    type: "circle",
                                },
                                size: {
                                    value: { min: 0.8, max: 3 },
                                },
                            },
                            detectRetina: true,
                        }}
                        className="particles-effect h-100"
                    />
                </div>

                <div className="home-content " style={{marginTop:'350px'}}>
                    <h1 className="home-title sign ">
                        <span className="fast-flicker">Us</span>er
                        <span className="flicker">H</span>ub
                    </h1>
                </div>
            </div>

        </>
    );
}
