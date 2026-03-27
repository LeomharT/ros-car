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
    uv *= 16.0;
    uv  = fract(uv);

    vec2  q             = abs(uv - center);
    vec2  res           = fwidth(uv);
    float lineThickness = 0.494;

    float lx = smoothstep(lineThickness - res.x, lineThickness, q.x);
    float ly = smoothstep(lineThickness - res.y, lineThickness, q.y);

    float lineMask = max(lx, ly);

    color = mix(
        color,
        vec3(1.0),
        lineMask
    );
    alpha = max(alpha, lineMask);

    gl_FragColor = vec4(color, alpha);

    #include <fog_fragment>
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}