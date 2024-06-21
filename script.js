var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.onrender.com/board?difficulty=medium')
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}

SolvePuzzle.onclick = () => {
	SudokuSolver(board, 0, 0, 9);
};
function isvalid(board, n ,  i, j,  num )
	{
		
		let root = Math.sqrt(n);
		let ni= i- i%(root);
		let nj= j- j%(root);
		
	//for row and col check
		for(let k=0; k<n; k++)
		{
			if(board[k][j]==num || board[i][k]==num)
			{
				return false;
			}
			
		}
	
	 //for subgrid check
	 for(let k=ni; k<ni+ root; k++)
	 {
		for(let l=nj; l<nj+ root; l++)
		{
			if(board[k][l]==num)
			{
				return false;
			}
		}
	 } 
	 return true;  
	
	}

	function SudokuSolver(board,  i, j, n)
	{
		//base case can also be i==8 && j==9
		if(i==n)
		{
			//Print(board, n);
			FillBoard(board);
			return true;
		}
		//if we are not inside a row increase row
		
		if(j==n)
		{
		   return SudokuSolver(board, i+1, 0, n);
		}
		//if cell is already filled 
		if(board[i][j]!=0)
		{
			return SudokuSolver(board,i,j+1,n);
		}
		//else we try to fill the cell with an appropriate number 
		for(let num=1; num<=9; num++)
		{
			//check if valid
			if(isvalid(board,n,i,j,num))
			{
				board[i][j]=num;
				
				if(SudokuSolver(board, i, j+1, n))
				{
					return true;
				}
				//else we backtrack and undo changes 
				board[i][j]=0;
	
			}
		}
		return false;
	
	}
	
	

