class Job {
    constructor(id, name, salary, description, skills, area, differentials, isPcd, isActive) {
        this.id = id;
        this.salary = salary;
        this.name = name;
        this.description = description;
        this.skills = skills;
        this.area = area;
        this.differentials = differentials;
        this.isPcd = isPcd;
        this.isActive = isActive;
    }
}
module.exports = Job;