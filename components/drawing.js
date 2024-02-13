export class drawing {
  dimensions;
  previousPosition;
  position;
  canva;
  context;

  constructor(
    dimensions = { height: 0, width: 0 },
    position = { x: 0, y: 0 },
    canva
  ) {
    this.dimensions = dimensions;
    this.position = position;
    this.previousPosition = position;
    this.canva = canva;
    this.context = canva.getContext("2d");
  }

  draw(image) {
    this.cleanImage();
    this.context.drawImage(
      image,
      this.position.x,
      this.position.y,
      image.width,
      image.height
    );
    image.onload = () => {
      this.context.drawImage(
        image,
        this.position.x,
        this.position.y,
        image.width,
        image.height
      );
    };
    this.previousPosition = { x: this.position.x, y: this.position.y };
  }

  cleanImage() {
    this.context.clearRect(
      this.previousPosition.x,
      this.previousPosition.y,
      this.dimensions.width,
      this.dimensions.height
    );
  }

  writeText(text, location = { x: 250, y: 20 }) {
    this.context.fillStyle = "black";

    this.context.clearRect(250, 10, 250, 20);
    this.context.font = "10px Courier";
    this.context.fillText(text, location.x, location.y);
  }
}
