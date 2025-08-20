import UserModel from "../model/JobSeekerModel.js";

export const createJobSeeker = async (req, res) => {
    const { name, skills, location, experience, ctc, noticePeriod } = req.body;
    const user = new UserModel({ name, skills, location, experience, ctc, noticePeriod })
    await user.save()
    return res.json({ success: true, user })
}

export const updateProfile = async (req, res) => {
    const updatedData = req.body;
    const { id } = req.params;
    try {
        const updateUser = await UserModel.findByIdAndUpdate(id, updatedData,{ new: true })
        console.log(updateUser)

        if (!updateUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.json({
            success: true,
            user: updateUser
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const DeleteJob=async (req, res) => {
    try {
        await UserModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Candidate deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const AllJobSeeker= async (req, res) => {
    try {
        const seekers = await UserModel.find();
        res.json(seekers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
