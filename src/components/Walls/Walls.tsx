import { RigidBody } from "@react-three/rapier";
import { Box } from "@react-three/drei";

export type WallsProps = {
  visible: boolean;
};

const Walls: React.FC<WallsProps> = ({ visible }) => {
  return (
    <>
      <RigidBody type="fixed" colliders="cuboid" restitution={1} friction={0}>
        <Box position={[-30, 2.5, 0]} args={[2, 5, 10]}>
          <meshStandardMaterial
            color={"grey"}
            transparent={!visible}
            opacity={visible ? 1 : 0}
          />
        </Box>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid" restitution={1} friction={0}>
        <Box position={[30, 2.5, 0]} args={[2, 5, 10]}>
          <meshStandardMaterial
            color={"grey"}
            transparent={!visible}
            opacity={visible ? 1 : 0}
          />
        </Box>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid" restitution={1} friction={0}>
        <Box position={[0, 2.5, -5]} args={[60, 5, 1]}>
          <meshStandardMaterial
            color={"grey"}
            transparent={!visible}
            opacity={visible ? 1 : 0}
          />
        </Box>
      </RigidBody>
      {/* <RigidBody type="fixed" colliders="cuboid">
			<Box position={[0, 2.5, 5.5]} args={[60, 5, 1]}>
			  <meshStandardMaterial
				color={color}
				transparent={adjustedTransparent}
				opacity={1}
			  />
			</Box>
		  </RigidBody> */}
    </>
  );
};

export default Walls;
