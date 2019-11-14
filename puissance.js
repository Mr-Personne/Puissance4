/***

  Solution du TD http://defeo.lu/aws/tutorials/tutorial2
  
 **/

class Puissance4 {
    /*
      Intialise un plateau de jeu de dimensions `rows` × `cols` (par défaut 6×7),
      et fait l'affichage dans l'élément `element_id` du DOM.
     */
    constructor(element_id, rows=6, cols=7) {
      // Nombre de lignes et de colonnes
      this.rows = rows;
      this.cols = cols;
        // cet tableau à deux dimensions contient l'état du jeu:
      //   0: case vide
      //   1: pion du joueur 1
      //   2: pion du joueur 2
      this.board = Array(this.rows);
      for (let i = 0; i < this.rows; i++) {
        this.board[i] = Array(this.cols).fill(0);
      }
      // un entier: 1 ou 2 (le numéro du prochain joueur)
      this.turn = 1;
      // Nombre de coups joués
      this.moves = 0;
      /* un entier indiquant le gagnant:
          null: la partie continue
             0: la partie est nulle
             1: joueur 1 a gagné
             2: joueur 2 a gagné
      */
      this.winner = null;
  
      // L'élément du DOM où se fait l'affichage
      this.element = document.querySelector(element_id);
      // On ajoute le gestionnaire d'événements pour gérer le click
      //
      // Pour des raisons techniques, il est nécessaire de passer comme gestionnaire
      // une fonction anonyme faisant appel à `this.handle_click`. Passer directement
      // `this.handle_click` comme gestionnaire, sans wrapping, rendrait le mot clef
      // `this` inutilisable dans le gestionnaire. Voir le "binding de this".
      this.element.addEventListener('click', (event) => this.handle_click(event));
      // On fait l'affichage
      this.render();
    }
    
    /* Affiche le plateau de jeu dans le DOM */
    render() {
      let table = document.createElement('table');
      //ATTENTION, la page html est écrite de haut en bas. Les indices 
      //pour le jeu vont de bas en haut (compteur i de la boucle)
      for (let i = this.rows - 1; i >= 0; i--) {
        let tr = table.appendChild(document.createElement('tr'));
        for (let j = 0; j < this.cols; j++) {
          let td = tr.appendChild(document.createElement('td'));
          let colour = this.board[i][j];
          if (colour)
            td.className = 'player' + colour;
          td.dataset.column = j;
        }
      }
      this.element.innerHTML = '';
      this.element.appendChild(table);
    }
    
      set(row, column, player) {
      // On colore la case
        this.board[row][column] = player;
      // On compte le coup
      this.moves++;
      }
  
    /* Cette fonction ajoute un pion dans une colonne */
      play(column) {
      // Trouver la première case libre dans la colonne
      let row;
      for (let i = 0; i < this.rows; i++) {
        if (this.board[i][column] == 0) {
          row = i;
          break;
        }
      }
      if (row === undefined) {
        return null;
      } else {
        // Effectuer le coup
        this.set(row, column, this.turn);
        // Renvoyer la ligne où on a joué
        return row;
      }
      }
    
    handle_click(event) {
      // Vérifier si la partie est encore en cours
      if (this.winner !== null) {
            if (window.confirm("Game over!\n\nDo you want to restart?")) {
                this.reset();
          this.render();
              }
              return;
      }
  
        let column = event.target.dataset.column;
        if (column !== undefined) {
        //attention, les variables dans les datasets sont TOUJOURS 
        //des chaînes de caractères. Si on veut être sûr de ne pas faire de bêtise,
        //il vaut mieux la convertir en entier avec parseInt
        column = parseInt(column);
           let row = this.play(parseInt(column));
        
        if (row === null) {
          window.alert("Column is full!");
        } else {
          // Vérifier s'il y a un gagnant, ou si la partie est finie
          if (this.win(row, column, this.turn)) {
            this.winner = this.turn;
          } else if (this.moves >= this.rows * this.columns) {
            this.winner = 0;
          }
          // Passer le tour : 3 - 2 = 1, 3 - 1 = 2
          this.turn = 3 - this.turn;
  
          // Mettre à jour l'affichage
          this.render()
          
          //Au cours de l'affichage, pensez eventuellement, à afficher un 
          //message si la partie est finie...
          switch (this.winner) {
            case 0: 
              window.alert("Null game!!"); 
              break;
            case 1:
              window.alert("Player 1 wins"); 
              break;
            case 2:
              window.alert("Player 2 wins"); 
              break;
          }
        }
      }
    }
  
    /* 
     Cette fonction vérifie si le coup dans la case `row`, `column` par
     le joueur `player` est un coup gagnant.
     
     Renvoie :
       true  : si la partie est gagnée par le joueur `player`
       false : si la partie continue
   */
      win(row, column, player) {
          // Horizontal
      let count = 0;
      for (let j = 0; j < this.cols; j++) {
        count = (this.board[row][j] == player) ? count+1 : 0;
        if (count >= 4) return true;
      }
          // Vertical
      count = 0;
      for (let i = 0; i < this.rows; i++) {
        count = (this.board[i][column] == player) ? count+1 : 0;
          if (count >= 4) return true;
      }
          // Diagonal
      count = 0;
      let shift = row - column;
      for (let i = Math.max(shift, 0); i < Math.min(this.rows, this.cols + shift); i++) {
        count = (this.board[i][i - shift] == player) ? count+1 : 0;
          if (count >= 4) return true;
      }
          // Anti-diagonal
      count = 0;
      shift = row + column;
      for (let i = Math.max(shift - this.cols + 1, 0); i < Math.min(this.rows, shift + 1); i++) {
        console.log(i,shift-i,shift)
        count = (this.board[i][shift - i] == player) ? count+1 : 0;
        if (count >= 4) return true;
      }
      
      return false;
      }
  
    // Cette fonction vide le plateau et remet à zéro l'état
    reset() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.board[i][j] = 0;
        }
      }
          this.move = 0;
      this.winner = null;
      }
  }
  
  // On initialise le plateau et on visualise dans le DOM
  // (dans la balise d'identifiant `game`).
  let p4 = new Puissance4('#game') 
//   hello
  function bot() {

  var colBot = -10;
  colBot = this.analyse('J' + (3-this.turn), colBot);
  var tmp = colBot;
  colBot = this.analyse('J' + (this.turn), colBot);
  if(colBot < 0 && tmp >= 0)
    colBot = tmp;
  if(colBot < 0)
  {
    var hasard = Math.round(Math.random()*(this.c-1));
    colBot = (-colBot)-1;
    if(colBot === hasard)
      while(colBot === hasard)
        colBot = Math.round(Math.random()*(this.c-1));
    else
      colBot = hasard;
  }
  this.play(colBot);
}

  function analyse(cname, column)
{
  for(var i = 0, s = 0; i < this.l; i++)
    for(var j = 0; j < this.c; j++)
    {
      s = this.tab[i][j].className === cname ? s+1 : 0;
      if(s === 2)
      {
        if(j+2 < this.c && this.tab[i][j+2].className === cname && this.tab[i][j+1].className === '')
          if(i === 0 || this.tab[i-1][j+1].className)
            return(j+1);
          else if (column < 0 && (i === 1 || this.tab[i-2][j+1].className))
            column = -(j+1) -1;
        if(j-3 >= 0 && this.tab[i][j-3].className === cname && this.tab[i][j-2].className === '')
          if(i === 0 || this.tab[i-1][j-2].className)
            return(j-2);
          else if (column < 0 && (i === 1 || this.tab[i-2][j-2].className))
            column = -(j-2) -1;
        if(column < 0 && j-2 >= 0 && j+1 < this.c)
        {
          if(i === 0 || this.tab[i-1][j-2].className)
            if(this.tab[i][j-2].className === '' && this.tab[i][j+1].className === '')
              column = j-2;
          else if (i === 0 || this.tab[i-1][j+1].className)
            if(this.tab[i][j+1].className === '' && this.tab[i][j-2].className === '')
              column = j+1;
        }
      }
      if(s === 3)
      {
        if(j+1 < this.c && this.tab[i][j+1].className === '')
          if(i === 0 || this.tab[i-1][j+1].className)
            return(j+1);
          else if (column < 0  && (i === 1 || this.tab[i-2][j+1].className))
            column = -(j+1) -1;
        if(j-3 >= 0 && this.tab[i][j-3].className === '')
          if(i === 0 || this.tab[i-1][j-3].className)
            return(j-3);
          else if (column < 0 && (i === 1 || this.tab[i-2][j-3].className))
            column = -(j-3) -1;
      }
    }
  for(var i = 0, s = 0; i < this.c; i++)
    for(var j = 0; j < this.l; j++)
      {
        s = this.tab[j][i].className === cname ? s+1 : 0;
        if(s === 3 && j+1 < this.l && this.tab[j+1][i].className === '')
          return(i);
      }

  var row = 0, col = this.c-1;

  while(row <= this.l-1)
  {  
    var difRowCol = row-col;
    for(var i = Math.max(difRowCol, 0), s = 0; i < Math.min(this.l, this.c + difRowCol); i++)
    {
      s = this.tab[i][i-difRowCol].className === cname ? s+1 : 0;

      if(s === 2)
      {
        if(i-difRowCol-3 >= 0 && i-3 >= 0 && this.tab[i-2][i-difRowCol-2].className === '' && this.tab[i-3][i-difRowCol-3].className === cname)
          if(this.tab[i-3][i-difRowCol-2].className)
            return(i-difRowCol-2);
          else if (column < 0 && (i === 3 || this.tab[i-4][i-difRowCol-2].className))
            column = -(i-difRowCol-2) -1;

        if(i-difRowCol+2 < this.c && i+2 < this.l && this.tab[i+1][i-difRowCol+1].className === '' && this.tab[i+2][i-difRowCol+2].className === cname)
            if(this.tab[i][i-difRowCol+1].className)
              return(i-difRowCol+1);
            else if (column < 0  && this.tab[i-1][i-difRowCol+1].className)
              column = -(i-difRowCol+1) -1;
      }
      if(s === 3)
      {
        if(i > 2 && i-difRowCol > 2 && this.tab[i-3][i-difRowCol-3].className === '')
            if(i-3 === 0 || this.tab[i-4][i-difRowCol-3].className)
              return(i-difRowCol-3);
            else if (column < 0 && (i === 4 || this.tab[i-5][i-difRowCol-3].className))
              column = -(i-difRowCol-3) -1;

        if(i < this.l-1 && i-difRowCol < this.c-1 && this.tab[i+1][i-difRowCol+1].className === '')
          if(this.tab[i][i-difRowCol+1].className)
            return(i-difRowCol+1);	
          else if (column < 0 && this.tab[i-1][i-difRowCol+1].className)
            column = -(i-difRowCol+1) -1;
      }
    }
    if(col > 0)
      col -= 1;
    else
      row += 1;
  }

  row = this.l-1, col = this.c-1;

  while(col >= 0)
  {
    var somRowCol = row+col;
    for(var i = Math.max(somRowCol - this.c + 1, 0), s = 0; i < Math.min(this.l, somRowCol + 1); i++)
      {
        s = this.tab[i][somRowCol-i].className === cname ? s+1 : 0;
        if(s === 2)
        {
          if(somRowCol-i+3 < this.c && i-3 >= 0 && this.tab[i-2][somRowCol-i+2].className === '' && this.tab[i-3][somRowCol-i+3].className === cname)
            if(this.tab[i-3][somRowCol-i+2].className)
              return(somRowCol-i+2);
            else if (column < 0 && (i === 3 || this.tab[i-4][somRowCol-i+2].className))
              column = -(somRowCol-i+2) -1;

          if(somRowCol-i-2 >= 0 && i+2 < this.l && this.tab[i+1][somRowCol-i-1].className === '' && this.tab[i+2][somRowCol-i-2].className === cname)
            if(this.tab[i][somRowCol-i-1].className)
              return(somRowCol-i-1);
            else if (column < 0 && this.tab[i-1][somRowCol-i-1].className)
              column = -(somRowCol-i-1) -1;
        }
        if(s === 3)
        {
          if(i > 2 && somRowCol-i < this.c-3 && this.tab[i-3][somRowCol-i+3].className === '')
            if(i-3 === 0 || this.tab[i-4][somRowCol-i+3].className)
              return(somRowCol-i+3);
            else if (column < 0 && (i === 4 || this.tab[i-5][somRowCol-i+3].className))
              column = -(somRowCol-i+3) -1;

          if(i < this.l-1 && somRowCol-i > 0 && this.tab[i+1][somRowCol-i-1].className === '')
            if(this.tab[i][somRowCol-i-1].className)
              return(somRowCol-i-1);
            else if (column < 0 && this.tab[i-1][somRowCol-i-1].className)
              column = -(somRowCol-i-1) -1;
        }
      }
    if(row > 0)
      row -= 1;
    else
      col -= 1;
  }
  return column; 
}