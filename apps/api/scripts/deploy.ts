import { $, cd } from "zx";

async function deploy({
  image,
  packageName,
  packagePath,
  outDir,
}: {
  image: string;
  packageName: string;
  packagePath: string;
  outDir: string;
}) {
  const repoRoot = await $`git rev-parse --show-toplevel`;

  await cd(repoRoot);

  await $`rm -rf ${outDir}`;

  await $`npx turbo run build --filter=${packageName}...`;

  await $`npx turbo prune ${packageName} --docker --out-dir=${outDir}`;

  // use .dockerignore to exclude source code and node_modules from the image
  await $`cp  ${packagePath}/.dockerignore ${outDir}`;

  await $`echo "$DOCKER_PASSWORD" | docker login ghcr.io --username "$DOCKER_USERNAME" --password-stdin`;

  await $`docker build -f ${packagePath}/Dockerfile \
        -t ${image} \
        --cache-from=${image} ${outDir}`;

  await $`docker push ${image}`;
}

deploy({
  image: "ghcr.io/amirilovic/surviving-monorepos-api:latest",
  packageName: "@shop/api",
  packagePath: `./apps/api`,
  outDir: "./app-out",
});
