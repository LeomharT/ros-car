varying vec2 vUv;

uniform float uScale;
uniform float uThickness;
uniform float uCross;

uniform vec2 uOffset;

uniform vec3 uColor;

#include <fog_pars_fragment>

void main() {
    float cross     = uCross;
    float thickness = uThickness;

    vec2 uv  = vUv;
         uv *= uScale;
         uv += uOffset;
         uv  = fract(uv);

    vec3  color  = vec3(0.0);
    vec2  center = vec2(0.5);
    float alpha  = 0.0;

    // Cross
    vec2 p = abs(uv - center);

    float u = step(p.x, thickness) * step(p.y, cross);
    float v = step(p.y, thickness) * step(p.x, cross);

    float mask = max(u, v);

    color = uColor * mask;
    alpha = mask;

    // Lines

    uv  = vUv;
    uv *= 22.0;
    uv  = fract(uv);

    vec2 q = abs(uv - center);

    float l = step(q.x, 0.5 - 0.002);
    float t = step(q.y, 0.5 - 0.002);

    color += vec3(1.0) * (1.0 - l * t);
    alpha += (1.0 - l * t);

    gl_FragColor = vec4(color, alpha);

    #include <fog_fragment>
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}