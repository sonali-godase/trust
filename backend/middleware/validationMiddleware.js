const validateAnnadaan = (req, res, next) => {
  const { name, phone, email, annadaanType, date, time } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ success: false, message: 'Name is required' });
  }

  if (!phone || !phone.trim()) {
    return res.status(400).json({ success: false, message: 'Phone number is required' });
  }

  // Validate phone is exactly 10 digits
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone.trim())) {
    return res.status(400).json({ success: false, message: 'Phone number must be exactly 10 digits' });
  }

  if (!email || !email.trim()) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ success: false, message: 'Invalid email address' });
  }

  if (!annadaanType || !annadaanType.trim()) {
    return res.status(400).json({ success: false, message: 'Annadaan type is required' });
  }

  if (!date) {
    return res.status(400).json({ success: false, message: 'Date is required' });
  }

  if (!time || !time.trim()) {
    return res.status(400).json({ success: false, message: 'Time is required' });
  }

  next();
};

const validateLiveStream = (req, res, next) => {
  const { title, streamUrl } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ success: false, message: 'Title is required' });
  }

  if (!streamUrl?.trim() && !(req.files && req.files.videoFile)) {
    return res.status(400).json({ success: false, message: 'Stream URL or Video File is required' });
  }

  next();
};

module.exports = {
  validateAnnadaan,
  validateLiveStream
};
