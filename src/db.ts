import User from "./app/models/user.model";
import Task from "./app/models/task.model";

User.hasMany(Task);
Task.belongsTo(User);

export {
    User,
    Task
}

