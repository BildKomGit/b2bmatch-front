// pages/MyCanvasAnimation.tsx
"use client";
import { useLayoutEffect } from "react";

const MyCanvasAnimation: React.FC = () => {
  useLayoutEffect(() => {
    let SCREEN_WIDTH = window.innerWidth;
    let SCREEN_HEIGHT = window.innerHeight;
    const RADIUS = 70;
    let RADIUS_SCALE = 1;
    const RADIUS_SCALE_MIN = 1;
    const RADIUS_SCALE_MAX = 1.5;
    const QUANTITY = 50;

    const canvas: HTMLCanvasElement | null = document.getElementById(
      "world"
    ) as HTMLCanvasElement | null;
    const context: CanvasRenderingContext2D | null = canvas!.getContext("2d");
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    let particles: {
      size: number;
      position: { x: number; y: number };
      offset: { x: number; y: number };
      shift: { x: number; y: number };
      speed: number;
      targetSize: number;
      fillColor: string;
      orbit: number;
    }[] = [];

    let mouseX = SCREEN_WIDTH * 0.5;
    let mouseY = SCREEN_HEIGHT * 0.5;
    let mouseIsDown = false;

    // Create particles on component mount
    createParticles();

    function createParticles() {
      particles = [];

      for (let i = 0; i < QUANTITY; i++) {
        const particle = {
          size: 1,
          position: { x: mouseX, y: mouseY },
          offset: { x: 0, y: 0 },
          shift: { x: mouseX, y: mouseY },
          speed: 0.01 + Math.random() * 0.04,
          targetSize: 1,
          fillColor:
            "#" + ((Math.random() * 0x404040 + 0xaaaaaa) | 0).toString(16),
          orbit: RADIUS * 0.5 + RADIUS * 0.5 * Math.random(),
        };

        particles.push(particle);
      }
    }

    function documentMouseMoveHandler(event: MouseEvent) {
      mouseX = event.clientX - (window.innerWidth - SCREEN_WIDTH) * 0.5;
      mouseY = event.clientY - (window.innerHeight - SCREEN_HEIGHT) * 0.5;
    }

    function documentMouseDownHandler(event: MouseEvent) {
      mouseIsDown = true;
    }

    function documentMouseUpHandler(event: MouseEvent) {
      mouseIsDown = false;
    }

    function documentTouchStartHandler(event: TouchEvent) {
      if (event.touches.length == 1) {
        event.preventDefault();

        mouseX =
          event.touches[0].pageX - (window.innerWidth - SCREEN_WIDTH) * 0.5;
        mouseY =
          event.touches[0].pageY - (window.innerHeight - SCREEN_HEIGHT) * 0.5;
      }
    }

    function documentTouchMoveHandler(event: TouchEvent) {
      if (event.touches.length == 1) {
        event.preventDefault();

        mouseX =
          event.touches[0].pageX - (window.innerWidth - SCREEN_WIDTH) * 0.5;
        mouseY =
          event.touches[0].pageY - (window.innerHeight - SCREEN_HEIGHT) * 0.5;
      }
    }

    function windowResizeHandler() {
      SCREEN_WIDTH = window.innerWidth;
      SCREEN_HEIGHT = window.innerHeight;
      if (canvas) {
        canvas.width = SCREEN_WIDTH;
        canvas.height = SCREEN_HEIGHT;
      }

      // Recreate particles on window resize
      createParticles();
    }

    function loop() {
      if (mouseIsDown) {
        RADIUS_SCALE += (RADIUS_SCALE_MAX - RADIUS_SCALE) * 0.02;
      } else {
        RADIUS_SCALE -= (RADIUS_SCALE - RADIUS_SCALE_MIN) * 0.02;
      }

      RADIUS_SCALE = Math.min(RADIUS_SCALE, RADIUS_SCALE_MAX);

      // Reduce the opacity of the background to create a trailing effect
      if (context) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.fillStyle = "rgba(0, 0, 0, 0)"; // Transparent black
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      }

      for (let i = 0, len = particles.length; i < len; i++) {
        const particle = particles[i];

        const lp = { x: particle.position.x, y: particle.position.y };

        // Rotation
        particle.offset.x += particle.speed;
        particle.offset.y += particle.speed;

        // Follow mouse with some lag
        particle.shift.x += (mouseX - particle.shift.x) * particle.speed;
        particle.shift.y += (mouseY - particle.shift.y) * particle.speed;

        // Apply position
        particle.position.x =
          particle.shift.x +
          Math.cos(i + particle.offset.x) * (particle.orbit * RADIUS_SCALE);
        particle.position.y =
          particle.shift.y +
          Math.sin(i + particle.offset.y) * (particle.orbit * RADIUS_SCALE);

        // Limit to screen bounds
        particle.position.x = Math.max(
          Math.min(particle.position.x, SCREEN_WIDTH),
          0
        );
        particle.position.y = Math.max(
          Math.min(particle.position.y, SCREEN_HEIGHT),
          0
        );

        particle.size += (particle.targetSize - particle.size) * 0.05;

        if (Math.round(particle.size) == Math.round(particle.targetSize)) {
          particle.targetSize = 1 + Math.random() * 7;
        }

        if (context) {
          context.beginPath();
          context.fillStyle = particle.fillColor;
          context.strokeStyle = particle.fillColor;
          context.lineWidth = particle.size;
          context.moveTo(lp.x, lp.y);
          context.lineTo(particle.position.x, particle.position.y);
          context.stroke();
          context.arc(
            particle.position.x,
            particle.position.y,
            particle.size / 2,
            0,
            Math.PI * 2,
            true
          );
          context.fill();
        }
      }
    }

    // Register event listeners
    window.addEventListener("mousemove", documentMouseMoveHandler, false);
    window.addEventListener("mousedown", documentMouseDownHandler, false);
    window.addEventListener("mouseup", documentMouseUpHandler, false);
    document.addEventListener("touchstart", documentTouchStartHandler, false);
    document.addEventListener("touchmove", documentTouchMoveHandler, false);
    window.addEventListener("resize", windowResizeHandler, false);

    // Set interval for animation loop
    const animationInterval = setInterval(loop, 1000 / 60);

    // Cleanup interval on component unmount
    return () => clearInterval(animationInterval);
  }, []);

  return (
    <canvas
      id="world"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 0, // Add zIndex to ensure the canvas is below other elements
      }}
    ></canvas>
  );
};

export default MyCanvasAnimation;
