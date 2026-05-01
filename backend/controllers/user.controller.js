export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    let profilePhoto = "";

    // ✅ SAFE CHECK
    if (req.file && req.file.buffer) {
      try {
        const fileUri = getDataUri(req.file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        profilePhoto = cloudResponse.secure_url;
      } catch (err) {
        console.log("Cloudinary error:", err);
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto,
      },
    });

    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });

  } catch (error) {
    console.log("Register error:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};