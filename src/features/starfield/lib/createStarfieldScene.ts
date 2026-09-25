import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from "three";

export type StarfieldHandles = {
  render: () => void;
  resize: () => void;
  setPerspective: (yaw: number, pitch: number) => void;
  dispose: () => void;
};

const STAR_COUNT = 16000;
const ORBIT_RADIUS = 36;

const vertexShader = /* glsl */ `
  attribute float aScale;
  attribute float aAlpha;
  varying float vAlpha;
  varying vec3 vColor;

  uniform float uPixelRatio;
  uniform float uSize;

  void main() {
    vColor = color;
    vAlpha = aAlpha;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Hard pixel cap — keeps stars as pinpricks, never chunky squares
    float size = aScale * uSize * uPixelRatio;
    gl_PointSize = clamp(size, 0.7, 2.6);
  }
`;

const fragmentShader = /* glsl */ `
  varying float vAlpha;
  varying vec3 vColor;

  void main() {
    vec2 c = gl_PointCoord - vec2(0.5);
    float d = length(c);
    if (d > 0.5) discard;

    float core = smoothstep(0.5, 0.0, d);
    float bloom = pow(core, 1.4);
    vec3 lit = vColor * (1.0 + bloom * 0.55);
    gl_FragColor = vec4(lit, vAlpha * core);
  }
`;

function createStarGeometry(): BufferGeometry {
  const positions = new Float32Array(STAR_COUNT * 3);
  const colors = new Float32Array(STAR_COUNT * 3);
  const scales = new Float32Array(STAR_COUNT);
  const alphas = new Float32Array(STAR_COUNT);
  const color = new Color();

  for (let i = 0; i < STAR_COUNT; i += 1) {
    const i3 = i * 3;
    const depth = Math.random();
    const radius = 40 + 420 * depth * depth;

    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i3] = Math.sin(phi) * Math.cos(theta) * radius;
    positions[i3 + 1] = Math.sin(phi) * Math.sin(theta) * radius;
    positions[i3 + 2] = Math.cos(phi) * radius;

    // Multicolor field — same spirit as the galaxy star shell
    const roll = Math.random();
    if (roll > 0.55) {
      // Full spectrum saturated stars
      color.setHSL(Math.random(), 0.75 + Math.random() * 0.25, 0.62 + Math.random() * 0.28);
    } else if (roll > 0.3) {
      // Cool blues / cyans
      color.setHSL(0.55 + Math.random() * 0.12, 0.7 + Math.random() * 0.3, 0.65 + Math.random() * 0.25);
    } else if (roll > 0.12) {
      // Warm pinks / magentas (galaxy accent)
      color.setHSL(0.9 + Math.random() * 0.08, 0.7 + Math.random() * 0.3, 0.62 + Math.random() * 0.28);
    } else {
      // Hot white-gold highlights
      color.setHSL(0.12 + Math.random() * 0.08, 0.35 + Math.random() * 0.4, 0.78 + Math.random() * 0.2);
    }

    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;

    scales[i] = Math.random() < 0.85 ? 0.65 + Math.random() * 0.5 : 1.0 + Math.random() * 0.65;
    alphas[i] = 0.5 + Math.random() * 0.35;
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setAttribute("color", new BufferAttribute(colors, 3));
  geometry.setAttribute("aScale", new BufferAttribute(scales, 1));
  geometry.setAttribute("aAlpha", new BufferAttribute(alphas, 1));
  return geometry;
}

export function createStarfieldScene(canvas: HTMLCanvasElement): StarfieldHandles {
  const scene = new Scene();
  const camera = new PerspectiveCamera(60, 1, 0.1, 2000);

  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
    powerPreference: "high-performance",
  });
  renderer.setClearColor(0x000000, 1);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const geometry = createStarGeometry();
  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uPixelRatio: { value: renderer.getPixelRatio() },
      uSize: { value: 1.0 },
    },
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    vertexColors: true,
  });
  const points = new Points(geometry, material);
  scene.add(points);

  const resize = () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (width === 0 || height === 0) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    material.uniforms.uPixelRatio.value = renderer.getPixelRatio();
    renderer.setSize(width, height, false);
  };

  const setPerspective = (yaw: number, pitch: number) => {
    const phi = Math.PI / 2 - pitch;
    camera.position.x = ORBIT_RADIUS * Math.sin(phi) * Math.sin(yaw);
    camera.position.y = ORBIT_RADIUS * Math.cos(phi);
    camera.position.z = ORBIT_RADIUS * Math.sin(phi) * Math.cos(yaw);
    camera.lookAt(0, 0, 0);
    points.rotation.y = yaw * 0.12;
    points.rotation.x = pitch * 0.06;
  };

  const render = () => {
    renderer.render(scene, camera);
  };

  const dispose = () => {
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  };

  resize();
  setPerspective(0, 0.22);

  return { render, resize, setPerspective, dispose };
}
