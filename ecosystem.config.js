module.exports = {
    apps: [
        {
            name: "tata-cliq-frontend-desktop-prod",
            script: "index.js",
            watch: false,
            autorestart: true,
            env: {
                PORT: 3000,
            },
            exec_mode: "cluster",
            instances: "max",
        },
        {
            name: "tata-cliq-frontend-desktop-qa1",
            script: "index.js",
            watch: false,
            autorestart: true,
            env: {
                PORT: 3000,
            },
            exec_mode: "cluster",
            instances: "1",
        },
        {
            name: "tata-cliq-frontend-desktop-qa2",
            script: "index.js",
            watch: false,
            autorestart: true,
            env: {
                PORT: 3000,
            },
            exec_mode: "cluster",
            instances: "1",
        },
        {
            name: "tata-cliq-frontend-desktop-qa3",
            script: "index.js",
            watch: false,
            autorestart: true,
            env: {
                PORT: 3000,
            },
            exec_mode: "cluster",
            instances: "1",
        },
        {
            name: "tata-cliq-frontend-desktop-qa4",
            script: "index.js",
            watch: false,
            autorestart: true,
            env: {
                PORT: 3000,
            },
            exec_mode: "cluster",
            instances: "1",
        },
        {
            name: "tata-cliq-frontend-desktop-qa5",
            script: "index.js",
            watch: false,
            autorestart: true,
            env: {
                PORT: 3000,
            },
            exec_mode: "cluster",
            instances: "1",
        },
        {
            name: "tata-cliq-frontend-desktop-qa6",
            script: "index.js",
            watch: false,
            autorestart: true,
            env: {
                PORT: 3000,
            },
            exec_mode: "cluster",
            instances: "1",
        },
        {
            name: "tata-cliq-frontend-desktop-qa7",
            script: "index.js",
            watch: false,
            autorestart: true,
            env: {
                PORT: 3000,
            },
            exec_mode: "cluster",
            instances: "1",
        },
        {
            name: "tata-cliq-frontend-desktop-qa8",
            script: "index.js",
            watch: false,
            autorestart: true,
            env: {
                PORT: 3000,
            },
            exec_mode: "cluster",
            instances: "1",
        },
        {
            name: "tata-cliq-frontend-desktop-qa9",
            script: "index.js",
            watch: false,
            autorestart: true,
            env: {
                PORT: 3000,
            },
            exec_mode: "cluster",
            instances: "1",
        },
        {
            name: "tata-cliq-frontend-desktop-qa10",
            script: "index.js",
            watch: false,
            autorestart: true,
            env: {
                PORT: 3000,
            },
            exec_mode: "cluster",
            instances: "1",
        },
        {
            name: "tata-cliq-frontend-desktop-preprod1",
            script: "index.js",
            watch: false,
            autorestart: true,
            env: {
                PORT: 3000,
            },
            exec_mode: "cluster",
            instances: "max",
        },
        {
            name: "tata-cliq-frontend-desktop-preprod2",
            script: "index.js",
            watch: false,
            autorestart: true,
            env: {
                PORT: 3000,
            },
            exec_mode: "cluster",
            instances: "max",
        },
        {
            name: "tata-cliq-frontend-desktop-pt1",
            script: "index.js",
            watch: false,
            autorestart: true,
            env: {
                PORT: 3000,
            },
            exec_mode: "cluster",
            instances: "max",
        },
        {
            name: "tata-cliq-frontend-desktop-pt2",
            script: "index.js",
            watch: false,
            autorestart: true,
            env: {
                PORT: 3000,
            },
            exec_mode: "cluster",
            instances: "max",
        },
    ],
};
