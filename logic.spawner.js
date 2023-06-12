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
        var harvesterLimit = 3;
        var upgraderLimit = 2;

        // if there are no construction sites then dont spawn builders
        var builderLimit = 0; // default set to no builders
        if (Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES).length > 0){
            builderLimit  = 4;
        }
        
        // if there are no hostile creeps then dont spawn attackers
        //  default attacker limit is 0
        var attackerLimit = 0;
        if (Game.spawns['Spawn1'].room.find(FIND_HOSTILE_CREEPS).length > 0){
            // set attacker limit to 2
            attackerLimit = 2;
        }



        // if there are less harvesters than limit and no attackers then spawn
        if(harvesters.length < harvesterLimit && attackerLimit == 0) {
            var newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'harvester'}});        
        }

    
        // if there are less builders than limit and no attackers then spawn
        if(builders.length < builderLimit && attackerLimit == 0) {
            var newName = 'Builder' + Game.time;
            console.log('Spawning new builder: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
            {memory: {role: 'builder'}});
        }
    
        // if there are less upgraders than limit and no attackers then spawn
        if(upgraders.length < upgraderLimit && attackerLimit == 0) {
            var newName = "Upgrader" + Game.time;
            console.log("Spawning new upgrader: " + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
                {memory: {role: 'upgrader'}});
        }

        // if there are less attackers than limit then spawn
        if(attackers.length < attackerLimit ) {
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