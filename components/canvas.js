export class Canvas {
  dimensions = { height: "250px", width: "1000px" };
  canvasElement;

  constructor() {
    this.canvasElement = document.createElement("canvas");
    this.canvasElement.style.width = this.dimensions.width;
    this.canvasElement.style.height = this.dimensions.height;
    this.canvasElement.style.border = "1px solid black";
    document.getElementById("main").appendChild(this.canvasElement);
    this.canvasElement.getContext("2d").imageSmoothingEnabled = false;
  }
}
