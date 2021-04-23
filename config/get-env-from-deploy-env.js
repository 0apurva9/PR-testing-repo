module.exports = function getEnvFromDeployEnv(deployEnv = "local", localEnv = "true") {
    const env = {
        PORT: 3000,
    };
    switch (deployEnv) {
        case "preprod1":
            env.apiBaseUrl = "https://preprod1.tataunistore.com";
            env.baseUrl = "https://preprod1.tataunistore.com";
            break;
        case "preprod2":
            env.apiBaseUrl = "https://preprod2.tataunistore.com";
            env.baseUrl = "https://preprod2.tataunistore.com";
            break;
        case "production":
            env.apiBaseUrl = "https://www.tatacliq.com";
            env.baseUrl = "https://www.tatacliq.com";
            break;
        case "pt1":
            env.apiBaseUrl = "https://pt1.tatacliq.com";
            env.baseUrl = "https://pt1.tatacliq.com";
            break;
        case "pt2":
            env.apiBaseUrl = "https://pt2.tatacliq.com";
            env.baseUrl = "https://pt2.tatacliq.com";
            break;
        case "qa6":
            env.apiBaseUrl = "https://qa6.tataunistore.com";
            env.baseUrl = "https://qa6.tataunistore.com";
            break;
        case "qa8":
            env.apiBaseUrl = "https://qa8.tataunistore.com";
            env.baseUrl = "https://qa8.tataunistore.com";
            break;
        case "mock":
            env.apiBaseUrl = "https://mock.tatacliq.com";
            env.baseUrl = "https://mock.tatacliq.com";
            break;
        case "qa4":
            env.apiBaseUrl = "https://qa4.tataunistore.com";
            env.baseUrl = "https://qa4.tataunistore.com";
            break;
        case "qa1":
            env.apiBaseUrl = "https://qa1.tataunistore.com";
            env.baseUrl = "https://qa1.tataunistore.com";
            break;
        case "qa2":
            env.apiBaseUrl = "https://qa2.tataunistore.com";
            env.baseUrl = "https://qa2.tataunistore.com";
            break;
        case "qa3":
            env.apiBaseUrl = "https://qa3.tataunistore.com";
            env.baseUrl = "https://qa3.tataunistore.com";
            break;
        case "qa5":
            env.apiBaseUrl = "https://qa5.tataunistore.com";
            env.baseUrl = "https://qa5.tataunistore.com";
            break;
        case "qa7":
            env.apiBaseUrl = "https://qa7.tataunistore.com";
            env.baseUrl = "https://qa7.tataunistore.com";
            break;
        case "qa9":
            env.apiBaseUrl = "https://qa9.tataunistore.com";
            env.baseUrl = "https://qa9.tataunistore.com";
            break;
        case "qa10":
            env.apiBaseUrl = "https://qa10.tataunistore.com";
            env.baseUrl = "https://qa10.tataunistore.com";
            break;
        default:
            throw new Error(`deploy environment not set for ${deployEnv}`);
    }
    if (localEnv === "true") {
        env.baseUrl = `https://localhost:${env.MIDDLEWARE_SERVER_PORT}`;
    }
    return env;
};
