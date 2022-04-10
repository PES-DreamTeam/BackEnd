const socialMediaService = (dependencies) => {
    const { axios } = dependencies;
    
    const verifyToken = async (token, socialMedia) => {
        try {
            switch (socialMedia) {
                case "facebook":
                    return await verifyFacebookToken(token);
                    break;
            
                default:
                    return null;
                    break;
            }

        } catch (error) {
            return null;
        }
    }

    const verifyFacebookToken = async (token) => {
        const response = await axios.get(`https://graph.facebook.com/me?fields=email,name&access_token=${token}`);
        return response.data;
    }
    return {
        verifyToken,
    }
}

module.exports = socialMediaService;
