// cosmos.component.ts
import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  NgZone,
} from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PointLightHelper, TextureLoader } from 'three';
import { animate } from 'animejs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cosmos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cosmos.component.html',
  styleUrl: './cosmos.component.css',
  // template: `<div #container class="canvas-container"></div>`,
  // styles: [
  //   `
  //     .canvas-container {
  //       width: 100%;
  //       height: 100vh;
  //     }
  //   `,
  // ],
})
export class CosmosComponent implements AfterViewInit {
  @ViewChild('container') container!: ElementRef;
  @ViewChild('starcontainer') starcontainer!: ElementRef;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  controls!: OrbitControls;
  animationFrameId!: number;
  planetGroup!: THREE.Group<THREE.Object3DEventMap>;
  planetPositions = [
    new THREE.Vector3(-60, 0, -30), // Left front
    new THREE.Vector3(50, -10, -10), // Right front
    new THREE.Vector3(-30, 5, -120), // Left back
    new THREE.Vector3(30, 5, -60), // Right back
  ];
  planetMeshes: THREE.Group[] = [];
  stars = Array(100).fill(0);
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  ngAfterViewInit() {
    if (!this.container?.nativeElement) {
      console.error('Canvas container not found.');
      return;
    }

    this.initScene();
    this.addStars();
    this.renderer.domElement.addEventListener(
      'click',
      this.onMouseClick.bind(this)
    );

    // this.animate();
  }

  constructor(private ngZone: NgZone) {}

  initScene() {
    const container = this.container.nativeElement;

    const width = window.innerWidth;
    const height = window.innerHeight;

    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // note alpha: true
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.setClearColor(0x000000, 0); // fully transparent background

    // this.scene.background = new THREE.Color('#1A1A2E');
    // this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    // this.camera.position.set(0, 5, 20);

    // this.renderer = new THREE.WebGLRenderer({ antialias: true });
    // this.renderer.setSize(width, height);
    // this.container.nativeElement.appendChild(this.renderer.domElement);

    // const light = new THREE.PointLight(0xffffff, 1);
    // light.position.set(50, 50, 50);
    // this.scene.add(light);
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.set(0, 10, 50);

    // this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(this.renderer.domElement);

    // Controls (must be initialized after camera and renderer)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.target.set(0, 0, 0);
    this.controls.update();
    this.controls.minDistance = 0; // closest zoom allowed
    this.controls.maxDistance = 100; // farthest zoom out

    // ✅ Rotation limits
    this.controls.minPolarAngle = Math.PI / 4;
    this.controls.maxPolarAngle = Math.PI / 2;

    this.controls.minAzimuthAngle = -Math.PI / 4;
    this.controls.maxAzimuthAngle = Math.PI / 4;
    // Lights
    // 🌌 Ambient Light — fills the entire scene softly
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);

    this.scene.add(ambientLight);

    // ☀️ Directional Light — bright "sun" style light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(100, 100, 50); // shining from above and right
    this.scene.add(directionalLight);

    // 💡 Point Light — red cyberpunk accent
    const pointLight = new THREE.PointLight(0x66ffff, 1.5, 300);
    pointLight.position.set(0, 0, 50); // place near the camera
    this.scene.add(pointLight);

    // 🟢 Another Point Light — teal highlight
    // const pointLight2 = new THREE.PointLight(0xffffff, 2, 150);
    // pointLight2.position.set(0, 0, -300);
    // this.scene.add(pointLight2);

    // 🧪 Visual helpers (optional)
    // this.scene.add(new THREE.DirectionalLightHelper(directionalLight, 5));
    // this.scene.add(new THREE.PointLightHelper(pointLight, 5));
    // this.scene.add(new THREE.PointLightHelper(pointLight2, 1));

    // const gridHelper = new THREE.GridHelper(1000, 50); // size, divisions
    // this.scene.add(gridHelper);
    // const axesHelper = new THREE.AxesHelper(100);
    // this.scene.add(axesHelper);

    this.loadPlanets();
    // this.addStarsWithHalo();
    // this.addPointsStars();
    this.renderLoop();
  }

  addStars() {
    const stars = this.starcontainer.nativeElement.querySelectorAll('.star');

    stars.forEach((star: HTMLElement, index: number) => {
      //   //Set initial size
      const size = Math.random() * 2;

      //   // Set initial position
      star.style.left = `${Math.random() * window.innerWidth}px`;
      star.style.top = `${Math.random() * window.innerHeight}px`;
      star.style.border = `${size}px solid white`;
      star.style.borderRadius = '50%';
      // star.style.filter = 'blur(1px)';

      //   // Animate twinkling
      animate(star, {
        scale: [size * 1, size * 2],
        duration: 1000,
        delay: Math.random() * 1500,
        easing: 'easeOutQuad',
        loop: true,
        alternate: true,
        // borderRadius: 10,
        // filter: 'blur(2px)',
      });
    });
  }

  renderLoop(): void {
    this.ngZone.runOutsideAngular(() => {
      const loop = () => {
        this.controls.update();

        // 🌌 Orbit all planets
        // if (this.planetGroup) {
        //   this.planetGroup.rotation.y += 0.001;
        // }

        // 🌀 Spin each planet on its own Y-axis
        this.planetMeshes.forEach((planet) => {
          planet.rotation.y += 0.005;
        });

        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(loop);
      };
      loop();
    });
  }

  loadPlanets() {
    const haloVertexShader = `
    varying vec3 vertexNormal;
    void main() {
      vertexNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

    const haloFragmentShader = `
    varying vec3 vertexNormal;
    void main() {
      float intensity = pow(0.6 - dot(vertexNormal, vec3(0.0, 0.0, 1.0)), 4.0);
      gl_FragColor = vec4(0.2, 0.8, 1.0, 0.15) * intensity;
    }
  `;

    this.planetGroup = new THREE.Group();

    this.planetPositions.forEach((position) => {
      const geometry = new THREE.SphereGeometry(20, 64, 64);

      const normalTexture = new THREE.TextureLoader().load(
        'assets/textures/4k_ceres_fictional.jpg'
      );
      const material = new THREE.MeshStandardMaterial({
        color: '#2f4858', // solid color
        // roughness: 0.7,
        // metalness: 0.1,
        normalMap: normalTexture,
      });

      const planet = new THREE.Mesh(geometry, material);
      planet.castShadow = true;
      planet.receiveShadow = true;

      const halo = new THREE.Mesh(
        new THREE.SphereGeometry(21, 64, 64),
        new THREE.ShaderMaterial({
          vertexShader: haloVertexShader,
          fragmentShader: haloFragmentShader,
          blending: THREE.AdditiveBlending,
          transparent: true,
          side: THREE.BackSide,
          depthWrite: false,
        })
      );

      const planetWithHalo = new THREE.Group();
      planetWithHalo.add(planet);
      planetWithHalo.add(halo);
      planetWithHalo.position.copy(position);

      this.planetGroup.add(planetWithHalo);
      this.planetMeshes.push(planetWithHalo);
    });

    this.scene.add(this.planetGroup);
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  };

  onMouseClick(event: MouseEvent): void {
    const bounds = this.renderer.domElement.getBoundingClientRect();

    this.mouse.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    this.mouse.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    const intersects = this.raycaster.intersectObjects(this.planetMeshes, true);

    if (intersects.length > 0) {
      const clickedPlanet = intersects[0].object;
      console.log('🌍 Clicked planet:', clickedPlanet);
      // You can do something fun here like highlight or animate it
    }
  }
}
