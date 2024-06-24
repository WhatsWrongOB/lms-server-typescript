import Attendance from "../model/attendance.js";
const markAttendance = async (req, res, next) => {
    try {
        const { attendance, courseId, date } = req.body;
        if (!attendance || !Array.isArray(attendance)) {
            throw new Error("Invalid input: attendance should be an array of records.");
        }
        for (const record of attendance) {
            const { userId, status } = record;
            if (!userId || !status) {
                throw new Error("Each record must include userId and status.");
            }
            if (status !== "present" && status !== "absent") {
                throw new Error("Status must be 'present' or 'absent'.");
            }
        }
        const markedAttendance = [];
        for (const record of attendance) {
            const { userId, status } = record;
            let existingAttendance = await Attendance.findOne({
                user: userId,
                course: courseId,
                date
            });
            if (existingAttendance) {
                existingAttendance.status = status;
                await existingAttendance.save();
                markedAttendance.push(existingAttendance);
            }
            else {
                const newAttendance = new Attendance({
                    user: userId,
                    course: courseId,
                    date,
                    status
                });
                const savedAttendance = await newAttendance.save();
                markedAttendance.push(savedAttendance);
            }
        }
        return res.status(200).json({
            success: true,
            message: "Attendance marked successfully for all students.",
            markedAttendance
        });
    }
    catch (error) {
        next(error);
    }
};
const getAttendanceByUser = async (req, res, next) => {
    try {
        const { userId, courseId } = req.query;
        const attendance = await Attendance.find({
            user: userId,
            course: courseId
        }).populate('user', "username department").populate('course').exec();
        return res.status(200).json({
            success: true,
            attendance
        });
    }
    catch (error) {
        next(error);
    }
};
export { markAttendance, getAttendanceByUser };
