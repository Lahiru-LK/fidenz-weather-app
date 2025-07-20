export const verifyToken = (req, res) => {
  try {
    // Token verified by middleware
    const user = req.auth;
    res.json({ 
      success: true, 
      user: user,
      message: "Token is valid" 
    });
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      message: "Invalid token" 
    });
  }
};

export const getUserProfile = (req, res) => {
  try {
    const user = req.auth;
    res.json({ 
      success: true, 
      profile: {
        sub: user.sub,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Failed to get user profile" 
    });
  }
};
