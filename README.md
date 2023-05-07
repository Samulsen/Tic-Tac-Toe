# **Tic Tac Toe Web-Game!**

Hey there,
Welcome to my Tic Tac Toe App!
The game and the app are simple enough.
The UI consists of three pages and has an additional sound design that underlines the game logic and different animations. So it could make sense to turn your volume on!

The first and default loaded page is the Homepage. It lets you choose between the Singleplayer and Multiplayer pages.

## **The Multiplayer:**

There are two possible Players (1 & 2).
Player 1 is always Cross and always starts.
Player 2 is always Circle and always goes second.
Unfortunately, I thought this was a fixed rule in the game, so there is no way of changing the order as of Version 1.0.
When one player has made its move, the other one can go, the message field will indicate whose turn it is!
There is a counter, counting the wins of both players.
When only the page is reloaded (by switching back to home for example), the game resets to a start state, but the counter will remain, until you refresh the whole App!

## **The Singleplayer:**

In the Singleplayer you can play against the algorithm that I have developed.

At first load, you are prompted by the message field to click on it. When you do so, an option field will pop up.
Because of the nature of the game, this is that the Entity that goes first has far higher chances of winning, I implemented an option of choosing between Cross and Circle for the Player (you).
As in the Multiplayer, the Cross goes first, the Circle second. But unlike here, you can switch the symbols as many times as you want without losing your score. Also, when you switch back to the Home or Singlepalyerpage and you have an ongoing game, this game will be paused and can be resumed after returning to the Singleplayer page.

Additionally in the right bottom corner, there is a button saying "difficulty". Click it and a new option field pop-ups and layers over the previous one. Here you can choose what difficulty you want the algorithm to be.

In both cases, you can always change the symbol or difficulty by clicking on the message field! It is only temporarily disabled while the computer will make its move.

### **1 (_Easy_)**

_The computer goes just randomly, and will not knowingly prevent a possible loss OR will not take knowingly the chance of winning. If this happens, this is by pure accident. Thus you can win against it._

### **2 (_Middle_)**

_The computer goes half-random and half-conscious. It will prevent a loss and take the chance to win, but will otherwise just go randomly with no strategy in mind. You can win against it, but it requires you to know some tic tac toe strategies._

### **3 (_Hard_)**

_The computer makes fully conscious moves. It will prevent a loss and will take the chance to win, but ALSO will go otherwise with a strategy in mind. It is impossible to win against the computer in this mode, the best that can happen for you is a draw._

### **_Comment_**

Regarding the algorithm itself, you can find it inside the "computerAlgo" file inside the modules directory. If you do take a look at it, I just want to say, that after writing it, I am certain that it is far too long and the same could be achieved with half the code approximately...

## **Deployment and Scripts**

The link where the App is deployed is in the About section of the repo.

If you want to run the app locally, you have to run the **_"devServer-Saas"_** and **_"devServer-Main"_** scripts to build for dev mode.

It's certainly nowhere near perfect, but it is my very first Project that I developed so I guess it's fine for that metric.

Have fun!

**_Best, Samu_**
