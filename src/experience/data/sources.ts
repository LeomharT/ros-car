export const sources = [
  { name: 'carModel', type: 'gltfModel', path: '/assets/models/ros-car.glb' },
  { name: 'mapModel', type: 'gltfModel', path: '/assets/models/ros-map.glb' },
  { name: 'environment', type: 'hdrTexture', path: '/assets/texture/venice_sunset_1k.hdr' },
  { name: 'navigation', type: 'navMesh', path: '/assets/models/navmesh.glb' },
] as const;
