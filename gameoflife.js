
//Public variables
let grid;
let cols = 10;
let rows = 10;
let resolution = 10;



//setup the html window
function setup() {
  frameRate(30);
  createCanvas(400,400);
  cols = floor(width/resolution);
  rows = floor(height/resolution);

  grid = Create2DArray(cols,rows);
  
}



//Function that creates a empty 2d array with dimensions cols/rows
function Create2DArray(cols,rows){
  let arr = new Array(cols);
  for (let i=0; i < arr.length; i++){
   arr[i]=new Array(rows);
  }

  for (let i=0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      arr[i][j]=floor(random(2));
    }
  }
  return arr;
}



//Function that will update every frame
function draw() {
  background(0);


  //Takes care of the drawing and draws every pixel depending on what the state is
  for (let i=0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j]==1){
        fill(255);
        stroke(0);
        rect(x,y,resolution-1,resolution-1);
      }
    }
  }
  

  //Creates the newest grid
  let nextgrid = Create2DArray(cols,rows);

  

  //Finds all the neighbors and updates all the cells
  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
      let state = grid[i][j];
      let sum = SumOfNeighbors(grid,i,j);

      //check all the rules
      if (state==1 && (sum > 3 || sum < 2)){
        nextgrid[i][j]=0;
      }else if (state==0 && sum==3){
        nextgrid[i][j]=1;
      }else{
        nextgrid[i][j]=state;
      }

    }
  }


  //updates the grid for next frame
  grid = nextgrid;

}


//Function that calculates the sum of all neighbors of a certain pixel at x,y
function SumOfNeighbors(arr, x, y){
  let sum = 0

  for (i = -1; i < 2; i++){
    for (j = -1; j < 2; j++){
      let column = (x+i+cols) % cols;
      let row = (y+j+rows) % rows;
      sum += grid[column][row];
    }
  }
  sum-=grid[x][y];
  return sum;
}
