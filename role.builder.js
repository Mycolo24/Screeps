var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

		// update creep status
	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES); // try to find construction sites
			// if there are construction sites
            if(targets.length) {
				// move to construction site and then transfer energy
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
			// if there are no construction sites then get rid of builder
			else{
				creep.suicide();
				
			}
	    }
		// if builder has no energy then harvest energy
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleBuilder;