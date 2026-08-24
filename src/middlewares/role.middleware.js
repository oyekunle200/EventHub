
export const isRole = (role) =>{
    return async (req, res, next) =>{
        if(!role.includes(req.user.role)) {
        return res.status(403).json({message:"Forbidden: Unauthorized role"})
        }
        next();
    }
}