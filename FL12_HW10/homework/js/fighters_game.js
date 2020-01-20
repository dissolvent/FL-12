function Fighter(character) {
  let stats = character;
  stats.maxHp = character.hp;
  stats.wins = 0;
  stats.losses = 0;

  // !!! delete this
  this.getStats = function () {
    return stats;
  }

  this.getName = function () {
    return stats.name;
  }

  this.getDamage = function() {
    return stats.damage;
  }

  this.getStrength = function() {
    return stats.strength;
  }

  this.getAgility = function() {
    return stats.agility;
  }

  this.getHealth = function() {
    return stats.hp;
  }

  this.getWins = function() {
    return stats.wins;
  }

  this.getLosses = function() {
    return stats.losses;
  }

  this.logCombatHistory = function() {
    console.log(`Name: ${this.getName()}, Wins: ${this.getWins()}, ` +
                `Losses: ${this.getLosses()}`);
  }

  this.addWin = function() {
    stats.wins++;
  }

  this.addLoss = function() {
    stats.losses++;
  }

  this.dealDamage = function(damage) {
    let hp = this.getHealth() - damage;
    stats.hp = hp < 0 ? 0 : hp;
  }

  this.heal = function(heal) {
    if (heal < 0) {
      return `healing can't be negative`
    }
    let healing = stats.hp + heal
    stats.hp = healing <= stats.maxHp ? healing : stats.maxHp;
  }


  this.attack = function(defender) {
    if (!(defender instanceof Fighter)) {
      return `Most people, normal people, do just about anything to avoid` +
              `fight. Only Fighters accepted.`;
    }
    if (Fighter.attackSuccess(defender.getStrength() + 
                              defender.getAgility())) {
      defender.dealDamage(this.getDamage());
      console.log(
        `${this.getName()} makes ${this.getDamage()} damage ` +
        `to ${defender.getName()}`);
    } else {
      console.log(`${this.getName()} attack missed`);
    }
  }

  Fighter.attackSuccess = function(defense) {
    let attackChance = 100 - defense;
    return parseInt(Math.random() * 100) < attackChance;
  }
}

function battle(fighter1, fighter2) {
  if (![fighter1, fighter2].every(canFight)) {
    return;
  }
  fighter1.attack(fighter2);
  if (fighter2.getHealth()) {
    battle(fighter2, fighter1);
  } else {
    fighter1.addWin();
    fighter2.addLoss();
    console.log(`${fighter1.getName()} has won!`);
    return;
  }
}

function canFight(fighter) {
  if (fighter.getHealth() === 0) {
    console.log(`${fighter.getName()} is dead and can't fight`);
    return false;
  }
  return true;
}
  
const max = new Fighter({name: 'Maximus', damage: 25, hp: 100, strength: 25, agility: 25});
const maxDopler = new Fighter({name: 'Maximus_dopler', damage: 25, hp: 100, strength: 25, agility: 25});
const com = new Fighter({name: 'Commodus', damage: 15, hp: 100, strength: 20, agility: 15});

function test() {
  for (let i = 0; i < 1000; i++) {
    battle(max, maxDopler);
    max.heal(100);
    maxDopler.heal(100);
  }

  max.logCombatHistory();
  maxDopler.logCombatHistory();
}

