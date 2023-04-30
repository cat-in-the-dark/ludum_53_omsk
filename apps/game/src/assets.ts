import { Assets, ResolverManifest } from "@pixi/assets";

const manifest: ResolverManifest = {
  bundles: [
    {
      name: "load",
      assets: [
        {
          name: "logo",
          srcs: "textures/logo.png",
        },
      ],
    },
    {
      name: "main",
      assets: [],
    },
  ],
};

export async function loadAssets() {
  await Assets.init({ manifest, basePath: "/assets" });
  await Assets.loadBundle("load");
  Assets.backgroundLoadBundle("main");
}
