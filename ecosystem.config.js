module.exports = {
    apps: [
        {
            name: "Ona Website",
            port: 3033,
            exec_mode: "cluster",
            instances: "1",
            script: "./.output/server/index.mjs",
            args: "preview",
        },
    ],
};
