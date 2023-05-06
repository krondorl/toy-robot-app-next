import Cell from "../types/cell.type";
import TranslatedParts from "../types/translated-parts.type";

class SystemService {
    board: Cell[][];
    reportData: string;
    history: string[];

    constructor() {
        this.board = [];
        this.reportData = "";
        this.create();
        this.history = [];
    }

    create(): void {
        for(let i: number = 0; i < 5; i++) {
            this.board[i] = [];
            for(let j: number = 0; j< 5; j++) {
                this.board[i][j] = {
                    col: (i + 1),
                    row: (5 - j),
                    type: "empty"
                };
            }
        }
    }

    clear(): void {
        for(let i: number = 0; i < 5; i++) {
            for(let j: number = 0; j< 5; j++) {
                this.board[i][j].type = "empty";
            }
        }
        this.reportData = "";
        this.history = [];
    }

    isRobot(cellType: string): boolean {
        const robotTypes = ["robot-NORTH", "robot-EAST", "robot-SOUTH", "robot-WEST"];
        return robotTypes.includes(cellType);
    }

    isRobotOnBoard(): boolean {
        for(let i: number = 0; i < 5; i++) {
            for(let j: number = 0; j< 5; j++) {
                if (this.isRobot(this.board[i][j].type)) {
                    return true;
                }
            }
        }

        return false;
    }

    // Translate coordinates
    translateReportParts(report: string): TranslatedParts {
        if (report.length > 0) {
            const reportParts = report.split(",");
            const row = reportParts[0];
            const col = reportParts[1];
            const facing = reportParts[2];
            const translateRow = 5 - (+row);
            const translateCol = (+col) - 1;
            if (facing !== undefined) {
                return {
                    "tCol": translateCol,
                    "tRow": translateRow,
                    "facing": facing
                };
            } else {
                return {
                    "tCol": translateCol,
                    "tRow": translateRow
                };
            }
        }
        return {};
    }

    report(): string {
        for(let i: number = 0; i < 5; i++) {
            for(let j: number = 0; j< 5; j++) {
                if (this.isRobot(this.board[i][j].type)) {
                    const row = this.board[i][j].row;
                    const col = this.board[i][j].col;
                    const direction = this.board[i][j].type.split("-");
                    return `${row},${col},${direction[1]}`;
                }
            }
        }

        return "";
    }

    left(): void {
        const report = this.report();
        if (report.length > 0) {
            const reportParts = report.split(",");
            const row = reportParts[0];
            const col = reportParts[1];
            const translateRow = 5 - (+row);
            const translateCol = (+col) - 1;

            switch (this.board[translateCol][translateRow].type) {
                case "robot-NORTH":
                    this.board[translateCol][translateRow].type = "robot-WEST";
                    break;
                case "robot-EAST":
                    this.board[translateCol][translateRow].type = "robot-NORTH";
                    break;
                case "robot-SOUTH":
                    this.board[translateCol][translateRow].type = "robot-EAST";
                    break;
                case "robot-WEST":
                    this.board[translateCol][translateRow].type = "robot-SOUTH";
                    break;
            }
        }
    }

    right(): void {
        const report = this.report();
        if (report.length > 0) {
            const reportParts = report.split(",");
            const row = reportParts[0];
            const col = reportParts[1];
            const translateRow = 5 - (+row);
            const translateCol = (+col) - 1;

            switch (this.board[translateCol][translateRow].type) {
                case "robot-NORTH":
                    this.board[translateCol][translateRow].type = "robot-EAST";
                    break;
                case "robot-EAST":
                    this.board[translateCol][translateRow].type = "robot-SOUTH";
                    break;
                case "robot-SOUTH":
                    this.board[translateCol][translateRow].type = "robot-WEST";
                    break;
                case "robot-WEST":
                    this.board[translateCol][translateRow].type = "robot-NORTH";
                    break;
            }
        }
    }

    isNorthWall(col: number, row: number): boolean {
        if (row - 1 >= 0) {
            if (this.board[col][row - 1].type === "wall") {
                return true; 
            }
        } else {
            if (this.board[col][4].type === "wall") {
                return true; 
            }
        }

        return false;
    }

    isSouthWall(col: number, row: number): boolean {
        if (row + 1 <= 4) {
            if (this.board[col][row + 1].type === "wall") {
                return true; 
            }
        } else {
            if (this.board[col][0].type === "wall") {
                return true; 
            }
        }

        return false;
    }

    isEastWall(col: number, row: number): boolean {
        if (col + 1 <= 4) {
            if (this.board[col + 1][row].type === "wall") {
                return true; 
            }
        } else {
            if (this.board[0][row].type === "wall") {
                return true; 
            }
        }

        return false;
    }

    isWestWall(col: number, row: number): boolean {
        if (col - 1 >= 0) {
            if (this.board[col - 1][row].type === "wall") {
                return true; 
            }
        } else {
            if (this.board[4][row].type === "wall") {
                return true; 
            }
        }

        return false;
    }

    // Check if there is a wall around the robot
    // or the other side, based on direction
    isFrontWall(col: number, row: number): boolean {
        let isFrontWall = false;
        const checkCell = this.board[col][row].type;
          switch (checkCell) {
            case "robot-NORTH":
                isFrontWall = this.isNorthWall(col, row);
                break;
            case "robot-SOUTH":
                isFrontWall = this.isSouthWall(col, row);
                break;
            case "robot-EAST":
                isFrontWall = this.isEastWall(col, row);
                break;
            case "robot-WEST":
                isFrontWall = this.isWestWall(col, row);
                break;
        }

        return isFrontWall;
    }

    moveNorth(col: number, row: number): void {
        this.board[col][row].type = "empty";
        if (row - 1 >= 0) {
            this.board[col][row - 1].type = "robot-NORTH";
        } else {
            this.board[col][4].type = "robot-NORTH";
        }
    }

    moveEast(col: number, row: number): void {
        this.board[col][row].type = "empty";
        if (col + 1 <= 4) {
            this.board[col + 1][row].type = "robot-EAST";
        } else {
            this.board[0][row].type = "robot-EAST";
        }
    }

    moveSouth(col: number, row: number): void {
        this.board[col][row].type = "empty";
        if (row + 1 <= 4) {
            this.board[col][row + 1].type = "robot-SOUTH";
        } else {
            this.board[col][0].type = "robot-SOUTH";
        }
    }

    moveWest(col: number, row: number): void {
        this.board[col][row].type = "empty";
        if (col - 1 >= 0) {
            this.board[col - 1][row].type = "robot-WEST";
        } else {
            this.board[4][row].type = "robot-WEST";
        }
    }

    move(): void {
        const report = this.report();
        if (report.length > 0) {
            const { tCol, tRow } = this.translateReportParts(report);

            if (tCol !== undefined && tRow !== undefined) {
                if (!this.isFrontWall(tCol, tRow)) {
                    switch (this.board[tCol][tRow].type) {
                        case "robot-NORTH":
                            this.moveNorth(tCol, tRow);
                            break;
                        case "robot-EAST":
                            this.moveEast(tCol, tRow);
                            break;
                        case "robot-SOUTH":
                            this.moveSouth(tCol, tRow);
                            break;
                        case "robot-WEST":
                            this.moveWest(tCol, tRow);
                            break;
                    }
                }
            }
        }
    }

    placeRobot(col: number, row: number, facing: string): void {
        if (col >= 0 && col <= 4 && row >= 0 && row <= 4) {
            if (this.board[col][row].type === "empty") {
                switch (facing) {
                    case "north":
                        this.board[col][row].type = "robot-NORTH";
                        break;
                    case "east":
                        this.board[col][row].type = "robot-EAST";
                        break;
                    case "south":
                        this.board[col][row].type = "robot-SOUTH";
                        break;
                    case "west":
                        this.board[col][row].type = "robot-WEST";
                        break;
                }
            }
        }
    }

    placeWall(col: number, row: number): void {
        if (col >= 0 && col <= 4 && row >= 0 && row <= 4) {
            if (this.board[col][row].type === "empty") {
                this.board[col][row].type = "wall";
            }
        }
    }

    parseCommand(command: string): string | void {
        if (command.length > 0) {
            let row = -1;
            let col = -1;
            let facing = "";
            const commandParts = command.split(" ");
            const rawCommand = commandParts[0];

            if (commandParts[1]) {
                let params = this.translateReportParts(commandParts[1]);

                if (params.tRow !== undefined && params.tCol !== undefined) {
                    row = params.tRow;
                    col = params.tCol;
                }

                if (params.facing !== undefined) {
                    facing = params.facing.toLowerCase();
                }
            }

            switch (rawCommand) {
                case "PLACE_ROBOT":
                    this.placeRobot(col, row, facing);
                    break;
                case "PLACE_WALL":
                    this.placeWall(col, row);
                    break;
                case "LEFT":
                    this.left();
                    break;
                case "RIGHT":
                    this.right();
                    break;
                case "MOVE":
                    this.move();
                    break;
                case "REPORT":
                    return this.report();
            }
        }
    }

    parseCommandScript(commandScript: string): string | void {
        if (commandScript.length > 0) {
            const commands = commandScript.split(/\r?\n/);//?

            commands.forEach((command) => {
                const commandOutput = this.parseCommand(command);//?
                if (typeof commandOutput === "string" && commandOutput.length > 0) {
                    this.reportData = commandOutput;//?
                }
                this.history.push(this.report());
            });
        }
    }
}

export default SystemService;