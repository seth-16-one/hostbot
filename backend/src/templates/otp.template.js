function otpTemplate({
  name,
  otp,
  purpose = "verification",
  expiresIn = "10 minutes",
}) {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>HostBot OTP</title>
</head>

<body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0"
style="background:#ffffff;border-radius:16px;padding:40px;">

<tr>
<td align="center">

<h1 style="color:#0F766E;margin-bottom:8px;">
HostBot
</h1>

<p style="color:#666;font-size:16px;">
Hello ${name},
</p>

<h2 style="color:#222;">
Your ${purpose} code
</h2>

<div
style="
margin:30px auto;
padding:18px;
background:#F3F4F6;
border-radius:12px;
font-size:36px;
font-weight:bold;
letter-spacing:8px;
width:220px;
text-align:center;
color:#0F766E;
">
${otp}
</div>

<p style="color:#555;font-size:15px;">
This code expires in <strong>${expiresIn}</strong>.
</p>

<p style="color:#777;font-size:14px;margin-top:30px;">
If you didn't request this code, simply ignore this email.
</p>

<hr style="margin:40px 0;border:none;border-top:1px solid #eee;">

<p style="font-size:12px;color:#999;">
© ${new Date().getFullYear()} HostBot.
All rights reserved.
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
}

module.exports = otpTemplate;
