import { memo, useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Instances, Instance, AccumulativeShadows, RandomizedLight, OrbitControls, Text3D, Center, useFBO } from '@react-three/drei'
import { RGBELoader } from 'three-stdlib'
import { MeshRefractionMaterial } from './shaders/MeshRefractionMaterial.tsx'

import Logo from './Logo'

export default function App() {
  return (
    <Canvas shadows camera={{ fov: 30, position: [5, 17, 17] }}>
      <color attach="background" args={['#f2f2f5']} />
      <fog attach="fog" args={['#f2f2f5', 35, 50]} />
      <group position={[0, -1, 0]}>
        <LogoMat makeDefault
          camera={[0, 17.5, 17.5]}
          translateX={Math.PI / 2}
        />
        {/* <Text position={[0, 0, 2.25]} camera={[0, 17.5, 17.5]}>
          W
        </Text> */}
        {/* <Text position={[0, 0, -2.25]} camera={[0, 17.5, 17.5]}>
          FL RS
        </Text> */}
        <Grid />
        <Shadows />
      </group>
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.1}
        enablePan={false}
        enableZoom={false}
        dampingFactor={0.025}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 3}
      />
    </Canvas>
  )
}

function Grid({ number = 23, lineWidth = 0.025, height = 0.5 }) {
  return (
    <Instances>
      <gridHelper args={[100, 100, '#bbb', '#bbb']} position={[0, -0.01, 0]} />
      <planeGeometry args={[lineWidth, height]} />
      <meshBasicMaterial color="#999" />
      {Array.from({ length: number }, (_, y) =>
        Array.from({ length: number }, (_, x) => (
          <group position={[x * 2 - Math.floor(number / 2) * 2, -0.01, y * 2 - Math.floor(number / 2) * 2]}>
            <Instance rotation={[-Math.PI / 2, 0, 0]} />
            <Instance rotation={[-Math.PI / 2, 0, Math.PI / 2]} />
          </group>
        ))
      )}
    </Instances>
  )
}

// function Text({ children, camera, makeDefault, ...props }) {
//   const ref = useRef()
//   const fbo = useFBO(1024)
//   const texture = useLoader(RGBELoader, 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/decor_shop_1k.hdr')
//   useFrame((state) => {
//     ref.current.visible = false
//     state.gl.setRenderTarget(fbo)
//     state.scene.background = texture
//     state.gl.render(state.scene, state.camera)
//     state.scene.background = null
//     state.gl.setRenderTarget(null)
//     ref.current.visible = true
//   })
//   return (
//     <Center ref={ref} top {...props}>
//       <Text3D
//         castShadow
//         bevelEnabled
//         scale={5}
//         height={0.25}
//         bevelSize={0.01}
//         bevelSegments={10}
//         curveSegments={128}
//         bevelThickness={0.01}
//         font="/Inter_Bold.json">
//         {children}
//         <MeshRefractionMaterial
//           uSceneTex={fbo.texture}
//           uRefractPower={1.0}
//           uRefractNormal={0.85}
//           uTransparent={0.35}
//           uSat={1.03}
//           uIntensity={2}
//         />
//       </Text3D>
//     </Center>
//   )
// }

function LogoMat({ camera, makeDefault, ...props }) {
  const ref = useRef()
  return (
    <Center ref={ref} top {...props}>
      <Logo key={ref}
        scale={2.2}>=
      </Logo>
    </Center>
  )
}

const Shadows = memo(() => (
  <AccumulativeShadows
    temporal
    frames={100}
    color="lightblue"
    colorBlend={1}
    toneMapped={true}
    alphaTest={0.9}
    opacity={1}
    scale={15}
    position={[0, 0, 0]}>
    <RandomizedLight amount={8} radius={15} ambient={0.5} intensity={1} position={[-5, 10, 0]} bias={0.001} />
  </AccumulativeShadows>
))
