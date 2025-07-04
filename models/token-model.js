const {pool} = require("../config/db_mysql");

class TokenModel {
    static async storeToken(userId,accessToken,refreshToke,expiresAt){
        try {
            await pool.query( 
            `INSERT INTO demo.user_tokens (user_id, access_token, refresh_token, created_at, expires_at)
            VALUES (?, ?, ?, NOW(), ?)`,
                [userId,accessToken,refreshToke,expiresAt]
            )      
        } catch (err) {
            console.error("error storing tokens at :",err);
            throw err;
        }
    }
}

module.exports = TokenModel;