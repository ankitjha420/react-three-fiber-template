import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from "@react-three/drei";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import './index.css';

function Box() {
	const [ref, api] = useBox(() => ({ mass: 1, position: [0, 2, 0] }));
	return (
		<mesh
			onClick={() => {
				api.velocity.set(0, 2, 0);
			}}
			ref={ref}
			position={[0, 2, 0]}
		>
			<boxGeometry attach="geometry" />
			<meshLambertMaterial attach="material" color="hotpink" />
		</mesh>
	);
}

function Plane() {
	const [ref] = usePlane(() => ({
		rotation: [-Math.PI / 2, 0, 0],
	}));
	return (
		<mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
			<planeGeometry attach="geometry" args={[100, 100]} />
			<meshLambertMaterial attach="material" color="lightblue" />
		</mesh>
	);
}

createRoot(document.getElementById('root')).render(
	<Canvas>
		<OrbitControls />
		<Stars />
		<ambientLight intensity={0.5} />
		<spotLight position={[10, 15, 10]} angle={0.3} />
		<Physics>
			<Box />
			<Plane />
		</Physics>
	</Canvas>
);