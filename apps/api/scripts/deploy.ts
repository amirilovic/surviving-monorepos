import { $ } from "zx";

const image = "ghcr.io/amirilovic/effective-monorepos-api:latest";

async function deploy() {
  await $`pnpm -F @shop/website deploy --prod out`;

  await $`docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD ghcr.io`;

  await $`docker build -f ./out/Dockerfile \
      -t ${image} \
      --cache-from=${image} ./out`;

  await $`docker push ${image}`;
}

deploy();
