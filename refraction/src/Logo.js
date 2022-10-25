import React, { useRef } from "react";
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useGLTF, useFBO } from "@react-three/drei";
import { RGBELoader } from 'three-stdlib'

import Img from './img/logo.gltf'
import { MeshRefractionMaterial } from './shaders/MeshRefractionMaterial.tsx'

export default function Logo(props) {
  const { nodes } = useGLTF(Img);
  const fbo = useFBO(1024)
  const texture = useLoader(RGBELoader, 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/decor_shop_1k.hdr')
  useFrame((state) => {
    state.gl.setRenderTarget(fbo)
    state.scene.background = texture
    state.gl.render(state.scene, state.camera)
    state.scene.background = null
    state.gl.setRenderTarget(null)
  })
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        geometry={nodes.path91001.geometry}
        position={[2, 0, 11.45]}
        rotation={[0, Math.PI / 2, Math.PI / 2]}
        scale={[16.94, 1, 16.94]}>
        <MeshRefractionMaterial
          uSceneTex={fbo.texture}
          uRefractPower={1.0}
          uRefractNormal={0.85}
          uTransparent={0.35}
          uSat={1.03}
          uIntensity={2}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload(Img);