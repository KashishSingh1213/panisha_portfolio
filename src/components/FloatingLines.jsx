import { useEffect, useRef } from 'react';
import {
    Scene,
    OrthographicCamera,
    WebGLRenderer,
    PlaneGeometry,
    Mesh,
    ShaderMaterial,
    Vector3,
    Vector2,
    Clock,
    Color
} from 'three';

import './FloatingLines.css';

const vertexShader = `
precision highp float;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float iTime;
uniform vec3  iResolution;
uniform float animationSpeed;

uniform bool enableTop;
uniform bool enableMiddle;
uniform bool enableBottom;

uniform int topLineCount;
uniform int middleLineCount;
uniform int bottomLineCount;

uniform float topLineDistance;
uniform float middleLineDistance;
uniform float bottomLineDistance;

uniform vec3 topWavePosition;
uniform vec3 middleWavePosition;
uniform vec3 bottomWavePosition;

uniform vec2 iMouse;
uniform bool interactive;
uniform float bendRadius;
uniform float bendStrength;
uniform float bendInfluence;

uniform bool parallax;
uniform float parallaxStrength;
uniform vec2 parallaxOffset;

uniform vec3 lineGradient[8];
uniform int lineGradientCount;

const vec3 BLACK = vec3(0.0);

mat2 rotate(float r) {
  return mat2(cos(r), sin(r), -sin(r), cos(r));
}

vec3 background_color(vec2 uv) {
  return vec3(0.0); // Transparent background handled by renderer alpha
}

vec3 getLineColor(float t, vec3 baseColor) {
  if (lineGradientCount <= 0) {
    return baseColor;
  }

  vec3 gradientColor;
  
  if (lineGradientCount == 1) {
    gradientColor = lineGradient[0];
  } else {
    float clampedT = clamp(t, 0.0, 0.9999);
    float scaled = clampedT * float(lineGradientCount - 1);
    int idx = int(floor(scaled));
    float f = fract(scaled);
    int idx2 = min(idx + 1, lineGradientCount - 1);

    vec3 c1 = lineGradient[idx];
    vec3 c2 = lineGradient[idx2];
    
    gradientColor = mix(c1, c2, f);
  }
  
  return gradientColor;
}

float wave(vec2 uv, float offset, vec2 screenUv, vec2 mouseUv, bool shouldBend) {
  float time = iTime * animationSpeed;

  float x_offset   = offset;
  float x_movement = time * 0.1;
  float amp        = sin(offset + time * 0.2) * 0.3;
  float y          = sin(uv.x + x_offset + x_movement) * amp;

  if (shouldBend) {
    vec2 d = screenUv - mouseUv;
    float influence = exp(-dot(d, d) * bendRadius); // radial falloff around cursor
    float bendOffset = (mouseUv.y - screenUv.y) * influence * bendStrength * bendInfluence;
    y += bendOffset;
  }

  float m = uv.y - y;
  
  // Create a glowy line effect
  return smoothstep(0.02, 0.0, abs(m)); 
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 baseUv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
  baseUv.y *= -1.0;
  
  if (parallax) {
    baseUv += parallaxOffset;
  }

  vec3 col = vec3(0.0);
  float alpha = 0.0;

  vec3 b = vec3(0.0); // Base color holder

  vec2 mouseUv = vec2(0.0);
  if (interactive) {
    mouseUv = (2.0 * iMouse - iResolution.xy) / iResolution.y;
    mouseUv.y *= -1.0;
  }
  
  if (enableBottom) {
    for (int i = 0; i < bottomLineCount; ++i) {
      float fi = float(i);
      float t = fi / max(float(bottomLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);
      
      float angle = bottomWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      
      float intensity = wave(
        ruv + vec2(bottomLineDistance * fi + bottomWavePosition.x, bottomWavePosition.y),
        1.5 + 0.2 * fi,
        baseUv,
        mouseUv,
        interactive
      );
      
      col += lineCol * intensity;
      alpha += intensity;
    }
  }

  if (enableMiddle) {
    for (int i = 0; i < middleLineCount; ++i) {
      float fi = float(i);
      float t = fi / max(float(middleLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);
      
      float angle = middleWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      
      float intensity = wave(
        ruv + vec2(middleLineDistance * fi + middleWavePosition.x, middleWavePosition.y),
        2.0 + 0.15 * fi,
        baseUv,
        mouseUv,
        interactive
      );
      
      col += lineCol * intensity;
      alpha += intensity;
    }
  }

  if (enableTop) {
    for (int i = 0; i < topLineCount; ++i) {
      float fi = float(i);
      float t = fi / max(float(topLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);
      
      float angle = topWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      ruv.x *= -1.0;
      
      float intensity = wave(
        ruv + vec2(topLineDistance * fi + topWavePosition.x, topWavePosition.y),
        1.0 + 0.2 * fi,
        baseUv,
        mouseUv,
        interactive
      );
      
      col += lineCol * intensity;
      alpha += intensity;
    }
  }

  // Final blend
  fragColor = vec4(col, min(alpha, 1.0));
}

void main() {
  vec4 color = vec4(0.0);
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}
`;

const MAX_GRADIENT_STOPS = 8;

function hexToVec3(hex) {
    const color = new Color(hex);
    return new Vector3(color.r, color.g, color.b);
}

export default function FloatingLines({
    linesGradient = [
        '#A68A64', // Accent
        '#D4C5A9', // Light Warm
        '#8B5E3C'  // Darker Wood
    ],
    enabledWaves = ['top', 'middle', 'bottom'],
    lineCount = [6],
    lineDistance = [5],
    topWavePosition,
    middleWavePosition,
    bottomWavePosition = { x: 2.0, y: -0.7, rotate: -1 },
    animationSpeed = 0.5,
    interactive = true,
    bendRadius = 5.0,
    bendStrength = -0.5,
    mouseDamping = 0.05,
    parallax = true,
    parallaxStrength = 0.2,
    mixBlendMode = 'normal'
}) {
    const containerRef = useRef(null);
    const targetMouseRef = useRef(new Vector2(-1000, -1000));
    const currentMouseRef = useRef(new Vector2(-1000, -1000));
    const targetInfluenceRef = useRef(0);
    const currentInfluenceRef = useRef(0);
    const targetParallaxRef = useRef(new Vector2(0, 0));
    const currentParallaxRef = useRef(new Vector2(0, 0));

    useEffect(() => {
        if (!containerRef.current) return;

        const scene = new Scene();
        const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
        camera.position.z = 1;

        const renderer = new WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.domElement.style.width = '100%';
        renderer.domElement.style.height = '100%';
        containerRef.current.appendChild(renderer.domElement);

        // Initial Gradient setup
        const gradientStops = new Array(MAX_GRADIENT_STOPS).fill(new Vector3(0, 0, 0));
        if (linesGradient && linesGradient.length > 0) {
            linesGradient.slice(0, MAX_GRADIENT_STOPS).forEach((hex, i) => {
                const c = hexToVec3(hex);
                gradientStops[i].set(c.x, c.y, c.z);
            });
        }

        const uniforms = {
            iTime: { value: 0 },
            iResolution: { value: new Vector3(1, 1, 1) },
            animationSpeed: { value: animationSpeed },

            enableTop: { value: enabledWaves.includes('top') },
            enableMiddle: { value: enabledWaves.includes('middle') },
            enableBottom: { value: enabledWaves.includes('bottom') },

            topLineCount: { value: (enabledWaves.includes('top') ? (Array.isArray(lineCount) ? lineCount[0] : lineCount) : 0) },
            middleLineCount: { value: (enabledWaves.includes('middle') ? (Array.isArray(lineCount) ? (lineCount[1] ?? lineCount[0]) : lineCount) : 0) },
            bottomLineCount: { value: (enabledWaves.includes('bottom') ? (Array.isArray(lineCount) ? (lineCount[2] ?? lineCount[0]) : lineCount) : 0) },

            topLineDistance: { value: (enabledWaves.includes('top') ? (Array.isArray(lineDistance) ? lineDistance[0] : lineDistance) : 0.1) * 0.01 },
            middleLineDistance: { value: (enabledWaves.includes('middle') ? (Array.isArray(lineDistance) ? (lineDistance[1] ?? lineDistance[0]) : lineDistance) : 0.1) * 0.01 },
            bottomLineDistance: { value: (enabledWaves.includes('bottom') ? (Array.isArray(lineDistance) ? (lineDistance[2] ?? lineDistance[0]) : lineDistance) : 0.1) * 0.01 },

            topWavePosition: {
                value: new Vector3(topWavePosition?.x ?? 10.0, topWavePosition?.y ?? 0.5, topWavePosition?.rotate ?? -0.4)
            },
            middleWavePosition: {
                value: new Vector3(
                    middleWavePosition?.x ?? 5.0,
                    middleWavePosition?.y ?? 0.0,
                    middleWavePosition?.rotate ?? 0.2
                )
            },
            bottomWavePosition: {
                value: new Vector3(
                    bottomWavePosition?.x ?? 2.0,
                    bottomWavePosition?.y ?? -0.7,
                    bottomWavePosition?.rotate ?? 0.4
                )
            },

            iMouse: { value: new Vector2(-1000, -1000) },
            interactive: { value: interactive },
            bendRadius: { value: bendRadius },
            bendStrength: { value: bendStrength },
            bendInfluence: { value: 0 },

            parallax: { value: parallax },
            parallaxStrength: { value: parallaxStrength },
            parallaxOffset: { value: new Vector2(0, 0) },

            lineGradient: { value: gradientStops },
            lineGradientCount: { value: linesGradient.length }
        };

        const material = new ShaderMaterial({
            uniforms,
            vertexShader,
            fragmentShader,
            transparent: true,
            depthWrite: false,
        });

        const geometry = new PlaneGeometry(2, 2);
        const mesh = new Mesh(geometry, material);
        scene.add(mesh);

        const clock = new Clock();

        const setSize = () => {
            if (!containerRef.current) return;
            const el = containerRef.current;
            const width = el.clientWidth || 1;
            const height = el.clientHeight || 1;
            renderer.setSize(width, height, false);
            uniforms.iResolution.value.set(width, height, 1);
        };

        setSize();
        const ro = new ResizeObserver(setSize);
        ro.observe(containerRef.current);

        const handlePointerMove = event => {
            const rect = renderer.domElement.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const dpr = renderer.getPixelRatio();
            targetMouseRef.current.set(x * dpr, (rect.height - y) * dpr);
            targetInfluenceRef.current = 1.0;

            if (parallax) {
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                targetParallaxRef.current.set(
                    ((x - centerX) / rect.width) * parallaxStrength,
                    (-(y - centerY) / rect.height) * parallaxStrength
                );
            }
        };

        const handlePointerLeave = () => {
            targetInfluenceRef.current = 0.0;
        };

        if (interactive) {
            containerRef.current.addEventListener('pointermove', handlePointerMove);
            containerRef.current.addEventListener('pointerleave', handlePointerLeave);
        }

        let raf;
        const renderLoop = () => {
            uniforms.iTime.value = clock.getElapsedTime();

            if (interactive) {
                currentMouseRef.current.lerp(targetMouseRef.current, mouseDamping);
                uniforms.iMouse.value.copy(currentMouseRef.current);
                currentInfluenceRef.current += (targetInfluenceRef.current - currentInfluenceRef.current) * mouseDamping;
                uniforms.bendInfluence.value = currentInfluenceRef.current;
            }

            if (parallax) {
                currentParallaxRef.current.lerp(targetParallaxRef.current, mouseDamping);
                uniforms.parallaxOffset.value.copy(currentParallaxRef.current);
            }

            renderer.render(scene, camera);
            raf = requestAnimationFrame(renderLoop);
        };
        renderLoop();

        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
            if (renderer.domElement.parentElement) {
                renderer.domElement.parentElement.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, [linesGradient, enabledWaves, lineCount, lineDistance, animationSpeed, interactive]);

    return (
        <div
            ref={containerRef}
            className="floating-lines-container"
            style={{
                mixBlendMode: mixBlendMode
            }}
        />
    );
}
