import type { NextConfig } from "next";
import type { RuleSetRule } from "webpack";

const baseNextConfig: NextConfig = {
    webpack(config) {
        const fileLoaderRule = config.module.rules.find((rule: RuleSetRule) => {
            return rule.test && (rule.test instanceof RegExp) && rule.test.test(".svg");
        });
        if (fileLoaderRule) {
            fileLoaderRule.exclude = /\.svg$/;
        }
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },
    experimental: {
        turbo: {
            rules: {
                "*.svg": {
                    loaders: ["@svgr/webpack"],
                    as: "*.js",
                },
            },
        },
    },
};

export default baseNextConfig;