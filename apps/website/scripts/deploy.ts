import { $, cd } from "zx";

const image = "ghcr.io/amirilovic/surviving-monorepos-website:latest";
const packageName = "@shop/website";
const packagePath = `./apps/website`;

async function deploy() {
  const repoRoot = await $`git rev-parse --show-toplevel`;

  await cd(repoRoot);

  await $`rm -rf ./out`;

  await $`npx turbo run build --filter=${packageName}...`;

  await $`npx turbo prune ${packageName} --docker`;

  // use .dockerignore to exclude source code and node_modules from the image
  await $`cp  ${packagePath}/.dockerignore ./out`;

  await $`echo "$DOCKER_PASSWORD" | docker login ghcr.io --username "$DOCKER_USERNAME" --password-stdin`;

  await $`docker build -f ${packagePath}/Dockerfile \
        -t ${image} \
        --cache-from=${image} ./out`;

  await $`docker push ${image}`;
}

deploy();
