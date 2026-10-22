import * as THREE from 'three'

export type SceneOptions = { night: boolean; season: number; moving: boolean }

export function createJapanScene(
  host: HTMLElement,
  options: SceneOptions,
  onLantern: () => void,
  onLost: () => void,
) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('webgl2', { alpha: true, antialias: true })
  if (!context) throw new Error('WebGL2 is unavailable')
  const renderer = new THREE.WebGLRenderer({
    canvas,
    context,
    alpha: true,
    antialias: true,
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  renderer.shadowMap.enabled = true
  // Only petals move autonomously; recompute shadows when the model rotates.
  renderer.shadowMap.autoUpdate = false
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.setClearColor(0x000000, 0)
  canvas.setAttribute('aria-hidden', 'true')
  host.appendChild(canvas)
  const scene = new THREE.Scene()
  const world = new THREE.Group()
  scene.add(world)
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 80)
  camera.position.set(8, 6.5, 11)
  camera.lookAt(0, 0.65, 0)
  const geometries = new Set<THREE.BufferGeometry>()
  const materials = new Set<THREE.Material>()
  const material = (color: number, extra = {}) => {
    const result = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.85,
      ...extra,
    })
    materials.add(result)
    return result
  }
  const red = material(0xc34532),
    dark = material(0x283033),
    wood = material(0x6a4539)
  const stone = material(0xb4ad98),
    cream = material(0xeee1c2),
    grass = material(0x879d78)
  const mountain = material(0x748ea0),
    snow = material(0xfff9ec)
  const water = material(0x70b7bc, { roughness: 0.28, metalness: 0.22 })
  const blossom = material(0xe9a6b8),
    blossomLight = material(0xf8c9cb)
  const glow = material(0xffe2ad, {
    emissive: 0xff962e,
    emissiveIntensity: 0.15,
  })
  const box = new THREE.BoxGeometry(1, 1, 1)
  const sphere = new THREE.IcosahedronGeometry(1, 1)
  const cylinder = new THREE.CylinderGeometry(1, 1, 1, 12)
  const cone = new THREE.ConeGeometry(1, 1, 9)
  ;[box, sphere, cylinder, cone].forEach((g) => geometries.add(g))
  const mesh = (
    geometry: THREE.BufferGeometry,
    mat: THREE.Material,
    p: number[],
    s: number[],
    parent: THREE.Object3D = world,
  ) => {
    geometries.add(geometry)
    const object = new THREE.Mesh(geometry, mat)
    object.position.set(p[0], p[1], p[2])
    object.scale.set(s[0], s[1], s[2])
    object.castShadow = true
    object.receiveShadow = true
    parent.add(object)
    return object
  }
  mesh(new THREE.CylinderGeometry(3.55, 2.9, 0.8, 48), stone, [0, -0.65, 0], [1, 1, 1])
  mesh(new THREE.CylinderGeometry(3.6, 3.5, 0.18, 48), cream, [0, -0.16, 0], [1, 1, 1])
  mesh(cylinder, water, [0, -0.045, 0.15], [2.9, 0.08, 2.1])
  mesh(cylinder, grass, [-1.7, 0.04, 0], [1.55, 0.14, 2.3])
  mesh(cylinder, grass, [2, 0.04, 0], [1.1, 0.15, 2.25])
  mesh(cone, mountain, [0, 1.1, -1.45], [1.9, 2.5, 1.7])
  mesh(cone, snow, [0, 2.06, -1.45], [0.48, 0.64, 0.43])
  // The scene is an illustrative miniature, not a geographic reconstruction.
  for (let i = 0; i < 6; i++) mesh(box, stone, [0, 0.08, 2.6 - i * 0.32], [0.85, 0.16, 0.25])
  const torii = new THREE.Group()
  torii.position.set(0, 0.1, 1.15)
  world.add(torii)
  for (const x of [-0.83, 0.83]) {
    mesh(cylinder, red, [x, 0.91, 0], [0.115, 1.82, 0.115], torii)
    mesh(cylinder, dark, [x, 0.12, 0], [0.15, 0.24, 0.15], torii)
  }
  mesh(box, red, [0, 1.55, 0], [2.08, 0.15, 0.18], torii)
  mesh(box, red, [0, 1.87, 0], [2.35, 0.16, 0.25], torii)
  mesh(box, dark, [0, 1.99, 0], [2.5, 0.12, 0.33], torii)
  for (const x of [-1.3, 1.3]) {
    const tip = mesh(box, dark, [x, 2.04, 0], [0.28, 0.12, 0.33], torii)
    tip.rotation.z = x < 0 ? -0.3 : 0.3
  }
  mesh(box, dark, [0, 1.73, 0.12], [0.21, 0.35, 0.08], torii)
  mesh(box, cream, [0, 1.73, 0.17], [0.025, 0.2, 0.02], torii)
  // Arched footbridge over the water.
  for (let i = 0; i < 9; i++) {
    const x = -1.6 + i * 0.16,
      y = 0.15 + Math.sin((i / 8) * Math.PI) * 0.25
    mesh(box, wood, [x, y, 0.1], [0.15, 0.1, 0.65])
    if (i % 2 === 0)
      for (const z of [-0.28, 0.48]) {
        mesh(box, red, [x, y + 0.25, z], [0.06, 0.5, 0.06])
        mesh(box, red, [x, y + 0.48, z], [0.33, 0.06, 0.06])
      }
  }
  // Cedar trunks and clustered, faceted canopies.
  const treePositions = [
    [-2.5, 0.8, 0.85],
    [2.45, 0.75, 0.75],
    [-2.25, 0.7, -1.3],
    [2.15, 0.65, -1.35],
    [-1.55, 0.5, 2.3],
  ]
  treePositions.forEach(([x, size, z], t) => {
    mesh(cylinder, wood, [x, size * 0.5, z], [0.09, size, 0.09])
    for (const direction of [-1, 1]) {
      const branch = mesh(
        cylinder,
        wood,
        [x + direction * 0.15, size * 0.8, z],
        [0.045, size * 0.6, 0.045],
      )
      branch.rotation.z = direction * -0.6
    }
    for (let i = 0; i < 7; i++) {
      const angle = i * 2.4
      mesh(
        sphere,
        i % 2 ? blossom : blossomLight,
        [x + Math.sin(angle) * 0.37, size + 0.3 + (i % 3) * 0.13, z + Math.cos(angle) * 0.3],
        [size * 0.5, size * 0.44, size * 0.5],
      )
    }
    mesh(sphere, stone, [x + 0.2, 0.1, z + 0.4], [0.2, 0.13, 0.17 + t * 0.01])
  })
  // A small pagoda at the far side of the garden.
  for (let i = 0; i < 3; i++) {
    const width = 0.65 - i * 0.13
    mesh(box, cream, [1.8, 0.25 + i * 0.37, -0.25], [width, 0.31, width])
    mesh(
      new THREE.ConeGeometry(1, 1, 4),
      dark,
      [1.8, 0.47 + i * 0.37, -0.25],
      [width, 0.27, width],
    ).rotation.y = Math.PI / 4
    mesh(box, red, [1.8, 0.23 + i * 0.37, 0.09 - i * 0.06], [0.1, 0.28, 0.04])
  }
  mesh(cone, dark, [1.8, 1.51, -0.25], [0.07, 0.35, 0.07])
  const lanterns: THREE.Mesh[] = []
  const lights: THREE.PointLight[] = []
  for (const x of [-1.18, 1.18]) {
    mesh(cylinder, dark, [x, 0.43, 1.85], [0.035, 0.85, 0.035])
    const lamp = mesh(sphere, glow, [x, 0.92, 1.85], [0.22, 0.28, 0.22])
    lanterns.push(lamp)
    mesh(cylinder, dark, [x, 1.2, 1.85], [0.14, 0.035, 0.14])
    mesh(cylinder, dark, [x, 0.66, 1.85], [0.13, 0.035, 0.13])
    const light = new THREE.PointLight(0xffb45f, 0, 5, 2)
    light.position.set(x, 1.1, 1.85)
    world.add(light)
    lights.push(light)
  }
  const ambient = new THREE.HemisphereLight(0xfff3df, 0x7b8276, 2.5)
  const sun = new THREE.DirectionalLight(0xffe6cd, 3)
  sun.position.set(-3, 7, 5)
  sun.castShadow = true
  sun.shadow.mapSize.set(1024, 1024)
  Object.assign(sun.shadow.camera, { left: -5, right: 5, top: 5, bottom: -5 })
  sun.shadow.normalBias = 0.035
  scene.add(ambient, sun)
  const petalMaterial = material(0xffb7c5, { side: THREE.DoubleSide })
  const petals = new THREE.InstancedMesh(sphere, petalMaterial, 36)
  world.add(petals)
  const dummy = new THREE.Object3D()
  let settings = { ...options },
    time = 0,
    lastTime = 0,
    frame = 0,
    visible = true,
    disposed = false,
    contextLost = false
  let rotation = -0.15,
    drag: { x: number; start: number } | null = null
  let shadowRotation = Infinity
  const render = () => {
    if (disposed || contextLost) return
    world.rotation.y = rotation
    if (rotation !== shadowRotation) {
      renderer.shadowMap.needsUpdate = true
      shadowRotation = rotation
    }
    for (let i = 0; i < 36; i++) {
      dummy.position.set(
        Math.sin(i * 23.2) * 3.2 + Math.sin(time + i) * 0.18,
        0.3 + ((((i * 0.17 + 4 - time * 0.2) % 3.4) + 3.4) % 3.4),
        Math.cos(i * 14.7) * 2.3,
      )
      dummy.rotation.set(i + time * 0.4, i * 0.2, time + i)
      dummy.scale.set(0.045, settings.season === 3 ? 0.04 : 0.015, 0.035)
      dummy.updateMatrix()
      petals.setMatrixAt(i, dummy.matrix)
    }
    petals.instanceMatrix.needsUpdate = true
    renderer.render(scene, camera)
  }
  const tick = (now: number) => {
    frame = 0
    if (!visible || document.hidden || !settings.moving || disposed || contextLost) return
    if (now - lastTime >= 32) {
      time += Math.min((now - lastTime) / 1000, 0.05)
      lastTime = now
      render()
    }
    frame = requestAnimationFrame(tick)
  }
  const start = () => {
    if (!frame && visible && !document.hidden && settings.moving && !disposed && !contextLost) {
      lastTime = performance.now()
      frame = requestAnimationFrame(tick)
    }
  }
  const update = (next: SceneOptions) => {
    settings = next
    const colors = [
      [0xe9a6b8, 0xf8c9cb, 0x879d78],
      [0x609369, 0x94b777, 0x749461],
      [0xc85a34, 0xe7a647, 0x999364],
      [0xdfebee, 0xffffff, 0xc6cfd0],
    ][next.season]
    blossom.color.setHex(colors[0])
    blossomLight.color.setHex(colors[1])
    grass.color.setHex(colors[2])
    petalMaterial.color.setHex(next.season === 3 ? 0xffffff : colors[1])
    ambient.intensity = next.night ? 1.25 : 2.5
    ambient.color.setHex(next.night ? 0x9bafff : 0xfff3df)
    sun.intensity = next.night ? 0.8 : 3
    glow.emissiveIntensity = next.night ? 3 : 0.15
    lights.forEach((light) => {
      light.intensity = next.night ? 8 : 0
    })
    if (!next.moving) {
      cancelAnimationFrame(frame)
      frame = 0
    }
    render()
    start()
  }
  const resize = () => {
    const width = host.clientWidth,
      height = host.clientHeight
    if (!width || !height) return
    renderer.setSize(width, height)
    camera.aspect = width / height
    camera.fov = width > 500 ? 28 : 35
    camera.position.set(8, 6.5, 11).multiplyScalar(camera.aspect < 1 ? 1.1 : 1)
    camera.updateProjectionMatrix()
    render()
  }
  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(host)
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    if (visible) {
      render()
      start()
    } else {
      cancelAnimationFrame(frame)
      frame = 0
    }
  })
  observer.observe(host)
  const visibility = () => {
    if (document.hidden) {
      cancelAnimationFrame(frame)
      frame = 0
    } else start()
  }
  document.addEventListener('visibilitychange', visibility)
  const down = (event: PointerEvent) => {
    drag = { x: event.clientX, start: event.clientX }
    canvas.setPointerCapture(event.pointerId)
  }
  const move = (event: PointerEvent) => {
    if (drag) {
      rotation += (event.clientX - drag.x) * 0.008
      drag.x = event.clientX
      render()
    }
  }
  const up = (event: PointerEvent) => {
    if (drag && Math.abs(event.clientX - drag.start) < 6) {
      const rect = canvas.getBoundingClientRect()
      const ray = new THREE.Raycaster()
      ray.setFromCamera(
        new THREE.Vector2(
          ((event.clientX - rect.left) / rect.width) * 2 - 1,
          -((event.clientY - rect.top) / rect.height) * 2 + 1,
        ),
        camera,
      )
      if (ray.intersectObjects(lanterns).length) onLantern()
    }
    drag = null
  }
  const cancel = () => {
    drag = null
  }
  const lost = (event: Event) => {
    event.preventDefault()
    contextLost = true
    cancelAnimationFrame(frame)
    frame = 0
    onLost()
  }
  canvas.addEventListener('pointerdown', down)
  canvas.addEventListener('pointermove', move)
  canvas.addEventListener('pointerup', up)
  canvas.addEventListener('pointercancel', cancel)
  canvas.addEventListener('webglcontextlost', lost)
  resize()
  update(settings)
  return {
    update,
    rotate: (amount: number) => {
      rotation += amount
      render()
    },
    reset: () => {
      rotation = -0.15
      render()
    },
    dispose: () => {
      disposed = true
      cancelAnimationFrame(frame)
      observer.disconnect()
      resizeObserver.disconnect()
      document.removeEventListener('visibilitychange', visibility)
      canvas.removeEventListener('pointerdown', down)
      canvas.removeEventListener('pointermove', move)
      canvas.removeEventListener('pointerup', up)
      canvas.removeEventListener('pointercancel', cancel)
      canvas.removeEventListener('webglcontextlost', lost)
      geometries.forEach((g) => g.dispose())
      materials.forEach((m) => m.dispose())
      petals.dispose()
      renderer.dispose()
      renderer.forceContextLoss()
      canvas.remove()
    },
  }
}
