module.exports = {
  apps: [
    {
      name: "tata-cliq-frontend",
      script: "index.js",
      watch: true,
      env: {
        NODE_ENV: "production"
      }
    }
  ],
  deploy: {
    production: {
      user: "ubuntu",
      host: "54.147.12.99",
      key: "~/.ssh/ORACLE-HYBRIS.pem",
      ref: "origin/TPR-12348-pincodeServiceability",
      repo: "git@github.com:tcs-chennai/TUL_PWA_FRONT_NEW_END_CODE.git",
      ssh_options: ["StrictHostKeyChecking=no", "PasswordAuthentication=no"],
      path: "/home/ubuntu/tata-cliq-frontend",
      "post-deploy": "yarn install && yarn run pre-build"
    }
  }
};
