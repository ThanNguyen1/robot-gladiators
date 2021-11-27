var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);
  return value;
};

var fight = function(enemyNames) {
  // Alert players that they are starting the round
  while(playerHealth > 0 && enemyHealth > 0) {
  var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

  // if player choses to skip
  if (promptFight === "skip" || promptFight === "SKIP") {
    // confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerName + " has decided to skip this fight. Goodbye!");
      // subtract money from playerMoney for skipping
      playerMoney = Math.max(0, playerMoney - 10);
      console.log("playerMoney", playerMoney);
      break;
    }
    else  {
      window.alert("You need to pick a valid option. Try again!");
    }
  }

  // if player choses to fight, fight
  if (promptFight === "fight" || promptFight === "FIGHT") {
    // remove enemy's health by subtracting the amount set in the playerAttack variable
    var damage = randomNumber(playerAttack - 3, playerAttack);
    enemyHealth = Math.max(0, enemyHealth - damage);
    console.log(
      playerName + " attacked " + enemyNames + ". " + enemyNames + " now has " + enemyHealth + " health remaining."
    );

    // check enemy's health
    if (enemyHealth <= 0) {
      window.alert(enemyNames + " has died!");
      playerMoney = playerMoney + 20;
      break;
    } else {
      window.alert(enemyNames + " still has " + enemyHealth + " health left.");
    }

    // remove players's health by subtracting the amount set in the enemyAttack variable
    var damage = randomNumber(enemyAttack - 3, enemyAttack);
    playerHealth = Math.max(0, playerHealth - damage);
    console.log(
      enemyNames + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
    );
    // check player's health
    if (playerHealth <= 0) {
      window.alert(playerName + " has died!");
      break;
    } else {
      window.alert(playerName + " still has " + playerHealth + " health left.");
    }
  }
      // if no (false), ask question again by running fight() again
    else {
      window.alert("You need to pick a valid option. Try again!");
    }
  }
};

// run fight function to start game
  var startGame = function () {
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

  for (var i = 0; i < enemyNames.length; i++) {
    if (playerHealth > 0) {
    window.alert("Welcome to Robot Gladiators! Round " + ( i + 1));

    var pickedEnemyName = enemyNames[i];

    enemyHealth = randomNumber(40, 60);
    
    // call fight function with enemy-robot
    fight(pickedEnemyName);
    if (playerHealth > 0 && i < enemyNames.length -1) {
      // ask if player wants to use the store before next round
      var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

      // if yes, take them to the store() function
      if (storeConfirm) {
        shop();
      }
    }
  }
      else { 
        window.alert("You have lost your robot in battle! GAME OVER!");
        break;
      }
    }

    endGame();
  };
    var endGame = function() {
      if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".")
      } else {
        window.alert("You've lost your robot in battle.");
      }

      var playAgainConfirm = window.confirm("Would you like to play again?");

      if (playAgainConfirm) {
        startGame();
      } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
      }
  };

    var shop = function() {
      // ask player what they'd like to do
      var shopOptionPrompt = window.prompt (
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', OR 'LEAVE' to make a choice."
        );
      switch (shopOptionPrompt) {
        case "refill":
        case "REFILL":
          if (playerMoney >= 7) {
          window.alert("Refilling player's health by 20 for 7 dollars.");

          playerHealth = playerHealth + 20;
          playerMoney = playerMoney - 7;
        } else {
            window.alert("You don't have enough money!");
          }
          break;
        
        case "upgrade":
        case "UPGRADE":
          if (playerMoney >= 7) {
          window.alert("upgrading player's attack by 6 for 7 dollars.");
          playerAttack = playerAttack + 6;
          plaeryMoney = playerMoney -7;
        
        } else {
          window.alert("You don't have enough money!");
        }

          break;
        
        case "leave":
        case "LEAVE":
          window.alert("Leaving there store");
          break;
        
        default:
          window.alert("You did not pick a valid option. Try again.");
          shop();
          break;
      }
    };
  startGame();