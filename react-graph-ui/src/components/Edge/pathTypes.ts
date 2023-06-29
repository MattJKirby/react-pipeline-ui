import { IXYPosition, Position } from "../../Types"

/**
 * Straight vector path
 * @param source 
 * @param target 
 * @returns 
 */
export const CalculateStraightPath = (source: IXYPosition, target: IXYPosition): string => {
  return `M${source.x} ${source.y} L ${target.x} ${target.y}`;
};

/**
 * Bezier vector path
 * @param source 
 * @param target 
 * @returns 
 */
export const CalculateBezierPath = (source: IXYPosition, target: IXYPosition): string => {
  const sourcePosition = "right";
  const targetPosition = "left";
  const curvature = 0.5;
  const sourceControl = calculateBezierControl(sourcePosition, source, target, curvature);
  const targetControl = calculateBezierControl(targetPosition, target, source, curvature);
  
  return `M${source.x},${source.y} C${sourceControl[0]},${sourceControl[1]} ${targetControl[0]},${targetControl[1]} ${target.x},${target.y}`;
}

const calculateControlOffset = (distance: number, curvature: number): number => {
  if (distance >= 0) {
    return 0.5 * distance;
  }

  return curvature * 25 * Math.sqrt(-distance);
}

const calculateBezierControl = (pos: Position, source: IXYPosition, target: IXYPosition, c: number): [x: number, y: number] => {
  switch (pos) {
    case "left":
      return [source.x - calculateControlOffset(source.x - target.x, c), source.y];
    case "right":
      return [source.x + calculateControlOffset(target.x - source.x, c), source.y];
    case "top":
      return [source.x, source.y - calculateControlOffset(source.y - target.y, c)];
    case "bottom":
      return [source.x, source.y + calculateControlOffset(target.y - source.y, c)];
  }
}

