import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// Sun component
function Sun() {
  const sunRef = useRef()
  
  // Slow rotation for the sun
  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.001
    }
  })
  
  return (
    <mesh ref={sunRef}>
      <sphereGeometry args={[2.5, 32, 32]} />
      <meshStandardMaterial
        color="#FDB813"
        emissive="#FDB813"
        emissiveIntensity={2}
      />
      <pointLight intensity={1.3} distance={100} color="#FDB813" />
    </mesh>
  )
}

// Planet component with customizable properties
function Planet({ size, color, orbitRadius, orbitSpeed, rotationSpeed, hasRing }) {
  const planetRef = useRef()
  const orbitRef = useRef()
  
  // Create orbit path
  const orbitPath = useMemo(() => {
    const curve = new THREE.EllipseCurve(
      0, 0,            // Center x, y
      orbitRadius, orbitRadius, // xRadius, yRadius
      0, 2 * Math.PI,  // Start angle, end angle
      false,           // Clockwise
      0               // Rotation
    )
    
    const points = curve.getPoints(50)
    const geometry = new THREE.BufferGeometry().setFromPoints(
      points.map(p => new THREE.Vector3(p.x, 0, p.y))
    )
    
    return geometry
  }, [orbitRadius])
  
  // Update planet position and rotation
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    
    // Update orbit position
    const x = Math.cos(t * orbitSpeed) * orbitRadius
    const z = Math.sin(t * orbitSpeed) * orbitRadius
    planetRef.current.position.x = x
    planetRef.current.position.z = z
    
    // Rotate planet
    planetRef.current.rotation.y += rotationSpeed
  })
  
  return (
    <group>
      {/* Orbit path (visible line) */}
      <line ref={orbitRef}>
        <bufferGeometry attach="geometry" {...orbitPath} />
        <lineBasicMaterial attach="material" color="#666666" opacity={0.3} transparent />
      </line>
      
      {/* Planet body */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color={color} />
        
        {/* Optional ring for gas giants */}
        {hasRing && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[size * 1.5, size * 2.2, 32]} />
            <meshStandardMaterial 
              color={color} 
              opacity={0.7} 
              transparent
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
      </mesh>
    </group>
  )
}

// Main solar system component
const SolarSystem = () => {
  return (
    <group>
      {/* Sun at the center */}
      <Sun />
      
      {/* Planets */}
      <Planet size={0.4} color="#E5E5E5" orbitRadius={4} orbitSpeed={0.5} rotationSpeed={0.02} />
      <Planet size={0.6} color="#D2691E" orbitRadius={6} orbitSpeed={0.35} rotationSpeed={0.018} />
      <Planet size={0.7} color="#6495ED" orbitRadius={8.5} orbitSpeed={0.28} rotationSpeed={0.016} />
      <Planet size={0.5} color="#FF6347" orbitRadius={11} orbitSpeed={0.20} rotationSpeed={0.015} />
      <Planet size={1.2} color="#CD853F" orbitRadius={15} orbitSpeed={0.12} rotationSpeed={0.008} hasRing={false} />
      <Planet size={1.1} color="#F5DEB3" orbitRadius={19} orbitSpeed={0.08} rotationSpeed={0.007} hasRing={true} />
    </group>
  )
}

// Main background component
const Background = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 15, 25], fov: 60 }}
        style={{ background: 'rgb(5, 5, 15)' }} // Darker space background
        gl={{ 
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        {/* Ambient light for base illumination */}
        <ambientLight intensity={0.1} />
        
        {/* Solar system */}
        <SolarSystem />
        
        {/* Stars in the background */}
        <Stars 
          radius={100}
          depth={50}
          count={3000}
          factor={4}
          saturation={0}
          fade
        />
        
        {/* Optional: Allow user interaction */}
        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          autoRotate={false}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}

export default Background
