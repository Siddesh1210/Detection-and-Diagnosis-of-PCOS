import jwt from "jsonwebtoken";
async function auth(req, res, next) {
    console.log(req.cookies);
  const acccess_token = req.cookies.access_token;
  const refresh_token = req.cookies.refresh_token;
//   console.log("Access : ", acccess_token, "Refresh : ", refresh_token);
  if (!acccess_token || !refresh_token) {
    return res.status(401).json({ isOk:false,message: "Login is required" });
  }
  try {
    jwt.verify(acccess_token, process.env.Access_Token, (err, decoded) => {
      if (err) {
        jwt.verify(
          refresh_token,
          process.env.Refresh_Token,
          (refresh_err, refresh_decoded) => {
            if (refresh_err) {
              return res.status(401).json({
                isOk: false,
                message: "Both token is expired please login",
              });
            } else {
              const new_access_token = jwt.sign(
                { id: refresh_decoded.id },
                process.env.Access_Token,
                { expiresIn: "1d" }
              );
              const new_refresh_token = jwt.sign(
                { id: refresh_decoded.id },
                process.env.Refresh_Token,
                { expiresIn: "7d" }
              );
              res.cookie("refresh_token", new_refresh_token);
              res.cookie("acccess_token", new_access_token);
              req.id = refresh_decoded.id;
              next();
            }
          }
        );
      } else {
        req.id = decoded.id;
        next();
      }
    });
  } catch (error) {
    res.status(401).json({ isOk: false, message: error.message });
  }
}

export default auth;
