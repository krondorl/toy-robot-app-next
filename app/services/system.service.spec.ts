import SystemService from "./system.service";

let systemService = new SystemService();

describe('System Service', () => {
    test('board is initialized', () => {
        for(let i: number = 0; i < 5; i++) {
            expect(systemService.board[i].length).toBe(5);

            for(let j: number = 0; j < 5; j++) {
              expect(systemService.board[i][j].type).toBe("empty");
            }
        }
    });

    test('clear function', () => {
        systemService.clear();
        for(let i: number = 0; i < 5; i++) {
            for(let j: number = 0; j< 5; j++) {
                expect(systemService.board[i][j].type).toBe("empty");
            }
        }
        expect(systemService.reportData).toBe("");
    });

    test('isRobot function', () => {
        expect(systemService.isRobot("")).toBe(false);
        expect(systemService.isRobot("robot")).toBe(false);
        expect(systemService.isRobot("xyz")).toBe(false);
        expect(systemService.isRobot("robot-NORTH")).toBe(true);
        expect(systemService.isRobot("robot-EAST")).toBe(true);
        expect(systemService.isRobot("robot-SOUTH")).toBe(true);
        expect(systemService.isRobot("robot-WEST")).toBe(true);
    });

    test('report function', () => {
       expect(systemService.report()).toBe("");
       systemService.board[2][2].type = "robot-NORTH";
       expect(systemService.report()).toBe("3,3,NORTH");
       systemService.board[2][2].type = "empty";
       systemService.board[0][4].type = "robot-SOUTH";
       expect(systemService.report()).toBe("1,1,SOUTH");
    });

    test('left function', () => {
        systemService.board[0][4].type = "empty";
        systemService.board[2][2].type = "robot-NORTH";
        systemService.left();
        expect(systemService.board[2][2].type).toBe("robot-WEST");
        systemService.left();
        expect(systemService.board[2][2].type).toBe("robot-SOUTH");
        systemService.left();
        expect(systemService.board[2][2].type).toBe("robot-EAST");
        systemService.left();
        expect(systemService.board[2][2].type).toBe("robot-NORTH");
    });

    test('right function', () => {
        systemService.board[2][2].type = "robot-NORTH";
        systemService.right();
        expect(systemService.board[2][2].type).toBe("robot-EAST");
        systemService.right();
        expect(systemService.board[2][2].type).toBe("robot-SOUTH");
        systemService.right();
        expect(systemService.board[2][2].type).toBe("robot-WEST");
        systemService.right();
        expect(systemService.board[2][2].type).toBe("robot-NORTH");
    });

    test('isNorthWall function', () => {
        systemService.board[2][1].type = "wall";
        expect(systemService.isNorthWall(2, 2)).toBe(true);
        systemService.board[2][2].type = "empty";
        systemService.board[2][1].type = "empty";
        systemService.board[2][0].type = "robot-NORTH";
        systemService.board[2][4].type = "wall";
        expect(systemService.isNorthWall(2, 0)).toBe(true);
        systemService.board[2][4].type = "empty";
        expect(systemService.isNorthWall(2, 0)).toBe(false);
    });

    test('isSouthWall function', () => {
        systemService.board[2][1].type = "empty";
        expect(systemService.isSouthWall(2, 2)).toBe(false);
        systemService.board[2][3].type = "wall";
        expect(systemService.isSouthWall(2, 2)).toBe(true);
        systemService.clear();
        systemService.board[2][4].type = "robot-SOUTH";
        systemService.board[2][0].type = "wall";
        expect(systemService.isSouthWall(2, 4)).toBe(true);
    });

    test('isEastWall function', () => {
        systemService.clear();
        systemService.board[2][2].type = "robot-EAST";
        systemService.board[3][2].type = "wall";
        expect(systemService.isEastWall(2, 2)).toBe(true);
        systemService.clear();
        systemService.board[4][2].type = "robot-EAST";
        systemService.board[0][2].type = "wall";
        expect(systemService.isEastWall(4, 2)).toBe(true);
        systemService.board[0][2].type = "empty";
        expect(systemService.isEastWall(4, 2)).toBe(false);
    });

    test('isWestWall function', () => {
        systemService.clear();
        systemService.board[2][2].type = "robot-WEST";
        expect(systemService.isWestWall(2, 2)).toBe(false);
        systemService.board[1][2].type = "wall";
        expect(systemService.isWestWall(2, 2)).toBe(true);
        systemService.clear();
        systemService.board[0][2].type = "robot-WEST";
        systemService.board[4][2].type = "wall";
        expect(systemService.isWestWall(0, 2)).toBe(true);
    });

    test('isFrontWall function', () => {
        systemService.clear();
        systemService.board[2][2].type = "robot-NORTH";
        systemService.board[2][1].type = "wall";
        expect(systemService.isFrontWall(2, 2)).toBe(true);
        systemService.clear();
        systemService.board[2][2].type = "robot-SOUTH";
        systemService.board[2][3].type = "wall";
        expect(systemService.isFrontWall(2, 2)).toBe(true);
        systemService.clear();
        systemService.board[2][2].type = "robot-EAST";
        systemService.board[3][2].type = "wall";
        expect(systemService.isFrontWall(2, 2)).toBe(true);
        systemService.clear();
        systemService.board[2][2].type = "robot-WEST";
        systemService.board[1][2].type = "wall";
        expect(systemService.isFrontWall(2, 2)).toBe(true);
        systemService.clear();
        systemService.board[2][0].type = "robot-NORTH";
        systemService.board[2][4].type = "wall";
        expect(systemService.isFrontWall(2, 0)).toBe(true);
    });

    test('isRobotOnBoard function', () => {
        systemService.clear();
        expect(systemService.isRobotOnBoard()).toBe(false);
        systemService.board[2][2].type = "robot-NORTH";
        expect(systemService.isRobotOnBoard()).toBe(true);
    });

    test('moveNorth function', () => {
        systemService.clear();
        systemService.board[2][2].type = "robot-NORTH";
        systemService.moveNorth(2, 2);
        expect(systemService.board[2][1].type).toBe("robot-NORTH");
        expect(systemService.board[2][2].type).toBe("empty");
        systemService.clear();
        systemService.board[2][0].type = "robot-NORTH";
        systemService.moveNorth(2, 0);
        expect(systemService.board[2][4].type).toBe("robot-NORTH");
        expect(systemService.board[2][2].type).toBe("empty");
    });

    test('moveEast function', () => {
        systemService.clear();
        systemService.board[2][2].type = "robot-EAST";
        systemService.moveEast(2, 2);
        expect(systemService.board[3][2].type).toBe("robot-EAST");
        expect(systemService.board[2][2].type).toBe("empty");
        systemService.clear();
        systemService.board[4][2].type = "robot-EAST";
        systemService.moveEast(4, 2);
        expect(systemService.board[0][2].type).toBe("robot-EAST");
        expect(systemService.board[4][2].type).toBe("empty");
    });

    test('moveSouth function', () => {
        systemService.clear();
        systemService.board[2][2].type = "robot-SOUTH";
        systemService.moveSouth(2, 2);
        expect(systemService.board[2][3].type).toBe("robot-SOUTH");
        expect(systemService.board[2][2].type).toBe("empty");
        systemService.clear();
        systemService.board[2][4].type = "robot-SOUTH";
        systemService.moveSouth(2, 4);
        expect(systemService.board[2][0].type).toBe("robot-SOUTH");
        expect(systemService.board[2][4].type).toBe("empty");
    });

    test('moveWest function', () => {
        systemService.clear();
        systemService.board[2][2].type = "robot-WEST";
        systemService.moveWest(2, 2);
        expect(systemService.board[1][2].type).toBe("robot-WEST");
        expect(systemService.board[2][2].type).toBe("empty");
        systemService.clear();
        systemService.board[0][2].type = "robot-WEST";
        systemService.moveWest(0, 2);
        expect(systemService.board[4][2].type).toBe("robot-WEST");
        expect(systemService.board[0][2].type).toBe("empty");
    });

    test('translateReportParts function', () => {
        expect(systemService.translateReportParts("")).toStrictEqual({});
        expect(systemService.translateReportParts("1,1")).toStrictEqual({ tCol: 0, tRow: 4});
        expect(systemService.translateReportParts("1,1,NORTH")).toStrictEqual({ tCol: 0, tRow: 4, facing: "NORTH"});
        expect(systemService.translateReportParts("5,5")).toStrictEqual({ tCol: 4, tRow: 0});
        expect(systemService.translateReportParts("5,5,SOUTH")).toStrictEqual({ tCol: 4, tRow: 0, facing: "SOUTH"});
    });

    test('move function', () => {
        systemService.clear();
        systemService.board[2][1].type = "robot-NORTH";
        systemService.move();
        expect(systemService.board[2][0].type).toBe("robot-NORTH");
        expect(systemService.board[2][1].type).toBe("empty");
        systemService.clear();
        systemService.board[3][2].type = "robot-EAST";
        systemService.move();
        expect(systemService.board[4][2].type).toBe("robot-EAST");
        expect(systemService.board[3][2].type).toBe("empty");
        systemService.clear();
        systemService.board[2][3].type = "robot-SOUTH";
        systemService.move();
        systemService.move();
        expect(systemService.board[2][0].type).toBe("robot-SOUTH");
        expect(systemService.board[2][3].type).toBe("empty");
        systemService.clear();
        systemService.board[1][2].type = "robot-WEST";
        systemService.move();
        systemService.move();
        expect(systemService.board[4][2].type).toBe("robot-WEST");
        expect(systemService.board[1][2].type).toBe("empty");
    });

    test('placeWall function', () => {
        systemService.clear();
        systemService.placeWall(-1, 6);
        expect(systemService.isRobotOnBoard()).toBe(false);
        systemService.placeWall(1, 1);
        expect(systemService.board[1][1].type).toBe("wall");
    });

    test('placeRobot function', () => {
        systemService.clear();
        systemService.placeRobot(-1, 6, "north");
        expect(systemService.isRobotOnBoard()).toBe(false);
        systemService.placeWall(1, 1);
        systemService.placeRobot(1, 1, "north");
        expect(systemService.isRobotOnBoard()).toBe(false);
        systemService.clear();
        systemService.placeRobot(2, 2, "north");
        expect(systemService.board[2][2].type).toBe("robot-NORTH");
        systemService.placeRobot(0, 4, "east");
        expect(systemService.board[0][4].type).toBe("robot-EAST");
        systemService.placeRobot(1, 4, "south");
        expect(systemService.board[1][4].type).toBe("robot-SOUTH");
        systemService.placeRobot(2, 4, "west");
        expect(systemService.board[2][4].type).toBe("robot-WEST");
    });

    test('parseCommand function', () => {
        systemService.clear();
        expect(systemService.parseCommand("REPORT")).toBe("");
        systemService.parseCommand("PLACE_ROBOT 3,3,NORTH");
        expect(systemService.board[2][2].type).toBe("robot-NORTH");
        systemService.parseCommand("PLACE_WALL 5,5");
        expect(systemService.board[4][0].type).toBe("wall");
        systemService.parseCommand("LEFT");
        expect(systemService.board[2][2].type).toBe("robot-WEST");
        systemService.parseCommand("RIGHT");
        systemService.parseCommand("RIGHT");
        expect(systemService.board[2][2].type).toBe("robot-EAST");
        systemService.parseCommand("MOVE");
        expect(systemService.board[2][2].type).toBe("empty");
        expect(systemService.board[3][2].type).toBe("robot-EAST");
    });

    test('parseCommandScript function', () => {
        systemService.clear();
        systemService.parseCommandScript(`PLACE_ROBOT 1,3,NORTH
PLACE_WALL 1,1
REPORT`);
        expect(systemService.reportData).toBe("1,3,NORTH");
        systemService.clear();
        systemService.parseCommandScript(`PLACE_ROBOT 2,2,WEST
PLACE_WALL 1,1
PLACE_WALL 2,2
PLACE_WALL 1,3
LEFT
LEFT
MOVE
REPORT`);
        expect(systemService.reportData).toBe("2,3,EAST");
        systemService.clear();
        systemService.parseCommandScript(`PLACE_ROBOT 3,3,NORTH
PLACE_WALL 3,5
MOVE
MOVE
RIGHT
MOVE
MOVE
MOVE
REPORT`);
        expect(systemService.reportData).toBe("5,1,EAST");
    });
    
});
