module.exports = {
  apps: [
    {
      name: "tata-cliq-frontend",
      script: "build/server/static/js/main.js",
      watch: true,
      env: {
        NODE_ENV: "production"
      }
    }
  ],
  deploy: {
    ssr: {
      user: "ubuntu",
      host: "54.147.12.99",
      key: "~/.ssh/ORACLE-HYBRIS.pem",
      ref: "origin/desktopUpperFunnelSprint2",
      repo: "git@github.com:tcs-chennai/TUL_PWA_FRONT_NEW_END_CODE.git",
      ssh_options: ["StrictHostKeyChecking=no", "PasswordAuthentication=no"],
      path: "/home/ubuntu/tata-cliq-frontend",
      "post-deploy":
        "yarn install && yarn run build && yarn run build:server && yarn run pre-build-ssr"
    }
  }
};
