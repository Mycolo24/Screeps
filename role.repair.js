var roleRepair = {
    
    run: function(creep){
        // update creep status
	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 repair');
	    }

        if(creep.memory.building){
            var targets = creep.room.find()
        }
    }
}


module.module.exports = roleRepair;