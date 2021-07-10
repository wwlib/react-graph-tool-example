import { PortType } from '../../model/AbstractData';

export enum NodeColor {
    None = 'none',
    Background = '#282c34',
    Border = '#61dafb',
    Blue = "#1CC1D9",
    Candy = "#FC2D80",
    Firecracker = "#FD362F",
    Grape = "#8952D6",
    Grass = "#6BC137",
    Hotrod = "#FF5B24",
    Limeade = "#8EDD40",
    Metro = "#495361",
    Nebula = "#5E47D1",
    Pearl = "#FFFFFF",
    Tangerine = "#FF8921",
    Tennis = "#00AB75",
    Topaz = '#FBC230',
    Twilight = "#3C78D6",
    White = "#FFFFFF",
}

export enum NodeClass {
    Default = 'default',
}

export interface NodeStyle {
    borderWidth: string;
    borderColor: NodeColor;
    backgroundColor: NodeColor;
}

const NodeClassStyle = {
    'default': {
        borderWidth: '1px',
        borderColor: NodeColor.Blue,
        backgroundColor: NodeColor.Background,
    }
}

class NodeUtils {

    static baseDimensions = {
        width: 150,
        height: 120,
    };

    static divDimensions = {
        tabHeight: 20,
        inset: 6,
    };

    static portOffsets = {
        base: {x: 0, y: 0},
        input: {x: 0, y: -NodeUtils.baseDimensions.height / 2},
        output: {x: 0, y: NodeUtils.baseDimensions.height / 2},
    };

    static getPortCoords( type: PortType, baseCoords: {x: number, y: number}): {x: number, y: number} {
        const offset: {x: number, y: number} = NodeUtils.portOffsets[type] || {x: 0, y: 0};
        let result: {x: number, y: number} = {x: baseCoords.x + offset.x, y: baseCoords.y + offset.y};
        return result;
    }

    static getBaseRect(baseCoords: {x: number, y: number}): {x: number, y: number, width: number, height: number} {
        return {
            x: baseCoords.x - NodeUtils.baseDimensions.width / 2, 
            y: baseCoords.y - NodeUtils.baseDimensions.height / 2, 
            width: NodeUtils.baseDimensions.width, 
            height: NodeUtils.baseDimensions.height,
        }
    }

    static getDivRect(baseCoords: {x: number, y: number}): {top: string, left: string, width: string, height: string} {
        return {
            top: `${baseCoords.y - (NodeUtils.baseDimensions.height / 2 - NodeUtils.divDimensions.inset - NodeUtils.divDimensions.tabHeight)}px`, 
            left: `${baseCoords.x - (NodeUtils.baseDimensions.width / 2 - NodeUtils.divDimensions.inset)}px`, 
            width: `${NodeUtils.baseDimensions.width - NodeUtils.divDimensions.inset * 2}px`, 
            height: `${NodeUtils.baseDimensions.height - NodeUtils.divDimensions.inset * 2 - NodeUtils.divDimensions.tabHeight}px`,
        }
    }

    static getNodeStyle(nodeClass: NodeClass): any {
        let result = {
            borderWidth: '1px',
            borderColor: NodeColor.Blue,
            backgroundColor: NodeColor.Background,
        }
        if (NodeClassStyle[nodeClass]) {
            result = NodeClassStyle[nodeClass];
        }
        return result;
    }
}

export default NodeUtils;