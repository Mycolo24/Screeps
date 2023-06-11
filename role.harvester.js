var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // if the creep has more than a capacity of 0
	    if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES); // find a source
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) { // try to harvest if it is in range
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}}); // move to source if it is out of range
                creep.say('🔄 harvest');
                
            }
        }
        // if the creep is full on capacity
        else {
            // find a list of targets
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || // first try to find extension
                                structure.structureType == STRUCTURE_SPAWN || // then try to find spawn
                                structure.structureType == STRUCTURE_TOWER) && // then try to find tower
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0; // only if they have a free capacity more than 0
                    }
            });
            // if there is a target with free capacity
            if(targets.length > 0) {
                // try to transfer energy to target
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}}); // if out of range then move to it
                }
            }
            // if there are no targets then try to build
            else{
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(targets.length) {
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        creep.say('🚧 build');
                    }
                }
            }
        }
	}
};

module.exports = roleHarvester;