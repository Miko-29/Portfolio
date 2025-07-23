import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  NgZone,
} from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { animate } from 'animejs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cosmos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cosmos.component.html',
  styleUrl: './cosmos.component.css',
})
export class CosmosComponent implements AfterViewInit {
  @ViewChild('container') container!: ElementRef;
  @ViewChild('starcontainer') starcontainer!: ElementRef;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  controls!: OrbitControls;
  planetGroup = new THREE.Group();
  planetMesh!: THREE.Mesh;
  stars = Array(100).fill(0);

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    if (!this.container?.nativeElement) return;

    this.initScene();
    this.addStars();
    this.renderLoop();
  }

  initScene() {
    const container = this.container.nativeElement;
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.set(0, 10, 50);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.setClearColor(0x000000, 0);
    container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.minDistance = 0;
    this.controls.maxDistance = 100;
    this.controls.minPolarAngle = Math.PI / 4;
    this.controls.maxPolarAngle = Math.PI / 4;
    this.controls.minAzimuthAngle = -Math.PI / 4;
    this.controls.maxAzimuthAngle = Math.PI / 4;
    this.controls.target.set(0, 0, 0);
    this.controls.update();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(100, 100, 50);
    this.scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x66ffff, 1.5, 300);
    pointLight.position.set(0, 0, 50);
    this.scene.add(pointLight);
    // this.scene.add(new THREE.PointLightHelper(pointLight, 5));

    this.loadPlanet();
  }

  addStars() {
    const stars = this.starcontainer.nativeElement.querySelectorAll('.star');

    stars.forEach((star: HTMLElement) => {
      const size = Math.random() * 2;
      star.style.left = `${Math.random() * window.innerWidth}px`;
      star.style.top = `${Math.random() * window.innerHeight}px`;
      star.style.border = `${size}px solid white`;
      star.style.borderRadius = '50%';

      animate(star, {
        scale: [size * 1, size * 1.5],
        duration: 1000,
        delay: Math.random() * 1500,
        easing: 'easeOutQuad',
        loop: true,
        alternate: true,
      });
    });
  }
  loadPlanet() {
    const planetGeom = new THREE.SphereGeometry(20, 64, 64);
    const normalMap = new THREE.TextureLoader().load(
      'assets/textures/4k_ceres_fictional.jpg'
    );
    const planetMat = new THREE.MeshStandardMaterial({
      color: '#2f4858',
      normalMap,
    });
    const planet = new THREE.Mesh(planetGeom, planetMat);
    planet.castShadow = planet.receiveShadow = true;
    planet.position.set(0, 0, 0);
    this.scene.add(planet);
    this.planetMesh = planet;

    // 🎉 Halo starts here
    const haloMat = new THREE.ShaderMaterial({
      vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }
    `,
      fragmentShader: `
      varying vec3 vNormal;
      void main() {
        float intensity = pow(1.0 - max(dot(vNormal, vec3(0,0,1)), 0.0), 2.0);
        // glow color + opacity
        gl_FragColor = vec4(0.2, 0.8, 1.0, 0.1) * intensity;
      }
    `,
      blending: THREE.AdditiveBlending,
      transparent: true,
      side: THREE.BackSide,
      depthWrite: false,
    });

    const haloGeom = new THREE.SphereGeometry(22, 64, 64);
    const halo = new THREE.Mesh(haloGeom, haloMat);
    halo.position.set(0, 0, 0);
    this.scene.add(halo);
  }

  renderLoop() {
    this.ngZone.runOutsideAngular(() => {
      const loop = () => {
        this.controls.update();
        this.planetMesh.rotation.y += 0.005;

        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(loop);
      };
      loop();
    });
  }
}
