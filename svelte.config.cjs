const node = require('@sveltejs/adapter-node');
const static = require('@sveltejs/adapter-static');

module.exports = {
    kit: {
        target: '#svelte',
        adapter: node()
    }
};