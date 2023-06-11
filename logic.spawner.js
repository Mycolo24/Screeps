var spawnerLogic = {

    run: function(){

        // Gets the amount of harvesters in the room, saves it to a variable and prints it to console
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        console.log('Harvesters: ' + harvesters.length);

        // Gets the amount of builders in the room, saves it to a variable and prints it to console
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        console.log('Builders: ' + builders.length); 
        
        // Gets the amount of upgraders in the room, saves it to a variable and prints it to console
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        console.log('Upgraders: ' +upgraders.length);

        var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
        console.log("Attackers: " + attackers.length);

        

        // DEFINES LIMITS FOR EACH OF THE CREEP TYPES
        var harvesterLimit = 2;

        // if there are no construction sites then dont spawn builders
        var builderLimit = 0; // default set to no builders
        if (Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES)){
            builderLimit  = 2;
        }
        
        var upgraderLimit = 1;

        
        var attackerLimit = 1;


        // if there are less harvesters than limit then spawn
        if(harvesters.length < harvesterLimit) {
            var newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'harvester'}});        
        }

    
        // if there are less than builders than limit then spawn
        if(builders.length < builderLimit) {
            var newName = 'Builder' + Game.time;
            console.log('Spawning new builder: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
            {memory: {role: 'builder'}});
        }
    
        // if there are less than upgraders than limit then spawn
        if(upgraders.length < upgraderLimit) {
            var newName = "Upgrader" + Game.time;
            console.log("Spawning new upgrader: " + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
                {memory: {role: 'upgrader'}});
        }

        if(attackers.length < attackerLimit) {
            var newName = 'Attacker' + Game.time;
            console.log("Spawning a new attacker: " + newName);
            Game.spawns['Spawn1'].spawnCreep([ATTACK, ATTACK, MOVE], newName,
                {memory: {role: 'attacker'}});
        }


    
        if(Game.spawns['Spawn1'].spawning) { 
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1, 
                Game.spawns['Spawn1'].pos.y, 
                {align: 'left', opacity: 0.8});
        }
    }
}

module.exports = spawnerLogic;