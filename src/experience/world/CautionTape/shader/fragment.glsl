#define PI 3.1415926

varying vec2 vUv;

uniform float uTime;
uniform vec3 uColor;
uniform vec2 uResolution;

vec2 rotateUV(vec2 v, float angle) {
  mat2 m = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
  return v * m;
}

void main() {
  float w      = uResolution.x;
  float alpha  = 0.0;
  float aspect = uResolution.x / uResolution.y;
  vec3  color  = uColor;
  vec2  center = vec2(0.5);


  vec2 uv = vUv;

  alpha += step(uv.y, 0.1);
  alpha += 1.0 - step(uv.y, 0.9);
  
  uv.y /= aspect;

  uv -= center;
  uv  = rotateUV(uv, PI * 1.25);
  uv += center;

  uv.x *= w;
  uv.x += uTime;
  uv    = fract(uv);

  vec2 halfUV = abs(uv - center);

  if (halfUV.x < 0.25) alpha = 1.0;

  gl_FragColor = vec4(color, alpha);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
