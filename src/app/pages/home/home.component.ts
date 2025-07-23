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
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('container') container!: ElementRef;
  @ViewChild('starcontainer') starcontainer!: ElementRef;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  controls!: OrbitControls;
  animationFrameId!: number;
  planetPositions = [
    new THREE.Vector3(-60, 0, -30), // Left front
    new THREE.Vector3(50, -10, -10), // Right front
    new THREE.Vector3(-30, 5, -120), // Left back
    new THREE.Vector3(30, 5, -60), // Right back
  ];
  planetGroup!: THREE.Group<THREE.Object3DEventMap>;
  planetMeshes: THREE.Mesh[] = [];
  planetLabels: {
    name: string;
    mesh: THREE.Object3D;
    screenX: number;
    screenY: number;
    scale: number;
  }[] = [];
  routes = ['about', 'experience', 'projects', 'skills'];
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

  constructor(private ngZone: NgZone, private router: Router) {}

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
        scale: [size * 1, size * 1.5],
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

  loadPlanets() {
    this.planetGroup = new THREE.Group();

    this.planetPositions.forEach((position, i) => {
      const geometry = new THREE.SphereGeometry(20, 64, 64);
      const normalMap = new THREE.TextureLoader().load(
        'assets/textures/4k_ceres_fictional.jpg'
      );
      const material = new THREE.MeshStandardMaterial({
        color: '#2f4858',
        normalMap,
      });

      const planet = new THREE.Mesh(geometry, material);
      planet.castShadow = planet.receiveShadow = true;
      planet.position.copy(position);

      const halo = new THREE.Mesh(
        new THREE.SphereGeometry(21, 64, 64),
        new THREE.ShaderMaterial({
          vertexShader: `
            varying vec3 vertexNormal;
            void main() {
              vertexNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            varying vec3 vertexNormal;
            void main() {
              float intensity = pow(0.6 - dot(vertexNormal, vec3(0,0,1)), 4.0);
              gl_FragColor = vec4(0.2,0.8,1.0,0.15) * intensity;
            }
          `,
          blending: THREE.AdditiveBlending,
          transparent: true,
          side: THREE.BackSide,
          depthWrite: false,
        })
      );
      halo.position.copy(position);

      this.planetGroup.add(planet, halo);
      this.planetMeshes.push(planet);

      this.planetLabels.push({
        name: this.routes[i],
        mesh: planet,
        screenX: 0,
        screenY: 0,
        scale: 1,
      });
    });

    this.scene.add(this.planetGroup);
  }

  renderLoop() {
    this.ngZone.runOutsideAngular(() => {
      const loop = () => {
        this.controls.update();
        this.planetMeshes.forEach((m) => (m.rotation.y += 0.005));

        const canvas = this.renderer.domElement;
        const pos = new THREE.Vector3();
        const worldPos = new THREE.Vector3();

        this.planetLabels.forEach((label) => {
          // Get world center of the planet
          label.mesh.getWorldPosition(worldPos);

          // Position label just above the planet in world space
          const labelWorld = worldPos.clone().add(new THREE.Vector3(0, 0, 0));
          pos.copy(labelWorld).project(this.camera);

          label.screenX = ((pos.x + 1) / 2) * canvas.clientWidth;
          label.screenY = ((-pos.y + 1) / 2) * canvas.clientHeight;

          const labelEl = document.getElementById(`label-${label.name}`);
          if (!labelEl) return;

          label.mesh.getWorldPosition(worldPos);
          worldPos.project(this.camera);
        });

        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(loop);
      };
      loop();
    });
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  };

  onMouseClick(event: MouseEvent) {
    const r = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - r.left) / r.width) * 2 - 1;
    this.mouse.y = -((event.clientY - r.top) / r.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const inter = this.raycaster.intersectObjects(this.planetMeshes, false);

    if (inter.length > 0) {
      const mesh = inter[0].object;
      const label = this.planetLabels.find((l) => l.mesh === mesh);
      this.router.navigate([
        '/planet',
        label?.name.toLowerCase().replace(' ', '-'),
      ]);
    }
  }

  onPlanetClick(planetName: string) {
    console.log('Navigating to', planetName);
    this.router.navigate(['/', planetName.toLowerCase()]);
  }
}
