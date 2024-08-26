import { Component, ElementRef, ViewChild } from '@angular/core';

interface ISnake {
  x: number,
  y: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('gameBoard') gameBoard!: ElementRef<HTMLCanvasElement>;
  context!: CanvasRenderingContext2D;
  title: string = 'Snake Game';
  info: string = 'Press space to pause or continue the game';
  scoreValue: number = 0;
  WIDTH!: number;
  HEIGHT!: number;
  UNIT: number = 20;
  foodX!: number;
  foodY!: number;
  snake: ISnake[] = [
    { x: this.UNIT * 3, y: 0 },
    { x: this.UNIT * 2, y: 0 },
    { x: this.UNIT, y: 0 },
    { x: 0, y: 0 },
  ];
  xVel: number = this.UNIT;
  yVel: number = 0;
  active: boolean = true;
  started: boolean = false;

  constructor() {
    this.handleKeypress = this.handleKeypress.bind(this);
  }

  ngAfterViewInit(): void {
    window.addEventListener('keydown', this.handleKeypress);
    const canvas = this.gameBoard.nativeElement;
    this.WIDTH = canvas.width;
    this.HEIGHT = canvas.height;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      this.context = ctx;

      this.context.fillStyle = '#000000';
      this.context.fillRect(0, 0, this.WIDTH, this.HEIGHT);
      this.createFood();
      this.displayFood();
      this.drawSnake();
    } else {
      console.error('Failed to get 2D context');
    }
  }

  createFood(): void {
    this.foodX = Math.floor(Math.random() * this.WIDTH / this.UNIT) * this.UNIT;
    this.foodY = Math.floor(Math.random() * this.HEIGHT / this.UNIT) * this.UNIT;
  }

  displayFood(): void {
    this.context.fillStyle = 'red';
    this.context.fillRect(this.foodX, this.foodY, this.UNIT, this.UNIT);
  }

  drawSnake(): void {
    this.context.fillStyle = 'aqua';
    this.context.strokeStyle = '#000000';
    this.snake.forEach((snakepart) => {
      this.context.fillRect(snakepart.x, snakepart.y, this.UNIT, this.UNIT)
      this.context.strokeRect(snakepart.x, snakepart.y, this.UNIT, this.UNIT)
    })
  }

  moveSnake(): void {
    let snakeHead = { x: this.snake[0].x + this.xVel, y: this.snake[0].y + this.yVel };
    this.snake.unshift(snakeHead);

    if (this.snake[0].x == this.foodX && this.snake[0].y == this.foodY) {
      this.scoreValue += 1;
      this.createFood();
    }
    else {
      this.snake.pop();
    }
  }

  clearBoard(): void {
    this.context.fillStyle = '#000000';
    this.context.fillRect(0, 0, this.WIDTH, this.HEIGHT);
  }

  autoRepeat(): void {
    if (this.active) {
      setTimeout(() => {
        this.clearBoard();
        this.displayFood();
        this.moveSnake();
        this.drawSnake();
        this.isGameOver();
        if(this.started)
        this.autoRepeat();
      }, 300)
    }
    else {
      this.clearBoard();
      this.context.font = "bold 50px serif";
      this.context.fillStyle = '#ffffff';
      this.context.textAlign = 'center';
      this.context.fillText('Game Over!!', this.WIDTH / 2, this.HEIGHT / 2);
    }
  }

  handleKeypress(event: KeyboardEvent): void {
    if (event.keyCode == 32 && !this.started) {
      this.started = true;
      this.autoRepeat();
      // this.started = !this.started;
    }

    if (event.key === 'ArrowUp' && this.yVel != this.UNIT) {
      this.xVel = 0;
      this.yVel = -this.UNIT;
    } else if (event.key === 'ArrowRight' && this.xVel != -this.UNIT) {
      this.xVel = this.UNIT;
      this.yVel = 0;
    } else if (event.key === 'ArrowDown' && this.yVel != -this.UNIT) {
      this.xVel = 0;
      this.yVel = this.UNIT;
    } else if (event.key === 'ArrowLeft' && this.xVel != this.UNIT) {
      this.xVel = -this.UNIT;
      this.yVel = 0;
    }
  }

  isGameOver(): void {
    switch (true) {
      case (this.snake[0].x < 0):
      case (this.snake[0].x >= this.WIDTH):
      case (this.snake[0].y < 0):
      case (this.snake[0].y >= this.HEIGHT):
        this.active = false;
        break;
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('keydown', this.handleKeypress);
  }


}
