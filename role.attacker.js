var attackLogic = {
    
    /** @param {Creep} creep **/
    run: function(creep){
        const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(target) {
            if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.say("ENEMY SIGHTED");
                creep.moveTo(target);
            }
        }
    }
}


module.exports = attackLogic;