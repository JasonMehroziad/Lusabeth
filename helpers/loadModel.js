const { default: ollama } = require('ollama');
const lusabeth = require('../model.json');
const { modelName } = require('../config.json');

module.exports = async () => {
    const list = await ollama.list();
    for (const model of list.models) {
        const name = model.name.split(':')[0];
        if (name === modelName) return;
    }
    ollama.create(lusabeth);
}