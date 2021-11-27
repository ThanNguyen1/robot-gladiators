var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);
  return value;
};

var playerInfo = {
  name: window.prompt("What is your robot's name?"),
  health: 100,
  attack: 10,
  money: 10,
  reset: function () {
    this.health = 100,
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function() {
    if (this.money >=7) {
    this.health += 20;
    this.money -= 7;
  }
    else {
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function() {
    if (this.money >=7) {
    this.attack += 6;
    this.money -= 7;
    }
    else {
      window.alert("You don't have enough money!");
    }
  }
};

var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];

var fight = function(enemyInfo) {
  console.log(enemyInfo);
  // Alert players that they are starting the round
  while(playerInfo.health > 0 && enemyInfo.health > 0) {
  var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

  // if player choses to skip
  if (promptFight === "skip" || promptFight === "SKIP") {
    // confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
      // subtract money from playerInfo.money for skipping
      playerInfo.money = Math.max(0, playerInfo.money - 10);
      console.log("playerInfo.money", playerInfo.money);
      break;
    }
    else  {
      window.alert("You need to pick a valid option. Try again!");
    }
  }

  // if player choses to fight, fight
  if (promptFight === "fight" || promptFight === "FIGHT") {
    // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
    enemyInfo.health = Math.max(0, enemyInfo.health - damage);
    console.log(
      playerInfo.name + " attacked " + enemyInfo.name + ". " + enemyInfo.name + " now has " + enemyInfo.health + " health remaining."
    );

    // check enemy's health
    if (enemyInfo.health <= 0) {
      window.alert(enemyInfo.name + " has died!");
      playerInfo.money = playerInfo.money + 20;
      break;
    } else {
      window.alert(enemyInfo.name + " still has " + enemyInfo.health + " health left.");
    }

    // remove players's health by subtracting the amount set in the enemy.attack variable
    var damage = randomNumber(enemyInfo.attack - 3, enemyInfo.attack);
    playerInfo.health = Math.max(0, playerInfo.health - damage);
    console.log(
      enemyInfo.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
    );
    // check player's health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name + " has died!");
      break;
    } else {
      window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
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
    playerInfo.reset();

  for (var i = 0; i < enemyInfo.length; i++) {
    if (playerInfo.health > 0) {
    window.alert("Welcome to Robot Gladiators! Round " + ( i + 1));

    var pickedEnemyObj = enemyInfo[i];

    pickedEnemyObj.health = randomNumber(40, 60);
    
    // call fight function with enemy-robot
    fight(pickedEnemyObj);
    if (playerInfo.health > 0 && i < enemyInfo.length -1) {
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
      if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".")
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
          playerInfo.refillHealth();
          break;
        case "upgrade":
        case "UPGRADE":
          playerInfo.upgradeAttack();
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