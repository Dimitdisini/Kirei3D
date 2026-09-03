'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeViewerProps {
  currentModel: string;
  currentColor: string;
  onColorChange?: (colorName: string, colorHex: string) => void;
}

const PALETTE = [
  { name: 'Sakura Pink', hex: '#FFB7C5', metal: 0.1, rough: 0.35 },
  { name: 'Pastel Purple', hex: '#CDB4DB', metal: 0.1, rough: 0.35 },
  { name: 'Sky Blue', hex: '#38BDF8', metal: 0.1, rough: 0.35 },
  { name: 'Cream Butter', hex: '#FEF3C7', metal: 0.05, rough: 0.4 },
  { name: 'Goth Obsidian', hex: '#334155', metal: 0.6, rough: 0.2 },
  { name: 'Metallic Gold', hex: '#F59E0B', metal: 0.85, rough: 0.15 },
];

export default function ThreeViewer({ currentModel, currentColor, onColorChange }: ThreeViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshGroupRef = useRef<THREE.Group | null>(null);
  const activeColorHexRef = useRef<string>(currentColor);
  const isAutoRotatingRef = useRef<boolean>(true);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [selectedColorName, setSelectedColorName] = useState('Sakura Pink');

  const create3DGeometry = (type: string, colorHex: string) => {
    if (!sceneRef.current) return;
    if (meshGroupRef.current) {
      sceneRef.current.remove(meshGroupRef.current);
    }

    const group = new THREE.Group();
    const hexVal = parseInt(colorHex.replace('#', ''), 16) || 0xffb7c5;
    const matInfo = PALETTE.find((p) => p.hex.toLowerCase() === colorHex.toLowerCase()) || PALETTE[0];
    const material = new THREE.MeshStandardMaterial({
      color: hexVal,
      roughness: matInfo.rough,
      metalness: matInfo.metal,
    });

    if (type === 'trophy') {
      const starGeo = new THREE.OctahedronGeometry(1.0, 0);
      const star = new THREE.Mesh(starGeo, material);
      star.position.y = 0.5;
      group.add(star);

      const baseGeo = new THREE.CylinderGeometry(1.2, 1.4, 0.6, 32);
      const baseMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3 });
      const base = new THREE.Mesh(baseGeo, baseMat);
      base.position.y = -0.7;
      group.add(base);

      const crownGeo = new THREE.TorusGeometry(0.7, 0.1, 16, 32);
      const crown = new THREE.Mesh(crownGeo, material);
      crown.position.y = 0.9;
      crown.rotation.x = Math.PI / 2;
      group.add(crown);
    } else if (type === 'topo') {
      const terrainGeo = new THREE.ConeGeometry(1.3, 1.8, 7);
      const terrain = new THREE.Mesh(terrainGeo, material);
      terrain.position.y = -0.1;
      group.add(terrain);

      const baseGeo = new THREE.BoxGeometry(2.4, 0.25, 2.4);
      const base = new THREE.Mesh(
        baseGeo,
        new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.8 })
      );
      base.position.y = -1;
      group.add(base);
    } else if (type === 'keycap') {
      const capGeo = new THREE.BoxGeometry(1.4, 0.9, 1.4);
      const cap = new THREE.Mesh(capGeo, material);
      cap.position.y = 0.2;
      group.add(cap);

      const stemGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      const stem = new THREE.Mesh(
        stemGeo,
        new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.2 })
      );
      stem.position.y = -0.5;
      group.add(stem);
    } else {
      // Chibi Doll Default
      const bodyGeo = new THREE.SphereGeometry(0.65, 32, 32);
      const body = new THREE.Mesh(bodyGeo, material);
      body.position.y = -0.3;
      group.add(body);

      const headGeo = new THREE.SphereGeometry(0.85, 32, 32);
      const head = new THREE.Mesh(headGeo, material);
      head.position.y = 0.75;
      group.add(head);

      const earGeo = new THREE.ConeGeometry(0.25, 0.4, 16);
      const earL = new THREE.Mesh(earGeo, material);
      earL.position.set(-0.5, 1.45, 0);
      earL.rotation.z = 0.3;
      group.add(earL);

      const earR = new THREE.Mesh(earGeo, material);
      earR.position.set(0.5, 1.45, 0);
      earR.rotation.z = -0.3;
      group.add(earR);
    }

    meshGroupRef.current = group;
    sceneRef.current.add(group);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0.8, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.85);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xffb7c5, 0.5);
    pointLight.position.set(-5, -2, -5);
    scene.add(pointLight);

    create3DGeometry(currentModel, currentColor);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (meshGroupRef.current && isAutoRotatingRef.current) {
        meshGroupRef.current.rotation.y += 0.008;
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Mouse & Touch Controls
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      isAutoRotatingRef.current = false;
      setIsAutoRotating(false);
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !meshGroupRef.current) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;
      meshGroupRef.current.rotation.y += deltaX * 0.01;
      meshGroupRef.current.rotation.x += deltaY * 0.005;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        isAutoRotatingRef.current = false;
        setIsAutoRotating(false);
        prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || !meshGroupRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMousePos.x;
      const deltaY = e.touches[0].clientY - prevMousePos.y;
      meshGroupRef.current.rotation.y += deltaX * 0.01;
      meshGroupRef.current.rotation.x += deltaY * 0.005;
      prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('touchstart', onTouchStart);
    container.addEventListener('touchmove', onTouchMove);
    container.addEventListener('touchend', onTouchEnd);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    activeColorHexRef.current = currentColor;
    create3DGeometry(currentModel, currentColor);
  }, [currentModel, currentColor]);

  const toggleAutoRotate = () => {
    const nextVal = !isAutoRotating;
    isAutoRotatingRef.current = nextVal;
    setIsAutoRotating(nextVal);
  };

  const handleColorClick = (p: typeof PALETTE[0]) => {
    setSelectedColorName(p.name);
    create3DGeometry(currentModel, p.hex);
    if (onColorChange) {
      onColorChange(p.name, p.hex);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full h-[320px] bg-slate-50/80 rounded-3xl border border-slate-200 overflow-hidden flex items-center justify-center shadow-inner group">
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-cute font-bold text-slate-600 border border-slate-200 flex items-center gap-1.5 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Interactive 3D Render</span>
        </div>

        <button
          onClick={toggleAutoRotate}
          className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-cute font-bold text-slate-700 hover:bg-white border border-slate-200 shadow-xs flex items-center gap-1 btn-bouncy"
        >
          {isAutoRotating ? 'Pause Rotasi' : 'Putar 3D'}
        </button>
      </div>

      {/* Color Palette Selector */}
      <div className="w-full mt-4 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-cute font-bold text-slate-600">Pilih Warna Filamen 3D:</span>
          <span className="text-xs font-cute font-bold text-pink-600 bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-200">
            {selectedColorName}
          </span>
        </div>

        <div className="grid grid-cols-6 gap-2">
          {PALETTE.map((p) => (
            <button
              key={p.hex}
              onClick={() => handleColorClick(p)}
              className="h-8 rounded-xl border-2 transition-transform hover:scale-110 flex items-center justify-center"
              style={{ backgroundColor: p.hex, borderColor: currentColor.toLowerCase() === p.hex.toLowerCase() ? '#FF5C8A' : 'transparent' }}
              title={p.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
