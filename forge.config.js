module.exports = {
  packagerConfig: {
    asar: true,
    icon: './icons/icon',
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        "name": "Excel Template",
      }
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "fuzzylimes",
          name: "excelTemplateMerger"
        },
        draft: true
      }
    }
  ]
};
