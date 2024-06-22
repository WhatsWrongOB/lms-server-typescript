import { Schema, model } from "mongoose";
import { UserData } from "../types";


const userSchema: Schema<UserData> = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKcAAACUCAMAAADBJsndAAAAMFBMVEXMzMz////Jycn8/PzQ0NDb29vV1dXh4eHk5OTw8PDo6Oje3t74+Pjt7e309PTY2NgVJ6DxAAADoElEQVR4nO2b67KrIAyFMVxUBHz/tz2ovdjWWiEQ2HP4fnamM2sSICEsGWs0Go1Go9FoNBqNRqPRaDSqAgBKSzgFQCjZD1pbrYdeKlGlXhC9daZ7YpztRXVK57Hj3Tu8G+fSwl7o3YfGO64vLe4OyO8qV6WyiuwL3R2kfJ/8TovSIn8Gs5KQguSnwbyHlBcWOlwI5sZQUuhwIZj3kA7FVML1aJaMKEyXo7lFdCojdA5RuSotU5zMb2VvmAIqQQdlfY1np8kzDypU5apUUQsVNkqnJa6gICNULlDXpaN280I8u5FWpogMZ9eRJt5v9lhot3z42XmH8gyF4FL0hM90AQ1sQF4hbEfAInRaOp0ifnn6BUq34xVGJ2HtRGwjD113F1s0NySZzh6lk25A8lfi2XT+lzqjm+SbTrLzM+pudIfwnP8rdTPy1rFGk/LmEXF3f+rUdM8ggZOlV52UUybEAqVcngzGaJ0j6T1ORetUlDIZxCbe0M5DILa164nnNuLKc8wnjvolCaao+VKB0XdMQB25yrhRWJH3w/ChSKEnpLAq7yt7GZlL2xQCbSXaAUGH01jQhCGuNqK+7Sz5Bg+XUz+ywi/wA7/w/s7LPRY/mH+3JKYG1w0Ifa7U6CpsTF6DOlulo2Kl1+YDH1P+aRTxv/A6YvkExGTf02/sVJlKtrgAmVCTdev259zZSQlWpRNwAZ6UltJoNBrsdioxIQSr+GQCoQbrDN8wzg7VOb6BKamP7iBGS1VREzKN3zs7M1ZR5H0ofzquuC0dVBAnjvQ9rqTlH2C4PgY1Q6FNBUyGDWuNLJF9mMMHdo7QE3RTCfqKIf0V/w/Cx6P1Viaj348k5a1OI/xgZFO7sPHXJ0QDMYjO+SOkJE6BiA30JpMi9wjn557cLlCBcQDuyWyoxu2gPVmfaMbzT7euw7uMvgZ/HqVRuSl1mc4nlDv1iCyOVUi00/dkqfZ9wqRv8AzWRXwVOlSa2hsG8R8gnJN4L4l448o5aZ+/YMiR9QWe1E4fb6/5TUIDDrLhPCedZQT6XFlf4MksOCi75wWhiTLv62XWeCaqn5BzE20kCSjk3EQbLkFA8xTMVxKUT2Cpu7kjLH72IFO18N/hCTz1GbrOI/D3z/yrc4Fjw4n5Yi8EZDtCcChtII+mzCXzCa54kqUdm3iKw3PDYmSiPoAMw2ASP5PJxH0uifuwMAzEXR5Gqu3uNzzCxgp0Mr1QhM7sLchOZneq8x8Q/ig5PR0ALAAAAABJRU5ErkJggg=="
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    default: null,
  },
  resetPasswordToken: {
    type: String,
    default: null,
  },
  resetPasswordExpire: {
    type: Date,
    default: null,
  },
});

const User = model<UserData>("User", userSchema);

export default User;
