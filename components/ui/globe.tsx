"use client";

import { useEffect, useRef, useCallback } from "react";
import createGlobe, { COBEOptions } from "cobe";
import { OFFICES } from "@/lib/constants";

interface GlobeProps {
  selectedOfficeId?: string | null;
  onMarkerClick?: (officeId: string) => void;
}

export function Globe({ selectedOfficeId }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);

  const updatePointerInteraction = useCallback((clientX: number | null) => {
    pointerInteracting.current = clientX;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = clientX !== null ? "grabbing" : "grab";
    }
  }, []);

  const updateMovement = useCallback((clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      phiRef.current += delta * 0.005;
      pointerInteracting.current = clientX;
    }
  }, []);

  useEffect(() => {
    let width = 0;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    // Convert lat/lng to spherical coordinates for cobe
    const markers = OFFICES.map((office) => ({
      location: [office.coordinates.lat, office.coordinates.lng] as [number, number],
      size: selectedOfficeId === office.id ? 0.12 : 0.08,
    }));

    // Calculate initial rotation to center on selected office or headquarters
    const focusOffice = selectedOfficeId
      ? OFFICES.find(o => o.id === selectedOfficeId)
      : OFFICES[0];

    // Set initial phi based on focus office
    if (focusOffice) {
      phiRef.current = (90 - focusOffice.coordinates.lng) * (Math.PI / 180);
    }

    const globeConfig: COBEOptions = {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: phiRef.current,
      theta: 0.25,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [1, 0, 0], // Pure red
      glowColor: [0.15, 0.15, 0.15],
      markers,
      onRender: (state) => {
        // Only auto-rotate when not dragging
        if (pointerInteracting.current === null) {
          phiRef.current += 0.002;
        }
        state.phi = phiRef.current;
        state.width = width * 2;
        state.height = width * 2;
      },
    };

    if (canvasRef.current) {
      globeRef.current = createGlobe(canvasRef.current, globeConfig);

      // Fade in animation
      setTimeout(() => {
        if (canvasRef.current) {
          canvasRef.current.style.opacity = "1";
        }
      }, 100);
    }

    return () => {
      if (globeRef.current) {
        globeRef.current.destroy();
      }
      window.removeEventListener("resize", onResize);
    };
  }, [selectedOfficeId]);

  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto">
      {/* Glow effect behind globe */}
      <div className="absolute inset-0 bg-gradient-radial from-accent/20 via-transparent to-transparent rounded-full blur-3xl" />

      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing transition-opacity duration-1000 opacity-0"
        style={{ contain: "layout paint size" }}
        onPointerDown={(e) => {
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => {
          updatePointerInteraction(null);
        }}
        onPointerOut={() => {
          updatePointerInteraction(null);
        }}
        onMouseMove={(e) => {
          updateMovement(e.clientX);
        }}
        onTouchMove={(e) => {
          if (e.touches[0]) {
            updateMovement(e.touches[0].clientX);
          }
        }}
      />
    </div>
  );
}
