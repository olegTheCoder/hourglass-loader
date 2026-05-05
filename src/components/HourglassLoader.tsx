import React, { useRef, useEffect } from 'react';
import type { HourglassLoaderProps } from '../types';

export const HourglassLoader: React.FC<HourglassLoaderProps> = ({
  size = 120,
  sandColor = '#FF8C42',
  glassColor = '#9BA4B5',
  frameColor = '#2B2D42',
  speed = 1,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const uidRef = useRef(`hg-${Math.random().toString(36).slice(2, 9)}`);
  const uid = uidRef.current;

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const dur = 3 / speed;

    const style = document.createElement('style');
    style.textContent = `
      .hg-${uid} {
        transform-origin: 50px 50px;
        animation: hg-flip-${uid} ${dur}s cubic-bezier(0.45, 0, 0.55, 1) infinite;
      }
      .hg-top-${uid} {
        transform-origin: 50px 50px;
        animation: hg-top-${uid}-anim ${dur}s linear infinite;
      }
      .hg-bot-${uid} {
        transform-origin: 50px 80px;
        animation: hg-bot-${uid}-anim ${dur}s linear infinite;
      }
      .hg-str-${uid} {
        stroke-dasharray: 28;
        stroke-dashoffset: 28;
        animation: hg-str-${uid}-anim ${dur}s linear infinite;
      }
      @keyframes hg-flip-${uid} {
        0%, 80% { transform: rotate(0deg); }
        92%, 100% { transform: rotate(180deg); }
      }
      @keyframes hg-top-${uid}-anim {
        0%, 10% { transform: scaleY(1); }
        80%, 100% { transform: scaleY(0); }
      }
      @keyframes hg-bot-${uid}-anim {
        0%, 10% { transform: scaleY(0); }
        80%, 100% { transform: scaleY(1); }
      }
      @keyframes hg-str-${uid}-anim {
        0%, 10% { stroke-dashoffset: 28; }
        15%, 75% { stroke-dashoffset: 0; }
        80%, 100% { stroke-dashoffset: -28; }
      }
    `;
    svg.appendChild(style);
    return () => style.remove();
  }, [speed, uid]);

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      preserveAspectRatio="xMidYMid meet"
      style={{ display: 'block' }}
    >
      <defs>
        <clipPath id={`glass-${uid}`}>
          <path d="M 32 20 C 32 45, 46 48, 50 50 C 54 48, 68 45, 68 20 Z M 32 80 C 32 55, 46 52, 50 50 C 54 52, 68 55, 68 80 Z" />
        </clipPath>
      </defs>

      <g className={`hg-${uid}`}>
        <g clipPath={`url(#glass-${uid})`}>
          <rect className={`hg-top-${uid}`} x="25" y="20" width="50" height="30" fill={sandColor} />
          <rect className={`hg-bot-${uid}`} x="25" y="50" width="50" height="30" fill={sandColor} />
        </g>

        <line className={`hg-str-${uid}`} x1="50" y1="50" x2="50" y2="78" stroke={sandColor} strokeWidth="2.5" />

        <path d="M 32 20 C 32 45, 46 48, 50 50 C 54 48, 68 45, 68 20 M 32 80 C 32 55, 46 52, 50 50 C 54 52, 68 55, 68 80"
          fill="none" stroke={glassColor} strokeWidth="3" strokeLinecap="round" />

        <line x1="22" y1="20" x2="22" y2="80" stroke={frameColor} strokeWidth="5" strokeLinecap="round" />
        <line x1="78" y1="20" x2="78" y2="80" stroke={frameColor} strokeWidth="5" strokeLinecap="round" />
        <line x1="44" y1="50" x2="56" y2="50" stroke={frameColor} strokeWidth="6" strokeLinecap="round" />
        <line x1="14" y1="20" x2="86" y2="20" stroke={frameColor} strokeWidth="8" strokeLinecap="round" />
        <line x1="14" y1="80" x2="86" y2="80" stroke={frameColor} strokeWidth="8" strokeLinecap="round" />
      </g>
    </svg>
  );
};
