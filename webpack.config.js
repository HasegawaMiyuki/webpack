const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

// [定数] webpack の出力オプションを指定します
// 'production' か 'development' を指定
const MODE = "development";

// ソースマップの利用有無(productionのときはソースマップを利用しない)
const enabledSourceMap = MODE === "development";

module.exports = {
    // モード値を production に設定すると最適化された状態で、
    // development に設定するとソースマップ有効でJSファイルが出力される
    mode: MODE,
    // source-map 方式でないと、CSSの元ソースが追跡できないため
    // mapを追加したい場合はdevtoolのコメントアウトを外す
    // devtool: "source-map",

    // エントリーポイント
    entry: {
        index: './src/script/index.js',
        // common: './src/script/common.js',
    },

    // ファイルの出力設定
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "js/[name].js"
    },

    // ローカル開発用環境を立ち上げる
    // 実行時にブラウザが自動的に localhost を開く
    devServer: {
        static: "dist",
        open: true
    },

    module: {
        rules: [
            {
                // 拡張子 .js の場合
                test: /\.js$/,
                use: [
                    {
                        // Babel を利用する
                        loader: "babel-loader",
                        // Babel のオプションを指定する
                        options: {
                            presets: [
                                // プリセットを指定することで、ES2021 を ES5 に変換
                                "@babel/preset-env",
                            ],
                        },
                    },
                ],
            },
            // cssの設定
            {
                // 対象となるファイルの拡張子
                test: /\.css/,
                // ローダー名
                use: [
                    // linkタグに出力する機能
                    "style-loader",
                    // CSSをバンドルするための機能
                    {
                        // オプションでCSS内のurl()メソッドの取り込みを禁止する
                        loader: "css-loader",
                        // ソースマップを有効にする
                        options: { url: false }
                    }
                ]
            },
            // Sassファイルの読み込みとコンパイル
            {
                test: /\.scss/, // 対象となるファイルの拡張子
                use: [
                    // CSSファイルを書き出すオプションを有効にする
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    // // linkタグに出力する機能
                    // "style-loader",
                    // CSSをバンドルするための機能
                    {
                        loader: "css-loader",
                        options: {
                            // オプションでCSS内のurl()メソッドを取り込む
                            url: true,
                            // ソースマップの利用有無
                            sourceMap: enabledSourceMap,

                            // 0 => no loaders (default);
                            // 1 => postcss-loader;
                            // 2 => postcss-loader, sass-loader
                            importLoaders: 2
                        }
                    },
                    // PostCSSのための設定
                    {
                        loader: "postcss-loader",
                        options: {
                            // PostCSS側でもソースマップを有効にする
                            // sourceMap: true,
                            postcssOptions: {
                                plugins: [
                                    // Autoprefixerを有効化
                                    // ベンダープレフィックスを自動付与する
                                    ["autoprefixer", { grid: true }],
                                ],
                            },
                        },
                    },
                    // Sassをバンドルするための機能
                    {
                        loader: "sass-loader",
                        options: {
                        // ソースマップの利用有無
                        sourceMap: enabledSourceMap
                        },
                    },
                ],
            },
            {
                // // 対象となるファイルの拡張子
                // test: /\.(gif|png|jpg|svg)$/,
                // // 画像をBase64として取り込む
                // // type: "asset/inline",
                // // 画像を埋め込まず任意のフォルダに保存する
                // type: "asset/resource",
                // 対象となるファイルの拡張子
                test: /\.(gif|png|jpg|svg)$/,
                // 閾値以上だったら埋め込まずファイルとして分離する
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        // 100KB以上だったら埋め込まずファイルとして分離する
                        maxSize: 100 * 1024,
                    },
                },
            },

            // // htmlローダー
            // {
            //     test: /\.html$/,
            //     loader: "html-loader"
            // }
        ],
    },
    plugins: [
        // CSSファイルを外だしにするプラグイン
        new MiniCssExtractPlugin({
            // ファイル名を設定します
            filename: "style/[name].css",
        }),
        new HtmlWebpackPlugin({
            // template: path.join(__dirname, '${__dirname}/index.html'),
            template: path.resolve(__dirname, 'src', 'html', 'index.html'),
            // ファイル名を変更
            filename: 'html/default.html',
            // タイトルの変更
            title: 'change title',
            hash: true,
            chunks: [
                'index',
                'index.css'
            ]
        }),
        // new HtmlWebpackPlugin({
        //     template: path.resolve(__dirname, 'src', 'html', 'sample.html'),
        //     // ファイル名を変更
        //     filename: 'html/second.html',
        //     // タイトルの変更
        //     title: 'second title',
        //     hash: true,
        //     chunks: [
        //         'common',
        //         'common.css'
        //     ]
        // }),
        new CopyPlugin({
            patterns: [
                { from: "src/image", to: "image" },
            ],
        }),
    ],
    // ES5(IE11等)向けの指定
    target: ["web", "es5"],
}
