import { useFrame, useThree } from "@react-three/fiber"
import { useSphere } from "@react-three/cannon"
import { Vector3 } from "three"
import { useEffect, useRef } from "react"

export const Player = () => {
        const { camera } = useThree()
        const [ref, api] = useSphere(() => ({
            mass: 1,
            type:'Dynamic', 
            Position: [0, 0, 0]
        }))

        const vel = useRef([0, 0, 0])
        useEffect(() => {
            api.velocity.subscribe((v) => vel.current = v)
        },  [api.velocity])

        const pos = useRef([0, 0, 0])
        useEffect(() => {
            api.position.subscribe((p) => pos.current = p)
        },  [api.position])
        
    
        useFrame(() => {
            camera.position.copy(new Vector3(...pos.current))   
            
            api.velocity.set(0, 1, 0)
        })

        return (
            <mesh ref={ref}></mesh>
        )
        
}