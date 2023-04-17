import User from "./app/models/user.model";
import Task from "./app/models/task.model";
import Project from "./app/models/project.model";
import OTP from "./app/models/otp.model";

User.hasMany(Task);
Task.belongsTo(User);

User.hasMany(Project);
Project.belongsTo(User);

Project.hasMany(Task);
Task.belongsTo(Project);

export {
    User,
    Task,
    Project,
    OTP,
}

