//Configurar el codigo
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    //Lee todo el código de este archivo
    entry: './src/app/index.js',

    //Y lo convierte en este archivo
    output:
    {
        path: __dirname + '/src/public/js',
        filename: 'bundle.js'
    },

    //Leer UNICAMENTE los archivos .js, ignorar la carpeta 'node-modules' y usar vue-loader para cargar vue.
    module:
    {
        rules:
        [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:
                {
                    loader: 'babel-loader'
                }
            },

            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },

    plugins: 
    [
        new VueLoaderPlugin()
    ]
};