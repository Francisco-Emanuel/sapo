import "./style.css";
import "/rafu.png";

const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;

if (!canvas) {
  console.error("Canvas element not found.");
} else {
  const c = canvas.getContext("2d");

  if (c) {
    canvas.width = 80 * 16;
    canvas.height = 80 * 9;

    /* CLASSES */ 
    class Player {
      width: number;
      height: number;
      x: number;
      y: number;
      gravity: number;
      velocityY: number;
      velocityX: number;
      delta: number;
      maxVel: number;
      sprite: HTMLImageElement;

      constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        gravity: number,
        velocityY: number,
        velocityX: number,
        delta: number,
        maxVel: number,
        spriteSrc: string
      ) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.gravity = gravity;
        this.velocityY = velocityY;
        this.velocityX = velocityX;
        this.delta = delta;
        this.maxVel = maxVel;
        this.sprite = new Image();
        this.sprite.src = spriteSrc;
      }
      //limite de tela
      updatePosition(canvasWidth: number, canvasHeight: number) {
        //vertical
        if (this.y + this.height >= canvasHeight) {
          this.y = canvasHeight - this.height;
          this.velocityY = 0;
        } else {
          this.y += this.velocityY;
          this.velocityY += this.gravity;
        }
        //horizontal
        if (this.x < 50) {
          this.x = 50;
          this.velocityX = 0;
        } else if (this.x + this.width > canvasWidth - 50) {
          this.x = canvasWidth - 50 - this.width;
          this.velocityX = 0;
        } else {
          this.x += this.velocityX;
        }
      }
      jump() {
        if (this.velocityY === 0) {
          this.velocityY = -5;
          this.y += this.velocityY;
        } else {
          this.velocityY === 0;
        }
      }
      moveLeft() {
        this.velocityX -= this.delta;
        if (this.velocityX < -this.maxVel) {
          this.velocityX = -this.maxVel;
        }
        this.x += this.velocityX;
      }
      moveRight() {
        this.velocityX += this.delta;
        if (this.velocityX > this.maxVel) {
          this.velocityX = this.maxVel;
        }
        this.x += this.velocityX;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
      }
    }
    class Sprite {
      width: number;
      height: number;
      x: number;
      y: number;
      sprite: HTMLImageElement;

      constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        spriteSrc: string
      ) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.sprite = new Image();
        this.sprite.src = spriteSrc;
      }
      draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
      }
    }
    const bg = new Sprite(
      0,
      0,
      canvas.width,
      canvas.height,
      "/BeOnp1g.jpeg"
    );
    const sapo = new Player(
      canvas.width / 2,
      canvas.height / 2,
      100,
      100,
      0.1,
      0,
      0,
      0.5,
      2,
      "/rafu.png"
    );
//------------------------------




    const keys = {
      w: {
        pressed: false,
      },
      a: {
        pressed: false,
      },
      s: {
        pressed: false,
      },
      d: {
        pressed: false,
      },
    };

    function gameLoop(): void {
      requestAnimationFrame(gameLoop);
      c?.clearRect(0, 0, canvas.width, canvas.height);
      bg.draw(c!)
      sapo.draw(c!);
      sapo.updatePosition(canvas.width, canvas.height);
      if (keys.a.pressed) {
        sapo.moveLeft();
      } else if (keys.d.pressed) {
        sapo.moveRight();
      } else if (keys.w.pressed) {
        sapo.jump();
      }
    }

    /*LOOP*/
    gameLoop();

    //movement handler
    addEventListener("keydown", ({ key }) => {
      switch (key) {
        case "a":
          keys.a.pressed = true;
          break;
        case "d":
          keys.d.pressed = true;
          break;
        case "w":
          keys.w.pressed = true;
          break;
      }
    });
    addEventListener("keyup", ({ key }) => {
      switch (key) {
        case "a":
          sapo.velocityX = 0;
          keys.a.pressed = false;
          break;
        case "d":
          sapo.velocityX = 0;
          keys.d.pressed = false;
          break;
        case "w":
          keys.w.pressed = false;
          break;
      }
    });
  } else {
    console.error("Could not get 2D rendering context.");
  }
}
