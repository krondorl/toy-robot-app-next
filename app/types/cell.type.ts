export default interface Cell {
    col: number,
    row: number,
    type: "robot-NORTH" | "robot-EAST" | "robot-SOUTH" | "robot-WEST" | "wall" | "empty";
}
