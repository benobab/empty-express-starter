var Activity = require('../models/activity');
var Participation = require("../models/participation");

function ActivityRepository(){
    this.getAllActivities = getAllActivities;
    this.findById = getActivityById;
}

//==============================================================================
/*Get all existing Activities by id (without participation associated) - callback(err,data)*/
/*Data structure : activities:[activity]*/
//==============================================================================
function getAllActivities(callback){
    Activity.find({},function(err,activities){
                if(err){
                    callback(err);
                }
                callback(null,activities);
            });
}

//==============================================================================
/*Get a Activity by id including its participations - callback(err,data)*/
/*Data structure : {activity:activity,participations:participations}*/
//==============================================================================
function getActivityById(id_activity,callback){
    Activity.findById(id_activity,function(err,activity){
            if(err){
                    callback(err);
                    return;
                }
            console.log(activity);
            //Now that we found the activity, we need its participations
            getParticipationsForActivity(activity._id,function(err,data){
                if(err){
                    callback(err);
                    return;
                }
                //Success
                callback(null,{
                    activity:activity,
                    participations:data.participations
                });
            });
       });
}

//==============================================================================
/*Get the participations of an activity - callback(err,data)*/
/*Data structure :{participations:participations}*/
//==============================================================================
function getParticipationsForActivity(id_activity,callback){
    Participation.find({id_activity:id_activity},function(err,participations){
                if(err){
                    callback(err);
                    return;
                }
                callback(null,{participations:participations});
            });
}

module.exports = ActivityRepository;