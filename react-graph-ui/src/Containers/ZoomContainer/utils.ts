import * as d3 from "d3-zoom";
import { ITransform } from "../../Types";

export const CreateD3ZoomIdentity = (transform: ITransform) => {
  const { translateX, translateY, scale } = transform;
  return d3.zoomIdentity.translate(translateX, translateY).scale(scale);
}