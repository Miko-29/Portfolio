import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { animate } from 'animejs';
import { PointLightHelper, TextureLoader } from 'three';

@Component({
  selector: 'app-cyber-city',
  templateUrl: './cyber-city.component.html',
  styleUrls: ['./cyber-city.component.scss'],
  standalone: true,
})
export class CyberCityComponent implements AfterViewInit {
  @ViewChild('canvasContainer', { static: false }) canvasRef!: ElementRef;

  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  controls!: OrbitControls;
  animationFrameId!: number;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    if (!this.canvasRef?.nativeElement) {
      console.error('Canvas container not found.');
      return;
    }

    this.initScene();
    this.animateCameraIn();
  }

  initScene(): void {
    const container = this.canvasRef.nativeElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    this.scene = new THREE.Scene();
    // this.scene.background = new THREE.Color(0x000000);
    // this.scene.fog = new THREE.Fog(0x000000, 10, 50);

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.set(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(this.renderer.domElement);

    // Controls (must be initialized after camera and renderer)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.target.set(0, 0, 0);
    this.controls.update();

    // Lights
    // 🌌 Ambient Light — fills the entire scene softly
    const ambientLight = new THREE.AmbientLight(0xffffff, 0);
    this.scene.add(ambientLight);

    // ☀️ Directional Light — bright "sun" style light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0);
    directionalLight.position.set(0, 200, 500);
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);

    // 💡 Point Light — red cyberpunk accent
    const pointLight = new THREE.PointLight(0xffffff, 2, 150);
    pointLight.position.set(0, 200, 500);
    this.scene.add(pointLight);

    // 🟢 Another Point Light — teal highlight
    const pointLight2 = new THREE.PointLight(0xffffff, 2, 150);
    pointLight2.position.set(0, 0, -300);
    this.scene.add(pointLight2);

    // 🧪 Visual helpers (optional)
    this.scene.add(new THREE.DirectionalLightHelper(directionalLight, 5));
    this.scene.add(new THREE.PointLightHelper(pointLight, 5));
    this.scene.add(new THREE.PointLightHelper(pointLight2, 1));

    // 1. Load the 3D Model
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('assets/models/cybercity2.glb', (gltf) => {
      const model = gltf.scene;
      model.scale.set(1, 1, 1); // or whatever scale you're using
      model.position.set(100, -200, 0);
      this.scene.add(model);
    });

    // 2. Load the Background Image using TextureLoader
    const loader = new THREE.TextureLoader();
    loader.load('assets/bg.png', (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace; // ⬅️ apply ONLY for sRGB images
      this.scene.background = texture;
    });
    // Fix color space
    //  this.renderer.colorSpace = THREE.SRGBColorSpace;

    this.renderer.toneMapping = THREE.ACESFilmicToneMapping; // Adds cinematic tone
    this.renderer.toneMappingExposure = 1.2; // You can tweak this (1.0–1.5)

    this.renderLoop();
  }

  animateCameraIn(): void {
    animate(this.camera.position, {
      z: 400,
      duration: 2000,
      easing: 'easeOutCubic',
    });
  }

  renderLoop(): void {
    this.ngZone.runOutsideAngular(() => {
      const loop = () => {
        this.renderer.setClearColor(0x000000, 0); // Transparent background
        this.controls.update(); // Update OrbitControls
        this.renderer.render(this.scene, this.camera);
        this.animationFrameId = requestAnimationFrame(loop);
      };
      loop();
    });
  }
}
